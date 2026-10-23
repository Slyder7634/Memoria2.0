import test from 'node:test';
import assert from 'node:assert/strict';

import { createMemoryStore, normalizeEntry, summarizeMemories } from './index.js';

test('normalizeEntry trims and provides fallback', () => {
  assert.equal(normalizeEntry('  Hello world  '), 'Hello world');
  assert.equal(normalizeEntry('   '), 'Untitled memory');
  assert.equal(normalizeEntry(null), 'Untitled memory');
});

test('createMemoryStore tracks memory entries', () => {
  const store = createMemoryStore();

  const first = store.add('First memory');
  const second = store.add('Second memory');

  assert.equal(first.text, 'First memory');
  assert.equal(second.text, 'Second memory');
  assert.equal(store.count(), 2);
  assert.equal(store.list().length, 2);
});

test('summarizeMemories returns totals and latest entry', () => {
  const entries = [{ text: 'Alpha' }, { text: 'Beta' }];

  assert.deepEqual(summarizeMemories(entries), { total: 2, latest: 'Beta' });
  assert.deepEqual(summarizeMemories([]), { total: 0, latest: null });
});
