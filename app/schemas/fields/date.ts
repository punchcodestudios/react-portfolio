import { z } from "zod";

/**
 * Date input validation
 * Used for: date picker fields
 *
 * Validation rules:
 * - Valid ISO date string (YYYY-MM-DD)
 * - Not empty
 */
export const dateField = z
  .string({ required_error: "Date is required" })
  .min(1, "Date is required")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format");

/**
 * Time input validation
 * Used for: time picker fields
 *
 * Validation rules:
 * - Valid time string (HH:MM)
 * - Not empty
 */
export const timeField = z
  .string({ required_error: "Time is required" })
  .min(1, "Time is required")
  .regex(/^\d{2}:\d{2}$/, "Invalid time format");

/**
 * DateTime validation
 * Used for: datetime picker fields
 *
 * Validation rules:
 * - Valid ISO datetime string
 */
export const dateTimeField = z
  .string({ required_error: "Date and time are required" })
  .datetime("Invalid date and time format");

/**
 * Future date validation
 * Used for: booking, scheduling fields
 */
export const futureDateField = z
  .string({ required_error: "Date is required" })
  .refine((date) => new Date(date) > new Date(), "Date must be in the future");

/**
 * Past date validation
 * Used for: birthdate, historical event fields
 */
export const pastDateField = z
  .string({ required_error: "Date is required" })
  .refine((date) => new Date(date) < new Date(), "Date must be in the past");
