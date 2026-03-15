const express = require('express');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Acai API endpoints
const ACAI_API_BASE = 'https://api2.acai.yourdomain.com';
const ACAI_BATCH_API = 'https://events.acai.yourdomain.com/batch';

// Store for tracking requests (in-memory for demo purposes)
const requestLog = [];

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy endpoint for single events
app.post('/2/httpapi', async (req, res) => {
  try {
    console.log('📊 Received Acai event:', JSON.stringify(req.body, null, 2));
    
    // Log the request
    requestLog.push({
      timestamp: new Date().toISOString(),
      type: 'single_event',
      data: req.body
    });

    // Forward to Acai API
    const response = await axios.post(ACAI_API_BASE + '/2/httpapi', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Acai-Proxy-Server/1.0'
      }
    });

    console.log('✅ Forwarded to Acai successfully');
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('❌ Error forwarding to Acai:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to forward to Acai',
      details: error.response?.data || error.message
    });
  }
});

// Proxy endpoint for batch events
app.post('/batch', async (req, res) => {
  try {
    console.log('📦 Received Acai batch events:', JSON.stringify(req.body, null, 2));
    
    // Log the request
    requestLog.push({
      timestamp: new Date().toISOString(),
      type: 'batch_events',
      data: req.body
    });

    // Forward to Acai batch API
    const response = await axios.post(ACAI_BATCH_API, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Acai-Proxy-Server/1.0'
      }
    });

    console.log('✅ Forwarded batch to Acai successfully');
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('❌ Error forwarding batch to Acai:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to forward batch to Acai',
      details: error.response?.data || error.message
    });
  }
});

// Debug endpoint to view logged requests
app.get('/debug/requests', (req, res) => {
  res.json({
    total_requests: requestLog.length,
    requests: requestLog.slice(-50) // Last 50 requests
  });
});

// Clear debug logs
app.delete('/debug/requests', (req, res) => {
  requestLog.length = 0;
  res.json({ message: 'Request log cleared' });
});

// Serve a simple test page
app.get('/test', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Acai Proxy Test</title>
        <script src="https://cdn.acai.yourdomain.com/libs/acai-8.21.0-min.gz.js"></script>
    </head>
    <body>
        <h1>Acai Proxy Test Page</h1>
        <p>This page tests the Acai proxy server.</p>
        <button onclick="sendTestEvent()">Send Test Event</button>
        <button onclick="sendBatchEvents()">Send Batch Events</button>
        <div id="status"></div>

        <script>
            // Initialize Acai with proxy server
            acai.getInstance().init('YOUR_API_KEY', null, {
                serverUrl: 'http://localhost:${PORT}',
                serverZone: 'US'
            });

            function sendTestEvent() {
                acai.getInstance().logEvent('Test Event', {
                    source: 'proxy_test',
                    timestamp: Date.now()
                });
                document.getElementById('status').innerHTML = '<p>✅ Test event sent!</p>';
            }

            function sendBatchEvents() {
                // Send multiple events
                for (let i = 0; i < 3; i++) {
                    acai.getInstance().logEvent('Batch Test Event', {
                        batch_index: i,
                        source: 'proxy_test',
                        timestamp: Date.now()
                    });
                }
                document.getElementById('status').innerHTML = '<p>✅ Batch events sent!</p>';
            }
        </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Acai Proxy Server running on http://localhost:${PORT}`);
  console.log(`📊 Single events: http://localhost:${PORT}/2/httpapi`);
  console.log(`📦 Batch events: http://localhost:${PORT}/batch`);
  console.log(`🔍 Debug logs: http://localhost:${PORT}/debug/requests`);
  console.log(`🧪 Test page: http://localhost:${PORT}/test`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

module.exports = app; 