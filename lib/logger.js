// lib/logger.js
// Only ever imported by server-side code (Server Actions, middleware, lib/*).
// console.error/log here writes to the server terminal / server logs,
// it never reaches the browser console.

function timestamp() {
  return new Date().toISOString();
}

export const logger = {
  error(message, err) {
    console.error(`[${timestamp()}] ERROR: ${message}`, err ?? "");
  },
  info(message, meta) {
    console.log(`[${timestamp()}] INFO: ${message}`, meta ?? "");
  },
};
