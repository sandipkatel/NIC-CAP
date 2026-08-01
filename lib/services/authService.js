// lib/services/authService.js
import { apiRequest } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const authService = {
  login: (email, password) =>
    apiRequest(ENDPOINTS.auth.login, { method: "POST", body: { email, password }, auth: false }),

  logout: (refresh) => apiRequest(ENDPOINTS.auth.logout, { method: "POST", body: { refresh } }),

  me: () => apiRequest(ENDPOINTS.auth.me),

  changePassword: (payload) =>
    apiRequest(ENDPOINTS.auth.passwordChange, { method: "POST", body: payload }),

  requestPasswordReset: (email) =>
    apiRequest(ENDPOINTS.auth.passwordReset, { method: "POST", body: { email }, auth: false }),

  confirmPasswordReset: (payload) =>
    apiRequest(ENDPOINTS.auth.passwordResetConfirm, { method: "POST", body: payload, auth: false }),
};
