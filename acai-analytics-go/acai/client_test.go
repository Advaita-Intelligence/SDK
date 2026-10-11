package acai_test

import (
	"encoding/json"
	"fmt"
	"strconv"
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"

	"github.com/acai/analytics-go/acai"
	"github.com/acai/analytics-go/acai/types"
)

func TestClient(t *testing.T) {
	suite.Run(t, new(ClientSuite))
}

type ClientSuite struct {
	suite.Suite
}

func (t *ClientSuite) TestTrack() {
	config := acai.NewConfig("your_api_key")

	client := t.createClient(config)
	client.Add(&testBeforePlugin{})
	client.Add(&testEnrichmentPlugin{})

	destPlugin := &testDestinationPlugin{}
	client.Add(destPlugin)

	client.Track(t.createEvent(1))

	events, _ := json.Marshal(destPlugin.events)
	t.Require().JSONEq(`[
  {
    "event_type": "event-1",
    "user_id": "user-1",
    "time": 1,
    "insert_id": "insert-1",
    "ip": "IP 1",
    "city": "IP 1 city",
    "event_properties": {
      "prop-1": 1
    }
}
]`, string(events))
}

func (t *ClientSuite) TestIdentify() {
	config := acai.NewConfig("your_api_key")
	config.FlushQueueSize = 3

	client := t.createClient(config)
	client.Add(&testBeforePlugin{})
	client.Add(&testEnrichmentPlugin{})

	destPlugin := &testDestinationPlugin{}
	client.Add(destPlugin)

	identify := acai.Identify{}
	identify.Set("property", "value")
	client.Identify(identify, acai.EventOptions{UserID: "user-1"})

	events, _ := json.Marshal(destPlugin.events)
	t.Require().JSONEq(`[
  {
    "event_type": "$identify",
    "user_id": "user-1",
    "ip": "IP 1",
    "city": "IP 1 city",
    "user_properties": {
      "$set": {
        "property": "value"
      }
    }
}
]`, string(events))
}

func (t *ClientSuite) TestGroupIdentify() {
	config := acai.NewConfig("your_api_key")
	config.FlushQueueSize = 3

	client := t.createClient(config)
	client.Add(&testBeforePlugin{})
	client.Add(&testEnrichmentPlugin{})

	destPlugin := &testDestinationPlugin{}
	client.Add(destPlugin)

	identify := acai.Identify{}
	identify.Set("property", "value")
	client.GroupIdentify("group-type", "group-name", identify, acai.EventOptions{DeviceID: "device-1"})

	events, _ := json.Marshal(destPlugin.events)
	t.Require().JSONEq(`[
  {
    "event_type": "$groupidentify",
    "device_id": "device-1",
    "ip": "IP 1",
    "city": "IP 1 city",
    "group_properties": {
      "$set": {
        "property": "value"
      }
    },
    "groups": {
      "group-type": ["group-name"]
    }
  }
]`, string(events))
}

func (t *ClientSuite) TestSetGroup() {
	config := acai.NewConfig("your_api_key")
	config.FlushQueueSize = 3

	client := t.createClient(config)
	client.Add(&testBeforePlugin{})
	client.Add(&testEnrichmentPlugin{})

	destPlugin := &testDestinationPlugin{}
	client.Add(destPlugin)

	client.SetGroup("group-type", []string{"group-name-1", "group-name-2"}, acai.EventOptions{DeviceID: "device-1"})

	events, _ := json.Marshal(destPlugin.events)
	t.Require().JSONEq(`[
  {
    "event_type": "$identify",
    "device_id": "device-1",
    "ip": "IP 1",
    "city": "IP 1 city",
    "user_properties": {
      "$set": {
        "group-type": ["group-name-1", "group-name-2"]
      }
    }
  }
]`, string(events))
}

func (t *ClientSuite) TestRevenue() {
	config := acai.NewConfig("your_api_key")
	config.FlushQueueSize = 3

	client := t.createClient(config)
	client.Add(&testBeforePlugin{})
	client.Add(&testEnrichmentPlugin{})

	destPlugin := &testDestinationPlugin{}
	client.Add(destPlugin)

	client.Revenue(acai.Revenue{
		Price:       12.3,
		Quantity:    45,
		ProductID:   "product-1",
		RevenueType: "revenue-1",
		Currency:    "USD",
		Receipt:     "receipt-1",
		ReceiptSig:  "sig-1",
		Revenue:     7,
	}, acai.EventOptions{DeviceID: "device-1"})

	events, _ := json.Marshal(destPlugin.events)
	t.Require().JSONEq(`[
  {
    "event_type": "revenue_amount",
    "device_id": "device-1",
    "ip": "IP 1",
    "city": "IP 1 city",
    "event_properties": {
	  "$currency": "USD",
      "$price": 12.3,
      "$quantity": 45,
      "$productId": "product-1",
      "$revenueType": "revenue-1",
      "$receipt": "receipt-1",
      "$receiptSig": "sig-1",
      "$revenue": 7
    }
  }
]`, string(events))
}

func (t *ClientSuite) TestFlush() {
	logger := &mockLogger{}
	logger.On("Debugf", mock.Anything, mock.Anything).Return()

	config := acai.NewConfig("your_api_key")
	config.Logger = logger

	client := t.createClient(config)

	destPlugin := &testDestinationPlugin{}
	destPlugin.On("Flush").Once()
	client.Add(destPlugin)

	client.Flush()

	destPlugin.AssertExpectations(t.T())
	logger.AssertExpectations(t.T())
}

func (t *ClientSuite) TestShutdown() {
	logger := &mockLogger{}
	logger.On("Debugf", mock.Anything, mock.Anything).Return()

	config := acai.NewConfig("your_api_key")
	config.Logger = logger

	client := t.createClient(config)

	destPlugin := &testDestinationPlugin{}
	destPlugin.On("Shutdown").Once()
	client.Add(destPlugin)

	client.Shutdown()

	destPlugin.AssertExpectations(t.T())
	logger.AssertExpectations(t.T())
}

func (t *ClientSuite) TestPanicInPlugins() {
	logger := &mockLogger{}
	logger.On("Debugf", mock.Anything, mock.Anything).Return()
	logger.On("Errorf", "Panic in plugin %s.Execute: %s", []interface{}{"test-before-plugin", "panic in test-before-plugin"}).Return().Once()
	logger.On("Errorf", "Panic in plugin %s.Execute: %s", []interface{}{"test-enrichment-plugin", "panic in test-enrichment-plugin"}).Return().Once()
	logger.On("Errorf", "Panic in plugin %s.Execute: %s", []interface{}{"test-destination-plugin", "panic in test-destination-plugin"}).Return().Once()

	config := acai.NewConfig("your_api_key")
	config.Logger = logger
	config.FlushQueueSize = 3
	config.ExecuteCallback = func(result types.ExecuteResult) {
		panic("callback panic")
	}

	client := t.createClient(config)
	client.Add(&testBeforePlugin{raisePanic: true})
	client.Add(&testEnrichmentPlugin{raisePanic: true})

	destPlugin := &testDestinationPlugin{raisePanic: true}
	client.Add(destPlugin)

	client.Track(t.createEvent(1))

	t.Require().Equal(0, len(destPlugin.events))

	logger.AssertExpectations(t.T())
}

func (t *ClientSuite) createClient(config types.Config) acai.Client {
	client := acai.NewClient(config)
	client.Remove("context")
	client.Remove("acai")

	return client
}

func (t *ClientSuite) createEvent(index int) acai.Event {
	postfix := fmt.Sprintf("-%d", index)

	return acai.Event{
		EventType: "event" + postfix,
		EventOptions: types.EventOptions{
			UserID:   "user" + postfix,
			InsertID: "insert" + postfix,
			Time:     int64(index),
		},
		EventProperties: map[string]interface{}{
			"prop" + postfix: index,
		},
	}
}

type testBeforePlugin struct {
	currentIP  int
	raisePanic bool
}

func (p *testBeforePlugin) Name() string {
	return "test-before-plugin"
}

func (p *testBeforePlugin) Type() acai.PluginType {
	return acai.PluginTypeBefore
}

func (p *testBeforePlugin) Setup(types.Config) {
}

func (p *testBeforePlugin) Execute(event *acai.Event) *acai.Event {
	p.currentIP++

	if p.raisePanic {
		panic("panic in test-before-plugin")
	}

	event.IP = "IP " + strconv.Itoa(p.currentIP)

	return event
}

type testEnrichmentPlugin struct {
	raisePanic bool
}

func (p *testEnrichmentPlugin) Name() string {
	return "test-enrichment-plugin"
}

func (p *testEnrichmentPlugin) Type() acai.PluginType {
	return acai.PluginTypeEnrichment
}

func (p *testEnrichmentPlugin) Setup(types.Config) {
}

func (p *testEnrichmentPlugin) Execute(event *acai.Event) *acai.Event {
	if p.raisePanic {
		panic("panic in test-enrichment-plugin")
	}

	event.City = event.IP + " city"

	return event
}

type testDestinationPlugin struct {
	mock.Mock
	raisePanic bool
	events     []*acai.Event
}

func (p *testDestinationPlugin) Name() string {
	return "test-destination-plugin"
}

func (p *testDestinationPlugin) Type() acai.PluginType {
	return acai.PluginTypeDestination
}

func (p *testDestinationPlugin) Setup(types.Config) {
}

func (p *testDestinationPlugin) Execute(event *acai.Event) {
	if p.raisePanic {
		panic("panic in test-destination-plugin")
	}

	p.events = append(p.events, event)
}

func (p *testDestinationPlugin) Flush() {
	p.Called()
}

func (p *testDestinationPlugin) Shutdown() {
	p.Called()
}

type mockLogger struct {
	mock.Mock
}

func (l *mockLogger) Debugf(message string, args ...interface{}) {
	l.Called(message, args)
}

func (l *mockLogger) Infof(message string, args ...interface{}) {
	l.Called(message, args)
}

func (l *mockLogger) Warnf(message string, args ...interface{}) {
	l.Called(message, args)
}

func (l *mockLogger) Errorf(message string, args ...interface{}) {
	l.Called(message, args)
}
