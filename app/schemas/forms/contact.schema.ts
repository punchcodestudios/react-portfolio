import { z } from "zod";
import {
  emailField,
  optionalEmailField,
  optionalPhoneField,
  firstNameField,
  lastNameField,
} from "../fields";
import { messageField } from "../fields";
import { createRadioField } from "../fields/radio";

/**
 * Contact Form Schema
 *
 * Main contact form for punchcodestudios.com portfolio site.
 * Accommodates different user contexts with conditional field requirements.
 *
 * User Contexts:
 * - Recruiter/Technical Entity Representative
 * - Freelance Manager
 * - Professional Developer
 * - Casual User
 * - Other
 *
 * Security Features:
 * - Honeypot field validation
 * - CSRF token validation
 * - Rate limiting (client-side)
 *
 * Future: Auto-populate fields based on authenticated user context
 */

// User context options
export const USER_CONTEXTS = [
  "recruiter",
  "freelance-manager",
  "professional-developer",
  "casual-user",
  "other",
] as const;

export type UserContext = (typeof USER_CONTEXTS)[number];

// Contact method options (shown only if both email and phone provided)
export const CONTACT_METHODS = ["email", "phone", "either"] as const;

/**
 * Base Contact Form Schema
 *
 * Core fields required for all user contexts
 */
const baseContactSchema = z.object({
  // User context - determines which fields are required
  iAmA: createRadioField(USER_CONTEXTS, "user type"),

  // Name fields - using exported name field validators
  firstName: firstNameField,
  lastName: lastNameField,

  // Message field - using exported message field (20-2000 chars)
  message: messageField,

  // Optional phone (becomes required via refine based on context)
  phone: optionalPhoneField,

  // Location (required only for recruiter context)
  location: z
    .string()
    .min(2, "Please enter your city and state")
    .max(100, "Location must be less than 100 characters")
    .trim()
    .optional(),

  // Preferred contact method (shown only if both email and phone provided)
  preferredContactMethod: z.enum(CONTACT_METHODS).optional(),

  // Policy acceptance
  acceptedPolicies: z
    .boolean({ required_error: "You must review and accept the policies" })
    .refine((val) => val === true, {
      message: "You must accept the privacy policy and terms of use",
    }),
});

/**
 * Full Contact Form Schema with Conditional Validation
 *
 * Applies context-specific requirements:
 * - Email required for all contexts except "casual-user"
 * - Location required only for "recruiter" context
 * - Preferred contact method required if both email and phone provided
 */
export const contactFormSchema = baseContactSchema
  .extend({
    // Email - conditionally required based on context
    email: optionalEmailField,
  })
  .superRefine((data, ctx) => {
    // Email required for all contexts except casual user
    if (data.iAmA !== "casual-user" && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required for this user type",
        path: ["email"],
      });
    }

    // Validate email format if provided
    if (data.email && !emailField.safeParse(data.email).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid email address",
        path: ["email"],
      });
    }

    // Location required for recruiter context
    if (data.iAmA === "recruiter" && !data.location) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Location (city, state) is required for recruiters",
        path: ["location"],
      });
    }

    // Preferred contact method required if both email and phone provided
    if (data.email && data.phone && !data.preferredContactMethod) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select your preferred contact method",
        path: ["preferredContactMethod"],
      });
    }
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Helper function to determine which fields should be visible
 * based on the selected user context
 */
export function getVisibleFields(context: UserContext | undefined) {
  return {
    email: context !== undefined,
    phone: true, // Always visible (optional)
    location: context === "recruiter",
    preferredContactMethod: false, // Shown dynamically if email AND phone filled
  };
}

/**
 * Helper function to get user-friendly context labels
 */
export function getUserContextLabel(context: UserContext): string {
  const labels: Record<UserContext, string> = {
    recruiter: "Recruiter or Technical Entity Representative",
    "freelance-manager": "Freelance Manager",
    "professional-developer": "Professional Developer",
    "casual-user": "Casual User",
    other: "Other",
  };
  return labels[context];
}

/**
 * Helper function to get context descriptions
 */
export function getUserContextDescription(context: UserContext): string {
  const descriptions: Record<UserContext, string> = {
    recruiter:
      "Professional working for a technical placement agency, corporate hiring manager, or business owner",
    "freelance-manager":
      "Looking to hire Punch Code Studios for a single, temporary project",
    "professional-developer":
      "Peer wishing to network or collaborate on a project",
    "casual-user": "Simply browsing the site and wanting to communicate",
    other: "Any context not listed above",
  };
  return descriptions[context];
}
