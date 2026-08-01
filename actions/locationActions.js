"use server";

import { locationService } from "@/lib/services/locationService";
import { withErrorHandling } from "@/lib/api/errorHandler";

export async function getProvincesAction() {
  return withErrorHandling(() => locationService.provinces());
}

export async function getDistrictsAction(provinceId) {
  return withErrorHandling(() => locationService.districts(provinceId));
}

export async function getCitiesAction(districtId) {
  return withErrorHandling(() => locationService.cities(districtId));
}
