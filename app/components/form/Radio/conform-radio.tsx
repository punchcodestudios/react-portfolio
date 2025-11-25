import { useState, useEffect } from "react";
import { type FieldMetadata } from "@conform-to/react";
import { RadioGroup, type RadioGroupProps } from "./radio";

/**
 * ConformRadioGroup Component
 *
 * Radio group integrated with Conform for React Router forms.
 * Handles single selection with full validation support.
 *
 * Features:
 * - Full Conform integration for radio groups
 * - Automatic error display from validation
 * - Real-time revalidation as selection changes
 * - ARIA radiogroup pattern
 * - Horizontal or vertical layouts
 * - Blur validation support
 *
 * @example
 * ```tsx
 * <ConformRadioGroup
 *   meta={fields.gender}
 *   label="Select Your Gender"
 *   options={[
 *     { value: "male", label: "Male" },
 *     { value: "female", label: "Female" },
 *     { value: "non-binary", label: "Non-binary" },
 *   ]}
 *   required
 * />
 * ```
 */

export interface ConformRadioGroupProps
  extends Omit<RadioGroupProps, "name" | "value" | "onValueChange" | "onBlur"> {
  meta: FieldMetadata<string>;
}

export function ConformRadioGroup({ meta, ...props }: ConformRadioGroupProps) {
  const hasError = Boolean(meta.errors && meta.errors.length > 0);

  // Use state to track selected value
  const [selectedValue, setSelectedValue] = useState<string>(
    (meta.initialValue as string | undefined) || ""
  );

  const handleValueChange = (value: string) => {
    setSelectedValue(value);

    // Trigger revalidation on change by dispatching input event
    setTimeout(() => {
      const inputEvent = new Event("input", { bubbles: true });
      document.getElementById(`${meta.id}-trigger`)?.dispatchEvent(inputEvent);
    }, 0);
  };

  const handleBlur = () => {
    // Trigger Conform validation on blur
    const blurEvent = new Event("blur", { bubbles: true });
    document.getElementById(`${meta.id}-trigger`)?.dispatchEvent(blurEvent);
  };

  // Sync hidden input when selectedValue changes
  useEffect(() => {
    // Dispatch input event to trigger Conform's onChange validation
    const form = document.getElementById(`${meta.id}-trigger`)?.closest("form");
    if (form && hasError) {
      // Trigger form validation to clear errors when value becomes valid
      const inputEvent = new Event("input", { bubbles: true });
      document.getElementById(`${meta.id}-trigger`)?.dispatchEvent(inputEvent);
    }
  }, [selectedValue, meta.id, hasError]);

  return (
    <>
      {/* Hidden input that Conform tracks for validation events */}
      <input
        id={`${meta.id}-trigger`}
        type="hidden"
        name={`${meta.name}-trigger`}
        value={selectedValue}
      />

      {/* Hidden input for form submission */}
      <input type="hidden" name={meta.name} value={selectedValue} />

      <RadioGroup
        id={meta.id}
        variant={hasError ? "error" : props.variant}
        error={hasError ? meta.errors?.[0] : undefined}
        value={selectedValue}
        onValueChange={handleValueChange}
        onBlur={handleBlur}
        aria-invalid={hasError || undefined}
        aria-describedby={meta.descriptionId}
        {...props}
      />
    </>
  );
}
