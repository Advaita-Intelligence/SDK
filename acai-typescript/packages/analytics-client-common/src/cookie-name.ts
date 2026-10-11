import { ACAI_PREFIX } from '@acai/analytics-core';

export const getCookieName = (apiKey: string, postKey = '', limit = 10) => {
  return [ACAI_PREFIX, postKey, apiKey.substring(0, limit)].filter(Boolean).join('_');
};

export const getOldCookieName = (apiKey: string) => {
  return `${ACAI_PREFIX.toLowerCase()}_${apiKey.substring(0, 6)}`;
};
