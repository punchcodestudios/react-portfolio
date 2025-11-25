import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/site";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-success focus-visible:ring-success",
        warning: "border-warning focus-visible:ring-warning",
      },
      textareaSize: {
        sm: "min-h-[60px] text-xs",
        default: "min-h-[80px]",
        lg: "min-h-[120px] text-base",
        xl: "min-h-[200px] text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      textareaSize,
      label,
      error,
      helperText,
      id,
      required,
      showCharCount = false,
      maxLength,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    const charCountId = `${textareaId}-charcount`;
    const hasError = Boolean(error);
    const currentVariant = hasError ? "error" : variant;

    // Calculate character count
    const currentLength = typeof value === "string" ? value.length : 0;
    const showCount = showCharCount && maxLength;

    // Determine aria-describedby
    const describedBy =
      [
        hasError ? errorId : null,
        helperText ? helperId : null,
        showCount ? charCountId : null,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            textareaVariants({
              variant: currentVariant,
              textareaSize,
              className,
            })
          )}
          ref={ref}
          id={textareaId}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
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
          {showCount && (
            <p
              id={charCountId}
              className={cn(
                "text-sm text-muted-foreground tabular-nums",
                currentLength > maxLength! * 0.9 && "text-warning",
                currentLength >= maxLength! && "text-destructive font-medium"
              )}
              aria-live="polite"
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
