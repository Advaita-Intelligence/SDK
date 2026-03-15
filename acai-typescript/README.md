# 🫐 Acai-TypeScript

**Acai Analytics SDK** — A fully open, self-hosted analytics event tracking SDK for Web, Node.js, and React Native. Self-hosted, fully open-source analytics — configure your own ingest server.

---

## Packages

| Package | Description |
|---|---|
| `@acai/analytics-browser` | Browser SDK (Web) |
| `@acai/analytics-node` | Node.js SDK |
| `@acai/analytics-react-native` | React Native SDK |
| `@acai/analytics-core` | Shared core logic |
| `@acai/analytics-types` | Shared TypeScript types |
| `@acai/plugin-autocapture-browser` | Auto-capture user interactions |
| `@acai/plugin-page-view-tracking-browser` | Page view tracking |
| `@acai/plugin-session-replay-browser` | Session replay |
| `@acai/plugin-web-attribution-browser` | UTM / attribution tracking |
| `@acai/plugin-web-vitals-browser` | Core web vitals |

---

## Quick Start for End Users

### 1. Install

```bash
# For browser apps
npm install @acai/analytics-browser

# For Node.js / backend
npm install @acai/analytics-node
```

### 2. Initialize (Browser)

```typescript
import * as acai from '@acai/analytics-browser';

acai.init('YOUR_ACAI_API_KEY', {
  serverUrl: 'https://events.acai.yourdomain.com/2/httpapi',
});
```

### 3. Identify a User

```typescript
acai.setUserId('user@example.com');

acai.identify(
  new acai.Identify()
    .set('plan', 'pro')
    .set('company', 'Acme Corp')
);
```

### 4. Track Events

```typescript
// Simple event
acai.track('Button Clicked');

// Event with properties
acai.track('Purchase Completed', {
  item: 'Pro Plan',
  price: 29.99,
  currency: 'USD',
});
```

### 5. Node.js Usage

```typescript
import { createInstance } from '@acai/analytics-node';

const acai = createInstance();

await acai.init('YOUR_ACAI_API_KEY', {
  serverUrl: 'https://events.acai.yourdomain.com/2/httpapi',
}).promise;

acai.track({
  event_type: 'Server Event',
  user_id: 'user@example.com',
  event_properties: { source: 'api' },
});

await acai.flush().promise;
```

---

## Self-Hosted Ingest Server

See the [ingest-server](./ingest-server) directory for a complete ready-to-deploy Node.js server.

---

## Development

```bash
git clone https://github.com/YOUR_USERNAME/Acai-TypeScript.git
cd Acai-TypeScript
nvm use
yarn install
yarn build
```

---

## License

MIT
