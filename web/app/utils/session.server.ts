import { createCookie, createCookieSessionStorage } from "react-router";

const cookie = createCookie("pcs_user-session", {
  sameSite: "lax",
  path: "/",
  httpOnly: true,
  secrets: process.env.SESSION_SECRET.split(","),
  secure: process.env.NODE_ENV === "production",
});

export const sessionStorage = createCookieSessionStorage({
  cookie,
});
