// ─── 🫐 Acai Ingest Server ────────────────────────────────────────────────────
// Self-hosted event ingest server compatible with the Acai Analytics SDK.
// Accepts events from @acai/analytics-browser, @acai/analytics-node, etc.
//
// To use with the SDK:
//   acai.init('YOUR_API_KEY', { serverUrl: 'http://localhost:3000/2/httpapi' })
// ─────────────────────────────────────────────────────────────────────────────

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { IngestRequest, IngestResponse, StoredEvent } from './types';
import { validateApiKey, storeEvents, getEvents, getEventCount } from './store';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function processIngestRequest(req: Request, res: Response): void {
  const body = req.body as IngestRequest;

  // Validate request body
  if (!body || typeof body !== 'object') {
    res.status(400).json({ code: 400, error: 'Invalid request body' } as IngestResponse);
    return;
  }

  if (!body.api_key) {
    res.status(400).json({ code: 400, error: 'Request missing field', missing_field: 'api_key' } as IngestResponse);
    return;
  }

  if (!Array.isArray(body.events) || body.events.length === 0) {
    res.status(400).json({ code: 400, error: 'Request missing field', missing_field: 'events' } as IngestResponse);
    return;
  }

  // Validate API key
  const project = validateApiKey(body.api_key);
  if (!project) {
    res.status(401).json({ code: 401, error: 'Invalid API key' } as IngestResponse);
    return;
  }

  // Enrich and store events
  const now = Date.now();
  const enrichedEvents: StoredEvent[] = body.events.map((event) => ({
    ...event,
    _id: uuidv4(),
    _received_at: now,
    _project_id: project.id,
    // Set time to now if not provided
    time: event.time ?? now,
    // Capture client IP if not already set
    ip: event.ip === '$remote' ? (req.ip ?? req.socket.remoteAddress ?? '') : (event.ip ?? ''),
  }));

  storeEvents(enrichedEvents);

  const payloadBytes = Buffer.byteLength(JSON.stringify(req.body));

  console.log(`[🫐 Acai] Project "${project.name}" — ingested ${enrichedEvents.length} events (${payloadBytes} bytes)`);

  const response: IngestResponse = {
    code: 200,
    events_ingested: enrichedEvents.length,
    payload_size_bytes: payloadBytes,
    server_upload_time: Date.now(),
  };

  res.status(200).json(response);
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'acai-ingest-server', timestamp: new Date().toISOString() });
});

// Main ingest endpoint (Acai SDK-compatible ingest endpoint)
app.post('/2/httpapi', processIngestRequest);

// Batch ingest endpoint
app.post('/batch', processIngestRequest);

// ─── Admin / Debug Routes (disable in production) ─────────────────────────────

const ADMIN_ENABLED = process.env.ADMIN_ENABLED === 'true';

if (ADMIN_ENABLED) {
  // View recent events (for debugging)
  app.get('/admin/events', (req: Request, res: Response) => {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_SECRET) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const projectId = (req.query['project'] as string) || 'default';
    const limit = Math.min(Number(req.query['limit']) || 50, 1000);
    const events = getEvents(projectId, limit);
    const total = getEventCount(projectId);

    res.json({ total, count: events.length, events });
  });

  console.log('[Acai] Admin routes enabled at /admin/*');
}

// ─── 404 Handler ─────────────────────────────────────────────────────────────

app.use((_req: Request, res: Response) => {
  res.status(404).json({ code: 404, error: 'Not found' });
});

// ─── Error Handler ────────────────────────────────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Acai] Unhandled error:', err);
  res.status(500).json({ code: 500, error: 'Internal server error' });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
  🫐  Acai Ingest Server
  ─────────────────────────────────────
  Listening on   : http://localhost:${PORT}
  Ingest URL     : http://localhost:${PORT}/2/httpapi
  Batch URL      : http://localhost:${PORT}/batch
  Health check   : http://localhost:${PORT}/health
  Admin routes   : ${ADMIN_ENABLED ? 'enabled' : 'disabled (set ADMIN_ENABLED=true to enable)'}
  ─────────────────────────────────────
  SDK usage:
    acai.init('${process.env.ACAI_API_KEY || 'acai_dev_key_replace_me'}', {
      serverUrl: 'http://localhost:${PORT}/2/httpapi'
    });
  `);
});

export default app;
