import { getInputProps, type FieldMetadata } from "@conform-to/react";
import { Input, type InputProps } from "./input";
import { getConformInputType } from "~/utils/form-helper";

interface ConformInputProps
  extends Omit<InputProps, "name" | "defaultValue" | "id" | "form"> {
  meta: FieldMetadata<string | number | boolean>;
}

export function ConformInput({ meta, type, ...props }: ConformInputProps) {
  const conformType = getConformInputType(type);
  const inputProps = getInputProps(meta, {
    type: conformType,
    ariaAttributes: true,
  });

  return (
    <Input {...inputProps} type={type} error={meta.errors?.[0]} {...props} />
  );
}
