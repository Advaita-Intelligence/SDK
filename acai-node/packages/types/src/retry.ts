import { Event } from './event';
import { Response } from './response';

/** Layer used to send data to Acai while retrying throttled events in the right order.  */
export interface Retry {
  /**
   * Send the events payload to Acai, and retry the events that failed on a loop.
   *
   * @param events The events that should be sent to Acai.
   */
  sendEventsWithRetry(events: readonly Event[]): Promise<Response>;
}

/**
 * @deprecated a poor naming of an interface that should be implemented, NOT a class to extend.
 */
export type RetryClass = Retry;
