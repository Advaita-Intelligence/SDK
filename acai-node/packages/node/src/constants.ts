import { Options, LogLevel } from '@acai/types';
export { version as SDK_VERSION } from '../package.json';
export const SDK_NAME = 'acai-node';
export const ACAI_SERVER_URL = 'https://YOUR_SERVER_URL_HERE/2/httpapi';
export const BASE_RETRY_TIMEOUT_DEPRECATED = 100;
export const BASE_RETRY_TIMEOUT_DEPRECATED_WARNING =
  'DEPRECATED. Please use retryTimeouts. It will be converted to retryTimeouts with exponential wait times (i.e. 100ms -> 200ms -> 400ms -> ...)';

export const REQUEST_TIMEOUT_MILLIS_DEFAULT = 10000;

export const DEFAULT_OPTIONS: Options = {
  serverUrl: ACAI_SERVER_URL,
  debug: false,
  maxCachedEvents: 16000,
  logLevel: LogLevel.None,
  optOut: false,
  retryTimeouts: [100, 100, 200, 200, 400, 400, 800, 800, 1600, 1600, 3200, 3200],
  retryClass: null,
  transportClass: null,
  uploadIntervalInSec: 0,
  minIdLength: null,
  onRetry: null,
  requestTimeoutMillis: REQUEST_TIMEOUT_MILLIS_DEFAULT,
};
