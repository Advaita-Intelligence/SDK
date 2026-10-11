// A basic example of using Acai Go SDK to track an event.

package main

// Import acai package
import (
	"github.com/acai/analytics-go/acai"
)

func main() {

	config := acai.NewConfig("your-api-key")

	client := acai.NewClient(config)

	// Track a basic event
	// One of UserID and DeviceID is required
	event := acai.Event{
		EventType: "Button Clicked",
		UserID:    "user-id",
	}
	client.Track(event)

	// Track events with optional properties
	client.Track(acai.Event{
		EventType:       "type-of-event",
		UserID:          "user-id",
		DeviceID:        "device-id",
		EventProperties: map[string]interface{}{"source": "notification"},
	})

	// Flush the event buffer
	client.Flush()

	// Shutdown the client
	client.Shutdown()
}
