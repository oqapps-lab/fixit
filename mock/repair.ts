export type Severity = 'low' | 'moderate' | 'high';

export type RouteOption = {
  key: 'diy' | 'hybrid' | 'pro';
  label: string;
  price: string;
  meta: string;
  recommended?: boolean;
};

export type Repair = {
  id: string;
  code: string;
  title: string;
  status: string;
  summary: string;
  impact: string;
  impactDescription: string;
  severity: Severity;
  timeEstimate: string;
  timeUnit: string;
  progress: number;
  stageLabel: string;
  tools: string[];
  routes: RouteOption[];
};

export const REPAIR_ROOF_LEAK: Repair = {
  id: 'rp-002',
  code: 'REF: RP-002',
  title: 'Roof Leak',
  status: 'Active Repair',
  summary:
    'Structural breach identified in North-West quadrant. Moisture penetration detected in sub-layer.',
  impact: '$450',
  impactDescription:
    'Calculated based on local material costs and standard labor rates for a localized patch repair.',
  severity: 'moderate',
  timeEstimate: '4-6',
  timeUnit: 'Hours',
  progress: 0.35,
  stageLabel: 'STAGE 1 OF 1 · 35% IN PROGRESS',
  tools: ['Sealant', 'Ladder', 'Trowel'],
  routes: [
    { key: 'diy', label: 'DIY', price: '$15', meta: 'DIY · 15 MIN' },
    { key: 'hybrid', label: 'Hybrid', price: '$45', meta: 'HYBRID · 45 MIN', recommended: true },
    { key: 'pro', label: 'Full Pro', price: '$180', meta: 'FULL PRO · 2 HOURS' },
  ],
};

export type Alert = {
  id: string;
  title: string;
  meta: string;
  tone: 'info' | 'success' | 'warn';
};

export const MOCK_ALERTS: Alert[] = [
  { id: 'a1', title: 'Attic Moisture Detected', meta: 'SENSOR 04 · 12 MINS AGO', tone: 'info' },
  { id: 'a2', title: 'HVAC Filter Optimal',     meta: 'SYSTEM CHECK · 2 HRS AGO', tone: 'success' },
];

export const MOCK_ACTIVITIES = [
  { id: 'k-1', title: 'Kitchen Tap Replacement', price: '$145.00' },
  { id: 'k-2', title: 'Bathroom Tile Grout',    price: '$320.00' },
  { id: 'k-3', title: 'Living Room Hinge',      price: '$  55.00' },
];
