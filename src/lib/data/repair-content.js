import { supabase } from '@/lib/supabase/client';
const REPAIR_TEMPLATE_COLUMNS = `
  id,
  code,
  title,
  status,
  summary,
  impact,
  impact_description,
  severity,
  time_estimate,
  time_unit,
  progress,
  stage_label,
  tools,
  route_options_json
`;
const ACTIVITY_COLUMNS = `
  id,
  title,
  price,
  sort_order
`;
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
function isRouteKey(value) {
    return value === 'diy' || value === 'hybrid' || value === 'pro';
}
function parseRouteOptions(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.flatMap((item) => {
        if (!isRecord(item)) {
            return [];
        }
        const { key, label, price, meta, recommended } = item;
        if (!isRouteKey(key)) {
            return [];
        }
        if (typeof label !== 'string' || typeof price !== 'string' || typeof meta !== 'string') {
            return [];
        }
        const routeOption = { key, label, price, meta };
        if (typeof recommended === 'boolean') {
            routeOption.recommended = recommended;
        }
        return [routeOption];
    });
}
function parseSeverity(value) {
    if (value === 'low' || value === 'moderate' || value === 'high') {
        return value;
    }
    return 'low';
}
function mapRepairTemplate(row) {
    return {
        id: row.id,
        code: row.code,
        title: row.title,
        status: row.status,
        summary: row.summary,
        impact: row.impact,
        impactDescription: row.impact_description,
        severity: parseSeverity(row.severity),
        timeEstimate: row.time_estimate,
        timeUnit: row.time_unit,
        progress: row.progress,
        stageLabel: row.stage_label,
        tools: row.tools,
        routes: parseRouteOptions(row.route_options_json),
    };
}
function mapRepairActivity(row) {
    return {
        id: row.id,
        title: row.title,
        price: row.price,
        sortOrder: row.sort_order,
    };
}
export async function getRepairTemplateById(id) {
    const { data, error } = await supabase
        .from('repair_templates')
        .select(REPAIR_TEMPLATE_COLUMNS)
        .eq('id', id)
        .maybeSingle();
    if (error !== null) {
        throw new Error(`Failed to load repair template ${id}: ${error.message}`);
    }
    if (data === null) {
        return null;
    }
    return mapRepairTemplate(data);
}
export async function getDefaultRepairTemplate() {
    const { data, error } = await supabase
        .from('repair_templates')
        .select(REPAIR_TEMPLATE_COLUMNS)
        .order('id', { ascending: true })
        .limit(1)
        .maybeSingle();
    if (error !== null) {
        throw new Error(`Failed to load default repair template: ${error.message}`);
    }
    if (data === null) {
        return null;
    }
    return mapRepairTemplate(data);
}
export async function listRecentActivities() {
    const { data, error } = await supabase
        .from('repair_activities')
        .select(ACTIVITY_COLUMNS)
        .order('sort_order', { ascending: true });
    if (error !== null) {
        throw new Error(`Failed to load repair activities: ${error.message}`);
    }
    if (data === null) {
        return [];
    }
    return data.map(mapRepairActivity);
}
