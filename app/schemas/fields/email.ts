import { z } from "zod";

/**
 * Email validation
 * Used for: all email input fields
 *
 * Validation rules:
 * - Valid email format (RFC 5322)
 * - Maximum 255 characters (database standard)
 * - Lowercase normalized
 * - Trims whitespace
 *
 * @example
 * emailField.parse("user@example.com") // ✓ valid
 * emailField.parse("invalid-email") // ✗ throws error
 */
export const emailField = z
  .string({ required_error: "Email is required" })
  .trim()
  .toLowerCase()
  .email("Invalid email address")
  .max(255, "Email cannot exceed 255 characters");

/**
 * Optional email validation
 * Same rules as emailField but allows empty string
 */
export const optionalEmailField = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address")
  .max(255, "Email cannot exceed 255 characters")
  .optional()
  .or(z.literal(""));
