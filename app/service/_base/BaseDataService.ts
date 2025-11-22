import { loggerService } from "~/service/logging";
import type { ApiDataResponse } from "~/api/interfaces";

export interface BaseDataServiceConfig {
  serviceName: string;
  enableDelaySimulation?: boolean;
  delayMs?: number;
  cacheConfig?: {
    maxSize?: number;
    defaultTtl?: number;
  };
}

/**
 * Universal BaseDataService for consistent data fetching patterns
 * Provides caching, logging, and performance tracking across all data services
 */
export class BaseDataService<TEntity> {
  protected config: BaseDataServiceConfig;
  protected instanceId: string;
  private cache = new Map<
    string,
    { data: any; timestamp: number; ttl: number }
  >();

  constructor(config: BaseDataServiceConfig) {
    this.config = {
      enableDelaySimulation: false,
      delayMs: 1000,
      cacheConfig: {
        maxSize: 100,
        defaultTtl: 5 * 60 * 1000, // 5 minutes
      },
      ...config,
    };

    this.instanceId = `${config.serviceName}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 8)}`;

    loggerService.info(`${config.serviceName} initialized`, undefined, {
      instanceId: this.instanceId,
      config: this.config,
    });
  }

  /**
   * Universal fetch pattern with caching and telemetry
   * This is the core method that all services use for consistent data fetching
   */
  async fetchData<TRequest, TMeta>(
    request: TRequest,
    operation: string,
    fetchImplementation: (
      request: TRequest,
      correlationId: string
    ) => Promise<ApiDataResponse<TEntity, TMeta>>
  ): Promise<ApiDataResponse<TEntity, TMeta>> {
    const startTime = performance.now();
    const correlationId = this.generateCorrelationId(operation);
    const cacheKey = this.buildCacheKey(operation, request);

    loggerService.debug(`Starting ${operation}`, request, {
      correlationId,
      operation,
      serviceName: this.config.serviceName,
      instanceId: this.instanceId,
    });

    // Check cache first
    const cached =
      this.getCachedData<ApiDataResponse<TEntity, TMeta>>(cacheKey);
    if (cached) {
      const duration = performance.now() - startTime;

      loggerService.performance(
        `${operation} cache hit`,
        duration,
        true,
        undefined,
        {
          correlationId,
          operation,
          cacheKey,
        }
      );

      // Update metadata to reflect cache hit
      return {
        ...cached,
        meta: {
          ...cached.meta,
          cacheHit: true,
          source: "cache" as const,
          correlationId,
          requestDuration: duration,
        },
      };
    }

    // Fetch from implementation
    const response = await fetchImplementation(request, correlationId);
    const duration = performance.now() - startTime;

    // Cache the response
    this.setCachedData(cacheKey, response);

    // Update metadata with timing and correlation info
    const enhancedResponse = {
      ...response,
      meta: {
        ...response.meta,
        cacheHit: false,
        source: "api" as const,
        correlationId,
        requestDuration: duration,
      },
    };

    loggerService.success(`${operation} completed successfully`, undefined, {
      correlationId,
      operation,
      duration,
      resultCount: response.target?.length || 0,
    });

    return enhancedResponse;
  }

  /**
   * Generate correlation ID for request tracing
   */
  private generateCorrelationId(operation: string): string {
    return `${
      this.config.serviceName
    }-${operation}-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;
  }

  /**
   * Build cache key from operation and request
   */
  private buildCacheKey(operation: string, request: any): string {
    const sanitized = this.sanitizeRequest(request);
    return `${this.config.serviceName}-${operation}-${JSON.stringify(
      sanitized
    )}`;
  }

  /**
   * Override in derived classes for request sanitization
   */
  protected sanitizeRequest(request: any): any {
    return request;
  }

  /**
   * Get cached data if available and not expired
   */
  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.timestamp + cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  /**
   * Set data in cache with TTL
   */
  private setCachedData(key: string, data: any): void {
    const maxSize = this.config.cacheConfig?.maxSize || 100;
    const ttl = this.config.cacheConfig?.defaultTtl || 5 * 60 * 1000;

    // Remove oldest entry if cache is full
    if (this.cache.size >= maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey ?? "");
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();

    loggerService.info(`${this.config.serviceName} cache cleared`, undefined, {
      instanceId: this.instanceId,
      serviceName: this.config.serviceName,
    });
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp + entry.ttl) {
        expiredEntries++;
      } else {
        validEntries++;
      }
    }

    return {
      size: validEntries,
      expired: expiredEntries,
      maxSize: this.config.cacheConfig?.maxSize || 100,
      serviceName: this.config.serviceName,
      instanceId: this.instanceId,
    };
  }

  /**
   * Health check for the service
   */
  getServiceHealth() {
    const cacheStats = this.getCacheStats();

    return {
      status: "healthy" as const,
      serviceName: this.config.serviceName,
      instanceId: this.instanceId,
      uptime: Date.now(),
      cache: cacheStats,
    };
  }
}
