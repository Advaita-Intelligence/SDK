# Acai Python SDK

The official **Acai** backend Python SDK for server-side event tracking and analytics instrumentation.

## Installation

```bash
pip install acai-analytics
```

Or install from source:

```bash
git clone https://github.com/your-org/acai-python
cd acai-python
pip install -e .
```

## Quick Start

```python
from acai.client import Acai
from acai.event import BaseEvent
from acai.config import Config

# Initialize with your API key and your custom server URL
client = Acai(api_key="YOUR_API_KEY", 
              server_url="https://your-acai-server.com/2/httpapi")

# Track a basic event
client.track(
    BaseEvent(
        event_type="button_click",
        user_id="user@example.com",
        event_properties={"button_id": "signup", "page": "landing"}
    )
)

# Flush and shut down gracefully
client.shutdown()
```

## Configuration

```python
from acai.config import Config
from acai.client import Acai

config = Config(
    api_key="YOUR_API_KEY",
    server_url="https://your-acai-server.com/2/httpapi",  # Your custom server
    flush_queue_size=200,
    flush_interval_millis=10000,
    flush_max_retries=12
)

client = Acai(configuration=config)
```

### Config Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `api_key` | str | required | Your Acai project API key |
| `server_url` | str | None | Custom server endpoint URL |
| `server_zone` | str | `"US"` | Server zone (`"US"` or `"EU"`) |
| `use_batch` | bool | False | Use batch API endpoint |
| `flush_queue_size` | int | 200 | Max events buffered before flush |
| `flush_interval_millis` | int | 10000 | Max wait time before flush (ms) |
| `flush_max_retries` | int | 12 | Max retry attempts on failure |
| `callback` | callable | None | Callback on event send/failure |

## Tracking Events

```python
from acai.event import BaseEvent, EventOptions

# Simple event
client.track(BaseEvent(event_type="page_view", user_id="user123"))

# Event with properties
client.track(
    BaseEvent(
        event_type="purchase",
        user_id="user123",
        device_id="device456",
        event_properties={
            "item": "pro_plan",
            "price": 99.0,
            "currency": "USD"
        },
        user_properties={
            "plan": "pro"
        }
    )
)
```

## User Identification

```python
from acai.event import Identify, IdentifyEvent

identify = Identify()
identify.set("plan", "premium")
identify.set("age", 28)
identify.append("interests", "analytics")

client.identify(
    IdentifyEvent(
        identify_obj=identify,
        user_id="user123"
    )
)
```

## Using a Custom Server

To point the SDK at your own server instead of the default Acai endpoints:

```python
config = Config(
    api_key="YOUR_API_KEY",
    server_url="https://events.your-company.com/track"  # Your endpoint
)
client = Acai(configuration=config)
```

Your server must accept POST requests with a JSON body in the following format:

```json
{
  "api_key": "YOUR_API_KEY",
  "events": [
    {
      "event_type": "button_click",
      "user_id": "user@example.com",
      "time": 1700000000000,
      "event_properties": { "button_id": "signup" }
    }
  ]
}
```

And return a JSON response:

```json
{ "code": 200 }
```

## Plugins

```python
from acai.plugin import DestinationPlugin, PluginType

class MyPlugin(DestinationPlugin):
    plugin_type = PluginType.DESTINATION

    def setup(self, client):
        pass

    def execute(self, event):
        # Custom processing here
        print("Event received:", event.event_type)
        return event

client.add(MyPlugin())
```

## Flask Integration

```python
from flask import Flask, request
from acai.client import Acai
from acai.event import BaseEvent

app = Flask(__name__)
acai_client = Acai(api_key="YOUR_API_KEY",
                   server_url="https://your-server.com/2/httpapi")

@app.route("/action")
def action():
    acai_client.track(
        BaseEvent(
            event_type="api_request",
            user_id=request.args.get("user_id"),
            event_properties={"endpoint": "/action"}
        )
    )
    return "OK"
```

## Server-Side Requirements

If you're running your own server to receive events, implement this endpoint:

**POST** `/2/httpapi`

**Request Body:**
```json
{
  "api_key": "string",
  "events": [ { ...event_object } ],
  "options": { "min_id_length": 5 }
}
```

**Response:**
```json
{ "code": 200 }
```

| HTTP Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Invalid request |
| 408 | Timeout |
| 413 | Payload too large |
| 429 | Too many requests |
| 500 | Server error |

## License

MIT
