import { createCookie, type CookieOptions } from "react-router";
// import { CSRF, CSRFError } from "remix-utils/csrf/server";

// TODO URGENT: Add to future sprint: Forms and Accesibility - set env.variables

const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: false, //process.env.NODE_ENV === "production",
  sameSite: "lax",
  secrets: ["SUPER SECRET VALUE HERE FROM ENV"], //process.env.SESSION_SECRET.split(","),
};

const cookie = createCookie("csrf", cookieOptions);
// export const csrf = new CSRF({ cookie });

export async function validateCSRF(formData: FormData, headers: Headers) {
  try {
    // const valid = await csrf.validate(formData, headers);
  } catch (error) {
    if (error instanceof Error) {
      throw new Response("Invalid CSRF token", { status: 403 });
    }
    throw error;
  }
}
