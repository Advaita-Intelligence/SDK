# 🫐 Acai Ingest Server

A self-hosted event ingest server that accepts events from the Acai Analytics SDK.
Compatible with `@acai/analytics-browser`, `@acai/analytics-node`, and `@acai/analytics-react-native`.

---

## Quick Start

```bash
cd ingest-server
npm install

# Development (with auto-reload)
ACAI_API_KEY=my_secret_key npm run dev

# Production
npm run build
ACAI_API_KEY=my_secret_key npm start
```

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `ACAI_API_KEY` | `acai_dev_key_replace_me` | Default project API key |
| `ADMIN_ENABLED` | `false` | Enable admin debug routes |
| `ADMIN_SECRET` | _(none)_ | Secret for admin routes |

---

## Endpoints

### `POST /2/httpapi`
Main event ingest endpoint. Used by the SDK by default.

### `POST /batch`
Batch event ingest endpoint. Used when `useBatch: true` is set in the SDK.

### `GET /health`
Health check endpoint. Returns `{ status: "ok" }`.

### `GET /admin/events` _(admin only)_
View ingested events. Requires `ADMIN_ENABLED=true` and `x-admin-key` header.

---

## SDK Integration

```typescript
import * as acai from '@acai/analytics-browser';

acai.init('YOUR_ACAI_API_KEY', {
  serverUrl: 'https://your-ingest-server.com/2/httpapi',
});
```

---

## Production Storage

The default implementation uses **in-memory storage** (data lost on restart).

Replace the `storeEvents()` function in `src/store.ts` with your real storage:

### PostgreSQL
```typescript
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function storeEvents(events: StoredEvent[]): Promise<void> {
  for (const event of events) {
    await pool.query(
      `INSERT INTO events (id, project_id, event_type, user_id, device_id, 
       time, event_properties, received_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [event._id, event._project_id, event.event_type, event.user_id,
       event.device_id, event.time, JSON.stringify(event.event_properties), event._received_at]
    );
  }
}
```

### ClickHouse (recommended for analytics scale)
```typescript
import { createClient } from '@clickhouse/client';
const client = createClient({ url: process.env.CLICKHOUSE_URL });

export async function storeEvents(events: StoredEvent[]): Promise<void> {
  await client.insert({
    table: 'acai_events',
    values: events,
    format: 'JSONEachRow',
  });
}
```

### Kafka / Message Queue
```typescript
import { Kafka } from 'kafkajs';
const kafka = new Kafka({ brokers: ['localhost:9092'] });
const producer = kafka.producer();

export async function storeEvents(events: StoredEvent[]): Promise<void> {
  await producer.send({
    topic: 'acai-events',
    messages: events.map((e) => ({ value: JSON.stringify(e) })),
  });
}
```

---

## Deploy with Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist ./dist
ENV PORT=3000
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

```bash
docker build -t acai-ingest-server .
docker run -p 3000:3000 \
  -e ACAI_API_KEY=my_secret_key \
  -e ADMIN_ENABLED=true \
  -e ADMIN_SECRET=my_admin_secret \
  acai-ingest-server
```
