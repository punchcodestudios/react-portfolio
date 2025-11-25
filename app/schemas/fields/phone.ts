import { z } from "zod";

/**
 * US Phone number validation (10 digits)
 * Used for: phone number input fields
 *
 * Validation rules:
 * - Exactly 10 digits
 * - No spaces, dashes, or special characters
 * - US format only
 *
 * Accepts: 1234567890
 * Rejects: 123-456-7890, (123) 456-7890, +1 123 456 7890
 *
 * @example
 * phoneField.parse("1234567890") // ✓ valid
 * phoneField.parse("123-456-7890") // ✗ throws error
 */
export const phoneField = z
  .string({ required_error: "Phone number is required" })
  .regex(/^\d{10}$/, "Must be exactly 10 digits (no spaces or dashes)");

/**
 * Optional phone number validation
 * Same rules as phoneField but allows empty string
 */
export const optionalPhoneField = z
  .string()
  .regex(/^\d{10}$/, "Must be exactly 10 digits (no spaces or dashes)")
  .optional()
  .or(z.literal(""));

/**
 * International phone number validation
 * Used for: international phone input fields
 *
 * Validation rules:
 * - 7-15 digits
 * - May start with +
 * - Allows spaces, dashes, parentheses
 *
 * @example
 * internationalPhoneField.parse("+1 (234) 567-8900") // ✓ valid
 * internationalPhoneField.parse("+44 20 7123 4567") // ✓ valid
 */
export const internationalPhoneField = z
  .string({ required_error: "Phone number is required" })
  .regex(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
    "Invalid phone number format"
  )
  .min(7, "Phone number too short")
  .max(20, "Phone number too long");
