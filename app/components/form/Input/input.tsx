import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/site";

const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-success focus-visible:ring-success",
        warning: "border-warning focus-visible:ring-warning",
      },
      inputSize: {
        sm: "h-8 text-xs",
        default: "h-10",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      inputSize,
      label,
      error,
      helperText,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const hasError = Boolean(error);
    const currentVariant = hasError ? "error" : variant;

    // Determine appropriate autocomplete value based on input type and name
    const getAutocomplete = (): string | undefined => {
      if (props.autoComplete) return props.autoComplete;

      // Common autocomplete mappings
      if (type === "email") return "email";
      if (type === "tel") return "tel";
      if (type === "url") return "url";

      // Password field autocomplete
      if (type === "password") {
        const name = props.name?.toLowerCase() || "";
        if (name.includes("new") || name.includes("confirm")) {
          return "new-password";
        }
        return "current-password";
      }

      // Name fields
      const name = props.name?.toLowerCase() || "";
      if (name.includes("firstname") || name === "fname") return "given-name";
      if (name.includes("lastname") || name === "lname") return "family-name";
      if (name.includes("name") && !name.includes("username")) return "name";
      if (name.includes("username")) return "username";

      // Organization
      if (name.includes("organization") || name.includes("company"))
        return "organization";

      // Address fields
      if (name.includes("address")) return "street-address";
      if (name.includes("city")) return "address-level2";
      if (name.includes("state")) return "address-level1";
      if (name.includes("zip") || name.includes("postal")) return "postal-code";
      if (name.includes("country")) return "country-name";

      return undefined;
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant: currentVariant, inputSize, className })
          )}
          ref={ref}
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          autoComplete={getAutocomplete()}
          {...props}
        />
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

Input.displayName = "Input";

export { Input, inputVariants };
