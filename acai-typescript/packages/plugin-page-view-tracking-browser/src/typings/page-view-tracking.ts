import { EnrichmentPlugin, PageTrackingOptions as Options } from '@acai/analytics-core';

export {
  PageTrackingOptions as Options,
  PageTrackingTrackOn,
  PageTrackingHistoryChanges,
} from '@acai/analytics-core';

export interface CreatePageViewTrackingPlugin {
  (options?: Options): EnrichmentPlugin;
}
