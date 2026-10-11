import {
  ACAI_ORIGIN,
  ACAI_ORIGIN_EU,
  ACAI_ORIGIN_STAGING,
  ACAI_ORIGINS_MAP,
  ACAI_BACKGROUND_CAPTURE_SCRIPT_URL,
} from '../src/constants';

describe('constants re-exports from analytics-core', () => {
  test('should export ACAI_ORIGIN', () => {
    expect(ACAI_ORIGIN).toBe('https://app.acai.yourdomain.com');
  });

  test('should export ACAI_ORIGIN_EU', () => {
    expect(ACAI_ORIGIN_EU).toBe('https://app-eu.acai.yourdomain.com');
  });

  test('should export ACAI_ORIGIN_STAGING', () => {
    expect(ACAI_ORIGIN_STAGING).toBe('https://apps.stag2.acai.yourdomain.com');
  });

  test('should export ACAI_ORIGINS_MAP with all zones', () => {
    expect(ACAI_ORIGINS_MAP).toEqual({
      US: 'https://app.acai.yourdomain.com',
      EU: 'https://app-eu.acai.yourdomain.com',
      STAGING: 'https://apps.stag2.acai.yourdomain.com',
    });
  });

  test('should export ACAI_BACKGROUND_CAPTURE_SCRIPT_URL', () => {
    expect(typeof ACAI_BACKGROUND_CAPTURE_SCRIPT_URL).toBe('string');
    expect(ACAI_BACKGROUND_CAPTURE_SCRIPT_URL.length).toBeGreaterThan(0);
  });
});
