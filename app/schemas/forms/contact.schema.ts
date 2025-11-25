import { z } from "zod";
import {
  emailField,
  firstNameField,
  lastNameField,
  messageField,
  organizationField,
  phoneField,
  optionalPhoneField,
  textField,
} from "../fields";

/**
 * Contact form schema options
 */
export interface ContactSchemaOptions {
  /** Whether phone number is required */
  requirePhone?: boolean;
  /** Whether organization field is included */
  includeOrganization?: boolean;
  /** Custom message max length */
  maxMessageLength?: number;
  /** Custom subject max length */
  maxSubjectLength?: number;
}

/**
 * Creates a contact form validation schema
 *
 * @param options - Configuration options for the schema
 * @returns Zod schema for contact form validation
 *
 * @example
 * ```typescript
 * // Basic contact form
 * const schema = createContactSchema();
 *
 * // Contact form with required phone
 * const schema = createContactSchema({ requirePhone: true });
 *
 * // Contact form with organization
 * const schema = createContactSchema({ includeOrganization: true });
 * ```
 */
export function createContactSchema(options: ContactSchemaOptions = {}) {
  const {
    requirePhone = false,
    includeOrganization = true,
    maxMessageLength = 1000,
    maxSubjectLength = 100,
  } = options;

  return z.object({
    firstName: firstNameField,
    lastName: lastNameField,
    email: emailField,
    phone: requirePhone ? phoneField : optionalPhoneField,
    ...(includeOrganization && { organization: organizationField }),
    subject: textField.max(
      maxSubjectLength,
      `Subject cannot exceed ${maxSubjectLength} characters`
    ),
    message: messageField.max(
      maxMessageLength,
      `Message cannot exceed ${maxMessageLength} characters`
    ),
  });
}

/**
 * Type inference for contact form data
 */
export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

/**
 * Default contact schema (most common use case)
 */
export const contactSchema = createContactSchema({
  requirePhone: false,
  includeOrganization: true,
});
