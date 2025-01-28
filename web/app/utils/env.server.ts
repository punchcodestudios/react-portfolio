import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"] as const),
  HONEYPOT_SECRET: z.string(),
  SESSION_SECRET: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}
function init() {
  const parsed = schema.safeParse(process.env);
  if (parsed.success === false) {
    console.error(
      "Invalid environment variable",
      parsed.error.flatten().fieldErrors
    );
  }
  throw new Error("Invalid environment variable");
}
