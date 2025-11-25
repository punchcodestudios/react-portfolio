import { z } from "zod";

/**
 * Standard text input validation
 * Used for: names, titles, general text fields
 *
 * Validation rules:
 * - Minimum 2 characters
 * - Maximum 100 characters
 * - Trims whitespace
 */
export const textField = z
  .string({ required_error: "This field is required" })
  .trim()
  .min(2, "Must be at least 2 characters")
  .max(100, "Cannot exceed 100 characters");

/**
 * Short text input validation
 * Used for: usernames, short codes
 *
 * Validation rules:
 * - Minimum 1 character
 * - Maximum 50 characters
 * - Trims whitespace
 */
export const shortTextField = z
  .string({ required_error: "This field is required" })
  .trim()
  .min(1, "This field is required")
  .max(50, "Cannot exceed 50 characters");

/**
 * Long text input validation
 * Used for: descriptions, bios
 *
 * Validation rules:
 * - Minimum 10 characters
 * - Maximum 500 characters
 * - Trims whitespace
 */
export const longTextField = z
  .string({ required_error: "This field is required" })
  .trim()
  .min(10, "Must be at least 10 characters")
  .max(500, "Cannot exceed 500 characters");

/**
 * Message/textarea validation
 * Used for: contact messages, comments
 *
 * Validation rules:
 * - Minimum 1 character
 * - Maximum 1000 characters
 * - Trims whitespace
 */
export const messageField = z
  .string({ required_error: "Message is required" })
  .trim()
  .min(1, "Message is required")
  .max(1000, "Message cannot exceed 1000 characters");

/**
 * Short message validation
 * Used for: brief comments, notes
 *
 * Validation rules:
 * - Minimum 1 character
 * - Maximum 250 characters
 * - Trims whitespace
 */
export const shortMessageField = z
  .string({ required_error: "This field is required" })
  .trim()
  .min(1, "This field is required")
  .max(250, "Cannot exceed 250 characters");

/**
 * Bio/description validation
 * Used for: user bios, about sections
 *
 * Validation rules:
 * - Minimum 20 characters
 * - Maximum 1000 characters
 * - Trims whitespace
 */
export const bioField = z
  .string({ required_error: "Bio is required" })
  .trim()
  .min(20, "Bio must be at least 20 characters")
  .max(1000, "Bio cannot exceed 1000 characters");
