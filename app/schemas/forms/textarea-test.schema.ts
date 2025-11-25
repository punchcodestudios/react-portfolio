import { z } from "zod";
import {
  shortMessageField,
  messageField,
  longTextField,
  bioField,
} from "../fields";

/**
 * Textarea component test schema
 *
 * This schema is used for testing all textarea component variants.
 * It includes different textarea types with appropriate validation.
 *
 * This ensures that both the test page and production forms use
 * identical validation rules.
 */
export const textareaTestSchema = z.object({
  /** Short message - 1-250 characters */
  shortMessage: shortMessageField,

  /** Standard message - 1-1000 characters */
  standardMessage: messageField,

  /** Long description - 10-500 characters */
  description: longTextField,

  /** Bio/about - 20-1000 characters */
  bio: bioField,
});

/**
 * Type inference for textarea test form data
 */
export type TextareaTestFormData = z.infer<typeof textareaTestSchema>;
