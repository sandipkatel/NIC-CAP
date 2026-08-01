"use server";

import { applicationService } from "@/lib/services/applicationService";
import { withErrorHandling } from "@/lib/api/errorHandler";

export async function submitApplicationAction(formData) {
  return withErrorHandling(() => applicationService.submit(formData));
}

export async function getApplicationStatusAction(id) {
  return withErrorHandling(() => applicationService.getStatus(id));
}

export async function adminListApplicationsAction(query = "") {
  return withErrorHandling(() => applicationService.adminList(query));
}

export async function adminDecideApplicationAction(id, decision, reviewComment) {
  return withErrorHandling(() => applicationService.adminDecision(id, decision, reviewComment));
}
