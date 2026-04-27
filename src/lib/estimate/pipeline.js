import * as FileSystem from 'expo-file-system';
import { decode as decodeBase64 } from 'base64-arraybuffer';
import { supabase } from '@/lib/supabase/client';
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

async function uploadPhotoForAnalysis({ photoUri, photoMimeType, actorId }) {
  const mimeType = inferMimeType(photoUri, photoMimeType);
  const extension = inferFileExtension(mimeType);
  const base64Data = await FileSystem.readAsStringAsync(photoUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const arrayBuffer = decodeBase64(base64Data);

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
  countryCode,
  zipCode,
  qualityTier,
  diyComfort,
}) {
  const actorId = await getCurrentUserId();
  const upload = await uploadPhotoForAnalysis({
    photoUri,
    photoMimeType,
    actorId,
  });
  const trustedSources = getTrustedPriceSources({
    countryCode,
    zipCode,
  });

  const { data, error } = await supabase.functions.invoke('analyze-issue', {
    body: {
      storagePath: upload.storagePath,
      mimeType: upload.mimeType,
      zipCode,
      countryCode,
      qualityTier,
      diyComfort,
      trustedSources,
    },
  });

  if (error !== null) {
    throw new Error(`Analysis function failed: ${error.message}`);
  }

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
