import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'ReplyRadar', version: '0.1.0', mode: 'read-only' });
  });
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API endpoint not found' }));
  app.use(express.static(dist));
  app.use((req, res) => {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    res.sendFile(path.join(dist, 'index.html'));
  });
  return app;
}
