import { EnrichmentPlugin, Event } from '@acai/analytics-types';
import { GlobalUserPropertiesPlugin, Options } from './typings/global-user-properties';
import { isAcaiIdentifyEvent, isTrackEvent } from './helpers';

export const globalUserPropertiesPlugin: GlobalUserPropertiesPlugin = function (options: Options = {}) {
  const plugin: EnrichmentPlugin = {
    name: '@acai/plugin-global-user-properties',
    type: 'enrichment',

    /* Note: The promise is because of the interface, not because this has any asynchronous behavior */
    execute: async (event: Event): Promise<Event> => {
      if (!isTrackEvent(event) && !isAcaiIdentifyEvent(event)) {
        return event;
      }

      let globalUserProperties = event.user_properties;
      if (options.propertyTransform && globalUserProperties) {
        globalUserProperties = options.propertyTransform(globalUserProperties);
      }

      if (!globalUserProperties) {
        return event;
      }

      event.global_user_properties = globalUserProperties;

      if (!options.shouldKeepOriginalUserProperties) {
        delete event.user_properties;
      }

      return event;
    },
  };

  return plugin;
};
