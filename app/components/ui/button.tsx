/**
 * https://cva.style/docs
 * https://www.radix-ui.com/primitives/docs/overview/introduction
 * https://www.npmjs.com/package/clsx (referenced in utilities)
 * https://github.com/dcastil/tailwind-merge/blob/v2.6.0/docs/when-and-how-to-use-it.md (referenced in utils)
 */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/utils/site";

const buttonVariants = cva(
  "inline-flex w-full px-3 items-center justify-center text-sm font-medium ring-offset-background transition-colors outline-none focus-visible:ring-4 focus-within:ring-4 ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:text-primary-accented border border-4 border-primary hover:bg-primary-muted hover:border-primary-muted",
        primary:
          "bg-primary text-primary-foreground hover:text-primary-accented border border-4 border-primary hover:bg-primary-muted hover:border-primary-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:text-secondary-accented border border-4 border-secondary hover:bg-secondary-muted hover:border-secondary-muted",
        error:
          "bg-error text-error-foreground hover:text-error-accented border border-4 border-error hover:bg-error-muted hover:border-error-muted",
        warning:
          "bg-warning text-warning-foreground hover:text-warning-accented border border-4 border-warning hover:bg-warning-muted hover:border-warning-muted",
        success:
          "bg-success text-success-foreground hover:text-success-accented border border-4 border-success hover:bg-success-muted hover:border-success-muted",
        information:
          "bg-information text-information-foreground hover:text-information-accented border border-4 border-information hover:bg-information-muted hover:border-information-muted",
        disabled:
          "bg-disabled text-disabled-foreground border border-4 border-disabled cursor-not-allowed",
      },
      styleType: {
        solid: "border border-1 border-input hover:border-input",
        outline:
          "bg-transparent hover:bg-transparent text-foreground hover:text-foreground-muted",
      },
      size: {
        wide: "px-24 py-5",
        sm: "h-8",
        md: "h-10",
        lg: "h-14",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        xxxl: "rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      styleType: "solid",
      size: "md",
      rounded: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, styleType, rounded, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, styleType, rounded, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
