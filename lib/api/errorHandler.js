// lib/api/errorHandler.js
// Catches anything apiRequest() itself couldn't (bugs, unexpected throws) so
// no raw error ever bubbles up to a Server Action's return value / the client.

import { logger } from "@/lib/logger";

export async function withErrorHandling(fn, fallbackMessage = "Something went wrong.") {
  try {
    return await fn();
  } catch (err) {
    logger.error("Unhandled error in service/action layer", err);
    return { ok: false, message: fallbackMessage };
  }
}
