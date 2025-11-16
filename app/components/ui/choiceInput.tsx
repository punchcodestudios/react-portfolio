import React from "react";
import { cn } from "~/utils/site"; // Assuming you have a classname utility

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
  label?: string;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  onCheckedChange: (state: any) => void;
  type?: "checkbox" | "radio";
  selected?: boolean;
}

const ChoiceInput = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      error,
      wrapperClassName,
      labelClassName,
      id,
      type,
      onCheckedChange,
      name,
      selected,
      ...props
    },
    ref
  ) => {
    const choiceId = id || `choice-${Math.random().toString(36).substr(2, 9)}`;
    const choiceName =
      name || `choice-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn("flex items-center space-x-2", wrapperClassName)}>
        <input
          type={type || "checkbox"}
          ref={ref}
          id={choiceId}
          name={choiceName}
          onChange={onCheckedChange}
          checked={selected}
          className={cn(
            `h-8 w-4 rounded border
            accent-secondary border-gray-300 
            focus:ring-secondary focus:ring-offset-2
            checked:bg-secondary checked:border-secondary`,
            error && "border-red-500",
            className
          )}
          aria-describedby={error ? `${choiceId}-error` : undefined}
          {...props}
        />

        {label && (
          <label
            htmlFor={choiceId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error && "text-red-500",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        {error && (
          <p
            id={`${choiceId}-error`}
            className="text-sm text-red-500 mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

ChoiceInput.displayName = "Choice";

export default ChoiceInput;
