"use server";

import { cookies } from "next/headers";

export async function handleLogin(
  username: string,
  role: string,
  access: string,
  refresh: string
) {
  cookies().set("session_username", username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // one week
    path: "/",
  });

  cookies().set("session_userRole", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // one week
    path: "/",
  });

  cookies().set("session_access_token", access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 60 mins
    path: "/",
  });

  cookies().set("session_refresh_token", refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // one week
    path: "/",
  });
}

export async function resetAuthCookies() {
  cookies().set("session_username", "");
  cookies().set("session_userRole", "");
  cookies().set("session_access_token", "");
  cookies().set("session_refresh_token", "");
}

export async function getUsername() {
  const userId = cookies().get("session_username")?.value;
  return userId;
}

export async function getAccessToken() {
  const access = cookies().get("session_access_token")?.value;
  return access;
}

export async function getRefreshToken() {
  const refresh = cookies().get("session_refresh_token")?.value;
  return refresh;
}

export async function getUserRole() {
  const role = cookies().get("session_userRole")?.value;
  return role;
}
