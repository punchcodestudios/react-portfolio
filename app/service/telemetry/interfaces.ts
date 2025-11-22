import { SeverityLevel } from "@microsoft/applicationinsights-web";

export interface ITelemetryEvent {
  name: string;
  properties?: Record<string, string>;
  measurements?: Record<string, number>;
}

export interface ITelemetryMetric {
  name: string;
  value: number;
  properties?: Record<string, string>;
}

export interface ITelemetryException {
  error: Error;
  properties?: Record<string, string>;
  severityLevel?: SeverityLevel;
}

export interface ITelemetryDependency {
  name: string;
  duration: number;
  success: boolean;
  responseCode: number;
  type?: string;
  data?: string;
  properties?: Record<string, string>;
}

export interface TelemetryContext {
  correlationId: string;
  operation: string;
  component: string;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  parentRequestId?: string;
  depth?: number;
  tags?: Record<string, string>;
  properties?: Record<string, any>;
  metrics?: Record<string, number>;
}

export interface PerformanceContext {
  startTime: number;
  endTime?: number;
  duration?: number;
  operation: string;
  correlationId: string;
  cacheHit: boolean;
  resultCount: number;
  errorCount?: number;
  retryCount?: number;
  memoryUsage?: number;
  cpuUsage?: number;
}

/**
 * Error context for AI tracing
 * @interface ErrorContext
 */
export interface ErrorContext {
  correlationId: string;
  operation: string;
  component: string;
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  userId?: string;
  requestData?: any;
  retryAttempt?: number;
  timeToError?: number;
  upstreamErrors?: ErrorContext[];
}

/**
 * Cache statistics interface
 * @interface CacheStats
 */
export interface CacheStats {
  size: number;
  maxSize: number;
  hitRate: number;
  missRate: number;
  evictionCount: number;
  lastAccessed?: string;
  totalRequests: number;
  averageResponseTime: number;
}

/**
 * Service health status
 * @interface ServiceHealth
 */
export interface ServiceHealth {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  uptime: number;
  dependencies: Record<
    string,
    {
      status: "up" | "down" | "degraded";
      responseTime: number;
      lastCheck: string;
    }
  >;
  metrics: {
    requestsPerSecond: number;
    averageResponseTime: number;
    errorRate: number;
    cacheHitRate: number;
  };
  alerts?: Array<{
    level: "info" | "warning" | "error" | "critical";
    message: string;
    timestamp: string;
    component: string;
  }>;
}
