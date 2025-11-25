import { useInputControl, type FieldMetadata } from "@conform-to/react";
import { Checkbox, type CheckboxProps } from "./checkbox";

/**
 * ConformCheckbox Component
 *
 * Accessible checkbox component integrated with Conform for React Router forms.
 * Automatically handles validation state, error messages, and ARIA attributes.
 *
 * Built on Radix UI Checkbox for full accessibility support including:
 * - Keyboard navigation (Space to toggle)
 * - Screen reader announcements
 * - Focus management
 * - ARIA checkbox pattern
 *
 * Features:
 * - Full Conform integration with useInputControl
 * - Automatic error display from validation
 * - ARIA attributes for accessibility
 * - CVA variants for visual states
 * - Support for indeterminate state
 * - Optional description text
 *
 * @example
 * ```tsx
 * <ConformCheckbox
 *   meta={fields.acceptTerms}
 *   label="I accept the terms and conditions"
 *   description="You must accept to continue"
 *   required
 * />
 * ```
 */

export interface ConformCheckboxProps
  extends Omit<CheckboxProps, "name" | "checked" | "onCheckedChange"> {
  meta: FieldMetadata<boolean | string>;
}

export function ConformCheckbox({ meta, ...props }: ConformCheckboxProps) {
  const control = useInputControl(meta);
  const hasError = Boolean(meta.errors && meta.errors.length > 0);

  // Handle both boolean and string values (for Conform's checkbox handling)
  const isChecked = control.value === "on" || !!control.value === true;

  return (
    <Checkbox
      name={meta.name}
      id={meta.id}
      variant={hasError ? "error" : props.variant}
      error={hasError ? meta.errors?.[0] : undefined}
      checked={isChecked}
      onCheckedChange={(checked) => {
        control.change(checked ? "on" : "");
      }}
      onBlur={control.blur}
      onFocus={control.focus}
      aria-invalid={hasError || undefined}
      aria-describedby={meta.descriptionId}
      {...props}
    />
  );
}
