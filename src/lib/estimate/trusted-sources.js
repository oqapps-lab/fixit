const TRUSTED_PRICE_SOURCE_CATALOG = [
  {
    name: 'Home Depot',
    domain: 'homedepot.com',
    url: 'https://www.homedepot.com',
    notes: 'US national materials pricing',
    countries: ['US'],
  },
  {
    name: "Lowe's",
    domain: 'lowes.com',
    url: 'https://www.lowes.com',
    notes: 'US national materials pricing',
    countries: ['US'],
  },
  {
    name: 'Ace Hardware',
    domain: 'acehardware.com',
    url: 'https://www.acehardware.com',
    notes: 'US national materials pricing',
    countries: ['US'],
  },
  {
    name: 'U.S. Bureau of Labor Statistics',
    domain: 'bls.gov',
    url: 'https://www.bls.gov',
    notes: 'US labor rate context',
    countries: ['US'],
  },
  {
    name: 'NYC Department of Buildings',
    domain: 'nyc.gov',
    url: 'https://www.nyc.gov/site/buildings/index.page',
    notes: 'NYC permit and local compliance context',
    countries: ['US'],
    zipPrefixes: ['100', '101', '102', '103', '104', '111', '112', '113', '114', '116'],
  },
  {
    name: 'San Francisco Department of Building Inspection',
    domain: 'sf.gov',
    url: 'https://sf.gov/departments/department-building-inspection',
    notes: 'San Francisco code and permit context',
    countries: ['US'],
    zipPrefixes: ['941'],
  },
];

function sourceMatchesCountry(source, countryCode) {
  if (!Array.isArray(source.countries) || source.countries.length === 0) {
    return true;
  }
  return source.countries.includes(countryCode);
}

function sourceMatchesZip(source, zipCode) {
  if (!Array.isArray(source.zipPrefixes) || source.zipPrefixes.length === 0) {
    return true;
  }

  if (typeof zipCode !== 'string' || zipCode.length === 0) {
    return false;
  }

  return source.zipPrefixes.some((prefix) => zipCode.startsWith(prefix));
}

function toInvokePayload(source) {
  return {
    name: source.name,
    domain: source.domain,
    url: source.url,
    notes: source.notes,
  };
}

export function getTrustedPriceSources({ countryCode, zipCode }) {
  const resolvedCountryCode = typeof countryCode === 'string' && countryCode.length > 0 ? countryCode : 'US';
  const resolvedZipCode = typeof zipCode === 'string' ? zipCode : '';

  return TRUSTED_PRICE_SOURCE_CATALOG
    .filter((source) => sourceMatchesCountry(source, resolvedCountryCode))
    .filter((source) => sourceMatchesZip(source, resolvedZipCode))
    .map(toInvokePayload);
}
