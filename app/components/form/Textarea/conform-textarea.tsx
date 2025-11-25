import { useInputControl, type FieldMetadata } from "@conform-to/react";
import { Textarea, type TextareaProps } from "./textarea";

/**
 * ConformTextarea Component
 *
 * Accessible textarea component integrated with Conform for React Router forms.
 * Automatically handles validation state, error messages, and ARIA attributes.
 *
 * Features:
 * - Full Conform integration with useInputControl
 * - Automatic error display from validation
 * - Character counter with warning states
 * - ARIA attributes for accessibility
 * - CVA variants for visual states
 * - Automatic validation on blur/input
 *
 * @example
 * ```tsx
 * <ConformTextarea
 *   meta={fields.message}
 *   label="Your Message"
 *   placeholder="Enter your message"
 *   required
 *   showCharCount
 *   maxLength={500}
 * />
 * ```
 */

export interface ConformTextareaProps extends Omit<TextareaProps, "name"> {
  meta: FieldMetadata<string>;
}

export function ConformTextarea({ meta, ...props }: ConformTextareaProps) {
  const control = useInputControl(meta);
  const hasError = Boolean(meta.errors && meta.errors.length > 0);

  return (
    <Textarea
      name={meta.name}
      id={meta.id}
      variant={hasError ? "error" : props.variant}
      error={hasError ? meta.errors?.[0] : undefined}
      defaultValue={meta.initialValue}
      value={control.value}
      onChange={(e) => control.change(e.target.value)}
      onBlur={control.blur}
      onFocus={control.focus}
      form={meta.formId}
      aria-invalid={hasError || undefined}
      aria-describedby={meta.descriptionId}
      {...props}
    />
  );
}
