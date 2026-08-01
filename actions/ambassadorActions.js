"use server";

import { ambassadorService } from "@/lib/services/ambassadorService";
import { withErrorHandling } from "@/lib/api/errorHandler";

export async function listAmbassadorsAction(query = "") {
  return withErrorHandling(() => ambassadorService.list(query));
}

export async function getAmbassadorProfileAction(id) {
  return withErrorHandling(() => ambassadorService.getPublicProfile(id));
}

export async function getMyAmbassadorProfileAction() {
  return withErrorHandling(() => ambassadorService.me());
}

export async function submitProfileEditAction(formData) {
  return withErrorHandling(() => ambassadorService.submitProfileEdit(formData));
}

export async function listMyProfileEditsAction() {
  return withErrorHandling(() => ambassadorService.listProfileEdits());
}

export async function getProfileEditAction(id) {
  return withErrorHandling(() => ambassadorService.getProfileEdit(id));
}

export async function adminProvisionAmbassadorAction(payload) {
  return withErrorHandling(() => ambassadorService.adminProvision(payload));
}

export async function adminListAmbassadorsAction(query = "") {
  return withErrorHandling(() => ambassadorService.adminList(query));
}

export async function adminGetAmbassadorAction(id) {
  return withErrorHandling(() => ambassadorService.adminDetail(id));
}
