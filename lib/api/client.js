// lib/api/client.js
// The ONLY place in the app that calls the Django backend directly.
// Only ever imported from lib/services/* (which is only imported from actions/*
// and route handlers) — never from a Client Component.

import { logger } from "@/lib/logger";
import { getAccessToken } from "@/lib/auth/session";
import { parseSuccess, parseError } from "./responseParser";

const BASE_URL = process.env.BACKEND_API_URL;

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, isForm = false, auth = true } = options;

  try {
    const headers = {};
    if (!isForm && body) headers["Content-Type"] = "application/json";

    if (auth) {
      const token = await getAccessToken();
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
      cache: "no-store",
    });

    const raw = await res.json().catch(() => null);

    if (!res.ok) {
      return parseError(raw, res.status);
    }

    return parseSuccess(raw);
  } catch (err) {
    // Network failure, backend down, DNS error, etc. Logged server-side only —
    // the caller (a Server Action) gets a clean, generic message back.
    logger.error(`API request failed: ${method} ${path}`, err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
