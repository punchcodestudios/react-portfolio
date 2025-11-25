import { z } from "zod";

/**
 * Hex color validation
 * Used for: color picker fields
 *
 * Validation rules:
 * - Valid hex color format (#RRGGBB)
 * - Case insensitive
 * - Must start with #
 *
 * @example
 * colorField.parse("#FF5733") // ✓ valid
 * colorField.parse("#ff5733") // ✓ valid
 * colorField.parse("FF5733") // ✗ throws error (missing #)
 */
export const colorField = z
  .string({ required_error: "Color is required" })
  .regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color (e.g., #FF5733)");

/**
 * RGB color validation
 * Used for: RGB color input
 */
export const rgbColorField = z
  .string({ required_error: "Color is required" })
  .regex(
    /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,
    "Must be a valid RGB color (e.g., rgb(255, 87, 51))"
  );
