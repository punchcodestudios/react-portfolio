import { z } from "zod";

/**
 * Number input validation
 * Used for: quantity, age, count fields
 *
 * Validation rules:
 * - Coerces string input to number
 * - Minimum value: 1
 * - Maximum value: 100
 */
export const numberField = z.coerce
  .number({ required_error: "This field is required" })
  .min(1, "Must be at least 1")
  .max(100, "Cannot exceed 100");

/**
 * Positive number validation
 * Used for: prices, quantities
 */
export const positiveNumberField = z.coerce
  .number({ required_error: "This field is required" })
  .positive("Must be a positive number");

/**
 * Integer validation
 * Used for: counts, IDs
 */
export const integerField = z.coerce
  .number({ required_error: "This field is required" })
  .int("Must be a whole number");

/**
 * Price validation
 * Used for: monetary values
 *
 * Validation rules:
 * - Positive number
 * - Maximum 2 decimal places
 */
export const priceField = z.coerce
  .number({ required_error: "Price is required" })
  .positive("Price must be positive")
  .multipleOf(0.01, "Price can have at most 2 decimal places");

/**
 * Custom number range factory
 * Used for: dynamic min/max ranges
 *
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 */
export function createNumberRange(min: number, max: number) {
  return z.coerce
    .number({ required_error: "This field is required" })
    .min(min, `Must be at least ${min}`)
    .max(max, `Cannot exceed ${max}`);
}
