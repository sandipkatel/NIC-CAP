// lib/services/ambassadorService.js
import { apiRequest } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const ambassadorService = {
  list: (query = "") => apiRequest(`${ENDPOINTS.ambassadors.list}${query}`, { auth: false }),

  listBatch: (query = "") => apiRequest(`${ENDPOINTS.ambassadors.batchList}${query}`, { auth: false }),

  getPublicProfile: (id) => apiRequest(ENDPOINTS.ambassadors.detail(id), { auth: false }),

  me: () => apiRequest(ENDPOINTS.ambassadors.me),

  submitProfileEdit: (formData) =>
    apiRequest(ENDPOINTS.ambassadors.profileEditCreate, {
      method: "POST",
      body: formData,
      isForm: true,
    }),

  listProfileEdits: () => apiRequest(ENDPOINTS.ambassadors.profileEditList),

  getProfileEdit: (id) => apiRequest(ENDPOINTS.ambassadors.profileEditDetail(id)),

  adminProvision: (payload) =>
    apiRequest(ENDPOINTS.ambassadors.adminProvision, { method: "POST", body: payload }),

  adminList: (query = "") => apiRequest(`${ENDPOINTS.ambassadors.adminList}${query}`),

  adminDetail: (id) => apiRequest(ENDPOINTS.ambassadors.adminDetail(id)),
};
