import type { GlobalError, GlobalErrorDetails } from "~/entities/error";

/**
 * Creates a GlobalError with flexible details structure
 */
export const createGlobalError = (
  message: string,
  code: string,
  details: GlobalErrorDetails = {},
  stack?: string,
  retryCount: number = 0
): GlobalError => {
  return {
    id: `${code}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    message,
    stack: stack || "",
    details: JSON.stringify(details),
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
    retryCount,
  };
};

/**
 * Creates error details with common fields, but allows partial data
 */
export const createErrorDetails = (
  partialDetails: Partial<{
    component: string;
    route: string;
    section: string;
    errorInfo: any;
    originalError: any;
  }> &
    Record<string, any> = {}
): GlobalErrorDetails => {
  return {
    timestamp: new Date().toISOString(),
    ...partialDetails,
  };
};

/**
 * Increments retry count on an existing GlobalError
 */
export const incrementRetryCount = (error: GlobalError): GlobalError => {
  return {
    ...error,
    retryCount: error.retryCount + 1,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Converts a standard Error to GlobalError with flexible details
 */
export const toGlobalError = (
  error: Error,
  code: string,
  details: GlobalErrorDetails = {}
): GlobalError => {
  return createGlobalError(
    error.message,
    code,
    {
      originalError: error,
      ...details,
    },
    error.stack
  );
};

/**
 * Parses GlobalError details back to typed object
 */
export const parseErrorDetails = (
  error: GlobalError
): GlobalErrorDetails | null => {
  try {
    return JSON.parse(error.details) as GlobalErrorDetails;
  } catch {
    return null;
  }
};
