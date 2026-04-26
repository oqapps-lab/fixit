import { supabase } from '@/lib/supabase';

export type AnalyzePhotoResult = {
  ok: true;
  estimate_id: string;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number } | null;
};

export class AiAnalysisError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'AiAnalysisError';
  }
}

/**
 * Sends a photo_id to the analyze-photo Edge Function.
 * The function reads the image, calls gpt-5.4 with strict JSON schema,
 * inserts a draft estimate row and returns its id.
 */
export async function analyzePhoto(photoId: string): Promise<AnalyzePhotoResult> {
  const { data, error } = await supabase.functions.invoke<AnalyzePhotoResult | { error: string; detail?: string }>(
    'analyze-photo',
    { body: { photo_id: photoId } },
  );

  if (error) {
    throw new AiAnalysisError('invoke_failed', error.message);
  }
  if (!data || (data as { error?: string }).error) {
    const errCode = (data as { error?: string })?.error ?? 'unknown';
    const detail = (data as { detail?: string })?.detail ?? errCode;
    throw new AiAnalysisError(errCode, detail);
  }
  if (!('estimate_id' in data)) {
    throw new AiAnalysisError('malformed_response', 'No estimate_id in response');
  }
  return data;
}
