# Acai TypeScript SDK

Acai analytics SDK for Web, Node.js and React Native, written in TypeScript. Events are sent to your own Acai ingest server.

For installation, quick start and usage, see [`acai-typescript/README.md`](./acai-typescript/README.md).

## Repository layout

| Path | Description |
|---|---|
| [`acai-typescript/`](./acai-typescript) | Workspace root files: `package.json`, `pnpm-workspace.yaml`, `lerna.json`, `nx.json`, root `tsconfig.json`, and the main README |
| [`packages/`](./packages) | SDK packages and plugins (see below) |
| [`examples/`](./examples) | Example apps for the browser, plugins and React Native |
| [`ingest-server/`](./ingest-server) | Reference ingest server for receiving events |
| [`test-server/`](./test-server) | Static pages and mock API for manual browser testing |
| [`example-proxy/`](./example-proxy) | Example proxy server for forwarding events |
| [`scripts/`](./scripts) | Build, version and publish helpers |
| `tsconfig.json` | Thin config that extends `./acai-typescript/tsconfig.json`, so packages can extend `../../tsconfig.json` |

## Packages

### SDKs

| Package | Description |
|---|---|
| [`@acai/analytics-browser`](./packages/analytics-browser) | Browser SDK |
| [`@acai/analytics-node`](./packages/analytics-node) | Node.js SDK |
| [`@acai/analytics-react-native`](./packages/analytics-react-native) | React Native SDK |
| [`@acai/session-replay-react-native`](./packages/session-replay-react-native) | Session replay for React Native |

### Shared libraries

| Package | Description |
|---|---|
| [`@acai/analytics-core`](./packages/analytics-core) | Shared core logic |
| [`@acai/analytics-types`](./packages/analytics-types) | Shared TypeScript types |
| [`@acai/analytics-client-common`](./packages/analytics-client-common) | Code shared by client SDKs |

### Plugins

| Package | Description |
|---|---|
| [`@acai/plugin-autocapture-browser`](./packages/plugin-autocapture-browser) | Auto-capture user interactions |
| [`@acai/plugin-global-user-properties`](./packages/plugin-global-user-properties) | Global user properties |
| [`@acai/plugin-network-capture-browser`](./packages/plugin-network-capture-browser) | Network request capture |
| [`@acai/plugin-page-url-enrichment-browser`](./packages/plugin-page-url-enrichment-browser) | Page URL enrichment |
| [`@acai/plugin-page-view-tracking-browser`](./packages/plugin-page-view-tracking-browser) | Page view tracking |
| [`@acai/plugin-session-replay-react-native`](./packages/plugin-session-replay-react-native) | Session replay plugin for React Native |
| [`@acai/plugin-stub-browser`](./packages/plugin-stub-browser) | Plugin template |
| [`@acai/plugin-web-attribution-browser`](./packages/plugin-web-attribution-browser) | UTM and attribution tracking |
| [`@acai/plugin-web-vitals-browser`](./packages/plugin-web-vitals-browser) | Core Web Vitals |

### Internal

| Package | Description |
|---|---|
| [`@acai/gtm-snippet`](./packages/gtm-snippet) | Google Tag Manager snippet |
| [`@acai/analytics-browser-test`](./packages/analytics-browser-test) | Browser test utilities |
| [`@acai/analytics-node-test`](./packages/analytics-node-test) | Node.js test utilities |
| [`e2e-remote-config`](./packages/e2e-remote-config) | End-to-end remote config tests |

## Development

The workspace uses [pnpm](https://pnpm.io). Run these from the folder that holds `package.json` and `pnpm-workspace.yaml` (currently `acai-typescript/`):

```bash
pnpm install
pnpm build
pnpm test
pnpm lint
```

See [`CONTRIBUTING.md`](./acai-typescript/CONTRIBUTING.md) for the full contribution workflow.

## License

See [`LICENSE`](./acai-typescript/LICENSE).
