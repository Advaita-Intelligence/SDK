# Acai Flutter SDK: Android

Android platform implementation of `acai_flutter`. It bridges the Dart API to the native Acai Android SDK (`com.acai:analytics-android`) through a method channel named `acai_flutter`.

You don't add this module to your app by hand. Flutter links it automatically when your app depends on `acai_flutter`.

## Requirements

| Item | Value |
|------|-------|
| Plugin package | `com.acai.acai_flutter` |
| Plugin class | `AcaiFlutterPlugin` |
| Native dependency | `com.acai:analytics-android:1.25.3` (pinned) |
| Compile SDK | 34 |
| Kotlin | 1.9.22 |
| Android Gradle Plugin | 8.2.2 |
| Min SDK declared by this module | 16 (your app's `minSdk` still applies) |

The native Acai Android artifact must be resolvable from `google()` or `mavenCentral()`, which this module already declares. If you host it in a private Maven repository, add that repository to your app's `settings.gradle` or `build.gradle`.

## Installation

Add the package to your Flutter app's `pubspec.yaml`:

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

## Permissions

The module's manifest declares the only permission it needs, and Gradle merges it into your app:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Nothing else is required for basic event tracking.

## Usage

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

Call `acai.flush()` to upload queued events right away, and `acai.reset()` on logout to clear the user ID and device ID.

## Capture endpoint

Events go to:

```
https://clickstream.acaiplatform.ai/api/collect
```

Requests are authenticated with your project API key. Pass the endpoint through `Configuration.serverUrl` as shown above.

## Android specific behavior

- **App lifecycle and deep link events:** enable them with `DefaultTrackingOptions`.

  ```dart
  Configuration(
    apiKey: 'YOUR_API_KEY',
    defaultTracking: const DefaultTrackingOptions(
      sessions: true,
      appLifecycles: true,
      deepLinks: true,
    ),
  );
  ```

  Deep link tracking reads the intent of the current `Activity`, so the app needs an attached activity.
- **Log levels:** `LogLevel.log` maps to the native `info` level. Other levels map by name (`off`, `error`, `warn`, `debug`).
- **Server zone:** `serverZone` accepts `us` or `eu`.
- **Instances:** each `instanceName` gets its own native client. Using an instance name that was never initialized throws an `IllegalArgumentException` on the native side.
- **Library tag:** events carry a `library` value added by `FlutterLibraryPlugin`, so you can tell Flutter traffic from other SDKs.

## Supported method calls

`init`, `track`, `identify`, `groupIdentify`, `setGroup`, `revenue`, `getUserId`, `setUserId`, `getDeviceId`, `setDeviceId`, `getSessionId`, `reset`, `flush`. Opt-out is set at init through `Configuration(optOut: true)`.

## Project layout

```
android/
├── build.gradle
├── settings.gradle
├── src/main/AndroidManifest.xml
├── src/main/kotlin/com/acai/acai_flutter/
│   ├── AcaiFlutterPlugin.kt      # Method channel handler
│   └── FlutterLibraryPlugin.kt   # Adds the Flutter library tag to events
└── src/test/kotlin/com/acai/acai_flutter/
    └── AcaiFlutterPluginTest.kt
```

## Running the native tests

From the `android/` directory:

```bash
./gradlew test
```

## Troubleshooting

- **`Could not find com.acai:analytics-android`**: the artifact isn't in a repository your build can reach. Add the repository that hosts it.
- **`NoSuchMethodError` at runtime**: a different version of the native SDK was resolved. The version is pinned in `build.gradle`; check for a conflicting dependency in your app.
- **No events arriving**: confirm `apiKey` and `serverUrl`, call `flush()`, and set `logLevel: LogLevel.debug` to see upload logs in Logcat.
