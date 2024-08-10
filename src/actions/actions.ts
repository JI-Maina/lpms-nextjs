import { cookies } from "next/headers";

export async function handleLogin(
  id: string,
  role: string,
  access: string,
  refresh: string
) {
  cookies().set("session_userId", id, {
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
