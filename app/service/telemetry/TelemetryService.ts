import {
  ApplicationInsights,
  SeverityLevel,
} from "@microsoft/applicationinsights-web";
import {
  getTelemetryConfig,
  validateTelemetryConfig,
  type TelemetryConfig,
} from "~/config/telemetry";

import {
  type ITelemetryDependency,
  type ITelemetryEvent,
  type ITelemetryException,
  type ITelemetryMetric,
} from "./interfaces";

/**
 * Core telemetry service following Azure Application Insights best practices
 * Handles all Azure SDK interactions with proper error handling and security
 */
export class TelemetryService {
  private appInsights: ApplicationInsights | null = null;
  private config: TelemetryConfig | null = null;
  private isInitialized = false;
  private correlationId: string | null = null;
  private sessionId: string | null = null;

  /**
   * Initialize telemetry service with Azure best practices
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      const config = getTelemetryConfig();
      if (!config?.enabled || !config.connectionString) {
        console.log("ℹ️ Telemetry disabled - no configuration");
        return false;
      }

      this.config = config;
      validateTelemetryConfig(this.config);

      if (typeof window !== "undefined") {
        this.appInsights = new ApplicationInsights({
          config: {
            connectionString: this.config.connectionString,
            enableAutoRouteTracking: this.config.enableAutoRouteTracking,
            enableRequestHeaderTracking: true,
            enableResponseHeaderTracking: true,
            enableCorsCorrelation: true,
            enableDebug: this.config.environment === "development",
            loggingLevelTelemetry:
              this.config.environment === "development" ? 2 : 1,
            samplingPercentage:
              this.config.environment === "development" ? 100 : 10,

            // Performance optimization
            maxBatchInterval: 5000,
            maxBatchSizeInBytes: 16384,

            // Security and privacy
            disableAjaxTracking: false,
            disableExceptionTracking: false,
            disableFetchTracking: false,
            enableUnhandledPromiseRejectionTracking: true,
          },
        });

        this.appInsights.loadAppInsights();
        this.setupTelemetryInitializer();
        this.generateSessionIdentifiers();

        console.log("✅ Azure Application Insights initialized");
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error("❌ Failed to initialize telemetry service:", error);
      return false;
    }
  }

  /**
   * Track custom events with proper data sanitization
   */
  trackEvent(event: ITelemetryEvent): void {
    if (!this.isReady()) return;

    try {
      this.appInsights!.trackEvent({
        name: event.name,
        properties: this.enrichProperties(event.properties),
        measurements: event.measurements,
      });
    } catch (error) {
      console.error(`❌ Failed to track event ${event.name}:`, error);
    }
  }

  /**
   * Track custom metrics with correlation
   */
  trackMetric(metric: ITelemetryMetric): void {
    if (!this.isReady()) return;

    try {
      this.appInsights!.trackMetric(
        {
          name: metric.name,
          average: metric.value,
          sampleCount: 1,
        },
        this.enrichProperties(metric.properties)
      );
    } catch (error) {
      console.error(`❌ Failed to track metric ${metric.name}:`, error);
    }
  }

  /**
   * Track exceptions with proper context
   */
  trackException(exception: ITelemetryException): void {
    if (!this.isReady()) return;

    try {
      this.appInsights!.trackException({
        exception: exception.error,
        severityLevel: exception.severityLevel || SeverityLevel.Error,
        properties: this.enrichProperties(exception.properties),
      });
    } catch (error) {
      console.error(`❌ Failed to track exception:`, error);
    }
  }

  /**
   * Track dependencies with proper response codes
   */
  trackDependency(dependency: ITelemetryDependency): void {
    if (!this.isReady()) return;

    try {
      this.appInsights!.trackDependencyData({
        id: `dep_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name: dependency.name,
        duration: dependency.duration,
        success: dependency.success,
        responseCode: dependency.responseCode,
        type: dependency.type || "Http",
        data: dependency.data || `${dependency.name} call`,
        properties: this.enrichProperties(dependency.properties),
      });
    } catch (error) {
      console.error(`❌ Failed to track dependency ${dependency.name}:`, error);
    }
  }

  /**
   * Track page views with correlation
   */
  trackPageView(
    name: string,
    uri?: string,
    properties?: Record<string, string>
  ): void {
    if (!this.isReady()) return;

    try {
      this.appInsights!.trackPageView({
        name,
        uri: uri || window.location.href,
        properties: this.enrichProperties(properties),
      });
    } catch (error) {
      console.error(`❌ Failed to track page view ${name}:`, error);
    }
  }

  /**
   * Force flush telemetry data
   */
  flush(): void {
    if (!this.isReady()) return;

    try {
      this.appInsights!.flush();
    } catch (error) {
      console.error("❌ Failed to flush telemetry:", error);
    }
  }

  /**
   * Check if service is ready for use
   */
  private isReady(): boolean {
    return (
      this.isInitialized && this.appInsights !== null && this.config !== null
    );
  }

  /**
   * Enrich properties with standard metadata following Azure best practices
   */
  private enrichProperties(
    properties?: Record<string, string>
  ): Record<string, string> {
    const enriched: Record<string, string> = {
      timestamp: new Date().toISOString(),
      environment: this.config?.environment || "unknown",
      version: this.config?.version || "unknown",
      correlationId: this.getCorrelationId(),
      sessionId: this.getSessionId(),
    };

    if (properties) {
      // Sanitize and validate properties
      Object.entries(properties).forEach(([key, value]) => {
        if (typeof value === "string" && value.length <= 1000) {
          // Limit length
          enriched[key] = this.sanitizeString(value);
        } else if (typeof value !== "string") {
          enriched[key] = String(value).substring(0, 100); // Convert and truncate
        }
      });
    }

    return enriched;
  }

  /**
   * Setup telemetry initializer following Azure patterns
   */
  private setupTelemetryInitializer(): void {
    this.appInsights?.addTelemetryInitializer((envelope) => {
      if (envelope.data) {
        envelope.data.environment = this.config?.environment;
        envelope.data.version = this.config?.version;
        envelope.data.correlationId = this.getCorrelationId();
      }
      return true;
    });
  }

  /**
   * Generate session and correlation identifiers
   */
  private generateSessionIdentifiers(): void {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);

    this.sessionId = `session_${timestamp}_${random}`;
    this.correlationId = `corr_${timestamp}_${random}`;
  }

  /**
   * Get correlation ID for distributed tracing
   */
  private getCorrelationId(): string {
    if (!this.correlationId) {
      this.correlationId = `corr_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }
    return this.correlationId;
  }

  /**
   * Get session ID for user session tracking
   */
  private getSessionId(): string {
    if (!this.sessionId) {
      this.sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }
    return this.sessionId;
  }

  /**
   * Sanitize string data for security
   */
  private sanitizeString(input: string): string {
    // Remove potential sensitive patterns and limit length
    return input
      .replace(/password|token|key|secret/gi, "[REDACTED]")
      .substring(0, 1000);
  }
}

// Singleton instance following Azure patterns
export const telemetryService = new TelemetryService();
