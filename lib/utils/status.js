// lib/utils/status.js
// Status and role values have been observed in both the documented
// UPPER_CASE and Title Case from the live backend. Normalize before
// comparing or using as a lookup key so the frontend doesn't break either way.
export function normalizeStatus(status) {
  return typeof status === "string" ? status.toUpperCase() : status;
}
