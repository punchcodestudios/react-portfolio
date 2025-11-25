import { z } from "zod";

/**
 * Generic select field validation
 * Used for: dropdown selections
 *
 * Validation rules:
 * - Must be a non-empty string
 * - Required by default
 *
 * @example
 * selectField.parse("option1") // ✓ valid
 * selectField.parse("") // ✗ throws error
 */
export const selectField = z
  .string({ required_error: "Please select an option" })
  .min(1, "Please select an option");

/**
 * Optional select field validation
 * Same rules as selectField but allows empty string
 */
export const optionalSelectField = z.string().optional().or(z.literal(""));

/**
 * Country select validation
 * Used for: country selection dropdowns
 *
 * Validation rules:
 * - Must be a valid 2-letter country code
 * - Uppercase format (ISO 3166-1 alpha-2)
 */
export const countryField = z
  .string({ required_error: "Please select a country" })
  .length(2, "Invalid country code")
  .regex(/^[A-Z]{2}$/, "Country code must be 2 uppercase letters");

/**
 * State/Province select validation
 * Used for: US state or Canadian province selection
 *
 * Validation rules:
 * - Must be a valid 2-letter state/province code
 * - Uppercase format
 */
export const stateField = z
  .string({ required_error: "Please select a state/province" })
  .length(2, "Invalid state/province code")
  .regex(/^[A-Z]{2}$/, "State/province code must be 2 uppercase letters");

/**
 * Enum-based select validation factory
 * Used for: creating type-safe select fields from enums
 *
 * @param enumValues - Array of valid enum values
 * @param errorMessage - Custom error message
 *
 * @example
 * const roleField = createEnumSelect(
 *   ["admin", "user", "guest"],
 *   "Please select a valid role"
 * );
 */
export function createEnumSelect<T extends string>(
  enumValues: readonly T[],
  errorMessage: string = "Please select a valid option"
) {
  return z.enum(enumValues as [T, ...T[]], {
    required_error: errorMessage,
    invalid_type_error: errorMessage,
  });
}

/**
 * Multi-select validation factory
 * Used for: fields that allow multiple selections
 *
 * @param minSelections - Minimum number of selections required
 * @param maxSelections - Maximum number of selections allowed
 *
 * @example
 * const skillsField = createMultiSelect(1, 5);
 */
export function createMultiSelect(
  minSelections: number = 1,
  maxSelections?: number
) {
  let schema = z
    .array(z.string())
    .min(
      minSelections,
      `Please select at least ${minSelections} option${minSelections > 1 ? "s" : ""}`
    );

  if (maxSelections) {
    schema = schema.max(
      maxSelections,
      `Please select no more than ${maxSelections} option${maxSelections > 1 ? "s" : ""}`
    );
  }

  return schema;
}
