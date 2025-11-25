import { z } from "zod";

/**
 * Password validation
 * Used for: password input fields
 *
 * Validation rules:
 * - Minimum 8 characters
 * - Maximum 128 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordField = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password cannot exceed 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

/**
 * Simple password validation
 * Used for: less strict password requirements
 *
 * Validation rules:
 * - Minimum 8 characters only
 */
export const simplePasswordField = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password cannot exceed 128 characters");

/**
 * Password confirmation validation factory
 * Used for: password confirmation fields
 *
 * @param passwordFieldName - The name of the password field to match
 */
export function createPasswordConfirmation(
  passwordFieldName: string = "password"
) {
  return z
    .string({ required_error: "Please confirm your password" })
    .min(1, "Please confirm your password");
}
