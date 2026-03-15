# Acai Kotlin SDK

A Kotlin/Android clickstream analytics SDK — inspired by the Amplitude Kotlin architecture.

---

## Installation

Add the dependency to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation("com.acai:analytics-android:1.0.0")
}
```

Add internet permission to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

---

## Quick Start

### Initialize

```kotlin
import com.acai.android.Acai
import com.acai.android.Configuration
import com.acai.core.AcaiServer

val acai = Acai(
    Configuration(
        apiKey = "YOUR_API_KEY",
        context = applicationContext,
        serverZone = AcaiServer.US,   // AcaiServer.EU for European data residency
    )
)
```

### Track Events

```kotlin
acai.track("Button Clicked", mapOf(
    "button_name" to "purchase",
    "price" to 9.99,
))
```

### Identify Users

```kotlin
acai.setUserId("user-123")

val identify = Identify()
    .set("plan", "premium")
    .setOnce("firstSeen", System.currentTimeMillis())
    .add("loginCount", 1)
acai.identify(identify = identify)
```

### Track Revenue

```kotlin
val revenue = Revenue()
    .setProductId("premium_monthly")
    .setPrice(9.99)
    .setQuantity(1)
    .setRevenueType("subscription")
acai.revenue(revenue)
```

### Group Analytics

```kotlin
acai.setGroup("company", "Acme Corp")

val groupIdentify = Identify().set("industry", "SaaS")
acai.groupIdentify("company", "Acme Corp", groupIdentify)
```

---

## Configuration Options

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | String | required | Your Acai project API key |
| `serverZone` | AcaiServer | `US` | `US` or `EU` data residency |
| `serverUrl` | String | US endpoint | Override API endpoint URL |
| `useBatch` | Boolean | `false` | Use batch HTTP endpoint |
| `flushQueueSize` | Int | `30` | Events queued before auto-flush |
| `flushIntervalMillis` | Long | `30000` | Auto-flush interval in ms |
| `logLevel` | LogLevel | `WARN` | `DISABLE`, `ERROR`, `WARN`, `DEBUG` |
| `optOut` | Boolean | `false` | Disables all tracking when `true` |
| `trackingOptions` | TrackingOptions | all enabled | Granular device property controls |

---

## Plugins

Extend the SDK with custom plugins:

```kotlin
class MyEnrichmentPlugin : EventPlugin() {
    override val type = Plugin.Type.ENRICHMENT

    override fun track(payload: BaseEvent): BaseEvent {
        payload.eventProperties = (payload.eventProperties ?: hashMapOf()).apply {
            put("app_environment", "production")
        }
        return payload
    }
}

acai.add(MyEnrichmentPlugin())
```

Plugin execution order: **BEFORE → ENRICHMENT → DESTINATION → AFTER**

---

## Server Configuration

Update the server URLs in `gradle.properties` or `Configuration`:

```kotlin
// Custom server
Configuration(
    apiKey = "...",
    context = applicationContext,
    serverUrl = "https://api.yourdomain.com/2/httpapi",
)

// EU data residency
Configuration(
    apiKey = "...",
    context = applicationContext,
    serverZone = AcaiServer.EU,
)
```

---

## Module Structure

```
acai-kotlin/
├── core/            # Pure Kotlin, platform-agnostic SDK core
│   └── com/acai/core/
│       ├── Acai.kt                  # Abstract SDK entry point
│       ├── Configuration.kt         # Core config + AcaiServer enum
│       ├── Timeline.kt              # Plugin pipeline
│       ├── Identify.kt              # Identity builder
│       ├── Revenue.kt               # Revenue builder
│       ├── events/                  # Event data models
│       ├── plugins/                 # Plugin interfaces + AcaiDestination
│       └── utilities/               # HttpClient, Logger
│
├── android/         # Android-specific module
│   └── com/acai/android/
│       ├── Acai.kt                  # Android SDK entry point
│       ├── Configuration.kt         # Android config (adds Context)
│       └── plugins/
│           ├── AndroidContextPlugin.kt   # Auto device/app enrichment
│           └── AndroidLifecyclePlugin.kt # App lifecycle tracking
│
└── samples/         # Sample Android applications
```

---

## License

MIT
