import { Honeypot, SpamError } from "remix-utils/honeypot/server";

export const honeypot = new Honeypot({
  validFromFieldName: process.env.TESTING ? null : undefined,
  // 🐨 add an encryptionSeed option to the honeypot constructor
  // and set it to the HONEYPOT_SECRET enviroenment variable
  // encryptionSeed: process.env.HONEYPOT_SECRET,
});

export async function checkForHoneypot(formData: FormData) {
  // console.log("honeypot form data: ", formData);
  try {
    // honeypot.check(formData);
    await honeypot.check(formData);
  } catch (error) {
    if (error instanceof SpamError) {
      throw new Response("Form not submitted properly", { status: 400 });
    }
    throw new Response("Something went wrong", { status: 500 });
  }
}
