/**
 * MAIN CONSOLIDATED LOGGER SERVICE
 *
 * Purpose: Central logging service combining all logging capabilities
 * Responsibilities:
 * - Service lifecycle management (initialization, state tracking)
 * - Console logging delegation to ConsoleLogger
 * - Business tracking delegation to BusinessTracker
 * - Direct telemetry access through TelemetryService
 * - Performance measurement utilities
 * - Singleton pattern following Azure service conventions
 *
 * Following facade pattern, Azure service patterns, and AI tracing best practices
 */

import { telemetryService } from "~/service/telemetry/TelemetryService";
import { businessTracker } from "~/service/tracking/BusinessTracker";
import { consoleLogger } from "./ConsoleLogger";
import type { GlobalError } from "~/entities/error";
import type { ILogger, ITelemetryService } from "./types";

export class LoggerService implements ILogger {
  private static instance: LoggerService | null = null;
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = this.performInitialization();
    return this.initPromise;
  }

  private async performInitialization(): Promise<void> {
    try {
      const telemetryInitialized = await telemetryService.initialize();

      if (telemetryInitialized) {
        consoleLogger.success(
          "Consolidated logger service initialized with Azure Application Insights"
        );
      } else {
        consoleLogger.info(
          "Consolidated logger service initialized (telemetry disabled)"
        );
      }

      this.initialized = true;
    } catch (error) {
      consoleLogger.error(
        "Failed to initialize consolidated logger service",
        error
      );
      throw error;
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // ✅ Console logging delegation
  debug(message: string, data?: any, metadata?: Record<string, any>): void {
    consoleLogger.debug(message, data);

    // ✅ Send metadata to telemetry if available
    if (metadata && this.initialized) {
      telemetryService.trackEvent({
        name: "debug_log",
        properties: {
          message,
          level: "debug",
          ...this.sanitizeMetadata(metadata),
        },
      });
    }
  }

  info(message: string, data?: any, metadata?: Record<string, any>): void {
    consoleLogger.info(message, data);

    // ✅ Send metadata to telemetry if available
    if (metadata && this.initialized) {
      telemetryService.trackEvent({
        name: "info_log",
        properties: {
          message,
          level: "info",
          ...this.sanitizeMetadata(metadata),
        },
      });
    }
  }

  success(message: string, data?: any, metadata?: Record<string, any>): void {
    consoleLogger.success(message, data);

    // ✅ Send metadata to telemetry if available
    if (metadata && this.initialized) {
      telemetryService.trackEvent({
        name: "success_log",
        properties: {
          message,
          level: "success",
          ...this.sanitizeMetadata(metadata),
        },
      });
    }
  }

  warn(
    message: string,
    error?: Error | any,
    metadata?: Record<string, any>
  ): void {
    consoleLogger.warn(message, error);

    // ✅ Send warning with metadata to telemetry
    if (this.initialized) {
      const properties: Record<string, string> = {
        message,
        level: "warn",
      };

      if (metadata) {
        Object.assign(properties, this.sanitizeMetadata(metadata));
      }

      if (error) {
        properties.errorMessage =
          error instanceof Error ? error.message : String(error);
        properties.errorType =
          error instanceof Error ? error.constructor.name : typeof error;
      }

      telemetryService.trackEvent({
        name: "warning_log",
        properties,
      });
    }
  }

  error(
    message: string,
    error?: Error | any,
    metadata?: Record<string, any>
  ): void {
    consoleLogger.error(message, error);

    // ✅ Enhanced error logging with metadata and telemetry
    if (this.initialized) {
      const properties: Record<string, string> = {
        message,
        level: "error",
      };

      if (metadata) {
        Object.assign(properties, this.sanitizeMetadata(metadata));
      }

      if (error instanceof Error) {
        // ✅ Track as exception for proper error monitoring
        telemetryService.trackException({
          error,
          properties: {
            ...properties,
            logMessage: message,
          },
        });
      } else if (error) {
        // ✅ Track non-Error objects as events with error details
        telemetryService.trackEvent({
          name: "error_log",
          properties: {
            ...properties,
            errorValue: String(error),
            errorType: typeof error,
          },
        });
      } else {
        // ✅ Track error message only
        telemetryService.trackEvent({
          name: "error_log",
          properties,
        });
      }
    }
  }

  performance(
    operation: string,
    duration: number,
    success: boolean = true,
    data?: any,
    metadata?: Record<string, any>
  ): void {
    consoleLogger.performance(operation, duration, success, data);

    // ✅ Track performance with metadata
    if (this.initialized) {
      const properties: Record<string, string> = {
        operation,
        success: success.toString(),
        level: "performance",
      };

      if (metadata) {
        Object.assign(properties, this.sanitizeMetadata(metadata));
      }

      if (data) {
        properties.additionalData = JSON.stringify(data);
      }

      telemetryService.trackMetric({
        name: `performance_${operation}`,
        value: duration,
        properties,
      });
    }
  }

  retry(
    message: string,
    attempt: number,
    maxAttempts: number,
    data?: any,
    metadata?: Record<string, any>
  ): void {
    consoleLogger.retry(message, attempt, maxAttempts, data);

    // ✅ Track retry attempts with metadata
    if (this.initialized) {
      const properties: Record<string, string> = {
        message,
        level: "retry",
      };

      if (metadata) {
        Object.assign(properties, this.sanitizeMetadata(metadata));
      }

      if (data) {
        properties.additionalData = JSON.stringify(data);
      }

      telemetryService.trackEvent({
        name: "retry_attempt",
        properties,
        measurements: {
          attempt,
          maxAttempts,
          remainingAttempts: maxAttempts - attempt,
        },
      });
    }
  }

  // ✅ Utility method to sanitize metadata for telemetry
  private sanitizeMetadata(
    metadata: Record<string, any>
  ): Record<string, string> {
    const sanitized: Record<string, string> = {};

    for (const [key, value] of Object.entries(metadata)) {
      if (value === null || value === undefined) {
        sanitized[key] = String(value);
      } else if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        sanitized[key] = String(value);
      } else if (typeof value === "object") {
        try {
          sanitized[key] = JSON.stringify(value);
        } catch {
          sanitized[key] = "[Complex Object]";
        }
      } else {
        sanitized[key] = String(value);
      }
    }

    return sanitized;
  }

  // ✅ Business tracking delegation
  async trackSkillsLoaded(
    count: number,
    cacheHit: boolean,
    duration?: number,
    source?: string
  ): Promise<void> {
    return businessTracker.trackSkillsLoaded({
      count,
      cacheHit,
      duration,
      source,
    });
  }

  async trackSkillsError(
    error: Error,
    duration?: number,
    context?: Record<string, any>
  ): Promise<void> {
    return businessTracker.trackSkillsError(error, duration, context);
  }

  async trackSkillsRetry(
    attempt: number,
    maxAttempts: number,
    reason: string
  ): Promise<void> {
    return businessTracker.trackSkillsRetry(attempt, maxAttempts, reason);
  }

  async trackPortfolioItemView(
    itemId: string,
    itemType: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    return businessTracker.trackPortfolioItemView(itemId, itemType, metadata);
  }

  async trackComponentPerformance(
    componentName: string,
    operation: string,
    duration: number,
    success: boolean = true,
    metadata?: Record<string, any>
  ): Promise<void> {
    return businessTracker.trackComponentPerformance({
      componentName,
      operation,
      duration,
      success,
      metadata,
    });
  }

  async trackApiCall(
    endpoint: string,
    method: string,
    duration: number,
    success: boolean,
    statusCode?: number,
    error?: Error
  ): Promise<void> {
    return businessTracker.trackApiCall({
      endpoint,
      method,
      duration,
      success,
      statusCode,
      error,
    });
  }

  async trackGlobalError(globalError: GlobalError): Promise<void> {
    return businessTracker.trackGlobalError(globalError);
  }

  async trackFeatureUsage(
    featureName: string,
    interactionType: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    return businessTracker.trackFeatureUsage(
      featureName,
      interactionType,
      metadata
    );
  }

  async trackThemeChange(fromTheme: string, toTheme: string): Promise<void> {
    return businessTracker.trackThemeChange(fromTheme, toTheme);
  }

  // ✅ Performance utilities implementation
  measure<T>(
    operation: string,
    fn: () => T,
    metadata?: Record<string, any>
  ): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.performance(operation, duration, true, undefined, metadata);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.performance(operation, duration, false, error, metadata);
      throw error;
    }
  }

  async measureAsync<T>(
    operation: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.performance(operation, duration, true, undefined, metadata);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.performance(operation, duration, false, error, metadata);
      throw error;
    }
  }

  // ✅ Direct telemetry access (advanced scenarios)
  get telemetry(): ITelemetryService {
    return {
      trackEvent: (
        name: string,
        properties?: Record<string, string>,
        measurements?: Record<string, number>
      ) => {
        telemetryService.trackEvent({ name, properties, measurements });
      },

      trackMetric: (
        name: string,
        value: number,
        properties?: Record<string, string>
      ) => {
        telemetryService.trackMetric({ name, value, properties });
      },

      trackException: (error: Error, properties?: Record<string, string>) => {
        telemetryService.trackException({ error, properties });
      },

      trackPageView: (
        name: string,
        uri?: string,
        properties?: Record<string, string>
      ) => {
        telemetryService.trackPageView(name, uri, properties);
      },

      flush: () => {
        telemetryService.flush();
      },
    };
  }

  // ✅ Service management
  flush(): void {
    telemetryService.flush();
  }
}
