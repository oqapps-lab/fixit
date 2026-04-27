export const SUPPORTED_COUNTRIES = [
  {
    code: 'US',
    name: 'United States',
    zipLabel: 'ZIP code',
    zipPlaceholder: '10001',
    zipHelpText: '5-digit ZIP',
  },
];

export function getSupportedCountry(countryCode) {
  return SUPPORTED_COUNTRIES.find((country) => country.code === countryCode) ?? SUPPORTED_COUNTRIES[0];
}

export function validatePostalCode(countryCode, value) {
  const normalized = typeof value === 'string' ? value.trim() : '';
  if (countryCode === 'US') {
    return /^[0-9]{5}$/.test(normalized);
  }
  return normalized.length > 0;
}

export function normalizePostalCode(countryCode, value) {
  const raw = typeof value === 'string' ? value : '';
  if (countryCode === 'US') {
    return raw.replace(/[^0-9]/g, '').slice(0, 5);
  }
  return raw.trim();
}
