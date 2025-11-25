import { z } from "zod";
import {
  textField,
  emailField,
  phoneField,
  urlField,
  simplePasswordField,
  numberField,
  dateField,
  timeField,
  colorField,
} from "../fields";

/**
 * Input component test schema
 *
 * This schema is used for testing all input component variants.
 * It includes every supported input type with appropriate validation.
 *
 * This ensures that both the test page and production forms use
 * identical validation rules.
 */
export const inputTestSchema = z.object({
  /** Standard text input */
  textInput: textField,

  /** Email input with format validation */
  emailInput: emailField,

  /** US phone number (10 digits) */
  telInput: phoneField,

  /** URL with protocol requirement */
  urlInput: urlField,

  /** Password with minimum length */
  passwordInput: simplePasswordField,

  /** Number input with range 1-100 */
  numberInput: numberField,

  /** Date picker input */
  dateInput: dateField,

  /** Time picker input */
  timeInput: timeField,

  /** Color picker (hex format) */
  colorInput: colorField,
});

/**
 * Type inference for input test form data
 */
export type InputTestFormData = z.infer<typeof inputTestSchema>;
