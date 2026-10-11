// A basic example of using Acai Go SDK to set user property

package main

// Import acai package
import (
	"github.com/acai/analytics-go/acai"
)

func main() {

	config := acai.NewConfig("your-api-key")

	client := acai.NewClient(config)

	// Revenue struct is passed into Revenue method
	// to send as a revenue event
	revenueObj := acai.Revenue{
		Price:     3.99,
		Quantity:  3,
		ProductID: "com.company.productID",
	}
	client.Revenue(revenueObj, acai.EventOptions{DeviceID: "revenue-device-id", UserID: "revenue-user-id"})

	// Flush the event buffer
	client.Flush()

	// Shutdown the client
	client.Shutdown()
}
