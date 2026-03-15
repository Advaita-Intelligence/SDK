# Acai Analytics Go SDK

Official Go SDK for **Acai** — a self-hosted event analytics platform. This SDK lets you capture and send events from your Go applications to your own Acai-compatible server.

> **Forked and rebranded from [amplitude/analytics-go](https://github.com/amplitude/analytics-go).** All Amplitude references have been replaced with Acai branding, and the default server endpoint is configurable to point to your own server.

---

## Installation

```bash
go get github.com/acai/analytics-go
```

---

## Quick Start

```go
package main

import "github.com/acai/analytics-go/acai"

func main() {
    config := acai.NewConfig("YOUR-API-KEY")

    // Point to your own server instead of the default
    config.ServerURL = "https://your-acai-server.example.com/2/httpapi"

    client := acai.NewClient(config)
    defer client.Shutdown()

    client.Track(acai.Event{
        EventType: "Button Clicked",
        UserID:    "user-123",
        EventProperties: map[string]interface{}{
            "button": "signup",
            "page":   "landing",
        },
    })

    client.Flush()
}
```

---

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `APIKey` | `string` | Your Acai API key (required) | — |
| `ServerURL` | `string` | **Your custom server endpoint** | `https://api2.acai.io/2/httpapi` |
| `UseBatch` | `bool` | Use batch endpoint instead of single | `false` |
| `FlushInterval` | `time.Duration` | How often to flush queued events | `10s` |
| `FlushQueueSize` | `int` | Max events per batch | `200` |
| `FlushMaxRetries` | `int` | Max retry attempts on failure | `12` |
| `ConnectionTimeout` | `time.Duration` | HTTP request timeout | `10s` |
| `OptOut` | `bool` | Disable event sending | `false` |
| `Logger` | `Logger` | Custom logger | default logger |

### Setting a Custom Server URL

```go
config := acai.NewConfig("YOUR-API-KEY")
config.ServerURL = "https://your-acai-server.example.com/2/httpapi"
```

---

## Tracking Events

### Basic Event

```go
client.Track(acai.Event{
    EventType: "Page Viewed",
    UserID:    "user-123",
})
```

### Event with Properties

```go
client.Track(acai.Event{
    EventType: "Purchase",
    UserID:    "user-123",
    DeviceID:  "device-abc",
    EventProperties: map[string]interface{}{
        "product": "Pro Plan",
        "price":   99.0,
    },
    UserProperties: map[string]interface{}{
        "plan": "pro",
    },
})
```

### Identify Users

```go
identify := acai.Identify{}
identify.Set("email", "user@example.com")
identify.Set("plan", "pro")

client.Identify(identify, acai.EventOptions{UserID: "user-123"})
```

### Revenue

```go
revenue := acai.Revenue{}
revenue.SetProductID("product-001")
revenue.SetPrice(9.99)
revenue.SetQuantity(2)

client.Revenue(revenue, acai.EventOptions{UserID: "user-123"})
```

---

## Running Your Own Acai Server

The SDK sends events as JSON `POST` requests to your `ServerURL`. Your server must accept the following payload format:

```json
{
  "api_key": "YOUR-API-KEY",
  "events": [
    {
      "event_type": "Button Clicked",
      "user_id": "user-123",
      "device_id": "device-abc",
      "event_properties": { "key": "value" },
      "time": 1700000000000
    }
  ]
}
```

Your server should respond with:

| Status | Meaning |
|--------|---------|
| `200` | Events accepted |
| `400` | Bad request (invalid payload) |
| `413` | Payload too large — SDK will reduce batch size |
| `429` | Rate limited — SDK will retry with backoff |
| `500+` | Server error — SDK will retry |

### Minimal Server Example (Go)

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Payload struct {
    APIKey string                   `json:"api_key"`
    Events []map[string]interface{} `json:"events"`
}

func main() {
    http.HandleFunc("/2/httpapi", func(w http.ResponseWriter, r *http.Request) {
        var p Payload
        json.NewDecoder(r.Body).Decode(&p)
        for _, event := range p.Events {
            fmt.Printf("Received event: %v\n", event["event_type"])
        }
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(200)
        json.NewEncoder(w).Encode(map[string]interface{}{
            "code":         200,
            "events_ingested": len(p.Events),
        })
    })
    fmt.Println("Acai server listening on :8080")
    http.ListenAndServe(":8080", nil)
}
```

Then configure the SDK to point to it:

```go
config.ServerURL = "http://localhost:8080/2/httpapi"
```

---

## Custom Plugins

You can extend the SDK with enrichment or destination plugins:

```go
type MyEnrichmentPlugin struct{}

func (p *MyEnrichmentPlugin) Name() string { return "my-enrichment" }
func (p *MyEnrichmentPlugin) Type() acai.PluginType { return acai.PluginTypeEnrichment }
func (p *MyEnrichmentPlugin) Setup(config acai.Config) {}
func (p *MyEnrichmentPlugin) Execute(event *acai.Event) *acai.Event {
    if event.EventProperties == nil {
        event.EventProperties = map[string]interface{}{}
    }
    event.EventProperties["sdk_version"] = "1.0"
    return event
}

client.Add(&MyEnrichmentPlugin{})
```

---

## Examples

See the [`examples/`](./examples) directory for:
- `track_example/` — basic event tracking
- `identify_example/` — user identification
- `revenue_example/` — revenue tracking

---

## License

Apache 2.0 — see [LICENSE](./LICENSE)
