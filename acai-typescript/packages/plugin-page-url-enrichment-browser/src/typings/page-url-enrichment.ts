import type { EnrichmentPlugin, PageUrlEnrichmentOptions as Options } from '@acai/analytics-core';

export type { PageUrlEnrichmentOptions as Options } from '@acai/analytics-core';

export interface CreatePageUrlEnrichmentBrowserPlugin {
  (options?: Options): EnrichmentPlugin;
}
