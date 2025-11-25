import * as React from "react";
import { FieldMetadata, useInputControl } from "@conform-to/react";
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
  extends Omit<
    CheckboxProps,
    "name" | "id" | "checked" | "onCheckedChange" | "label"
  > {
  meta: FieldMetadata<boolean>;
  label: React.ReactNode;
}

export const ConformCheckbox = React.forwardRef<
  React.ComponentRef<typeof Checkbox>,
  ConformCheckboxProps
>(({ meta, label, ...props }, ref) => {
  const checkboxId = meta.id || meta.name;

  // Use Conform's useInputControl hook to manage the checkbox state
  const control = useInputControl(meta);

  return (
    <Checkbox
      ref={ref}
      id={checkboxId}
      name={meta.name}
      checked={control.value === "on"}
      onCheckedChange={(checked) => {
        // Use Conform's change handler to update the value
        control.change(checked ? "on" : "");
      }}
      onFocus={control.focus}
      onBlur={control.blur}
      aria-invalid={meta.errors && meta.errors.length > 0}
      aria-describedby={
        meta.errors && meta.errors.length > 0
          ? `${checkboxId}-error`
          : undefined
      }
      label={label}
      error={meta.errors?.[0]}
      {...props}
    />
  );
});

ConformCheckbox.displayName = "ConformCheckbox";
