/**
 * Input types that Conform's getInputProps supports
 * @see https://conform.guide/api/react/getInputProps
 */
export const CONFORM_INPUT_TYPES = [
  "text",
  "email",
  "tel",
  "url",
  "password",
  "search",
  "number",
  "date",
  "datetime-local",
  "month",
  "time",
  "week",
  "color",
  "file",
  "hidden",
  "checkbox",
  "radio",
  "range",
] as const;

/**
 * Type guard to check if a string is a valid Conform input type
 */
export function isConformInputType(
  type: string | undefined
): type is (typeof CONFORM_INPUT_TYPES)[number] {
  return type !== undefined && CONFORM_INPUT_TYPES.includes(type as any);
}

/**
 * Get a valid Conform input type, defaulting to "text" for invalid types
 */
export function getConformInputType(
  type: string | undefined,
  defaultType: (typeof CONFORM_INPUT_TYPES)[number] = "text"
): (typeof CONFORM_INPUT_TYPES)[number] {
  return isConformInputType(type) ? type : defaultType;
}
