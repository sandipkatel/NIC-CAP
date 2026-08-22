// lib/auth/tokenRefresh.js
// Refresh tokens rotate on use (ROTATE_REFRESH_TOKENS=True) - always store the
// new pair returned and discard the old refresh token, per the API reference.

import { apiRequest } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { getRefreshToken, setSession, clearSession } from "./session";
import { logger } from "@/lib/logger";

export async function refreshSession() {
  const refresh = await getRefreshToken();
  if (!refresh) return false;

  const res = await apiRequest(ENDPOINTS.auth.refresh, {
    method: "POST",
    body: { refresh },
    auth: false,
  });

  if (!res.ok) {
    logger.error("Token refresh failed", res.message);
    await clearSession();
    return false;
  }

  await setSession({ access: res.data.access, refresh: res.data.refresh });
  return true;
}
