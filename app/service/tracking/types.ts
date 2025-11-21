/**
 * Skills loading metrics for comprehensive performance tracking
 * Follows AI tracing best practices for structured telemetry
 */
export type SkillsLoadMetrics = {
  count: number;
  cacheHit: boolean;
  duration?: number;
  source?: string;
  correlationId?: string; // For request tracing
  operationId?: string; // For Azure correlation
};

/**
 * Component performance metrics with lifecycle context
 */
export type PerformanceMetrics = {
  componentName: string;
  operation: string;
  duration: number;
  success: boolean;
  metadata?: Record<string, any>;
  correlationId?: string;
};

/**
 * API call metrics for dependency tracking
 */
export type ApiCallMetrics = {
  endpoint: string;
  method: string;
  duration: number;
  success: boolean;
  statusCode?: number;
  error?: Error;
  correlationId?: string;
  operationId?: string;
};
