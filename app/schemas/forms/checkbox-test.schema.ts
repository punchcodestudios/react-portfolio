import { z } from "zod";
import {
  checkboxField,
  optionalCheckboxField,
  termsField,
  newsletterField,
  createCheckboxGroup,
} from "../fields";

/**
 * Checkbox component test schema
 *
 * This schema is used for testing all checkbox component variants.
 * It includes single checkboxes and checkbox groups with validation.
 */

// Create checkbox group for interests (1-3 selections)
const interestsOptions = [
  "coding",
  "design",
  "writing",
  "marketing",
  "sales",
] as const;
const interestsField = createCheckboxGroup(
  1,
  3,
  interestsOptions as unknown as string[]
);

export const checkboxTestSchema = z.object({
  /** Required single checkbox - terms acceptance */
  acceptTerms: termsField,

  /** Optional checkbox - newsletter subscription */
  subscribeNewsletter: newsletterField,

  /** Optional checkbox - remember me */
  rememberMe: optionalCheckboxField,

  /** Checkbox group - interests (1-3 required) */
  interests: interestsField,
});

/**
 * Type inference for checkbox test form data
 */
export type CheckboxTestFormData = z.infer<typeof checkboxTestSchema>;
