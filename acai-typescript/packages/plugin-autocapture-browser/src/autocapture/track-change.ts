import { AllWindowObservables } from '../autocapture-plugin';
import {
  filterOutNonTrackableEvents,
  shouldTrackEvent,
  ElementBasedTimestampedEvent,
  type evaluateTriggersFn,
} from '../helpers';
import { BrowserClient, ActionType } from '@acai/analytics-core';
import { ACAI_ELEMENT_CHANGED_EVENT } from '../constants';

export function trackChange({
  acai,
  allObservables,
  getEventProperties,
  shouldTrackEvent,
  evaluateTriggers,
}: {
  acai: BrowserClient;
  allObservables: AllWindowObservables;
  getEventProperties: (actionType: ActionType, element: Element) => Record<string, any>;
  shouldTrackEvent: shouldTrackEvent;
  evaluateTriggers: evaluateTriggersFn;
}) {
  const { changeObservable } = allObservables;

  const filteredChangeObservable = changeObservable
    .filter(filterOutNonTrackableEvents)
    .filter((changeEvent: ElementBasedTimestampedEvent<Event>) => {
      // Only track change on elements that should be tracked,
      return shouldTrackEvent('change', changeEvent.closestTrackedAncestor);
    })
    .map((changeEvent) => evaluateTriggers(changeEvent));

  return filteredChangeObservable.subscribe((changeEvent) => {
    /* istanbul ignore next */
    acai?.track(ACAI_ELEMENT_CHANGED_EVENT, getEventProperties('change', changeEvent.closestTrackedAncestor));
  });
}
