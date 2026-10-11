import { BrowserErrorEvent } from '../observables';
import { AllWindowObservables } from '../frustration-plugin';
import {
  ElementBasedTimestampedEvent,
  filterOutNonTrackableEvents,
  MouseButton,
  shouldTrackEvent,
  TimestampedEvent,
} from '../helpers';
import { BrowserClient, merge } from '@acai/analytics-core';
import { ACAI_ELEMENT_ERROR_CLICKED_EVENT } from '../constants';

type ClickOrErrorEvent = ElementBasedTimestampedEvent<MouseEvent> | TimestampedEvent<BrowserErrorEvent>;

const ERROR_CLICK_TIMEOUT = 2_000; // 2 seconds to wait for an error to happen

export function trackErrorClicks({
  acai,
  allObservables,
  shouldTrackErrorClick,
}: {
  acai: BrowserClient;
  allObservables: AllWindowObservables;
  shouldTrackErrorClick: shouldTrackEvent;
}) {
  const { clickObservable, browserErrorObservable } = allObservables;

  const filteredClickObservable = clickObservable.filter((click) => {
    return (
      filterOutNonTrackableEvents(click) &&
      shouldTrackErrorClick('click', click.closestTrackedAncestor) &&
      click.event.target instanceof Element &&
      click.event.target.closest('a[target="_blank"]') === null &&
      click.event.button === MouseButton.LEFT_OR_TOUCH_CONTACT
    );
  });

  let errorClickTimer: ReturnType<typeof setTimeout> | null = null;
  let latestClickEvent: ElementBasedTimestampedEvent<MouseEvent> | null = null;

  const clearClickTimer = () => {
    if (errorClickTimer !== null) {
      clearTimeout(errorClickTimer);
      errorClickTimer = null;
    }
    latestClickEvent = null;
  };

  return merge(filteredClickObservable, browserErrorObservable).subscribe((event: ClickOrErrorEvent) => {
    if (event.type === 'click') {
      clearClickTimer();
      latestClickEvent = event as ElementBasedTimestampedEvent<MouseEvent>;
      errorClickTimer = setTimeout(clearClickTimer, ERROR_CLICK_TIMEOUT);
      return;
    }

    if (event.type === 'error' && latestClickEvent) {
      acai.track(ACAI_ELEMENT_ERROR_CLICKED_EVENT, {
        ['[Acai] Kind']: event.event.kind,
        ['[Acai] Message']: event.event.message,
        ['[Acai] Stack']: event.event.stack,
        ['[Acai] Filename']: event.event.filename,
        ['[Acai] Line Number']: event.event.lineNumber,
        ['[Acai] Column Number']: event.event.columnNumber,
        ...latestClickEvent.targetElementProperties,
      });
      clearClickTimer();
    }
  });
}
