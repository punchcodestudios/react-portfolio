import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { SolidIcon } from "~/utils/enums";
import { cn } from "~/utils/site";

interface Props {
  text: string;
}

interface WithIconProps {
  text: string;
  icon: SolidIcon;
}

const badgeVariants = cva("rounded-sm py-1 px-2 m-1 flex items-center", {
  variants: {
    variant: {
      primary:
        "bg-primary font-fontSize-mega text-siteWhite hover:text-primary-accented hover:bg-primary-muted",
      secondary:
        "bg-primary text-secondary hover:text-secondary-accented hover:bg-secondary-muted",
      red: "bg-primary text-error hover:text-error-accented hover:bg-error-muted",
      silver:
        "bg-primary text-silver hover:text-silver-accented hover:bg-silver-muted",
      blue: "bg-primary text-information hover:text-information-accented hover:bg-information-muted",
      green:
        "bg-primary text-success hover:text-success-accented hover:bg-success-muted",
      yellow:
        "bg-primary text-warning hover:text-warning-accented hover:bg-warning-muted",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
    },
    columns: {
      fit: "",
      two: "w-[50%]",
      three: "w-[33.3%]",
      four: "w-[25%]",
      five: "w-[20%]",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
    columns: "fit",
  },
});

export interface BadgeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLButtonElement, BadgeProps>(
  ({ variant, size, className, columns, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(badgeVariants({ variant, size, columns, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
export { Badge, badgeVariants };
