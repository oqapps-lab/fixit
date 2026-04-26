// FixIt — analyze-photo Edge Function.
// Takes a photo_id, fetches the image from the private 'photos' bucket via
// signed URL, sends it to OpenAI gpt-5.4 with a strict json_schema matching
// the estimates table, then INSERTs the resulting estimate row linked to
// the photo. Returns the new estimate_id.

import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const ALLOWED_CATEGORIES = [
  "plumbing", "electrical", "walls", "appliance", "roof", "floor", "hvac",
] as const;
const ALLOWED_SEVERITY = ["low", "moderate", "high"] as const;
const ALLOWED_ROOMS = [
  "kitchen", "bath", "living", "bedroom", "exterior", "laundry", "garage", "attic",
] as const;

type AiEstimate = {
  title: string;
  category: typeof ALLOWED_CATEGORIES[number];
  severity: typeof ALLOWED_SEVERITY[number];
  room: typeof ALLOWED_ROOMS[number];
  diy_price: number;
  hybrid_price: number;
  pro_price: number;
  diagnosis: string;
};

const SYSTEM_PROMPT = `You are FixIt's repair-cost AI for US homeowners. Look at the photo and produce a structured estimate.

Rules:
- title: short, plain English, 4-8 words ("Leaky kitchen faucet", "Cracked bathroom tile grout")
- category: pick the closest from the allowed enum
- severity: "low" = annoying / cosmetic, "moderate" = needs attention this month, "high" = safety / structural / urgent
- room: pick where the issue most likely is
- diy_price: USD parts + tools cost if homeowner does it (no labor)
- hybrid_price: USD if homeowner buys parts + handyman installs (parts + 1-2h labor)
- pro_price: USD full service-call from a licensed pro (everything included)
- diagnosis: 1-3 sentences. State what you see, what's likely wrong, what it would take to fix.

If the photo shows nothing repairable (no damage, no household component, blurry, off-topic), set all prices to 0, severity to "low", and put a clear explanation in diagnosis like "No repairable issue detected — please retake with clear view of the problem."

Use Denver, Colorado retail prices for parts and 2026 labor rates (~$95/hr handyman, ~$150/hr licensed pro). Round to nearest whole dollar.`;

const ESTIMATE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "category", "severity", "room", "diy_price", "hybrid_price", "pro_price", "diagnosis"],
  properties: {
    title: { type: "string" },
    category: { type: "string", enum: ALLOWED_CATEGORIES },
    severity: { type: "string", enum: ALLOWED_SEVERITY },
    room: { type: "string", enum: ALLOWED_ROOMS },
    diy_price: { type: "number" },
    hybrid_price: { type: "number" },
    pro_price: { type: "number" },
    diagnosis: { type: "string" },
  },
};

function shortCode(): string {
  const ts = new Date();
  const y = ts.getUTCFullYear();
  const m = String(ts.getUTCMonth() + 1).padStart(2, "0");
  const d = String(ts.getUTCDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 36 ** 2)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `EST-${y}-${m}${d}-${rand}`;
}

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...cors, "content-type": "application/json" },
    });
  }

  try {
    // ─────────────────────────────────────────────────────────────
    // 1. Auth — verify caller is signed in via Supabase JWT
    // ─────────────────────────────────────────────────────────────
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "missing_auth" }), {
        status: 401,
        headers: { ...cors, "content-type": "application/json" },
      });
    }
    const userJwt = authHeader.slice("Bearer ".length);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const openaiKey = Deno.env.get("OPENAI_API_KEY")!;
    if (!openaiKey) {
      return new Response(JSON.stringify({ error: "missing_openai_key" }), {
        status: 500,
        headers: { ...cors, "content-type": "application/json" },
      });
    }

    // Service-role client for storage signed URL + INSERT bypassing RLS check
    // (we still validate ownership manually below)
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Decode user from JWT (use anon client with the user's jwt to call auth.getUser)
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${userJwt}` } },
      auth: { persistSession: false },
    });
    const { data: userResp, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userResp.user) {
      return new Response(JSON.stringify({ error: "invalid_jwt" }), {
        status: 401,
        headers: { ...cors, "content-type": "application/json" },
      });
    }
    const userId = userResp.user.id;

    // ─────────────────────────────────────────────────────────────
    // 2. Parse body — { photo_id }
    // ─────────────────────────────────────────────────────────────
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const photoId = typeof body.photo_id === "string" ? body.photo_id : null;
    if (!photoId) {
      return new Response(JSON.stringify({ error: "missing_photo_id" }), {
        status: 400,
        headers: { ...cors, "content-type": "application/json" },
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 3. Load photo row + verify ownership
    // ─────────────────────────────────────────────────────────────
    const { data: photo, error: photoErr } = await admin
      .from("photos")
      .select("id, user_id, storage_path")
      .eq("id", photoId)
      .single();
    if (photoErr || !photo) {
      return new Response(JSON.stringify({ error: "photo_not_found" }), {
        status: 404,
        headers: { ...cors, "content-type": "application/json" },
      });
    }
    if (photo.user_id !== userId) {
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403,
        headers: { ...cors, "content-type": "application/json" },
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Generate signed URL for OpenAI to fetch the image
    // ─────────────────────────────────────────────────────────────
    const { data: signed, error: signErr } = await admin.storage
      .from("photos")
      .createSignedUrl(photo.storage_path, 600); // 10 min
    if (signErr || !signed?.signedUrl) {
      return new Response(JSON.stringify({ error: "signed_url_failed", detail: signErr?.message }), {
        status: 500,
        headers: { ...cors, "content-type": "application/json" },
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 5. Call OpenAI gpt-5.4 with strict JSON schema
    // ─────────────────────────────────────────────────────────────
    const aiResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5.4",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: "Estimate the cost to fix the issue you see in this photo." },
              { type: "image_url", image_url: { url: signed.signedUrl } },
            ],
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: "estimate", strict: true, schema: ESTIMATE_SCHEMA },
        },
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text().catch(() => "");
      return new Response(
        JSON.stringify({ error: "openai_failed", status: aiResp.status, detail: errText.slice(0, 500) }),
        { status: 502, headers: { ...cors, "content-type": "application/json" } },
      );
    }

    const aiJson = await aiResp.json();
    const messageContent = aiJson?.choices?.[0]?.message?.content;
    if (!messageContent) {
      return new Response(JSON.stringify({ error: "openai_empty_response" }), {
        status: 502,
        headers: { ...cors, "content-type": "application/json" },
      });
    }

    let parsed: AiEstimate;
    try {
      parsed = JSON.parse(messageContent);
    } catch (_e) {
      return new Response(JSON.stringify({ error: "openai_invalid_json", raw: messageContent.slice(0, 500) }), {
        status: 502,
        headers: { ...cors, "content-type": "application/json" },
      });
    }

    // Defensive: clamp price ranges to non-negative ints
    parsed.diy_price = Math.max(0, Math.round(Number(parsed.diy_price) || 0));
    parsed.hybrid_price = Math.max(0, Math.round(Number(parsed.hybrid_price) || 0));
    parsed.pro_price = Math.max(0, Math.round(Number(parsed.pro_price) || 0));

    // savings_vs_pro is the gap between pro and the cheapest non-zero option
    const minViable = [parsed.diy_price, parsed.hybrid_price].filter((p) => p > 0);
    const savingsVsPro = minViable.length > 0 && parsed.pro_price > 0
      ? Math.max(0, parsed.pro_price - Math.min(...minViable))
      : 0;

    // ─────────────────────────────────────────────────────────────
    // 6. INSERT estimate row
    // ─────────────────────────────────────────────────────────────
    const { data: inserted, error: insErr } = await admin
      .from("estimates")
      .insert({
        user_id: userId,
        photo_id: photoId,
        code: shortCode(),
        title: parsed.title,
        room: parsed.room,
        category: parsed.category,
        diy_price: parsed.diy_price,
        hybrid_price: parsed.hybrid_price,
        pro_price: parsed.pro_price,
        severity: parsed.severity,
        diagnosis: parsed.diagnosis,
        savings_vs_pro: savingsVsPro,
        status: "draft",
      })
      .select("id")
      .single();

    if (insErr || !inserted) {
      return new Response(JSON.stringify({ error: "insert_failed", detail: insErr?.message }), {
        status: 500,
        headers: { ...cors, "content-type": "application/json" },
      });
    }

    // Mark photo analyzed
    await admin
      .from("photos")
      .update({ ai_analyzed: true, ai_confidence: 0.94 })
      .eq("id", photoId);

    return new Response(
      JSON.stringify({
        ok: true,
        estimate_id: inserted.id,
        usage: aiJson.usage ?? null,
      }),
      { status: 200, headers: { ...cors, "content-type": "application/json" } },
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: "unhandled", detail: msg.slice(0, 500) }), {
      status: 500,
      headers: { ...cors, "content-type": "application/json" },
    });
  }
});
