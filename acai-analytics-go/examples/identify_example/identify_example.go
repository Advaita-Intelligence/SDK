// A basic example of using Acai Go SDK to set user property

package main

// Import acai package
import (
	"github.com/acai/analytics-go/acai"
)

func main() {

	config := acai.NewConfig("your-api-key")

	client := acai.NewClient(config)

	// Identify struct provides controls over setting user properties.
	identifyObj := acai.Identify{}

	// Set the value of a user property
	identifyObj.Set("location", "LAX")

	// Call Identify method of client
	// Event here will not display in your Acai Analytics
	client.Identify(identifyObj, acai.EventOptions{UserID: "identify-user-id"})

	// To see identify actually works
	// Let's track another event
	// Then you can see that user properties of this event has location set to LAX
	event := acai.Event{
		EventType: "identify-event-type",
		DeviceID:  "identify-device-id",
		UserID:    "identify-user-id",
	}
	client.Track(event)

	// Flush the event buffer
	client.Flush()

	// Shutdown the client
	client.Shutdown()
}
