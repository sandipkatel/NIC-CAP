// lib/services/locationService.js
// Note: these endpoints return bare arrays, not {success, data} - responseParser
// already handles that, so this file looks the same as any other service.

import { apiRequest } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const locationService = {
  provinces: () => apiRequest(ENDPOINTS.locations.provinces, { auth: false }),
  districts: (provinceId) => apiRequest(ENDPOINTS.locations.districts(provinceId), { auth: false }),
  cities: (districtId) => apiRequest(ENDPOINTS.locations.cities(districtId), { auth: false }),
};
