import { ACAI_PREFIX } from '../types/constants';

export const getStorageKey = (apiKey: string, postKey = '', limit = 10) => {
  return [ACAI_PREFIX, postKey, apiKey.substring(0, limit)].filter(Boolean).join('_');
};
