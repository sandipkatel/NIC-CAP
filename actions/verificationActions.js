"use server";

import { verificationService } from "@/lib/services/verificationService";
import { withErrorHandling } from "@/lib/api/errorHandler";

export async function listMyVerificationsAction() {
  return withErrorHandling(() => verificationService.list());
}

export async function getVerificationAction(id) {
  return withErrorHandling(() => verificationService.detail(id));
}

export async function adminListVerificationsAction(query = "") {
  return withErrorHandling(() => verificationService.adminList(query));
}

export async function adminGetVerificationAction(id) {
  return withErrorHandling(() => verificationService.adminDetail(id));
}

export async function adminApproveVerificationAction(id) {
  return withErrorHandling(() => verificationService.adminApprove(id));
}

export async function adminRejectVerificationAction(id, reviewComment) {
  return withErrorHandling(() => verificationService.adminReject(id, reviewComment));
}
