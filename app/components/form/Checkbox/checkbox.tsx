import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/site";

const checkboxVariants = cva(
  "peer shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-checkbox-primary data-[state=checked]:bg-checkbox-primary data-[state=checked]:text-checkbox-primary-foreground",
        error:
          "border-checkbox-error data-[state=checked]:bg-checkbox-error data-[state=checked]:text-checkbox-error-foreground",
        success:
          "border-checkbox-success data-[state=checked]:bg-checkbox-success data-[state=checked]:text-checkbox-success-foreground",
      },
      checkboxSize: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      checkboxSize: "default",
    },
  }
);

export interface CheckboxProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
      "checked" | "onCheckedChange"
    >,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode; // Changed from string to ReactNode
  description?: string;
  error?: string;
  helperText?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  className?: string;
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      variant,
      checkboxSize,
      label,
      description,
      error,
      helperText,
      checked,
      onCheckedChange,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || React.useId();
    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;
    const descriptionId = `${checkboxId}-description`;
    const labelId = `${checkboxId}-label`;
    const hasError = Boolean(error);
    const currentVariant = hasError ? "error" : variant;

    const describedBy =
      [
        hasError ? errorId : null,
        helperText ? helperId : null,
        description ? descriptionId : null,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-start gap-3">
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            className={cn(
              checkboxVariants({ variant: currentVariant, checkboxSize })
            )}
            checked={checked}
            onCheckedChange={onCheckedChange}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            aria-labelledby={label ? labelId : undefined}
            aria-required={required}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              <Check className="h-full w-full" strokeWidth={3} />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {label && (
            <div className="flex-1 space-y-1">
              <label
                id={labelId}
                htmlFor={checkboxId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer"
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </label>
              {description && (
                <p id={descriptionId} className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
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

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
