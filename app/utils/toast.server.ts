import {
  createCookie,
  createCookieSessionStorage,
  redirect,
} from "react-router";
import { combineHeaders } from "./site";
import { z } from "zod";
import { createId as cuid } from "@paralleldrive/cuid2";

export const toastKey = "toast";
const ToastSchema = z.object({
  description: z.string(),
  id: z.string().default(() => cuid()),
  title: z.string().optional(),
  type: z.enum(["message", "success", "error"]).default("message"),
});

export type Toast = z.infer<typeof ToastSchema>;
export type ToastInput = z.input<typeof ToastSchema>;

const cookie = createCookie("pcs_toast", {
  sameSite: "lax",
  path: "/",
  httpOnly: true,
  secrets: process.env.SESSION_SECRET.split(","),
  secure: process.env.NODE_ENV === "heroku",
});

export const toastSessionStorage = createCookieSessionStorage({
  cookie,
});

export async function redirectWithToast(
  url: string,
  toast: ToastInput,
  init?: ResponseInit
) {
  return redirect(url, {
    ...init,
    headers: combineHeaders(init?.headers, await createToastHeaders(toast)),
  });
}

export async function createToastHeaders(toastInput: ToastInput) {
  const session = await toastSessionStorage.getSession();
  const toast = ToastSchema.parse(toastInput);
  session.flash(toastKey, toast);
  const cookie = await toastSessionStorage.commitSession(session);
  return new Headers({ "Set-Cookie": cookie });
}

export async function getToast(request: Request) {
  const session = await toastSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const result = ToastSchema.safeParse(session.get(toastKey));
  const toast = result.success ? result.data : null;
  return {
    toast,
    headers: toast
      ? new Headers({
          "Set-Cookie": await toastSessionStorage.destroySession(session),
        })
      : null,
  };
}
