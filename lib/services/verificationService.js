// lib/services/verificationService.js
import { apiRequest } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const verificationService = {
  list: () => apiRequest(ENDPOINTS.verification.list),
  detail: (id) => apiRequest(ENDPOINTS.verification.detail(id)),

  adminList: (query = "") => apiRequest(`${ENDPOINTS.verification.adminList}${query}`),
  adminDetail: (id) => apiRequest(ENDPOINTS.verification.adminDetail(id)),

  adminApprove: (id) => apiRequest(ENDPOINTS.verification.adminApprove(id), { method: "PATCH" }),

  adminReject: (id, reviewComment) =>
    apiRequest(ENDPOINTS.verification.adminReject(id), {
      method: "PATCH",
      body: { review_comment: reviewComment },
    }),
};
