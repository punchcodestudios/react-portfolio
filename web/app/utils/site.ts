import { clsx, type ClassValue } from "clsx";
import { useFormAction, useNavigation } from "react-router";
import { twMerge } from "tailwind-merge";

/**
 * try and parse an error message, if possible
 */

export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  } else if (
    error &&
    typeof error === "object" &&
    "content" in error &&
    typeof error.content === "object" &&
    error.content !== null &&
    "error" in error.content &&
    typeof error.content.error === "object" &&
    error.content.error !== null &&
    "message" in error.content.error &&
    typeof error.content.error.message === "string"
  ) {
    console.log("type of error", typeof error);
    return error.content.error.message;
  }
  console.error("Unable to get error message for error", error);
  return "Unknown Error";
}

/**
 * checks for existence of the stack trace
 * returns stack if present and in dev environment
 */
export function getStackTrace(error: unknown): string {
  if (
    error &&
    error instanceof Error &&
    process.env.NODE_ENV === "development"
  ) {
    return error.stack || "";
  }
  return "";
}

/**
 * Provide a condition and if that condition is falsey, this throws a 400
 * Response with the given message.
 *
 * inspired by invariant from 'tiny-invariant'
 *
 * @example
 * invariantResponse(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Response} if condition is falsey
 */
export function invariantResponse(
  condition: any,
  message?: string | (() => string),
  responseInit?: ResponseInit
): asserts condition {
  if (!condition) {
    throw new Response(
      typeof message === "function"
        ? message()
        : message ||
          "An invariant failed, please provide a message to explain why.",
      { status: 400, ...responseInit }
    );
  }
}

/**
 * A handy utility that makes constructing class names easier.
 * It also merges tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns true if the current navigation is submitting the current route's
 * form. Defaults to the current route's form action and method POST.
 */
export function useIsSubmitting({
  formAction,
  formMethod = "POST",
}: {
  formAction?: string;
  formMethod?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
} = {}) {
  const contextualFormAction = useFormAction();
  const navigation = useNavigation();
  return (
    navigation.state === "submitting" &&
    navigation.formAction === (formAction ?? contextualFormAction) &&
    navigation.formMethod === formMethod
  );
}
