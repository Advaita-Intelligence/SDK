// ─── Acai Ingest Server — API Key Store ───────────────────────────────────────
// In production, replace this with a database lookup (Postgres, Redis, etc.)

import { StoredEvent } from './types';

interface Project {
  id: string;
  name: string;
  apiKey: string;
  createdAt: number;
}

// In-memory API key registry — replace with DB in production
const PROJECTS: Map<string, Project> = new Map();

// Seed a default project from environment
const defaultApiKey = process.env.ACAI_API_KEY || 'acai_dev_key_replace_me';
PROJECTS.set(defaultApiKey, {
  id: 'default',
  name: 'Default Project',
  apiKey: defaultApiKey,
  createdAt: Date.now(),
});

export function validateApiKey(apiKey: string): Project | null {
  return PROJECTS.get(apiKey) || null;
}

export function registerApiKey(apiKey: string, projectName: string): Project {
  const project: Project = {
    id: `proj_${Date.now()}`,
    name: projectName,
    apiKey,
    createdAt: Date.now(),
  };
  PROJECTS.set(apiKey, project);
  return project;
}

// ─── In-Memory Event Store ───────────────────────────────────────────────────
// Replace with your database (Postgres, ClickHouse, BigQuery, etc.) in production

const eventStore: StoredEvent[] = [];

export function storeEvents(events: StoredEvent[]): void {
  eventStore.push(...events);
  // In production: await db.insert(events)
}

export function getEvents(projectId: string, limit = 100): StoredEvent[] {
  return eventStore
    .filter((e) => e._project_id === projectId)
    .slice(-limit);
}

export function getEventCount(projectId: string): number {
  return eventStore.filter((e) => e._project_id === projectId).length;
}
