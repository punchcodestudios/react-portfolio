import { z } from "zod";
import {
  selectField,
  countryField,
  stateField,
  createEnumSelect,
} from "../fields";

/**
 * Select component test schema
 *
 * This schema is used for testing all select component variants.
 * It includes different select types with appropriate validation.
 *
 * This ensures that both the test page and production forms use
 * identical validation rules.
 */

// Define enum for role selection
const roles = ["admin", "editor", "viewer", "guest"] as const;
const roleField = createEnumSelect(roles, "Please select a valid role");

// Define enum for priority selection
const priorities = ["low", "medium", "high", "urgent"] as const;
const priorityField = createEnumSelect(
  priorities,
  "Please select a priority level"
);

export const selectTestSchema = z.object({
  /** Basic select - required */
  basicSelect: selectField,

  /** Country selection - ISO 3166-1 alpha-2 */
  country: countryField,

  /** US State selection */
  state: stateField,

  /** Role selection - enum validation */
  role: roleField,

  /** Priority selection - enum validation */
  priority: priorityField,
});

/**
 * Type inference for select test form data
 */
export type SelectTestFormData = z.infer<typeof selectTestSchema>;
