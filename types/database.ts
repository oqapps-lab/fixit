// FixIt Stage 07 — Supabase schema typings.
// Hand-written to mirror supabase/migrations/0001_init.sql exactly.

export type Severity = 'low' | 'moderate' | 'high';
export type ChosenMode = 'diy' | 'hybrid' | 'pro';
export type EstimateStatus = 'draft' | 'in-progress' | 'completed' | 'archived';
export type RoomKind = 'kitchen' | 'bath' | 'living' | 'bedroom' | 'exterior' | 'laundry' | 'garage' | 'attic';
export type CategoryKind = 'plumbing' | 'electrical' | 'walls' | 'appliance' | 'roof' | 'floor' | 'hvac';
export type SubscriptionPlan = 'free' | 'pro_monthly' | 'pro_yearly' | 'lifetime';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'grace';
export type NotificationTone = 'info' | 'success' | 'warn' | 'danger';
export type SeasonKind = 'spring' | 'summer' | 'fall' | 'winter';
export type HomeKind = 'house' | 'apartment' | 'condo' | 'townhouse' | 'other';

type Iso = string;
type Uuid = string;

export type ProfileRow = {
  id: Uuid;
  email: string | null;
  display_name: string | null;
  home_kind: HomeKind;
  home_year_built: number | null;
  home_zip: string | null;
  rooms: RoomKind[];
  referral_code: string | null;
  created_at: Iso;
  updated_at: Iso;
};

export type PhotoRow = {
  id: Uuid;
  user_id: Uuid;
  storage_path: string;
  caption: string | null;
  ai_analyzed: boolean;
  ai_confidence: number | null;
  captured_at: Iso;
  created_at: Iso;
};

export type EstimateRow = {
  id: Uuid;
  user_id: Uuid;
  photo_id: Uuid | null;
  code: string;
  title: string;
  room: RoomKind;
  category: CategoryKind;
  diy_price: number;
  hybrid_price: number;
  pro_price: number;
  chosen_mode: ChosenMode | null;
  actual_paid: number | null;
  severity: Severity;
  diagnosis: string;
  savings_vs_pro: number;
  status: EstimateStatus;
  is_saved: boolean;
  captured_at: Iso;
  created_at: Iso;
  updated_at: Iso;
};

export type RepairRoute = {
  key: 'diy' | 'hybrid' | 'pro';
  label: string;
  price: string;
  meta: string;
  recommended?: boolean;
};

export type RepairRow = {
  id: Uuid;
  user_id: Uuid;
  estimate_id: Uuid | null;
  code: string;
  title: string;
  status: string;
  summary: string | null;
  impact: string | null;
  impact_description: string | null;
  severity: Severity;
  time_estimate: string | null;
  time_unit: string | null;
  progress: number;
  stage_label: string | null;
  tools: string[];
  routes: RepairRoute[];
  created_at: Iso;
  updated_at: Iso;
};

export type RoomMetadataRow = {
  id: Uuid;
  user_id: Uuid;
  room: RoomKind;
  meta: Record<string, string>;
  last_inspected_at: Iso | null;
  created_at: Iso;
  updated_at: Iso;
};

export type MaintenanceTaskRow = {
  id: Uuid;
  user_id: Uuid;
  title: string;
  season: SeasonKind;
  due_date: string | null; // YYYY-MM-DD
  done_at: Iso | null;
  notes: string | null;
  created_at: Iso;
};

export type NotificationRow = {
  id: Uuid;
  user_id: Uuid;
  title: string;
  body: string | null;
  meta: string | null;
  tone: NotificationTone;
  read_at: Iso | null;
  created_at: Iso;
};

export type ReferralRow = {
  user_id: Uuid;
  invited_count: number;
  earned_count: number;
  updated_at: Iso;
};

export type SubscriptionRow = {
  user_id: Uuid;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  expires_at: Iso | null;
  adapty_profile_id: string | null;
  updated_at: Iso;
};

// ─────────────────────────────────────────────────────────────────────────────
// Database type for createClient<Database>
// ─────────────────────────────────────────────────────────────────────────────
type DefaultsOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '12';
  };
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: DefaultsOptional<ProfileRow, 'home_kind' | 'rooms' | 'created_at' | 'updated_at'>;
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      photos: {
        Row: PhotoRow;
        Insert: DefaultsOptional<
          PhotoRow,
          'id' | 'ai_analyzed' | 'ai_confidence' | 'caption' | 'captured_at' | 'created_at'
        >;
        Update: Partial<PhotoRow>;
        Relationships: [];
      };
      estimates: {
        Row: EstimateRow;
        Insert: DefaultsOptional<
          EstimateRow,
          'id' | 'severity' | 'savings_vs_pro' | 'status' | 'is_saved' | 'captured_at' | 'created_at' | 'updated_at'
        >;
        Update: Partial<EstimateRow>;
        Relationships: [];
      };
      repairs: {
        Row: RepairRow;
        Insert: DefaultsOptional<
          RepairRow,
          'id' | 'status' | 'severity' | 'progress' | 'tools' | 'routes' | 'created_at' | 'updated_at'
        >;
        Update: Partial<RepairRow>;
        Relationships: [];
      };
      room_metadata: {
        Row: RoomMetadataRow;
        Insert: DefaultsOptional<
          RoomMetadataRow,
          'id' | 'meta' | 'last_inspected_at' | 'created_at' | 'updated_at'
        >;
        Update: Partial<RoomMetadataRow>;
        Relationships: [];
      };
      maintenance_tasks: {
        Row: MaintenanceTaskRow;
        Insert: DefaultsOptional<MaintenanceTaskRow, 'id' | 'created_at'>;
        Update: Partial<MaintenanceTaskRow>;
        Relationships: [];
      };
      notifications: {
        Row: NotificationRow;
        Insert: DefaultsOptional<NotificationRow, 'id' | 'tone' | 'created_at'>;
        Update: Partial<NotificationRow>;
        Relationships: [];
      };
      referrals: {
        Row: ReferralRow;
        Insert: DefaultsOptional<ReferralRow, 'invited_count' | 'earned_count' | 'updated_at'>;
        Update: Partial<ReferralRow>;
        Relationships: [];
      };
      subscriptions: {
        Row: SubscriptionRow;
        Insert: DefaultsOptional<SubscriptionRow, 'plan' | 'status' | 'updated_at'>;
        Update: Partial<SubscriptionRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      severity: Severity;
      chosen_mode: ChosenMode;
      estimate_status: EstimateStatus;
      room_kind: RoomKind;
      category_kind: CategoryKind;
      subscription_plan: SubscriptionPlan;
      subscription_status: SubscriptionStatus;
      notification_tone: NotificationTone;
      season_kind: SeasonKind;
      home_kind: HomeKind;
    };
    CompositeTypes: Record<string, never>;
  };
};
