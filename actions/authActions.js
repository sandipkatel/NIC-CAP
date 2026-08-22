"use server";

import { authService } from "@/lib/services/authService";
import { withErrorHandling } from "@/lib/api/errorHandler";
import { setSession, getRefreshToken, clearSession } from "@/lib/auth/session";

export async function loginAction(email, password) {
  return withErrorHandling(async () => {
    const res = await authService.login(email, password);
    if (!res.ok) return res;

    await setSession({ access: res.data.tokens.access, refresh: res.data.tokens.refresh });

    // Tokens stay in the httpOnly cookie - never sent back into the response body.
    return {
      ok: true,
      data: { user: res.data.user, mustChangePassword: res.data.must_change_password },
    };
  });
}

export async function logoutAction() {
  return withErrorHandling(async () => {
    const refresh = await getRefreshToken();
    const res = await authService.logout(refresh);
    await clearSession();
    return res.ok ? { ok: true } : res;
  });
}

export async function getCurrentUserAction() {
  return withErrorHandling(() => authService.me());
}

export async function changePasswordAction(payload) {
  return withErrorHandling(() => authService.changePassword(payload));
}

export async function requestPasswordResetAction(email) {
  return withErrorHandling(() => authService.requestPasswordReset(email));
}

export async function confirmPasswordResetAction(payload) {
  return withErrorHandling(() => authService.confirmPasswordReset(payload));
}
