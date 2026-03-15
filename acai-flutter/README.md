# Acai Flutter SDK

Official Acai Flutter SDK — a drop-in replacement for Amplitude Flutter, rebranded and configured to point to your own Acai analytics server.

[![pub package](https://img.shields.io/pub/v/acai_flutter.svg)](https://pub.dartlang.org/packages/acai_flutter)

## Supported Platforms

| Platform | Minimum Version |
|----------|----------------|
| Android  | API 21+         |
| iOS      | 13.0+           |
| macOS    | 10.15+          |
| Web      | All modern browsers |

## Installation

Add `acai_flutter` to your `pubspec.yaml`:

```yaml
dependencies:
  acai_flutter:
    git:
      url: https://github.com/YOUR_ORG/acai-flutter.git
      ref: main
```

Or, once published to pub.dev:

```yaml
dependencies:
  acai_flutter: ^1.0.0
```

## Quick Start

```dart
import 'package:acai_flutter/acai.dart';
import 'package:acai_flutter/configuration.dart';

// Initialize with your own server URL
final acai = Acai(Configuration(
  apiKey: 'YOUR_API_KEY',
  serverUrl: 'https://api.your-acai-server.com/2/httpapi', // <-- point to your server
));

await acai.isBuilt;

// Track an event
acai.track(BaseEvent('button_clicked', eventProperties: {
  'button_name': 'sign_up',
}));
```

## Pointing to Your Own Server

The key configuration field is `serverUrl`. Set it to your Acai-compatible event ingestion endpoint:

```dart
final acai = Acai(Configuration(
  apiKey: 'YOUR_API_KEY',
  serverUrl: 'https://api.your-acai-server.com/2/httpapi',
  // Optional: use batch endpoint instead
  // useBatch: true,
  // serverUrl: 'https://api.your-acai-server.com/batch',
));
```

Your server must accept JSON payloads in the Amplitude HTTP API v2 format:
```json
{
  "api_key": "YOUR_API_KEY",
  "events": [
    {
      "event_type": "button_clicked",
      "user_id": "user_123",
      "event_properties": {
        "button_name": "sign_up"
      }
    }
  ]
}
```

## Core Methods

### Track an Event

```dart
import 'package:acai_flutter/events/base_event.dart';

acai.track(BaseEvent(
  'page_viewed',
  eventProperties: {'page': 'home'},
));
```

### Identify a User

```dart
import 'package:acai_flutter/events/identify.dart';

final identify = Identify()
  ..set('plan', 'premium')
  ..set('age', 28);

acai.identify(identify);
```

### Set User ID

```dart
acai.setUserId('user_123');
```

### Track Revenue

```dart
import 'package:acai_flutter/events/revenue.dart';

final revenue = Revenue()
  ..price = 9.99
  ..quantity = 1
  ..productId = 'com.myapp.premium';

acai.revenue(revenue);
```

### Group Users

```dart
acai.setGroup('orgId', 'org_456');
```

### Flush Events

```dart
await acai.flush();
```

### Reset User

```dart
await acai.reset(); // clears userId and deviceId
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | String | **required** | Your Acai project API key |
| `serverUrl` | String? | null (uses default) | **Your custom server endpoint** |
| `useBatch` | bool | false | Use batch endpoint instead of real-time |
| `flushQueueSize` | int | 30 | Events per upload batch |
| `flushIntervalMillis` | int | 30000 | Upload interval in milliseconds |
| `flushMaxRetries` | int | 5 | Max retries on failed upload |
| `optOut` | bool | false | Disable tracking |
| `logLevel` | LogLevel | warn | Logging verbosity |
| `serverZone` | ServerZone | us | us or eu |
| `minTimeBetweenSessionsMillis` | int | 300000 | Session timeout |

## Setting Up Your Own Acai Server

Your server needs to expose a POST endpoint compatible with the Amplitude HTTP API v2:

```
POST /2/httpapi
Content-Type: application/json

{
  "api_key": "...",
  "events": [ ... ]
}
```

### Minimal Express.js Example

```js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/2/httpapi', (req, res) => {
  const { api_key, events } = req.body;
  // validate api_key
  // store/forward events
  console.log('Received events:', events.length);
  res.json({ code: 200 });
});

app.listen(3000);
```

Then configure the SDK to point to it:

```dart
Acai(Configuration(
  apiKey: 'my-secret-key',
  serverUrl: 'https://api.myserver.com/2/httpapi',
))
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup instructions.

## License

MIT — see [LICENSE](LICENSE).
