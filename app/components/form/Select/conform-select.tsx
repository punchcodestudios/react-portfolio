import { useInputControl, type FieldMetadata } from "@conform-to/react";
import { Select, type SelectProps } from "./select";

/**
 * ConformSelect Component
 *
 * Accessible select/dropdown component integrated with Conform for React Router forms.
 * Automatically handles validation state, error messages, and ARIA attributes.
 *
 * Built on Radix UI Select for full accessibility support including:
 * - Keyboard navigation (Arrow keys, Home, End, Page Up/Down)
 * - Screen reader announcements
 * - Focus management
 * - ARIA combobox pattern
 *
 * Features:
 * - Full Conform integration with useInputControl
 * - Automatic error display from validation
 * - ARIA attributes for accessibility
 * - CVA variants for visual states
 * - Automatic validation on blur/change
 * - Portal rendering for proper z-index
 *
 * @example
 * ```tsx
 * <ConformSelect
 *   meta={fields.country}
 *   label="Country"
 *   placeholder="Select your country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 *   required
 * />
 * ```
 */

export interface ConformSelectProps
  extends Omit<SelectProps, "name" | "value" | "onValueChange"> {
  meta: FieldMetadata<string>;
}

export function ConformSelect({ meta, ...props }: ConformSelectProps) {
  const control = useInputControl(meta);
  const hasError = Boolean(meta.errors && meta.errors.length > 0);

  return (
    <Select
      name={meta.name}
      id={meta.id}
      variant={hasError ? "error" : props.variant}
      error={hasError ? meta.errors?.[0] : undefined}
      value={control.value ?? meta.initialValue ?? ""}
      onValueChange={(value) => {
        control.change(value);
      }}
      onOpenChange={(open) => {
        if (!open) {
          control.blur();
        }
      }}
      aria-invalid={hasError || undefined}
      aria-describedby={meta.descriptionId}
      {...props}
    />
  );
}
