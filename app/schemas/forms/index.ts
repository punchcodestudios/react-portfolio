/**
 * Form Schema Factory Library
 *
 * This module exports form-level validation schemas and factory functions.
 * These schemas compose atomic field schemas into complete form validations.
 *
 * Usage:
 * ```typescript
 * import { createContactSchema, inputTestSchema } from "~/schemas/forms";
 *
 * // Use default schema
 * const schema = contactSchema;
 *
 * // Or create custom schema
 * const schema = createContactSchema({ requirePhone: true });
 * ```
 */

export {
  createContactSchema,
  contactSchema,
  type ContactFormData,
  type ContactSchemaOptions,
} from "./contact.schema";

export { inputTestSchema, type InputTestFormData } from "./input-test.schema";

export {
  textareaTestSchema,
  type TextareaTestFormData,
} from "./textarea-test.schema";

export {
  selectTestSchema,
  type SelectTestFormData,
} from "./select-test.schema";

export {
  checkboxTestSchema,
  type CheckboxTestFormData,
} from "./checkbox-test.schema";
