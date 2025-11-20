export interface TelemetryConfig {
  connectionString?: string;
  enabled: boolean;
  environment: string;
  version: string;
  enableAutoRouteTracking: boolean;
  enablePerformanceMonitoring: boolean;
  enableDebug: boolean;
  loggingLevel: number;
  samplingPercentage: number;
}

export const getTelemetryConfig = (): TelemetryConfig => {
  const nodeEnv =
    import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || "development";
  const isDevelopment = nodeEnv === "development";
  const isProduction = nodeEnv === "heroku";

  const connectionString = import.meta.env
    .VITE_AZURE_APPLICATION_INSIGHTS_CONNECTION_STRING;
  const enableTelemetry = import.meta.env.VITE_ENABLE_TELEMETRY;

  // Only enable telemetry if we have a connection string AND it's explicitly enabled
  const shouldEnable =
    (isProduction || enableTelemetry === "true") && Boolean(connectionString);

  return {
    connectionString,
    enabled: shouldEnable,
    environment: nodeEnv,
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
    enableAutoRouteTracking: true,
    enablePerformanceMonitoring: true,
    enableDebug: isDevelopment,
    loggingLevel: parseInt(
      import.meta.env.VITE_TELEMETRY_LOGGING_LEVEL ||
        (isDevelopment ? "1" : "0")
    ),
    samplingPercentage: parseInt(
      import.meta.env.VITE_TELEMETRY_SAMPLING_PERCENTAGE ||
        (isProduction ? "50" : "100")
    ),
  };
};

export const validateTelemetryConfig = (config: TelemetryConfig): void => {
  const enableTelemetry = import.meta.env.VITE_ENABLE_TELEMETRY;

  if (enableTelemetry === "true" && !config.connectionString) {
    console.warn(
      "⚠️: VITE_ENABLE_TELEMETRY=true but connection string not provided - telemetry disabled"
    );
    config.enabled = false;
  }

  if (
    config.enabled &&
    config.connectionString === "your-actual-connection-string-here"
  ) {
    console.warn(
      "⚠️: Using placeholder connection string - disabling telemetry"
    );
    config.enabled = false;
  }

  if (config.samplingPercentage < 0 || config.samplingPercentage > 100) {
    console.warn("⚠️: Invalid sampling percentage, using default");
    config.samplingPercentage = config.environment === "production" ? 50 : 100;
  }

  if (config.loggingLevel < 0 || config.loggingLevel > 2) {
    console.warn("⚠️: Invalid logging level, using default");
    config.loggingLevel = config.environment === "development" ? 1 : 0;
  }

  if (config.enabled) {
    console.log("✅: Telemetry configuration validated and enabled");
  } else {
    console.log("ℹ️: Telemetry disabled - no connection string or not enabled");
  }
};
