// lib/services/applicationService.js
import { apiRequest } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const applicationService = {
  // Public "apply to become an ambassador" form - multipart (cv, cover letter, etc).
  submit: (formData) =>
    apiRequest(ENDPOINTS.applications.create, {
      method: "POST",
      body: formData,
      isForm: true,
      auth: false,
    }),

  getStatus: (id) => apiRequest(ENDPOINTS.applications.detail(id), { auth: false }),

  adminList: (query = "") => apiRequest(`${ENDPOINTS.applications.adminList}${query}`),

  adminDecision: (id, decision, reviewComment) =>
    apiRequest(ENDPOINTS.applications.adminDecision(id), {
      method: "PATCH",
      body: { decision, review_comment: reviewComment },
    }),
};
