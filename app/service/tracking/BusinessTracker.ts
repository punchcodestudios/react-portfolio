import type { GlobalError } from "~/entities/error";
import { consoleLogger } from "../logging/ConsoleLogger";
import { telemetryService } from "../telemetry/TelemetryService";

export interface ISkillsLoadMetrics {
  count: number;
  cacheHit: boolean;
  duration?: number;
  source?: string;
}

export interface IPerformanceMetrics {
  componentName: string;
  operation: string;
  duration: number;
  success: boolean;
  metadata?: Record<string, any>;
}

export interface IApiCallMetrics {
  endpoint: string;
  method: string;
  duration: number;
  success: boolean;
  statusCode?: number;
  error?: Error;
}

/**
 * Business-specific tracking following AI tracing best practices
 * Combines structured console logging with Azure telemetry
 */
export class BusinessTracker {
  /**
   * Track skills data loading with comprehensive metrics
   */
  async trackSkillsLoaded(metrics: ISkillsLoadMetrics): Promise<void> {
    const { count, cacheHit, duration, source = "unknown" } = metrics;

    consoleLogger.success(
      `Skills loaded successfully (${count} skills, cache: ${
        cacheHit ? "hit" : "miss"
      })`
    );

    // Track business event
    telemetryService.trackEvent({
      name: "SkillsDataLoaded",
      properties: {
        skillCount: count.toString(),
        cacheHit: cacheHit.toString(),
        source,
        operation: "skills-fetch",
      },
    });

    // Track performance metric if duration provided
    if (duration !== undefined) {
      consoleLogger.performance("SkillsLoad", duration, true, {
        cacheHit,
        count,
      });

      telemetryService.trackMetric({
        name: "SkillsLoadDuration",
        value: duration,
        properties: {
          cacheHit: cacheHit.toString(),
          skillCount: count.toString(),
          source,
        },
      });
    }
  }

  /**
   * Track skills loading errors with context
   */
  async trackSkillsError(
    error: Error,
    duration?: number,
    context?: Record<string, any>
  ): Promise<void> {
    consoleLogger.error(`Skills loading failed: ${error.message}`, error);

    // Track exception with context
    telemetryService.trackException({
      error,
      properties: {
        component: "SkillsSection",
        operation: "skills-fetch",
        errorType: error.name,
        ...this.sanitizeContext(context),
      },
    });

    // Track error duration if provided
    if (duration !== undefined) {
      consoleLogger.performance("SkillsLoadError", duration, false, {
        errorType: error.name,
      });

      telemetryService.trackMetric({
        name: "SkillsLoadErrorDuration",
        value: duration,
        properties: {
          errorType: error.name,
          errorMessage: error.message.substring(0, 100), // Truncate for telemetry
        },
      });
    }
  }

  /**
   * Track retry operations with attempt tracking
   */
  async trackSkillsRetry(
    attempt: number,
    maxAttempts: number,
    reason: string
  ): Promise<void> {
    consoleLogger.retry(
      `Skills loading retry: ${reason}`,
      attempt,
      maxAttempts
    );

    telemetryService.trackEvent({
      name: "SkillsLoadRetry",
      properties: {
        attemptNumber: attempt.toString(),
        maxAttempts: maxAttempts.toString(),
        retryReason: reason,
        operation: "skills-fetch-retry",
      },
    });
  }

  /**
   * Track portfolio item interactions
   */
  async trackPortfolioItemView(
    itemId: string,
    itemType: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    consoleLogger.debug(`Portfolio item viewed: ${itemType}/${itemId}`);

    telemetryService.trackEvent({
      name: "PortfolioItemViewed",
      properties: {
        itemId: this.sanitizeId(itemId),
        itemType,
        interaction: "view",
        ...this.sanitizeContext(metadata),
      },
    });
  }

  /**
   * Track component performance with lifecycle context
   */
  async trackComponentPerformance(metrics: IPerformanceMetrics): Promise<void> {
    const { componentName, operation, duration, success, metadata } = metrics;

    consoleLogger.performance(
      `${componentName}.${operation}`,
      duration,
      success,
      metadata
    );

    // Track as custom metric
    telemetryService.trackMetric({
      name: `Component_${componentName}_${operation}_Duration`,
      value: duration,
      properties: {
        componentName,
        operation,
        success: success.toString(),
        lifecycle: "performance-measurement",
        ...this.sanitizeContext(metadata),
      },
    });

    // Also track as event for business insights
    telemetryService.trackEvent({
      name: "ComponentPerformance",
      properties: {
        componentName,
        operation,
        success: success.toString(),
        performanceCategory: this.categorizePerformance(duration),
        ...this.sanitizeContext(metadata),
      },
      measurements: {
        duration,
      },
    });
  }

  /**
   * Track API calls with comprehensive dependency tracking
   */
  async trackApiCall(metrics: IApiCallMetrics): Promise<void> {
    const { endpoint, method, duration, success, statusCode, error } = metrics;

    consoleLogger.performance(`API ${method} ${endpoint}`, duration, success, {
      statusCode,
    });

    // Track as dependency for Application Map visibility
    telemetryService.trackDependency({
      name: `API_${this.sanitizeEndpoint(endpoint)}`,
      duration,
      success,
      responseCode: statusCode || (success ? 200 : 500),
      type: "Http",
      data: `${method} ${endpoint}`,
      properties: {
        method,
        endpoint: this.sanitizeEndpoint(endpoint),
        operation: "api-call",
        errorMessage: error?.message?.substring(0, 100) ?? "",
      },
    });
  }

  /**
   * Track global application errors
   */
  async trackGlobalError(globalError: GlobalError): Promise<void> {
    consoleLogger.error(`Global error: ${globalError.message}`, globalError);

    const parsedDetails = this.parseErrorDetails(globalError.details);

    telemetryService.trackException({
      error: new Error(globalError.message),
      properties: {
        errorId: globalError.id,
        component: parsedDetails?.component || "unknown",
        route: parsedDetails?.route || "unknown",
        section: parsedDetails?.section || "unknown",
        retryCount: globalError.retryCount.toString(),
        url: globalError.url,
        userAgent: globalError.userAgent?.substring(0, 200), // Truncate user agent
        operation: "global-error-handling",
      },
    });
  }

  /**
   * Track feature usage and interactions
   */
  async trackFeatureUsage(
    featureName: string,
    interactionType: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    consoleLogger.debug(`Feature used: ${featureName} (${interactionType})`);

    telemetryService.trackEvent({
      name: "FeatureUsage",
      properties: {
        featureName,
        interactionType,
        feature: "user-interaction",
        ...this.sanitizeContext(metadata),
      },
    });
  }

  /**
   * Track theme changes and user preferences
   */
  async trackThemeChange(fromTheme: string, toTheme: string): Promise<void> {
    consoleLogger.info(`Theme changed: ${fromTheme} → ${toTheme}`);

    telemetryService.trackEvent({
      name: "ThemeChanged",
      properties: {
        fromTheme,
        toTheme,
        interaction: "theme-preference",
      },
    });
  }

  /**
   * Sanitize context data for telemetry
   */
  private sanitizeContext(
    context?: Record<string, any>
  ): Record<string, string> {
    if (!context) return {};

    const sanitized: Record<string, string> = {};

    Object.entries(context).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        sanitized[key] = String(value).substring(0, 500); // Limit length
      }
    });

    return sanitized;
  }

  /**
   * Sanitize ID fields for privacy
   */
  private sanitizeId(id: string): string {
    // Hash or truncate sensitive IDs while preserving uniqueness
    return id.length > 50
      ? `${id.substring(0, 20)}...${id.substring(id.length - 10)}`
      : id;
  }

  /**
   * Sanitize API endpoints for telemetry
   */
  private sanitizeEndpoint(endpoint: string): string {
    // Remove query parameters and sensitive path segments
    return endpoint
      .split("?")[0] // Remove query params
      .replace(/\/\d+/g, "/{id}") // Replace numeric IDs
      .replace(/\/[a-f0-9-]{36}/g, "/{uuid}"); // Replace UUIDs
  }

  /**
   * Categorize performance for analytics
   */
  private categorizePerformance(duration: number): string {
    if (duration < 100) return "fast";
    if (duration < 500) return "moderate";
    if (duration < 1000) return "slow";
    return "very-slow";
  }

  /**
   * Parse error details JSON safely
   */
  private parseErrorDetails(details?: string): any {
    if (!details) return null;

    try {
      return JSON.parse(details);
    } catch {
      return { rawDetails: details.substring(0, 200) };
    }
  }
}

export const businessTracker = new BusinessTracker();
