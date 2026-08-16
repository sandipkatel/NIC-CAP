// lib/services/eventService.js
import { apiRequest } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const eventService = {
  list: (query = "") => apiRequest(`${ENDPOINTS.events.list}${query}`),

  create: (payload) => apiRequest(ENDPOINTS.events.create, { method: "POST", body: payload }),

  detail: (id) => apiRequest(ENDPOINTS.events.detail(id)),

  update: (id, payload) =>
    apiRequest(ENDPOINTS.events.update(id), { method: "PATCH", body: payload }),

  publish: (id) => apiRequest(ENDPOINTS.events.publish(id), { method: "POST" }),

  complete: (id) => apiRequest(ENDPOINTS.events.complete(id), { method: "POST" }),

  addTeamMember: (id, ambassadorId, role) =>
    apiRequest(ENDPOINTS.events.addTeamMember(id), {
      method: "POST",
      body: { ambassador_id: ambassadorId, role },
    }),

  removeTeamMember: (eventId, ambassadorId) =>
    apiRequest(ENDPOINTS.events.removeTeamMember(eventId, ambassadorId), { method: "DELETE" }),

  submitReport: (id, formData) =>
    apiRequest(ENDPOINTS.events.submitReport(id), { method: "POST", body: formData, isForm: true }),

  uploadReportImage: (reportId, formData) =>
    apiRequest(ENDPOINTS.events.uploadReportImage(reportId), {
      method: "POST",
      body: formData,
      isForm: true,
    }),
};
