import { z } from "zod";

/**
 * First name validation
 * Used for: user first name fields
 *
 * Validation rules:
 * - Minimum 1 character
 * - Maximum 50 characters
 * - Trims whitespace
 * - Letters, spaces, hyphens, and apostrophes only
 */
export const firstNameField = z
  .string({ required_error: "First name is required" })
  .trim()
  .min(1, "First name is required")
  .max(50, "First name cannot exceed 50 characters")
  .regex(
    /^[a-zA-Z\s'-]+$/,
    "First name can only contain letters, spaces, hyphens, and apostrophes"
  );

/**
 * Last name validation
 * Used for: user last name fields
 *
 * Same rules as firstNameField
 */
export const lastNameField = z
  .string({ required_error: "Last name is required" })
  .trim()
  .min(1, "Last name is required")
  .max(50, "Last name cannot exceed 50 characters")
  .regex(
    /^[a-zA-Z\s'-]+$/,
    "Last name can only contain letters, spaces, hyphens, and apostrophes"
  );

/**
 * Full name validation
 * Used for: single name input fields
 *
 * Validation rules:
 * - Minimum 2 characters (first + space + last initial)
 * - Maximum 100 characters
 */
export const fullNameField = z
  .string({ required_error: "Full name is required" })
  .trim()
  .min(2, "Full name must be at least 2 characters")
  .max(100, "Full name cannot exceed 100 characters")
  .regex(
    /^[a-zA-Z\s'-]+$/,
    "Name can only contain letters, spaces, hyphens, and apostrophes"
  );

/**
 * Organization name validation
 * Used for: company, organization fields
 *
 * Validation rules:
 * - Maximum 100 characters
 * - Optional field
 */
export const organizationField = z
  .string()
  .trim()
  .max(100, "Organization name cannot exceed 100 characters")
  .optional()
  .or(z.literal(""));
