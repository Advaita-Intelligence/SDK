package internal

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/acai/analytics-go/acai/types"
)

type AcaiHTTPClient interface {
	Send(payload AcaiPayload) AcaiResponse
}

func NewAcaiHTTPClient(
	serverURL string, options AcaiPayloadOptions, logger types.Logger, connectionTimeout time.Duration,
) AcaiHTTPClient {
	var payloadOptions *AcaiPayloadOptions
	if options != (AcaiPayloadOptions{}) {
		payloadOptions = &options
	}

	return &acaiHTTPClient{
		serverURL:      serverURL,
		logger:         logger,
		payloadOptions: payloadOptions,
		httpClient: &http.Client{
			Timeout: connectionTimeout,
		},
	}
}

type AcaiPayloadOptions struct {
	MinIDLength int `json:"min_id_length,omitempty"`
}

type AcaiPayload struct {
	APIKey  string                   `json:"api_key"`
	Events  []*types.Event           `json:"events"`
	Options *AcaiPayloadOptions `json:"options,omitempty"`
}

type acaiHTTPClient struct {
	serverURL      string
	logger         types.Logger
	payloadOptions *AcaiPayloadOptions
	httpClient     *http.Client
}

func (c *acaiHTTPClient) Send(payload AcaiPayload) AcaiResponse {
	if len(payload.Events) == 0 {
		return AcaiResponse{}
	}

	payload.Options = c.payloadOptions
	payloadBytes, err := json.Marshal(payload)

	if err != nil {
		c.logger.Errorf("payload encoding failed: \n\tError: %w\n\tpayload: %+v", err, payload)

		return AcaiResponse{
			Err: fmt.Errorf("can't encode payload: %w", err),
		}
	}

	c.logger.Debugf("payloadBytes:\n\t%s", string(payloadBytes))

	request, err := http.NewRequest(http.MethodPost, c.serverURL, bytes.NewReader(payloadBytes))
	if err != nil {
		c.logger.Errorf("Building new request failed: \n\t%w", err)

		return AcaiResponse{
			Err: fmt.Errorf("can't build new request: %w", err),
		}
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Accept", "*/*")

	response, err := c.httpClient.Do(request)
	if err != nil {
		return AcaiResponse{
			Err: fmt.Errorf("HTTP request failed: %w", err),
		}
	}

	defer func() {
		err := response.Body.Close()
		if err != nil {
			c.logger.Warnf("HTTP response, close body: %s", err)
		}
	}()

	c.logger.Infof("HTTP response code: %s", response.Status)

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return AcaiResponse{
			Status: response.StatusCode,
			Err:    fmt.Errorf("can't read HTTP response body: %w", err),
		}
	}

	c.logger.Infof("HTTP response body: %s", string(body))

	var acaiResponse AcaiResponse
	if json.Valid(body) {
		_ = json.Unmarshal(body, &acaiResponse)
	} else {
		c.logger.Debugf("HTTP response body is not valid JSON: %s", string(body))
		acaiResponse.Code = response.StatusCode
	}

	acaiResponse.Status = response.StatusCode

	return acaiResponse
}
