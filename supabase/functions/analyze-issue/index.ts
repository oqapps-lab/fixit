import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_MODEL = Deno.env.get('ANTHROPIC_MODEL') ?? 'claude-sonnet-4-20250514';

type TrustedSource = {
  name: string;
  domain?: string;
  url?: string;
  notes?: string;
};

type AnalyzeRequest = {
  storagePath: string;
  mimeType?: string;
  guestSessionId?: string;
  zipCode: string;
  countryCode?: string;
  qualityTier: 'budget' | 'standard' | 'premium';
  diyComfort: 'never' | 'basic' | 'confident';
  trustedSources?: TrustedSource[];
};

type ParsedAnalysis = {
  issueCategory: string;
  summary: string;
  severity: 'low' | 'moderate' | 'high';
  confidence: number;
  priceGuidance: string[];
  trustedSourcesUsed: string[];
  nextSteps: string[];
};

async function resolveAuthenticatedUserId(
  adminClient: ReturnType<typeof createClient>,
  request: Request,
): Promise<string | null> {
  const authorizationHeader = request.headers.get('authorization');
  if (!isNonEmptyString(authorizationHeader) || !authorizationHeader.toLowerCase().startsWith('bearer ')) {
    return null;
  }

  const token = authorizationHeader.slice(7).trim();
  if (!isNonEmptyString(token) || token.split('.').length < 3) {
    return null;
  }

  const { data, error } = await adminClient.auth.getUser(token);
  if (error !== null || data.user === null) {
    return null;
  }

  return data.user.id;
}

function jsonResponse(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function safeDomainFromSource(source: TrustedSource): string | null {
  if (isNonEmptyString(source.domain)) {
    return source.domain.trim().toLowerCase();
  }

  if (isNonEmptyString(source.url)) {
    try {
      const parsedUrl = new URL(source.url);
      return parsedUrl.hostname.toLowerCase();
    } catch {
      return null;
    }
  }

  return null;
}

function normalizeTrustedSources(value: unknown): TrustedSource[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (typeof item !== 'object' || item === null) {
      return [];
    }

    const record = item as Record<string, unknown>;
    if (!isNonEmptyString(record.name)) {
      return [];
    }

    const provisionalSource: TrustedSource = {
      name: record.name.trim(),
      domain: isNonEmptyString(record.domain) ? record.domain.trim().toLowerCase() : undefined,
      url: isNonEmptyString(record.url) ? record.url.trim() : undefined,
      notes: isNonEmptyString(record.notes) ? record.notes.trim() : undefined,
    };

    const resolvedDomain = safeDomainFromSource(provisionalSource);
    if (resolvedDomain === null) {
      return [];
    }

    return [
      {
        ...provisionalSource,
        domain: resolvedDomain,
      },
    ];
  });
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

async function callAnthropic({
  imageBase64,
  mimeType,
  requestData,
  trustedSources,
  anthropicKey,
}: {
  imageBase64: string;
  mimeType: string;
  requestData: AnalyzeRequest;
  trustedSources: TrustedSource[];
  anthropicKey: string;
}) {
  const trustedLines = trustedSources.map((source) => `- ${source.name} (${source.domain})`).join('\n');
  const allowedDomains = trustedSources
    .map(safeDomainFromSource)
    .filter((domain): domain is string => domain !== null);

  const systemPrompt = [
    'You are an AI home repair analyst and pricing researcher.',
    'You must identify the issue in the provided photo and return strictly valid JSON only.',
    'Use concise, practical language for a homeowner.',
    'When web search is available, prioritize only trusted sources and avoid unsupported claims.',
    'Schema:',
    '{',
    '  "issueCategory": "string",',
    '  "summary": "string",',
    '  "severity": "low|moderate|high",',
    '  "confidence": number (0..1),',
    '  "priceGuidance": ["string", "..."],',
    '  "trustedSourcesUsed": ["string", "..."],',
    '  "nextSteps": ["string", "..."]',
    '}',
  ].join('\n');

  const userPrompt = [
    `ZIP: ${requestData.zipCode}`,
    `Country: ${requestData.countryCode ?? 'US'}`,
    `Quality tier: ${requestData.qualityTier}`,
    `DIY comfort: ${requestData.diyComfort}`,
    'Trusted sources for pricing/labor references:',
    trustedLines.length > 0 ? trustedLines : '- none provided',
    'Return only JSON matching the schema.',
  ].join('\n');

  const baseRequest = {
    model: ANTHROPIC_MODEL,
    max_tokens: 900,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mimeType,
              data: imageBase64,
            },
          },
          {
            type: 'text',
            text: userPrompt,
          },
        ],
      },
    ],
  };

  const requestWithTools = {
    ...baseRequest,
    tools: allowedDomains.length > 0
      ? [
          {
            type: 'web_search_20250305',
            name: 'web_search',
            max_uses: 4,
            allowed_domains: allowedDomains,
            user_location: {
              type: 'approximate',
              country: requestData.countryCode ?? 'US',
            },
          },
        ]
      : undefined,
  };

  const requestWithoutTools = baseRequest;

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': anthropicKey,
    'anthropic-version': '2023-06-01',
  };

  const firstResponse = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestWithTools),
  });

  if (firstResponse.ok) {
    return await firstResponse.json();
  }

  const firstError = await firstResponse.text();
  if (requestWithTools.tools === undefined) {
    throw new Error(`Anthropic call failed: ${firstError}`);
  }

  const secondResponse = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestWithoutTools),
  });

  if (!secondResponse.ok) {
    const secondError = await secondResponse.text();
    throw new Error(`Anthropic call failed after fallback: ${secondError}`);
  }

  return await secondResponse.json();
}

function extractAssistantText(message: Record<string, unknown>): string {
  const content = Array.isArray(message.content) ? message.content : [];
  const textParts = content.flatMap((block) => {
    if (typeof block !== 'object' || block === null) {
      return [];
    }
    const record = block as Record<string, unknown>;
    if (record.type !== 'text' || !isNonEmptyString(record.text)) {
      return [];
    }
    return [record.text];
  });

  return textParts.join('\n').trim();
}

function parseAnalysisText(assistantText: string, trustedSources: TrustedSource[]): ParsedAnalysis {
  const fallbackSources = trustedSources.map((source) => source.name);

  const defaultResponse: ParsedAnalysis = {
    issueCategory: 'Unknown issue',
    summary: assistantText.length > 0 ? assistantText : 'No summary returned by model.',
    severity: 'moderate',
    confidence: 0.4,
    priceGuidance: ['Confirm exact local prices with trusted retailers.'],
    trustedSourcesUsed: fallbackSources,
    nextSteps: ['Take another photo in brighter light for better confidence.'],
  };

  if (assistantText.length === 0) {
    return defaultResponse;
  }

  try {
    const parsed = JSON.parse(assistantText) as Record<string, unknown>;
    const issueCategory = isNonEmptyString(parsed.issueCategory) ? parsed.issueCategory : defaultResponse.issueCategory;
    const summary = isNonEmptyString(parsed.summary) ? parsed.summary : defaultResponse.summary;
    const severity = parsed.severity === 'low' || parsed.severity === 'high' || parsed.severity === 'moderate'
      ? parsed.severity
      : defaultResponse.severity;
    const confidence = typeof parsed.confidence === 'number'
      ? Math.max(0, Math.min(1, parsed.confidence))
      : defaultResponse.confidence;
    const priceGuidance = Array.isArray(parsed.priceGuidance)
      ? parsed.priceGuidance.filter(isNonEmptyString)
      : defaultResponse.priceGuidance;
    const trustedSourcesUsed = Array.isArray(parsed.trustedSourcesUsed)
      ? parsed.trustedSourcesUsed.filter(isNonEmptyString)
      : fallbackSources;
    const nextSteps = Array.isArray(parsed.nextSteps)
      ? parsed.nextSteps.filter(isNonEmptyString)
      : defaultResponse.nextSteps;

    return {
      issueCategory,
      summary,
      severity,
      confidence,
      priceGuidance: priceGuidance.length > 0 ? priceGuidance : defaultResponse.priceGuidance,
      trustedSourcesUsed: trustedSourcesUsed.length > 0 ? trustedSourcesUsed : fallbackSources,
      nextSteps: nextSteps.length > 0 ? nextSteps : defaultResponse.nextSteps,
    };
  } catch {
    return defaultResponse;
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' });
  }

  try {
    const payload = (await request.json()) as AnalyzeRequest;
    const countryCode = isNonEmptyString(payload.countryCode) ? payload.countryCode.trim().toUpperCase() : 'US';

    if (!isNonEmptyString(payload.storagePath)) {
      return jsonResponse(400, { error: 'Missing storagePath.' });
    }
    if (!isNonEmptyString(payload.zipCode)) {
      return jsonResponse(400, { error: 'Missing zipCode.' });
    }
    if (countryCode !== 'US') {
      return jsonResponse(400, { error: 'Unsupported countryCode. Only US is currently enabled.' });
    }
    if (!/^[0-9]{5}$/.test(payload.zipCode.trim())) {
      return jsonResponse(400, { error: 'Invalid US ZIP code format.' });
    }
    if (!['budget', 'standard', 'premium'].includes(payload.qualityTier)) {
      return jsonResponse(400, { error: 'Invalid qualityTier.' });
    }
    if (!['never', 'basic', 'confident'].includes(payload.diyComfort)) {
      return jsonResponse(400, { error: 'Invalid diyComfort.' });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');

    if (!isNonEmptyString(supabaseUrl) || !isNonEmptyString(serviceRoleKey)) {
      return jsonResponse(500, { error: 'Missing Supabase function secrets.' });
    }
    if (!isNonEmptyString(anthropicKey)) {
      return jsonResponse(500, { error: 'Missing ANTHROPIC_API_KEY function secret.' });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
    const requestUserId = await resolveAuthenticatedUserId(adminClient, request);

    const { data: signedUrlData, error: signedUrlError } = await adminClient.storage
      .from('project-photos')
      .createSignedUrl(payload.storagePath, 60);

    if (signedUrlError !== null || !isNonEmptyString(signedUrlData?.signedUrl)) {
      return jsonResponse(500, {
        error: `Failed to create signed URL: ${signedUrlError?.message ?? 'unknown error'}`,
      });
    }

    const imageResponse = await fetch(signedUrlData.signedUrl);
    if (!imageResponse.ok) {
      return jsonResponse(500, { error: `Failed to fetch image bytes: ${imageResponse.statusText}` });
    }

    const imageBytes = new Uint8Array(await imageResponse.arrayBuffer());
    const imageBase64 = bytesToBase64(imageBytes);
    const trustedSources = normalizeTrustedSources(payload.trustedSources);

    const anthropicResponse = await callAnthropic({
      imageBase64,
      mimeType: isNonEmptyString(payload.mimeType) ? payload.mimeType : 'image/jpeg',
      requestData: {
        ...payload,
        countryCode,
      },
      trustedSources,
      anthropicKey,
    });

    const assistantText = extractAssistantText(anthropicResponse as Record<string, unknown>);
    const parsedAnalysis = parseAnalysisText(assistantText, trustedSources);

    const issueJson = {
      summary: parsedAnalysis.summary,
      severity: parsedAnalysis.severity,
      confidence: parsedAnalysis.confidence,
      next_steps: parsedAnalysis.nextSteps,
      trusted_sources_used: parsedAnalysis.trustedSourcesUsed,
    };

    const estimateJson = {
      issue_category: parsedAnalysis.issueCategory,
      price_guidance: parsedAnalysis.priceGuidance,
      trusted_sources: trustedSources,
      anthropic_model: ANTHROPIC_MODEL,
    };

    const { data: insertedEstimate, error: insertError } = await adminClient
      .from('estimates')
      .insert({
        user_id: requestUserId,
        guest_session_id: isNonEmptyString(payload.guestSessionId) ? payload.guestSessionId : null,
        problem_category: parsedAnalysis.issueCategory,
        photo_url: payload.storagePath,
        zip_code: payload.zipCode,
        country_code: countryCode,
        currency_code: 'USD',
        quality_tier: payload.qualityTier,
        diy_comfort: payload.diyComfort,
        issue_json: issueJson,
        estimate_json: estimateJson,
        trusted_sources_json: trustedSources,
      })
      .select('id')
      .single();

    if (insertError !== null) {
      return jsonResponse(500, { error: `Failed to persist estimate: ${insertError.message}` });
    }

    return jsonResponse(200, {
      estimateRecordId: insertedEstimate.id,
      analysis: parsedAnalysis,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown function error';
    return jsonResponse(500, { error: message });
  }
});
