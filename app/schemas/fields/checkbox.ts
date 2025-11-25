import { z } from "zod";

/**
 * Single checkbox validation (required)
 * Used for: terms acceptance, consent checkboxes
 *
 * Validation rules:
 * - Must be checked (true)
 * - Returns boolean
 *
 * @example
 * checkboxField.parse(true) // ✓ valid
 * checkboxField.parse(false) // ✗ throws error
 */
export const checkboxField = z
  .boolean({ required_error: "This field is required" })
  .refine((val) => val === true, {
    message: "You must accept to continue",
  });

/**
 * Optional checkbox validation
 * Used for: optional preferences, settings
 *
 * Validation rules:
 * - Can be true or false
 * - Defaults to false if not provided
 */
export const optionalCheckboxField = z.boolean().default(false);

/**
 * Checkbox group validation factory
 * Used for: multi-select options
 *
 * @param minSelections - Minimum selections required
 * @param maxSelections - Maximum selections allowed
 * @param options - Valid option values
 *
 * @example
 * const skillsField = createCheckboxGroup(1, 5, ["js", "ts", "react"]);
 */
export function createCheckboxGroup(
  minSelections: number = 0,
  maxSelections?: number,
  options?: readonly string[]
) {
  let schema:
    | z.ZodArray<z.ZodString>
    | z.ZodArray<z.ZodEnum<[string, ...string[]]>>;

  if (options && options.length > 0) {
    // Ensure we have at least one option for the enum
    const [first, ...rest] = options;
    schema = z.array(z.enum([first, ...rest] as [string, ...string[]]));
  } else {
    schema = z.array(z.string());
  }

  if (minSelections > 0) {
    schema = schema.min(
      minSelections,
      `Please select at least ${minSelections} option${minSelections > 1 ? "s" : ""}`
    );
  }

  if (maxSelections) {
    schema = schema.max(
      maxSelections,
      `Please select no more than ${maxSelections} option${maxSelections > 1 ? "s" : ""}`
    );
  }

  return schema;
}

/**
 * Terms and conditions acceptance
 * Strict validation requiring explicit acceptance
 */
export const termsField = z.boolean().refine((val) => val === true, {
  message: "You must accept the terms and conditions",
});

/**
 * Newsletter subscription checkbox
 * Optional with default false
 */
export const newsletterField = z.boolean().default(false);

/**
 * Privacy policy acceptance
 * Required for data collection
 */
export const privacyField = z.boolean().refine((val) => val === true, {
  message: "You must accept the privacy policy",
});
