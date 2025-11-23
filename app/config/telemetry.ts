interface EnvironmentVariables {
  APPLICATIONINSIGHTS_CONNECTION_STRING?: string;
  APPINSIGHTS_INSTRUMENTATIONKEY?: string;
  NODE_ENV?: string;
  DISABLE_TELEMETRY?: string;
  npm_package_version?: string;
}

export const getTelemetryConfig = (): TelemetryConfig => telemetryConfig;
// Proper environment variable handling for Remix/React
const getEnvironmentVariable = (
  key: keyof EnvironmentVariables,
  fallback: string = ""
): string => {
  // Browser environment - use window.ENV if available
  if (typeof window !== "undefined" && window.ENV) {
    const value = (window.ENV as EnvironmentVariables)[key];
    return value || fallback;
  }

  // Server environment - use process.env
  if (typeof process !== "undefined" && process.env) {
    const value = (process.env as EnvironmentVariables)[key];
    return value || fallback;
  }

  // Fallback
  return fallback;
};

// export const getTelemetryConfig = (): TelemetryConfig => telemetryConfig;

// Telemetry configuration with proper error handling
export const telemetryConfig = {
  // Azure Application Insights connection string
  connectionString: getEnvironmentVariable(
    "APPLICATIONINSIGHTS_CONNECTION_STRING",
    "" // Empty fallback for development
  ),
  environment: getEnvironmentVariable("NODE_ENV", "development"),
  enabled: getEnvironmentVariable("DISABLE_TELEMETRY") !== "true",
  enableTelemetry: getEnvironmentVariable("NODE_ENV") === "heroku",
  enableDebugTelemetry: getEnvironmentVariable("NODE_ENV") === "development",

  // Sampling configuration
  samplingPercentage: 100,

  // Custom properties
  applicationName: "React Portfolio",
  applicationVersion: getEnvironmentVariable("npm_package_version", "1.0.0"),

  // Telemetry settings
  disableTelemetry: getEnvironmentVariable("DISABLE_TELEMETRY") === "true",

  // Azure Application Insights specific settings
  instrumentationKey: getEnvironmentVariable(
    "APPINSIGHTS_INSTRUMENTATIONKEY",
    ""
  ),

  // Custom tracking configuration
  trackUserInteractions: true,
  trackPerformanceMetrics: true,
  trackErrors: true,

  // Privacy and compliance
  respectDoNotTrack: true,
  anonymizeIp: true,
} as const;

// Export type for type safety
export type TelemetryConfig = typeof telemetryConfig;

// Validation function to check if telemetry is properly configured
export const validateTelemetryConfig = (): boolean => {
  const { connectionString, instrumentationKey } = telemetryConfig;

  // Check if at least one connection method is available
  if (!connectionString && !instrumentationKey) {
    console.warn(
      "Telemetry: No connection string or instrumentation key configured"
    );
    return false;
  }

  return true;
};

// Helper function to check if telemetry should be enabled
export const shouldEnableTelemetry = (): boolean => {
  if (telemetryConfig.disableTelemetry) {
    return false;
  }

  if (
    typeof window !== "undefined" &&
    navigator.doNotTrack === "1" &&
    telemetryConfig.respectDoNotTrack
  ) {
    return false;
  }

  return (
    telemetryConfig.enableTelemetry || telemetryConfig.enableDebugTelemetry
  );
};

// Default export for convenience
export default telemetryConfig;
