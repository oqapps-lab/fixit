import * as FileSystem from 'expo-file-system';
import { decode as decodeBase64 } from 'base64-arraybuffer';
import { supabase } from '@/lib/supabase/client';
import { env } from '@/lib/config/env';
import { getCurrentUserId } from '@/lib/auth/supabase-auth';
import { incrementEstimateCount, getSubscriptionPlaceholderState } from '@/lib/subscription/placeholder';
import { getTrustedPriceSources } from '@/lib/estimate/trusted-sources';

function inferMimeType(uri, declaredMimeType) {
  if (typeof declaredMimeType === 'string' && declaredMimeType.startsWith('image/')) {
    return declaredMimeType;
  }

  const normalized = uri.toLowerCase();
  if (normalized.endsWith('.png')) {
    return 'image/png';
  }
  if (normalized.endsWith('.webp')) {
    return 'image/webp';
  }
  return 'image/jpeg';
}

function inferFileExtension(mimeType) {
  if (mimeType === 'image/png') {
    return 'png';
  }
  if (mimeType === 'image/webp') {
    return 'webp';
  }
  return 'jpg';
}

async function toUploadArrayBuffer({ photoUri, photoBase64 }) {
  if (typeof photoBase64 === 'string' && photoBase64.length > 0) {
    return decodeBase64(photoBase64);
  }

  if (typeof photoUri !== 'string' || photoUri.length === 0) {
    throw new Error('Photo URI is missing.');
  }

  const fileInfo = await FileSystem.getInfoAsync(photoUri, { size: false });
  if (fileInfo.exists !== true) {
    throw new Error(`Selected photo is not accessible: ${photoUri}`);
  }

  const base64Data = await FileSystem.readAsStringAsync(photoUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return decodeBase64(base64Data);
}

async function uploadPhotoForAnalysis({ photoUri, photoMimeType, photoBase64, actorId }) {
  const mimeType = inferMimeType(photoUri, photoMimeType);
  const extension = inferFileExtension(mimeType);
  const arrayBuffer = await toUploadArrayBuffer({
    photoUri,
    photoBase64,
  });

  const idSegment = typeof actorId === 'string' && actorId.length > 0 ? actorId : 'anonymous';
  const storagePath = `uploads/${idSegment}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extension}`;
  const { error } = await supabase.storage.from('project-photos').upload(storagePath, arrayBuffer, {
    contentType: mimeType,
    upsert: false,
  });

  if (error !== null) {
    throw new Error(`Photo upload failed: ${error.message}`);
  }

  return { storagePath, mimeType };
}

async function invokeAnalyzeIssue(payload) {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData?.session?.access_token ?? env.supabase.publishableKey;

  const response = await fetch(`${env.supabase.url}/functions/v1/analyze-issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: env.supabase.publishableKey,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const rawText = await response.text();
  let parsedBody = null;
  try {
    parsedBody = JSON.parse(rawText);
  } catch {
    parsedBody = null;
  }

  if (!response.ok) {
    const remoteMessage = typeof parsedBody?.error === 'string' && parsedBody.error.length > 0
      ? parsedBody.error
      : rawText;
    const fallbackStatus = `HTTP ${response.status} ${response.statusText}`;
    throw new Error(remoteMessage.length > 0 ? remoteMessage : fallbackStatus);
  }

  if (typeof parsedBody !== 'object' || parsedBody === null) {
    throw new Error('Function returned invalid JSON.');
  }

  return parsedBody;
}

function normalizeAnalysisPayload(payload) {
  const issueCategory = typeof payload?.issueCategory === 'string' ? payload.issueCategory : 'Unknown issue';
  const summary = typeof payload?.summary === 'string' ? payload.summary : 'Analysis unavailable.';
  const severity = typeof payload?.severity === 'string' ? payload.severity : 'moderate';
  const confidence = typeof payload?.confidence === 'number' ? payload.confidence : 0;
  const priceGuidance = Array.isArray(payload?.priceGuidance) ? payload.priceGuidance : [];
  const trustedSourcesUsed = Array.isArray(payload?.trustedSourcesUsed) ? payload.trustedSourcesUsed : [];
  const nextSteps = Array.isArray(payload?.nextSteps) ? payload.nextSteps : [];

  return {
    issueCategory,
    summary,
    severity,
    confidence,
    priceGuidance,
    trustedSourcesUsed,
    nextSteps,
  };
}

export async function runEstimatePipeline({
  photoUri,
  photoMimeType,
  photoBase64,
  countryCode,
  zipCode,
  qualityTier,
  diyComfort,
}) {
  const actorId = await getCurrentUserId();
  const upload = await uploadPhotoForAnalysis({
    photoUri,
    photoMimeType,
    photoBase64,
    actorId,
  });
  const trustedSources = getTrustedPriceSources({
    countryCode,
    zipCode,
  });

  const data = await invokeAnalyzeIssue({
    storagePath: upload.storagePath,
    mimeType: upload.mimeType,
    zipCode,
    countryCode,
    qualityTier,
    diyComfort,
    trustedSources,
  });

  const normalized = normalizeAnalysisPayload(data?.analysis);
  const estimateRecordId = typeof data?.estimateRecordId === 'string' ? data.estimateRecordId : null;

  await incrementEstimateCount();
  const subscription = await getSubscriptionPlaceholderState();

  return {
    analysis: normalized,
    estimateRecordId,
    requiresSubscription: subscription.requiresSubscription,
  };
}
