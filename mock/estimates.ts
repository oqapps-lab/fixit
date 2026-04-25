import type { Severity } from './repair';

export type ChosenMode = 'diy' | 'hybrid' | 'pro';
export type EstimateStatus = 'draft' | 'in-progress' | 'completed' | 'archived';
export type Room = 'kitchen' | 'bath' | 'living' | 'bedroom' | 'exterior' | 'laundry' | 'garage' | 'attic';
export type Category = 'plumbing' | 'electrical' | 'walls' | 'appliance' | 'roof' | 'floor' | 'hvac';

export type Estimate = {
  id: string;
  code: string;
  title: string;
  room: Room;
  category: Category;
  diyPrice: number;
  hybridPrice: number;
  proPrice: number;
  chosenMode: ChosenMode | null;
  actualPaid: number | null;
  severity: Severity;
  capturedAt: string; // ISO date
  status: EstimateStatus;
  diagnosis: string;
  savingsVsPro: number; // amount user saved vs calling a pro blind
};

export const MOCK_ESTIMATES: Estimate[] = [
  {
    id: 'est-001',
    code: 'EST-2026-0421-RL',
    title: 'Roof Leak — NW Quadrant',
    room: 'attic',
    category: 'roof',
    diyPrice: 15,
    hybridPrice: 45,
    proPrice: 450,
    chosenMode: 'hybrid',
    actualPaid: null,
    severity: 'moderate',
    capturedAt: '2026-04-21T14:08:00Z',
    status: 'in-progress',
    diagnosis: 'Structural breach in NW quadrant. Sub-layer moisture penetration. Patch repair viable.',
    savingsVsPro: 405,
  },
  {
    id: 'est-002',
    code: 'EST-2026-0418-AM',
    title: 'Attic Moisture Sensor Alert',
    room: 'attic',
    category: 'roof',
    diyPrice: 35,
    hybridPrice: 80,
    proPrice: 220,
    chosenMode: null,
    actualPaid: null,
    severity: 'low',
    capturedAt: '2026-04-18T10:22:00Z',
    status: 'draft',
    diagnosis: 'Humidity reading 12% above seasonal norm. Likely ventilation — monitor first.',
    savingsVsPro: 0,
  },
  {
    id: 'est-003',
    code: 'EST-2026-0402-TG',
    title: 'Bathroom Tile Grout',
    room: 'bath',
    category: 'walls',
    diyPrice: 32,
    hybridPrice: 120,
    proPrice: 320,
    chosenMode: 'diy',
    actualPaid: 28,
    severity: 'low',
    capturedAt: '2026-04-02T19:47:00Z',
    status: 'completed',
    diagnosis: 'Grout haze + minor lift along tub edge. Regrouting + re-caulk resolves.',
    savingsVsPro: 292,
  },
  {
    id: 'est-004',
    code: 'EST-2026-0325-TR',
    title: 'Kitchen Tap Replacement',
    room: 'kitchen',
    category: 'plumbing',
    diyPrice: 145,
    hybridPrice: 220,
    proPrice: 380,
    chosenMode: 'diy',
    actualPaid: 145,
    severity: 'low',
    capturedAt: '2026-03-25T08:15:00Z',
    status: 'completed',
    diagnosis: 'Single-lever cartridge fatigued. Swap with direct replacement, 30–40 min.',
    savingsVsPro: 235,
  },
  {
    id: 'est-005',
    code: 'EST-2026-0310-HG',
    title: 'Living Room Hinge',
    room: 'living',
    category: 'walls',
    diyPrice: 8,
    hybridPrice: 40,
    proPrice: 95,
    chosenMode: 'diy',
    actualPaid: 8,
    severity: 'low',
    capturedAt: '2026-03-10T13:05:00Z',
    status: 'completed',
    diagnosis: 'Lower hinge pin walked out. Replace pin, align door, re-torque.',
    savingsVsPro: 87,
  },
  {
    id: 'est-006',
    code: 'EST-2026-0228-DW',
    title: 'Dishwasher Pump Failure',
    room: 'kitchen',
    category: 'appliance',
    diyPrice: 75,
    hybridPrice: 180,
    proPrice: 340,
    chosenMode: 'hybrid',
    actualPaid: 175,
    severity: 'moderate',
    capturedAt: '2026-02-28T09:30:00Z',
    status: 'completed',
    diagnosis: 'Drain pump seizing under load. Part swap straightforward; hose-work is trickier.',
    savingsVsPro: 165,
  },
];

export function totalSavings(estimates: Estimate[] = MOCK_ESTIMATES): number {
  return estimates.reduce((acc, e) => acc + (e.savingsVsPro ?? 0), 0);
}

export function formatCapturedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
