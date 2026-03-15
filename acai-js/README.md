# Acai JS — Analytics SDK

A JavaScript SDK for tracking events to your own **Acai Analytics** server.  
Forked and rebranded from [Amplitude-JavaScript](https://github.com/amplitude/Amplitude-JavaScript) (MIT).

---

## Architecture Overview

```
Your Website / App
      │
      │  acai.logEvent(...)
      ▼
 acai-js SDK
      │
      │  POST https://api.acai.yourdomain.com/2/httpapi
      ▼
 Your Acai Collector Server   ──► Database / Warehouse
```

The SDK sends events in JSON batches to your server — compatible with Amplitude's HTTP API v2 payload format.

---

## Server Setup (Collect Your Own Events)

Your collector must accept `POST /2/httpapi` with a JSON body.

### Minimal Node.js Collector (Express)

```js
// server.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/2/httpapi', (req, res) => {
  const { api_key, events } = req.body;
  console.log(`[acai] ${events.length} events for key ${api_key}`);
  // Store events in your DB / warehouse / queue here
  res.json({ code: 200, events_ingested: events.length, payload_size_bytes: 0 });
});

app.listen(3000, () => console.log('Acai collector on :3000'));
```

### Expected Payload Format

```json
{
  "api_key": "YOUR_API_KEY",
  "events": [
    {
      "user_id": "user_123",
      "device_id": "abc-def",
      "event_type": "button_clicked",
      "time": 1700000000000,
      "event_properties": { "label": "Sign Up" },
      "user_properties": {},
      "platform": "Web",
      "language": "en-US",
      "library": { "name": "acai-js", "version": "1.0.0" }
    }
  ]
}
```

---

## SDK Installation

### NPM

```bash
npm install acai-js
# or
yarn add acai-js
```

### Script Tag

```html
<script src="https://cdn.yourdomain.com/acai.min.js"></script>
```

---

## Quick Start

```js
import acai from 'acai-js';

// 1. Initialize
acai.init('YOUR_API_KEY', null, {
  apiEndpoint: 'api.acai.yourdomain.com',  // your collector host (no https://)
  forceHttps: true,
  saveEvents: true,
  includeUtm: true,
  includeReferrer: true,
});

// 2. Identify user (optional)
acai.setUserId('user_123');
acai.setUserProperties({ plan: 'pro', company: 'Acme Corp' });

// 3. Track events
acai.logEvent('page_viewed', { page: 'home' });
acai.logEvent('button_clicked', { label: 'Sign Up' });

// 4. Track revenue
const revenue = new acai.Revenue()
  .setProductId('pro_monthly')
  .setPrice(29.99)
  .setQuantity(1);
acai.logRevenueV2(revenue);
```

---

## Key Init Options

| Option | Default | Description |
|---|---|---|
| `apiEndpoint` | `api.acai.yourdomain.com` | Your collector server host |
| `forceHttps` | `true` | Always use HTTPS |
| `saveEvents` | `true` | Persist unsent events in localStorage |
| `batchEvents` | `false` | Batch events before sending |
| `eventUploadThreshold` | `30` | Batch size trigger |
| `eventUploadPeriodMillis` | `30000` | Flush interval (ms) |
| `sessionTimeout` | `1800000` | Session timeout (ms) |
| `includeUtm` | `false` | Auto-capture UTM params |
| `includeReferrer` | `false` | Auto-capture referrer |
| `logLevel` | `WARN` | `DISABLE`, `ERROR`, `WARN`, `INFO` |

---

## API Reference

| Method | Description |
|---|---|
| `acai.init(apiKey, userId?, options?)` | Initialize the SDK |
| `acai.logEvent(name, properties?)` | Track an event |
| `acai.setUserId(userId)` | Set current user |
| `acai.setUserProperties(props)` | Set user properties |
| `acai.identify(identifyObj)` | Send an Identify call |
| `acai.setGroup(type, name)` | Assign user to a group |
| `acai.logRevenueV2(revenueObj)` | Track revenue |
| `acai.clearUserProperties()` | Clear user properties |
| `acai.setOptOut(bool)` | Opt in/out of tracking |
| `acai.getInstance(name?)` | Get named SDK instance |

---

## Building from Source

```bash
git clone https://github.com/yourusername/acai-js
cd acai-js
yarn install
yarn build
# Output: acai.js, acai.esm.js, acai.umd.js, acai.min.js
```

---

## Changing Server URL

Edit `src/constants.js`:

```js
EVENT_LOG_URL: 'api.acai.yourdomain.com',
```

Or override at runtime:

```js
acai.init('KEY', null, { apiEndpoint: 'api.acai.yourdomain.com' });
```

---

## License

MIT — see [LICENSE](./LICENSE).  
Original work © Amplitude, Inc. Modifications for Acai branding © Your Company.
