# Acai React Native SDK

Official React Native SDK for capturing events with your Acai analytics server.

Forked and rebranded from [Amplitude-ReactNative](https://github.com/amplitude/Amplitude-ReactNative).

---

## Installation

```sh
npm install @acai/react-native-sdk
# or
yarn add @acai/react-native-sdk
```

### iOS

```sh
cd ios && pod install
```

### Android

No extra steps needed.

---

## Quick Start

```typescript
import { Acai } from '@acai/react-native-sdk';

// 1. Initialize — automatically connects to your Acai server
const acai = Acai.getInstance();
await acai.init('YOUR_API_KEY');

// 2. Identify your user
acai.setUserId('user_123');
acai.setUserProperties({ plan: 'pro', country: 'IN' });

// 3. Track events
acai.logEvent('app_opened');
acai.logEvent('button_clicked', { button: 'signup', screen: 'home' });

// 4. Track revenue
acai.logRevenue({ price: 9.99, productId: 'pro_plan', quantity: 1 });

// 5. Flush all queued events immediately
acai.uploadEvents();
```

---

## Configuration

### Change Server URL

The SDK points to your Acai server by default (configured in `src/constants.ts`).
You can override it per instance:

```typescript
await acai.init('YOUR_API_KEY');
await acai.setServerUrl('https://your-acai-server.com/api/v1/events');
```

### Your Server API

Your server should accept `POST` requests in this format:

```json
POST https://your-acai-server.com/api/v1/events
Content-Type: application/json

{
  "api_key": "YOUR_API_KEY",
  "events": [
    {
      "event_type": "button_clicked",
      "user_id": "user_123",
      "device_id": "device_abc",
      "time": 1700000000000,
      "event_properties": {
        "button": "signup"
      },
      "user_properties": {}
    }
  ]
}
```

**Success Response:**
```json
{ "code": 200, "events_ingested": 1 }
```

---

## API Reference

| Method | Description |
|--------|-------------|
| `init(apiKey)` | Initialize SDK with your API key |
| `setUserId(userId)` | Set the current user's ID |
| `setUserProperties(props)` | Set user-level properties |
| `logEvent(eventType, props?)` | Track an event |
| `logRevenue({ price, productId, quantity })` | Track a revenue event |
| `identify(identifyInstance)` | Send an identify call |
| `setGroup(groupType, groupName)` | Assign user to a group |
| `setServerUrl(url)` | Override the server endpoint |
| `setOptOut(boolean)` | Enable/disable tracking |
| `uploadEvents()` | Flush pending events immediately |
| `getDeviceId()` | Get the device ID |
| `getSessionId()` | Get the current session ID |

---

## Setting Up Your Acai Server

You need a server that accepts events. Here's a minimal Node.js + Express example:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/v1/events', (req, res) => {
  const { api_key, events } = req.body;

  // Validate API key
  if (api_key !== process.env.ACAI_API_KEY) {
    return res.status(401).json({ code: 401, error: 'Invalid API key' });
  }

  // Store events (your DB logic here)
  console.log(`Received ${events.length} events`);
  events.forEach(event => {
    console.log(event.event_type, event.user_id, event.event_properties);
    // save to your database...
  });

  res.json({ code: 200, events_ingested: events.length });
});

app.listen(3000, () => console.log('Acai server running on port 3000'));
```

---

## Middleware

You can intercept and transform events before they are sent:

```typescript
acai.addEventMiddleware((payload, next) => {
  // Add a global property to all events
  payload.event.eventProperties = {
    ...payload.event.eventProperties,
    app_version: '2.0.0',
    environment: 'production',
  };
  next(payload);
});
```

---

## License

MIT
