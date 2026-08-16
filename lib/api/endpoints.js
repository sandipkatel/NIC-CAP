// lib/api/endpoints.js
// Single source of truth for backend paths (relative to BACKEND_API_URL).

export const ENDPOINTS = {
  auth: {
    login: "/auth/login/",
    refresh: "/auth/token/refresh/",
    logout: "/auth/logout/",
    me: "/auth/me/",
    passwordChange: "/auth/password/change/",
    passwordReset: "/auth/password/reset/",
    passwordResetConfirm: "/auth/password/reset/confirm/",
  },
  applications: {
    create: "/applications/",
    detail: (id) => `/applications/${id}/`,
    adminList: "/applications/admin/",
    adminDecision: (id) => `/applications/admin/${id}/decision/`,
  },
  ambassadors: {
    list: "/ambassadors/",
    detail: (id) => `/ambassadors/${id}/`,
    me: "/ambassadors/me/",
    profileEditCreate: "/ambassadors/profile-edits/create/",
    profileEditList: "/ambassadors/profile-edits/",
    profileEditDetail: (id) => `/ambassadors/profile-edits/${id}/`,
    adminProvision: "/ambassadors/admin/provision/",
    adminList: "/ambassadors/admin/",
    adminDetail: (id) => `/ambassadors/admin/${id}/`,
    batchList: "/ambassadors/batches/",
  },
  locations: {
    provinces: "/locations/provinces/",
    districts: (provinceId) => `/locations/districts/?province=${provinceId}`,
    cities: (districtId) => `/locations/cities/?district=${districtId}`,
  },
  verification: {
    list: "/verification/",
    detail: (id) => `/verification/${id}/`,
    adminList: "/verification/admin/",
    adminDetail: (id) => `/verification/admin/${id}/`,
    adminApprove: (id) => `/verification/admin/${id}/approve/`,
    adminReject: (id) => `/verification/admin/${id}/reject/`,
  },
};
