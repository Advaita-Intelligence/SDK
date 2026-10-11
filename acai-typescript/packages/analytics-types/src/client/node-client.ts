import { AcaiReturn } from '../acai-promise';
import { NodeConfig, NodeOptions } from '../config';
import { CoreClient } from './core-client';
import { Plugin } from '../plugin';

export interface NodeClient extends CoreClient {
  /**
   * Initializes the Acai SDK with your apiKey, optional configurations.
   * This method must be called before any other operations.
   *
   * ```typescript
   * await init(API_KEY, options).promise;
   * ```
   */
  init(apiKey: string, options?: NodeOptions): AcaiReturn<void>;

  /**
   * Adds a new plugin.
   *
   * ```typescript
   * const plugin = {
   *   name: 'my-plugin',
   *   type: 'enrichment',
   *   async setup(config: NodeConfig, acai: NodeClient) {
   *     return;
   *   },
   *   async execute(event: Event) {
   *     return event;
   *   },
   * };
   * acai.add(plugin);
   * ```
   */
  add(plugin: Plugin<NodeClient, NodeConfig>): AcaiReturn<void>;
}
