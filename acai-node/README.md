# acai-node

Official server-side Node.js analytics SDK — a drop-in replacement for Amplitude's Node SDK, rebranded as **Acai** and pointing to your own server infrastructure.

## Packages

| Package | Description |
|---|---|
| [`acai-node`](./packages/node) | Core Node.js SDK — start here |
| [`@acai/types`](./packages/types) | TypeScript types and interfaces |
| [`@acai/identify`](./packages/identify) | Builder for Identify and Group events |
| [`@acai/identity`](./packages/identity) | Device/user identity management |
| [`@acai/utils`](./packages/utils) | Shared utilities |

## Installation

```bash
npm install acai-node
# or
yarn add acai-node
```

## Quick Start

```typescript
import { init } from 'acai-node';

const client = init('YOUR_API_KEY');

await client.logEvent({
  event_type: 'Button Clicked',
  user_id: 'user-123',
  event_properties: { button_name: 'Sign Up' },
});

// Always flush before process exits
await client.flush();
```

## Server Configuration

The SDK sends events to your custom server. Change the endpoint by passing `serverUrl` in options:

```typescript
const client = init('YOUR_API_KEY', {
  serverUrl: 'https://YOUR_SERVER_URL_HERE/2/httpapi',
});
```

> Update `packages/node/src/constants.ts` → `ACAI_SERVER_URL` to change the default for all consumers.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `serverUrl` | `string` | your server | Endpoint to send events to |
| `debug` | `boolean` | `false` | Enable debug logging |
| `logLevel` | `LogLevel` | `None` | 0=None 1=Error 2=Warn 3=Verbose |
| `maxCachedEvents` | `number` | `16000` | Max events buffered before flush |
| `uploadIntervalInSec` | `number` | `0` | Auto-flush interval (0 = next tick) |
| `optOut` | `boolean` | `false` | Disable all event sending |
| `retryTimeouts` | `number[]` | `[100,100,200...]` | Retry delays in ms |
| `requestTimeoutMillis` | `number` | `10000` | Per-request timeout |

## Identify

```typescript
import { init } from 'acai-node';
import { Identify } from '@acai/identify';

const client = init('YOUR_API_KEY');
const identify = new Identify();
identify.set('plan', 'premium');
identify.setOnce('first_seen', new Date().toISOString());

await client.identify('user-123', null, identify);
```

## Middleware

```typescript
client.addEventMiddleware((payload, next) => {
  payload.event.event_properties = {
    ...payload.event.event_properties,
    environment: process.env.NODE_ENV,
  };
  next();
});
```

## Development

### Prerequisites

- Node.js >= 10
- Yarn

### Setup

```bash
git clone https://github.com/your-org/acai-node.git
cd acai-node
yarn install
yarn build
```

### Tests

```bash
yarn test
```

## License

MIT
