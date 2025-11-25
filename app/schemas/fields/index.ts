/**
 * Field Schema Library
 *
 * This module exports all atomic field validation schemas used throughout
 * the application. These schemas are the building blocks for form validation.
 *
 * Usage:
 * ```typescript
 * import { emailField, phoneField } from "~/schemas/fields";
 *
 * const mySchema = z.object({
 *   email: emailField,
 *   phone: phoneField,
 * });
 * ```
 */

// Text fields
export {
  textField,
  shortTextField,
  longTextField,
  messageField,
  shortMessageField,
  bioField,
} from "./text";

// Email
export { emailField, optionalEmailField } from "./email";

// Phone
export {
  phoneField,
  optionalPhoneField,
  internationalPhoneField,
} from "./phone";

// Names
export {
  firstNameField,
  lastNameField,
  fullNameField,
  organizationField,
} from "./name";

// Password
export {
  passwordField,
  simplePasswordField,
  createPasswordConfirmation,
} from "./password";

// URL
export { urlField, optionalUrlField } from "./url";

// Number
export {
  numberField,
  positiveNumberField,
  integerField,
  priceField,
  createNumberRange,
} from "./number";

// Date/Time
export {
  dateField,
  timeField,
  dateTimeField,
  futureDateField,
  pastDateField,
} from "./date";

// Color
export { colorField, rgbColorField } from "./color";

// Select/Dropdown
export {
  selectField,
  optionalSelectField,
  countryField,
  stateField,
  createEnumSelect,
  createMultiSelect,
} from "./select";

// Checkbox
export {
  checkboxField,
  optionalCheckboxField,
  termsField,
  newsletterField,
  privacyField,
  createCheckboxGroup,
} from "./checkbox";

// Radio
export * from "./radio";
