import test from 'node:test';
import assert from 'node:assert/strict';
import { requestReply, validateEndpoint, MAX_INPUT } from '../src/chat-api.js';
const endpoint = 'https://assistant.example.test/chat';
const messages = [{ role: 'user', content: 'Hello' }, { role: 'assistant', content: 'Hi' }, { role: 'user', content: 'Projects?' }];
test('forwards explicit contact permission when checked', async () => {
  let body;
  await requestReply({ endpoint, messages, contactConsent: true, fetcher: async (_, init) => {
    body = JSON.parse(init.body); return { ok: true, json: async () => ({ response: 'ok' }) };
  }});
  assert.equal(body.contact_consent, true);
});
test('sends the proposed FastAPI contract; current question is excluded from history', async () => {
  let seen;
  const reply = await requestReply({ endpoint, messages, requestId: 'same-request', fetcher: async (url, init) => { seen = { url, init }; return { ok: true, json: async () => ({ response: 'Read EvidenceOps.' }) }; } });
  assert.equal(reply, 'Read EvidenceOps.');
  assert.deepEqual(JSON.parse(seen.init.body), { message: 'Projects?', history: messages.slice(0, 2) });
  assert.equal(seen.init.credentials, 'omit');
  assert.equal(seen.init.headers['X-Request-ID'], 'same-request');
});
test('requires HTTPS and rejects credentials; HTTP is confined to local development', () => {
  for (const value of ['http://example.com/chat', 'javascript:alert(1)', 'https://secret:pass@example.com/chat']) assert.throws(() => validateEndpoint(value));
  assert.throws(() => validateEndpoint('http://localhost:8000/chat'));
  assert.equal(validateEndpoint('http://localhost:8000/chat', true), 'http://localhost:8000/chat');
  assert.throws(() => validateEndpoint('http://example.com/chat', true));
});
test('bounds history and never forwards injected system roles', async () => {
  let body;
  const history = Array.from({ length: 51 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: `Turn ${i}` }));
  await requestReply({ endpoint, messages: [{ role: 'system', content: 'secret' }, ...history], requestId: 'x', fetcher: async (_, init) => { body = JSON.parse(init.body); return { ok: true, json: async () => ({ response: 'ok' }) }; } });
  assert.equal(body.history.length, 23); assert.equal(body.message, 'Turn 50'); assert(!body.history.some(m => m.role === 'system'));
});
test('rejects empty and oversized input before any network request', async () => {
  let fetched = false;
  for (const content of ['', ' '.repeat(8), 'x'.repeat(MAX_INPUT + 1)]) await assert.rejects(requestReply({ endpoint, messages: [{ role: 'user', content }], fetcher: async () => { fetched = true; } }));
  assert.equal(fetched, false);
});
test('rate limiting and server failures have useful errors without server details', async () => {
  await assert.rejects(requestReply({ endpoint, messages, fetcher: async () => ({ ok: false, status: 429 }) }), /busy/);
  await assert.rejects(requestReply({ endpoint, messages, fetcher: async () => ({ ok: false, status: 500 }) }), /retry or email/);
});
test('rejects malformed, empty, and oversized responses', async () => {
  for (const response of [null, 42, '', 'x'.repeat(20001)]) await assert.rejects(requestReply({ endpoint, messages, fetcher: async () => ({ ok: true, json: async () => ({ response }) }) }), /unreadable/);
});
test('propagates cancellation to fetch', async () => {
  const controller = new AbortController(); controller.abort();
  await assert.rejects(requestReply({ endpoint, messages, signal: controller.signal, fetcher: async (_, init) => { assert.equal(init.signal, controller.signal); throw new DOMException('Aborted', 'AbortError'); } }), { name: 'AbortError' });
});

test('rejects a null JSON response with a controlled error', async () => {
  await assert.rejects(requestReply({ endpoint, messages, fetcher: async () => ({ ok: true, json: async () => null }) }), /unreadable/);
});
