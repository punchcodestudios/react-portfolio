import { z } from "zod";

/**
 * Radio Field Schemas
 *
 * Validation schemas for radio button inputs.
 * Radio buttons are used for single selection from a predefined list of options.
 *
 * Common use cases:
 * - Gender selection
 * - Payment method
 * - Shipping method
 * - Account type
 * - Priority level
 */

/**
 * Radio button validation factory
 * Used for: single selection from multiple options
 *
 * @param options - Valid option values
 * @param fieldName - Name of the field for error messages
 *
 * Validation rules:
 * - Must select exactly one option
 * - Selected value must be in the allowed options
 *
 * @example
 * const genderField = createRadioField(["male", "female", "other"], "gender");
 */
export function createRadioField(
  options: readonly string[],
  fieldName: string = "option"
) {
  if (options.length === 0) {
    throw new Error("Radio field must have at least one option");
  }

  const [first, ...rest] = options;

  return z.enum([first, ...rest] as [string, ...string[]], {
    required_error: `Please select a ${fieldName}`,
    invalid_type_error: `Please select a valid ${fieldName}`,
  });
}

/**
 * Optional radio button validation factory
 * Used for: optional single selection
 *
 * @param options - Valid option values
 *
 * Validation rules:
 * - Selection is optional
 * - If provided, must be in the allowed options
 */
export function createOptionalRadioField(options: readonly string[]) {
  if (options.length === 0) {
    throw new Error("Radio field must have at least one option");
  }

  const [first, ...rest] = options;

  return z.enum([first, ...rest] as [string, ...string[]]).optional();
}

/**
 * Common radio field presets
 */

// Gender selection
export const genderField = createRadioField(
  ["male", "female", "non-binary", "prefer-not-to-say"] as const,
  "gender"
);

// Yes/No question
export const yesNoField = createRadioField(["yes", "no"] as const, "answer");

// Priority level
export const priorityField = createRadioField(
  ["low", "medium", "high", "urgent"] as const,
  "priority"
);

// Account type
export const accountTypeField = createRadioField(
  ["personal", "business", "enterprise"] as const,
  "account type"
);

// Payment method
export const paymentMethodField = createRadioField(
  ["credit-card", "debit-card", "paypal", "bank-transfer"] as const,
  "payment method"
);

// Shipping method
export const shippingMethodField = createRadioField(
  ["standard", "express", "overnight"] as const,
  "shipping method"
);

// Notification preference
export const notificationPreferenceField = createRadioField(
  ["email", "sms", "push", "none"] as const,
  "notification preference"
);
