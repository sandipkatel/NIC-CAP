// lib/auth/session.js
// Tokens live only in httpOnly cookies, set/read on the server - never in
// localStorage or client JS, so they're invisible to the browser's JS context.

import { cookies } from "next/headers";

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export async function setSession({ access, refresh }) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, access, { ...cookieOptions, maxAge: 60 * 15 }); // 15 min
  store.set(REFRESH_COOKIE, refresh, { ...cookieOptions, maxAge: 60 * 60 * 24 * 7 }); // 7 days
}

export async function getAccessToken() {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshToken() {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value ?? null;
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}
