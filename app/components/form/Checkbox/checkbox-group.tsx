import * as React from "react";
import { Checkbox, type CheckboxProps } from "./checkbox";
import { cn } from "~/utils/site";

export interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  options: CheckboxOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  onBlur?: () => void;
  required?: boolean;
  variant?: CheckboxProps["variant"];
  checkboxSize?: CheckboxProps["checkboxSize"];
  orientation?: "vertical" | "horizontal";
  className?: string;
  id?: string;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      description,
      error,
      helperText,
      options,
      value = [],
      onValueChange,
      onBlur,
      required,
      variant,
      checkboxSize,
      orientation = "vertical",
      className,
      id,
    },
    ref
  ) => {
    const groupId = id || React.useId();
    const errorId = `${groupId}-error`;
    const helperId = `${groupId}-helper`;
    const descriptionId = `${groupId}-description`;
    const hasError = Boolean(error);

    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
      if (!onValueChange) return;

      if (checked) {
        onValueChange([...value, optionValue]);
      } else {
        onValueChange(value.filter((v) => v !== optionValue));
      }
    };

    // Determine aria-describedby
    const describedBy =
      [
        hasError ? errorId : null,
        helperText ? helperId : null,
        description ? descriptionId : null,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div ref={ref} className={cn("w-full space-y-3", className)}>
        {(label || description) && (
          <div className="space-y-1">
            {label && (
              <div
                className="text-sm font-medium leading-none text-foreground"
                id={`${groupId}-label`}
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </div>
            )}
            {description && (
              <p id={descriptionId} className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        <div
          role="group"
          aria-labelledby={label ? `${groupId}-label` : undefined}
          aria-describedby={describedBy}
          aria-invalid={hasError}
          className={cn(
            // Always apply these base styles
            // "w-full",
            // Conditional layout styles - don't mix space-y with flex gap
            orientation === "vertical"
              ? "flex flex-col gap-3 w-full"
              : "flex flex-row flex-wrap gap-6"
          )}
        >
          {options.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              description={option.description}
              checked={value.includes(option.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.value, checked)
              }
              onBlur={onBlur}
              disabled={option.disabled}
              variant={variant}
              checkboxSize={checkboxSize}
            />
          ))}
        </div>

        {helperText && !hasError && (
          <p
            id={helperId}
            className="text-sm text-muted-foreground"
            role="status"
          >
            {helperText}
          </p>
        )}
        {hasError && (
          <p
            id={errorId}
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
