import { useState, useEffect } from "react";
import { type FieldMetadata } from "@conform-to/react";
import { CheckboxGroup, type CheckboxGroupProps } from "./checkbox-group";

/**
 * ConformCheckboxGroup Component
 *
 * Multi-select checkbox group integrated with Conform for React Router forms.
 * Handles arrays of selected values with full validation support.
 *
 * Features:
 * - Full Conform integration for checkbox groups
 * - Automatic error display from validation
 * - Support for min/max selections validation
 * - Real-time revalidation as selections change
 * - ARIA group pattern
 * - Horizontal or vertical layouts
 * - Blur validation support
 *
 * @example
 * ```tsx
 * <ConformCheckboxGroup
 *   meta={fields.interests}
 *   label="Select Your Interests"
 *   options={[
 *     { value: "coding", label: "Coding" },
 *     { value: "design", label: "Design" },
 *     { value: "writing", label: "Writing" },
 *   ]}
 *   required
 * />
 * ```
 */

export interface ConformCheckboxGroupProps
  extends Omit<
    CheckboxGroupProps,
    "name" | "value" | "onValueChange" | "onBlur"
  > {
  meta: FieldMetadata<string[]>;
}

export function ConformCheckboxGroup({
  meta,
  ...props
}: ConformCheckboxGroupProps) {
  const hasError = Boolean(meta.errors && meta.errors.length > 0);

  // Use state to track selected values
  const [selectedValues, setSelectedValues] = useState<string[]>(
    (meta.initialValue as string[] | undefined) || []
  );

  const handleValueChange = (value: string[]) => {
    setSelectedValues(value);

    // Trigger revalidation on change by dispatching input event
    // This allows Conform to revalidate as the user makes changes
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

  // Sync hidden inputs when selectedValues changes
  useEffect(() => {
    // Dispatch input event to trigger Conform's onChange validation
    const form = document.getElementById(`${meta.id}-trigger`)?.closest("form");
    if (form && hasError) {
      // Trigger form validation to clear errors when values become valid
      const inputEvent = new Event("input", { bubbles: true });
      document.getElementById(`${meta.id}-trigger`)?.dispatchEvent(inputEvent);
    }
  }, [selectedValues, meta.id, hasError]);

  return (
    <>
      {/* Hidden input that Conform tracks for validation events */}
      <input
        id={`${meta.id}-trigger`}
        type="hidden"
        name={`${meta.name}-trigger`}
        value={selectedValues.length.toString()}
        // This hidden field acts as a proxy for Conform to track changes
      />

      {/* Hidden inputs for form submission - Conform pattern for checkbox groups */}
      {selectedValues.length > 0 ? (
        selectedValues.map((value, index) => (
          <input
            key={`${value}-${index}`}
            type="hidden"
            name={meta.name}
            value={value}
          />
        ))
      ) : (
        // Ensure at least one input exists for Conform to track
        <input type="hidden" name={meta.name} value="" />
      )}

      <CheckboxGroup
        variant={hasError ? "error" : props.variant}
        error={hasError ? meta.errors?.[0] : undefined}
        value={selectedValues}
        onValueChange={handleValueChange}
        onBlur={handleBlur}
        aria-invalid={hasError || undefined}
        aria-describedby={meta.descriptionId}
        {...props}
      />
    </>
  );
}
