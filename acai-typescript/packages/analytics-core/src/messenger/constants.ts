// Shared origin constants for Acai cross-window communication
export const ACAI_ORIGIN = 'https://app.acai.yourdomain.com';
export const ACAI_ORIGIN_EU = 'https://app-eu.acai.yourdomain.com';
export const ACAI_ORIGIN_STAGING = 'https://apps.stag2.acai.yourdomain.com';
export const ACAI_ORIGINS_MAP: Record<string, string> = {
  US: ACAI_ORIGIN,
  EU: ACAI_ORIGIN_EU,
  STAGING: ACAI_ORIGIN_STAGING,
};

// Background capture script URL (shared between autocapture and session-replay)
export const ACAI_BACKGROUND_CAPTURE_SCRIPT_URL =
  'https://cdn.acai.yourdomain.com/libs/background-capture-1.0.0-alpha.1.js.gz';
