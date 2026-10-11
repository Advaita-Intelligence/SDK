import { WebAttribution, isNewCampaign, isNewSession } from '@acai/analytics-client-common';
import { BeforePlugin, BrowserClient, BrowserConfig, Event } from '@acai/analytics-types';
import { CreateWebAttributionPlugin, Options } from './typings/web-attribution';

/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment */

/**
 * @deprecated
 * This plugin is not used by @acai/analytics-browser and
 * is replaced by WebAttribution in @acai/analytics-client-common to
 * be able to send identify events before session start.
 */
export const webAttributionPlugin: CreateWebAttributionPlugin = function (options: Options = {}) {
  const plugin: BeforePlugin = {
    name: '@acai/plugin-web-attribution-browser',
    type: 'before',

    setup: async function (config: BrowserConfig, acai: BrowserClient) {
      const webAttribution = new WebAttribution(options, config);
      await webAttribution.init();

      const pluginConfig = webAttribution.options;
      const currentCampaign = webAttribution.currentCampaign;
      const previousCampaign = webAttribution.previousCampaign;

      const isEventInNewSession = isNewSession(config.sessionTimeout, config.lastEventTime);

      if (isNewCampaign(currentCampaign, previousCampaign, pluginConfig, config.loggerProvider, isEventInNewSession)) {
        if (pluginConfig.resetSessionOnNewCampaign) {
          acai.setSessionId(Date.now());
          config.loggerProvider.log('Created a new session for new campaign.');
        }
        config.loggerProvider.log('Tracking attribution.');
        const campaignEvent = webAttribution.generateCampaignEvent();
        acai.track(campaignEvent);
      }
    },

    execute: async (event: Event) => event,
  };

  return plugin;
};
