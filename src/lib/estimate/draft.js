const draft = {
  photoUri: null,
  photoMimeType: null,
  photoBase64: null,
  countryCode: 'US',
  zipCode: '',
  qualityTier: 'standard',
  diyComfort: 'basic',
  analysis: null,
  estimateRecordId: null,
  requiresSubscription: false,
  errorMessage: null,
};

export function getEstimateDraft() {
  return draft;
}

export function setEstimatePhoto({ uri, mimeType, base64 }) {
  draft.photoUri = uri;
  draft.photoMimeType = mimeType ?? null;
  draft.photoBase64 = typeof base64 === 'string' && base64.length > 0 ? base64 : null;
}

export function setEstimateContext({ countryCode, zipCode, qualityTier, diyComfort }) {
  if (typeof countryCode === 'string' && countryCode.length > 0) {
    draft.countryCode = countryCode;
  }
  if (typeof zipCode === 'string') {
    draft.zipCode = zipCode;
  }
  if (typeof qualityTier === 'string' && qualityTier.length > 0) {
    draft.qualityTier = qualityTier;
  }
  if (typeof diyComfort === 'string' && diyComfort.length > 0) {
    draft.diyComfort = diyComfort;
  }
}

export function setEstimateResult({ analysis, estimateRecordId, requiresSubscription }) {
  draft.analysis = analysis;
  draft.estimateRecordId = estimateRecordId ?? null;
  draft.requiresSubscription = requiresSubscription;
  draft.errorMessage = null;
}

export function setEstimateError(message) {
  draft.errorMessage = message;
}

export function resetEstimateDraft() {
  draft.photoUri = null;
  draft.photoMimeType = null;
  draft.photoBase64 = null;
  draft.countryCode = 'US';
  draft.zipCode = '';
  draft.qualityTier = 'standard';
  draft.diyComfort = 'basic';
  draft.analysis = null;
  draft.estimateRecordId = null;
  draft.requiresSubscription = false;
  draft.errorMessage = null;
}
