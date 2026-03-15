package constants

import (
	"time"

	"github.com/acai/analytics-go/acai/types"
)

const (
	SdkLibrary = "acai-go"
	SdkVersion = "1.3.0"

	IdentifyEventType      = "$identify"
	GroupIdentifyEventType = "$groupidentify"
	RevenueEventType       = "revenue_amount"

	LoggerName = "acai"

	RevenueProductID  = "$productId"
	RevenueQuantity   = "$quantity"
	RevenuePrice      = "$price"
	RevenueType       = "$revenueType"
	Currency          = "$currency"
	RevenueReceipt    = "$receipt"
	RevenueReceiptSig = "$receiptSig"
	DefaultRevenue    = "$revenue"

	MaxPropertyKeys = 1024
	MaxStringLength = 1024
)

var ServerURLs = map[types.ServerZone]string{
	types.ServerZoneUS: "https://api2.acai.io/2/httpapi",
	types.ServerZoneEU: "https://api.eu.acai.io/2/httpapi",
}

var ServerBatchURLs = map[types.ServerZone]string{
	types.ServerZoneUS: "https://api2.acai.io/batch",
	types.ServerZoneEU: "https://api.eu.acai.io/batch",
}

var DefaultConfig = types.Config{
	FlushInterval:          time.Second * 10,
	FlushQueueSize:         200,
	FlushSizeDivider:       1,
	FlushMaxRetries:        12,
	ServerZone:             types.ServerZoneUS,
	ConnectionTimeout:      time.Second * 10,
	MaxStorageCapacity:     20000,
	RetryBaseInterval:      time.Millisecond * 100,
	RetryThrottledInterval: time.Second * 30,
}
