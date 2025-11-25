import { z } from "zod";
import {
  createRadioField,
  genderField,
  priorityField,
  accountTypeField,
  notificationPreferenceField,
} from "../fields/radio";

/**
 * Radio Component Test Schema
 *
 * This schema validates the radio component test page form.
 * It demonstrates various radio button patterns and validation rules.
 *
 * Fields tested:
 * - Gender selection (required, 4 options)
 * - Priority level (required, 4 options)
 * - Account type (required, 3 options)
 * - Notification preference (required, 4 options)
 * - Custom project type (required, 5 options)
 */

export const radioTestSchema = z.object({
  // Gender selection - using preset
  gender: genderField,

  // Priority level - using preset
  priority: priorityField,

  // Account type - using preset
  accountType: accountTypeField,

  // Notification preference - using preset
  notificationPreference: notificationPreferenceField,

  // Custom field - project type
  projectType: createRadioField(
    ["website", "mobile-app", "desktop-app", "api", "other"] as const,
    "project type"
  ),
});

export type RadioTestFormData = z.infer<typeof radioTestSchema>;
