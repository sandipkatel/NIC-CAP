"use server";

import { eventService } from "@/lib/services/eventService";
import { withErrorHandling } from "@/lib/api/errorHandler";

export async function listEventsAction(query = "") {
  return withErrorHandling(() => eventService.list(query));
}

export async function createEventAction(payload) {
  return withErrorHandling(() => eventService.create(payload));
}

export async function getEventAction(id) {
  return withErrorHandling(() => eventService.detail(id));
}

export async function updateEventAction(id, payload) {
  return withErrorHandling(() => eventService.update(id, payload));
}

export async function publishEventAction(id) {
  return withErrorHandling(() => eventService.publish(id));
}

export async function completeEventAction(id) {
  return withErrorHandling(() => eventService.complete(id));
}

export async function addTeamMemberAction(eventId, ambassadorId, role) {
  return withErrorHandling(() => eventService.addTeamMember(eventId, ambassadorId, role));
}

export async function removeTeamMemberAction(eventId, ambassadorId) {
  return withErrorHandling(() => eventService.removeTeamMember(eventId, ambassadorId));
}

export async function submitEventReportAction(eventId, formData) {
  return withErrorHandling(() => eventService.submitReport(eventId, formData));
}

export async function uploadReportImageAction(reportId, formData) {
  return withErrorHandling(() => eventService.uploadReportImage(reportId, formData));
}
