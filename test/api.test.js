import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.js';

test('health exposes read-only mode and unknown API routes return JSON', async () => {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const health = await fetch(`${url}/api/health`);
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { status: 'ok', service: 'ReplyRadar', version: '0.1.0', mode: 'read-only' });
    const unknown = await fetch(`${url}/api/missing`);
    assert.equal(unknown.status, 404);
    assert.deepEqual(await unknown.json(), { error: 'API endpoint not found' });
    const mutation = await fetch(`${url}/api/health`, { method: 'POST' });
    assert.equal(mutation.status, 404);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
