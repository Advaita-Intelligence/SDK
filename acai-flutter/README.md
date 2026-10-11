# Acai Flutter SDK

Official Acai Flutter SDK for sending clickstream events to the Acai platform from Android, iOS, macOS and web apps.

Repository: https://github.com/Advaita-Intelligence/acai-flutter

## Supported platforms

| Platform | Minimum version |
|----------|-----------------|
| Android  | API 21+ |
| iOS      | 13.0+ |
| macOS    | 10.15+ |
| Web      | All modern browsers |

## Installation

Add `acai_flutter` to your app's `pubspec.yaml`:

```yaml
dependencies:
  acai_flutter:
    git:
      url: https://github.com/Advaita-Intelligence/acai-flutter.git
      ref: main
```

Then run:

```bash
flutter pub get
```

## Quick start

```dart
import 'package:acai_flutter/acai.dart';
import 'package:acai_flutter/configuration.dart';
import 'package:acai_flutter/events/base_event.dart';

final acai = Acai(Configuration(
  apiKey: 'YOUR_API_KEY',
  serverUrl: 'https://clickstream.acaiplatform.ai/api/collect',
));

await acai.isBuilt;

acai.track(BaseEvent('button_clicked', eventProperties: {
  'button_name': 'sign_up',
}));
```

## Capture endpoint

Send clickstream events to this URL. Authenticate requests with your project API key.

```
https://clickstream.acaiplatform.ai/api/collect
```

Set it with `Configuration.serverUrl`. The same URL is used for raw HTTP requests:

```
POST https://clickstream.acaiplatform.ai/api/collect
Content-Type: application/json

{
  "api_key": "YOUR_API_KEY",
  "events": [
    {
      "event_type": "button_clicked",
      "user_id": "user_123",
      "event_properties": { "button_name": "sign_up" }
    }
  ]
}
```

## Common methods

```dart
// Identify a user
acai.setUserId('user_123');
acai.identify(Identify()..set('plan', 'premium'));   // events/identify.dart

// Revenue
acai.revenue(Revenue()                               // events/revenue.dart
  ..price = 9.99
  ..quantity = 1
  ..productId = 'com.myapp.premium');

// Groups
acai.setGroup('orgId', 'org_456');

// Upload queued events now / clear the user on logout
await acai.flush();
await acai.reset();
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | String | required | Your Acai project API key |
| `serverUrl` | String? | null (SDK default) | Capture endpoint |
| `flushQueueSize` | int | 30 | Events per upload batch |
| `flushIntervalMillis` | int | 30000 | Upload interval in milliseconds |
| `flushMaxRetries` | int | 5 | Max retries on failed upload |
| `optOut` | bool | false | Disable tracking |
| `logLevel` | LogLevel | warn | Logging verbosity |
| `serverZone` | ServerZone | us | `us` or `eu` |
| `minTimeBetweenSessionsMillis` | int | 300000 | Session timeout |
| `defaultTracking` | DefaultTrackingOptions | sessions on | Sessions, app lifecycles, deep links and more |

See `lib/configuration.dart` for the full list.

## Repository layout

```
.
├── lib/            Dart API (acai.dart, configuration.dart, events/, autocapture/, web/)
├── android/        Android plugin (Kotlin). See android/README.md
├── darwin/         iOS and macOS plugin (Swift, shared source)
├── example/        Sample Flutter app
├── test/           Dart unit tests
├── acai-flutter/   Package metadata and docs: pubspec.yaml, README, CHANGELOG, CONTRIBUTING, LICENSE
└── .github/        CI, release and publish workflows
```

Platform guides:
- Android: [android/README.md](android/README.md)
- Package docs: [acai-flutter/README.md](acai-flutter/README.md)

## Running the example app

The example reads its API key from `example/lib/main.dart`. Replace `API_KEY` with your project key, then:

```bash
cd example
flutter pub get
flutter run
```

## Contributing

See [acai-flutter/CONTRIBUTING.md](acai-flutter/CONTRIBUTING.md).

## License

MIT. See [acai-flutter/LICENSE](acai-flutter/LICENSE).
