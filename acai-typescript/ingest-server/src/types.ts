// ─── Acai Ingest Server — Types ───────────────────────────────────────────────

export interface AcaiEvent {
  user_id?: string;
  device_id?: string;
  event_type: string;
  time?: number;
  event_properties?: Record<string, unknown>;
  user_properties?: Record<string, unknown>;
  groups?: Record<string, unknown>;
  app_version?: string;
  platform?: string;
  os_name?: string;
  os_version?: string;
  device_brand?: string;
  device_manufacturer?: string;
  device_model?: string;
  carrier?: string;
  country?: string;
  region?: string;
  city?: string;
  dma?: string;
  language?: string;
  price?: number;
  quantity?: number;
  revenue?: number;
  product_id?: string;
  revenue_type?: string;
  location_lat?: number;
  location_lng?: number;
  ip?: string;
  idfa?: string;
  idfv?: string;
  adid?: string;
  android_id?: string;
  event_id?: number;
  session_id?: number;
  insert_id?: string;
  library?: string;
  version_name?: string;
}

export interface IngestRequest {
  api_key: string;
  events: AcaiEvent[];
  options?: {
    min_id_length?: number;
  };
}

export interface IngestResponse {
  code: number;
  events_ingested?: number;
  payload_size_bytes?: number;
  server_upload_time?: number;
  error?: string;
  missing_field?: string;
}

export interface StoredEvent extends AcaiEvent {
  _id: string;
  _received_at: number;
  _project_id: string;
}
