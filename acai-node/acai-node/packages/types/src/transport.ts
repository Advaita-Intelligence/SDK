import { Event } from './event';
import { Response } from './response';

/**
 * Acai request payload options.
 */

export interface PayloadOptions {
  min_id_length?: number;
}

/**
 * Acai request payload definition.
 */
export interface Payload extends PayloadOptions {
  api_key: string;
  events: readonly Event[];
  options?: PayloadOptions;
}

/** Transport used sending data to Acai */
export interface Transport {
  /**
   * Send the events payload to Acai.
   *
   * @param payload Payload with events that should be sent to Acai.
   */
  sendPayload(payload: Payload): Promise<Response>;
}

/** JSDoc */
export interface TransportOptions {
  /** Server path destination. */
  serverUrl: string;
  /** Define custom headers */
  headers: { [key: string]: string };
  /** Configurable request timeout */
  requestTimeoutMillis?: number;
}
