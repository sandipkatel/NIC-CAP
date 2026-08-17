// lib/utils/list.js
// The API reference documents list endpoints as DRF-paginated
// { count, next, previous, results }, but some have been observed returning
// a bare array in practice. Normalize both shapes so pages don't have to
// guess which one they're getting.
export function normalizeList(data) {
  if (Array.isArray(data)) {
    return { items: data, count: data.length, hasNext: false, hasPrevious: false };
  }
  return {
    items: data?.results ?? [],
    count: data?.count ?? 0,
    hasNext: Boolean(data?.next),
    hasPrevious: Boolean(data?.previous),
  };
}
