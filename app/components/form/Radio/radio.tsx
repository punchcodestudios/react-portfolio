import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/site";

const radioVariants = cva(
  "aspect-square shrink-0 rounded-full border ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default: "border-radio-primary text-radio-primary",
        error: "border-radio-error text-radio-error",
        success: "border-radio-success text-radio-success",
        warning: "border-radio-warning text-radio-warning",
      },
      radioSize: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      radioSize: "default",
    },
  }
);

const radioIndicatorVariants = cva("flex items-center justify-center", {
  variants: {
    radioSize: {
      sm: "h-1.5 w-1.5",
      default: "h-2 w-2",
      lg: "h-2.5 w-2.5",
    },
  },
  defaultVariants: {
    radioSize: "default",
  },
});

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
      "value" | "onValueChange"
    >,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
  id?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      className,
      variant,
      radioSize,
      label,
      description,
      error,
      helperText,
      options,
      value,
      onValueChange,
      onBlur,
      required,
      orientation = "vertical",
      id,
      ...props
    },
    ref
  ) => {
    const groupId = id || React.useId();
    const errorId = `${groupId}-error`;
    const helperId = `${groupId}-helper`;
    const descriptionId = `${groupId}-description`;
    const hasError = Boolean(error);
    const currentVariant = hasError ? "error" : variant;

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
      <div className={cn("w-full space-y-3", className)}>
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

        <RadioGroupPrimitive.Root
          ref={ref}
          className={cn(
            "w-full",
            orientation === "vertical"
              ? "flex flex-col gap-3"
              : "flex flex-row flex-wrap gap-6"
          )}
          value={value}
          onValueChange={onValueChange}
          onBlur={onBlur}
          aria-labelledby={label ? `${groupId}-label` : undefined}
          aria-describedby={describedBy}
          aria-invalid={hasError}
          aria-required={required}
          {...props}
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-start gap-3">
              <RadioGroupPrimitive.Item
                value={option.value}
                id={`${groupId}-${option.value}`}
                disabled={option.disabled}
                className={cn(
                  radioVariants({ variant: currentVariant, radioSize }),
                  "relative" // Add relative positioning for absolute child
                )}
              >
                <RadioGroupPrimitive.Indicator className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={cn(
                      "rounded-full bg-current",
                      radioIndicatorVariants({ radioSize })
                    )}
                  />
                </RadioGroupPrimitive.Indicator>
              </RadioGroupPrimitive.Item>

              <div className="flex-1 space-y-1">
                <label
                  htmlFor={`${groupId}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer"
                >
                  {option.label}
                </label>
                {option.description && (
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </RadioGroupPrimitive.Root>

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

RadioGroup.displayName = "RadioGroup";

export { RadioGroup, radioVariants };
