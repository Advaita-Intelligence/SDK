import { Event } from '../event';
import { IngestionMetadata } from '../ingestion-metadata';
import { Plan } from '../plan';
import { ServerZoneType } from '../server-zone';
import { Storage } from '../storage';
import { Transport } from '../transport';
import { Logger, LogLevel } from '../logger';
import { OfflineDisabled } from '../offline';

export interface Config {
  /**
   * Your Acai Project API key.
   */
  apiKey: string;
  /**
   * The interval of uploading events to Acai in milliseconds.
   */
  flushIntervalMillis: number;
  /**
   * The maximum number of retries for failed upload attempts. This is only applicable to retryable errors.
   */
  flushMaxRetries: number;
  /**
   * The maximum number of events that are batched in a single upload attempt.
   */
  flushQueueSize: number;
  /**
   * The instance name. For tracking events to multiple Acai projects in your application.
   */
  instanceName?: string;
  /**
   * Level of logs to be printed in the developer console.
   * Valid values are `LogLevel.None`, `LogLevel.Error`, `LogLevel.Warn`, `LogLevel.Verbose`,  `LogLevel.Debug`
   */
  logLevel: LogLevel;
  /**
   * A custom Logger class to emit log messages to desired destination.
   */
  loggerProvider: Logger;
  /**
   * The minimum length for the value of userId and deviceId properties.
   */
  minIdLength?: number;
  /**
   * Whether the SDK is connected to network.
   */
  offline?: boolean | typeof OfflineDisabled;
  /**
   *  The flag to opt this device out of Acai tracking.
   *  If this flag is set, no additional information will be stored for the user.
   */
  optOut: boolean;
  /**
   * Tracking plan properties.
   * Acai internal use.
   */
  plan?: Plan;
  /**
   * Ingestion metadata.
   * Acai internal use.
   */
  ingestionMetadata?: IngestionMetadata;
  /**
   * The URL where events are upload to.
   */
  serverUrl?: string;
  /**
   * The Acai server zone.
   * Set this to EU for Acai projects created in EU data center.
   */
  serverZone?: ServerZoneType;
  /**
   *  The storage provider to persist unsent events.
   */
  storageProvider?: Storage<Event[]>;
  /**
   * A customer Transport Class for sending data to a server.
   */
  transportProvider: Transport;
  /**
   * The flag of whether to upload events to Batch API instead of the default HTTP V2 API.
   */
  useBatch: boolean;
  /**
   * Metrics of the SDK.
   */
  requestMetadata?: RequestMetadata;
}

export interface RequestMetadata {
  sdk: {
    metrics: {
      histogram: HistogramOptions;
    };
  };

  recordHistogram<T extends HistogramKey>(key: T, value: HistogramOptions[T]): void;
}

export interface HistogramOptions {
  remote_config_fetch_time_IDB?: number;
  remote_config_fetch_time_API_success?: number;
  remote_config_fetch_time_API_fail?: number;
}

export type HistogramKey = keyof HistogramOptions;

export interface Options extends Partial<Config> {
  apiKey: string;
  transportProvider: Transport;
}
