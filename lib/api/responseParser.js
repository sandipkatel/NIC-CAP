// lib/api/responseParser.js
// The backend has 3 response shapes (see API reference §0):
//   1) { success, message, data }  -> applications / ambassadors / verification
//   2) raw payload, no wrapper     -> auth endpoints
//   3) bare array                  -> locations endpoints
// This file hides that inconsistency so services never have to think about it.

import { logger } from "@/lib/logger";

export function parseSuccess(raw) {
  if (raw && typeof raw === "object" && !Array.isArray(raw) && "success" in raw) {
    return { ok: true, message: raw.message, data: raw.data };
  }
  // bare array (locations) or raw object (auth) -> pass through as-is
  return { ok: true, data: raw };
}

export function parseError(raw, status) {
  logger.error(`Backend returned error status ${status}`, raw);

  if (!raw) {
    return { ok: false, message: "Unexpected server error.", status };
  }

  // Non-field errors: { detail: "..." }
  if (raw.detail) {
    return { ok: false, message: raw.detail, status };
  }

  // Field validation errors: { field_name: ["error"], ... }
  const fieldErrors = {};
  let firstMessage = "Validation failed.";
  for (const [key, val] of Object.entries(raw)) {
    if (Array.isArray(val)) {
      fieldErrors[key] = val;
      if (firstMessage === "Validation failed.") firstMessage = val[0];
    }
  }

  return { ok: false, message: firstMessage, fieldErrors, status };
}
