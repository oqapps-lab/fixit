export type EstimateRoute = 'DIY' | 'Hybrid' | 'Pro';

export type EstimateRouteDetail = {
  route: EstimateRoute;
  price: string;
  meta: string;
  duration: string;
  summary: string;
};

export type EstimateMock = {
  id: string;
  title: string;
  verdict: { line1: string; line2: string };
  problem: string;
  diagnosedAt: string;
  savedVsPro: string;
  routes: EstimateRouteDetail[];
};

export const MOCK_FIRST_ESTIMATE: EstimateMock = {
  id: 'leaky-faucet-01',
  title: 'Leaky kitchen faucet',
  verdict: { line1: 'A leaky cartridge.', line2: 'An easy fix.' },
  problem: 'Dripping under-sink cartridge. Washer pack or quarter-turn likely.',
  diagnosedAt: '20 Apr 2026 · Denver, CO 80203',
  savedVsPro: '$165',
  routes: [
    {
      route: 'DIY',
      price: '$15',
      meta: '30 min · beginner',
      duration: '30m',
      summary: 'Replace cartridge washer pack. Basic tools, no shut-off to main.',
    },
    {
      route: 'Hybrid',
      price: '$45',
      meta: '45 min · you buy, pro fits',
      duration: '45m',
      summary: 'You buy the washer pack ($15); hourly handyman fits ($30).',
    },
    {
      route: 'Pro',
      price: '$180',
      meta: '2 hrs · licensed · 1-yr warranty',
      duration: '2h',
      summary: 'Licensed plumber · full inspection · 1-yr workmanship warranty.',
    },
  ],
};

export const MOCK_RECENT: Array<{ id: string; category: string; price: string; diagnosis: string; tint: 'sage' | 'peach' | 'coral' | 'lavender' }> = [
  { id: 'r-1', category: 'FAUCET',     price: '$15',  diagnosis: 'Leaky cartridge', tint: 'sage' },
  { id: 'r-2', category: 'TILE',       price: '$120', diagnosis: 'Hairline crack',  tint: 'peach' },
  { id: 'r-3', category: 'HINGE',      price: '$45',  diagnosis: 'Cabinet sag',     tint: 'lavender' },
  { id: 'r-4', category: 'DISHWASHER', price: '$200', diagnosis: 'Pump intake',     tint: 'coral' },
];
