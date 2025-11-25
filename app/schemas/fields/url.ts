import { z } from "zod";

/**
 * URL validation
 * Used for: website, link input fields
 *
 * Validation rules:
 * - Valid URL format
 * - Must include protocol (http:// or https://)
 * - Maximum 2048 characters (browser limit)
 *
 * @example
 * urlField.parse("https://example.com") // ✓ valid
 * urlField.parse("example.com") // ✗ throws error (missing protocol)
 */
export const urlField = z
  .string({ required_error: "URL is required" })
  .url("Invalid URL format (must include http:// or https://)")
  .max(2048, "URL cannot exceed 2048 characters");

/**
 * Optional URL validation
 * Same rules as urlField but allows empty string
 */
export const optionalUrlField = z
  .string()
  .url("Invalid URL format (must include http:// or https://)")
  .max(2048, "URL cannot exceed 2048 characters")
  .optional()
  .or(z.literal(""));
