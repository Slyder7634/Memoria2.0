export function normalizeEntry(entry) {
  const text = String(entry ?? '').trim();
  return text.length > 0 ? text : 'Untitled memory';
}

export function createMemoryStore() {
  const entries = [];

  return {
    add(entry) {
      const normalized = normalizeEntry(entry);
      entries.push({ id: entries.length + 1, text: normalized, createdAt: new Date().toISOString() });
      return entries[entries.length - 1];
    },
    list() {
      return [...entries];
    },
    count() {
      return entries.length;
    },
  };
}

export function summarizeMemories(entries) {
  return {
    total: Array.isArray(entries) ? entries.length : 0,
    latest: Array.isArray(entries) && entries.length > 0 ? entries[entries.length - 1].text : null,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const store = createMemoryStore();
  store.add('Project kickoff');
  store.add('Ship the next iteration');
  console.log(JSON.stringify(summarizeMemories(store.list()), null, 2));
}
