import { z } from "zod";

export const UsernameSchema = z
  .string({ required_error: "Username is required" })
  .min(3, { message: "Username is too short" })
  .max(20, { message: "Username is too long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only include letters, numbers, and underscores",
  })
  // users can type the username in any case, but we store it in lowercase
  .transform((value) => value.toLowerCase());

export const PasswordSchema = z
  .string({ required_error: "Password is required" })
  .min(6, { message: "Password is too short" })
  .max(100, { message: "Password is too long" });
export const NameSchema = z
  .string({ required_error: "Name is required" })
  .min(3, { message: "Name is too short" })
  .max(40, { message: "Name is too long" });
export const EmailSchema = z
  .string({ required_error: "Email is required" })
  .email({ message: "Email is invalid" })
  .min(3, { message: "Email is too short" })
  .max(100, { message: "Email is too long" })
  // users can type the email in any case, but we store it in lowercase
  .transform((value) => value.toLowerCase());
export const ConfirmCodeSchema = z
  .string({ required_error: "Confirmation Code is required" })
  .min(6, { message: "Confirmation Code is too short" })
  .max(6, { message: "Confirmation Code is too long" });

export const EncodedStringSchema = z.string({
  required_error: "Encoded String is required",
});
