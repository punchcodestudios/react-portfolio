import type { GlobalError } from "~/entities/error";

// ✅ Console Logging Types
export interface ILogEntry {
  level: "debug" | "info" | "success" | "warn" | "error";
  message: string;
  data?: any;
  timestamp?: string;
}

export interface IConsoleLoggingService {
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  success(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: Error | any): void;
  performance(
    operation: string,
    duration: number,
    success?: boolean,
    data?: any
  ): void;
  retry(
    message: string,
    attempt: number,
    maxAttempts: number,
    data?: any
  ): void;
}

// ✅ Logger Service Types
export interface ILoggerService {
  initialize(): Promise<void>;
  isInitialized(): boolean;
  flush(): void;
}

// ✅ Business Tracking Types
export interface IBusinessTrackingService {
  trackSkillsLoaded(
    count: number,
    cacheHit: boolean,
    duration?: number,
    source?: string
  ): Promise<void>;
  trackSkillsError(
    error: Error,
    duration?: number,
    context?: Record<string, any>
  ): Promise<void>;
  trackComponentPerformance(
    componentName: string,
    operation: string,
    duration: number,
    success?: boolean,
    metadata?: Record<string, any>
  ): Promise<void>;
  trackApiCall(
    endpoint: string,
    method: string,
    duration: number,
    success: boolean,
    statusCode?: number,
    error?: Error
  ): Promise<void>;
  trackGlobalError(globalError: GlobalError): Promise<void>;
  trackFeatureUsage(
    featureName: string,
    interactionType: string,
    metadata?: Record<string, any>
  ): Promise<void>;
  trackThemeChange(fromTheme: string, toTheme: string): Promise<void>;
}

// ✅ Performance Service Types
export interface IPerformanceService {
  measure<T>(operation: string, fn: () => T): T;
  measureAsync<T>(operation: string, fn: () => Promise<T>): Promise<T>;
}

// ✅ Direct Telemetry Access Types
export interface ITelemetryService {
  trackEvent(
    name: string,
    properties?: Record<string, string>,
    measurements?: Record<string, number>
  ): void;
  trackMetric(
    name: string,
    value: number,
    properties?: Record<string, string>
  ): void;
  trackException(error: Error, properties?: Record<string, string>): void;
  trackPageView(
    name: string,
    uri?: string,
    properties?: Record<string, string>
  ): void;
  flush(): void;
}

// ✅ Combined Logger Interface
export interface ILogger {
  debug(message: string, data?: any, metadata?: Record<string, any>): void;
  info(message: string, data?: any, metadata?: Record<string, any>): void;
  success(message: string, data?: any, metadata?: Record<string, any>): void;
  warn(
    message: string,
    error?: Error | any,
    metadata?: Record<string, any>
  ): void;
  error(
    message: string,
    error?: Error | any,
    metadata?: Record<string, any>
  ): void;
  performance(
    operation: string,
    duration: number,
    success?: boolean,
    data?: any,
    metadata?: Record<string, any>
  ): void;
  retry(
    message: string,
    attempt: number,
    maxAttempts: number,
    data?: any,
    metadata?: Record<string, any>
  ): void;

  // ✅ Enhanced performance utilities
  measure<T>(operation: string, fn: () => T, metadata?: Record<string, any>): T;
  measureAsync<T>(
    operation: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T>;

  // Business tracking methods
  trackSkillsLoaded(
    count: number,
    cacheHit: boolean,
    duration?: number,
    source?: string
  ): Promise<void>;
  trackSkillsError(
    error: Error,
    duration?: number,
    context?: Record<string, any>
  ): Promise<void>;
  trackSkillsRetry(
    attempt: number,
    maxAttempts: number,
    reason: string
  ): Promise<void>;
  trackPortfolioItemView(
    itemId: string,
    itemType: string,
    metadata?: Record<string, any>
  ): Promise<void>;
  trackComponentPerformance(
    componentName: string,
    operation: string,
    duration: number,
    success?: boolean,
    metadata?: Record<string, any>
  ): Promise<void>;
  trackApiCall(
    endpoint: string,
    method: string,
    duration: number,
    success: boolean,
    statusCode?: number,
    error?: Error
  ): Promise<void>;
  trackGlobalError(globalError: GlobalError): Promise<void>;
  trackFeatureUsage(
    featureName: string,
    interactionType: string,
    metadata?: Record<string, any>
  ): Promise<void>;
  trackThemeChange(fromTheme: string, toTheme: string): Promise<void>;

  // Service management
  initialize(): Promise<void>;
  isInitialized(): boolean;
  flush(): void;
}
