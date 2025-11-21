// Remove abstract keyword and make it instantiable

import { loggerService } from "./logging";
import type { ApiDataResponse, ApiItemResponse } from "~/entities/api";

interface ServiceConfig {
  cacheTimeout?: number;
  maxCacheSize?: number;
  enableDelaySimulation?: boolean;
  delayMs?: number;
  enableMetrics?: boolean;
  serviceName: string;
}

interface CacheEntry<T> {
  data: Promise<T>;
  timestamp: number;
  key: string;
  correlationId: string;
}

/**
 * Concrete base service class for consistent API data handling
 * Can be instantiated directly or extended by specific services
 * Provides caching, logging, and telemetry for all data services
 */
export class BaseDataService<
  TEntity,
  TRequest = any,
  TMeta = Record<string, any>
> {
  protected cache = new Map<
    string,
    CacheEntry<ApiDataResponse<TEntity, TMeta>>
  >();
  protected readonly config: Required<ServiceConfig>;
  protected readonly instanceId: string;

  constructor(config: ServiceConfig) {
    this.config = {
      cacheTimeout: 5 * 60 * 1000, // 5 minutes
      maxCacheSize: 100,
      enableDelaySimulation: process.env.NODE_ENV === "development",
      delayMs: 2000,
      enableMetrics: true,
      ...config,
    };

    this.instanceId = `${this.config.serviceName}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    loggerService.debug(`${this.config.serviceName} initialized`, undefined, {
      component: this.config.serviceName,
      operation: "constructor",
      instanceId: this.instanceId,
      config: {
        cacheTimeout: this.config.cacheTimeout,
        maxCacheSize: this.config.maxCacheSize,
        enableDelaySimulation: this.config.enableDelaySimulation,
        enableMetrics: this.config.enableMetrics,
      },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Generic fetch method with caching and telemetry
   * @param request - The request parameters
   * @param operation - The operation name for logging
   * @param fetchImplementation - The actual fetch implementation
   */
  async fetchData(
    request: TRequest,
    operation: string,
    fetchImplementation: (
      request: TRequest,
      correlationId: string
    ) => Promise<ApiDataResponse<TEntity, TMeta>>
  ): Promise<ApiDataResponse<TEntity, TMeta>> {
    const startTime = performance.now();
    const correlationId = this.generateCorrelationId(operation);
    const cacheKey = JSON.stringify(request);

    loggerService.debug(
      `${this.config.serviceName}: ${operation} called`,
      undefined,
      {
        component: this.config.serviceName,
        operation,
        correlationId,
        cacheKey,
        request: this.sanitizeRequest(request),
        instanceId: this.instanceId,
        timestamp: new Date().toISOString(),
      }
    );

    try {
      // Check cache first
      const cached = this.getCachedData(cacheKey, correlationId);
      if (cached) {
        const duration = performance.now() - startTime;

        loggerService.debug(
          `${operation} cache hit - returning cached data`,
          undefined,
          {
            component: this.config.serviceName,
            operation: "cache-hit",
            correlationId,
            cacheKey,
            duration: Math.round(duration),
            cacheSize: this.cache.size,
          }
        );

        if (this.config.enableMetrics) {
          loggerService.performance(
            `${this.config.serviceName}.${operation}.CacheHit`,
            duration,
            true,
            undefined,
            {
              component: this.config.serviceName,
              operation: `${operation}-cache-hit`,
              correlationId,
            }
          );
        }

        return cached;
      }

      // Create new request
      loggerService.debug(
        `${operation} cache miss - initiating request`,
        undefined,
        {
          component: this.config.serviceName,
          operation: "cache-miss",
          correlationId,
          cacheKey,
          cacheSize: this.cache.size,
        }
      );

      const promise = fetchImplementation(request, correlationId);
      this.setCachedData(cacheKey, promise, correlationId);

      const result = await promise;
      const duration = performance.now() - startTime;

      loggerService.success(`${operation} completed successfully`, undefined, {
        component: this.config.serviceName,
        operation: `${operation}-success`,
        correlationId,
        cacheKey,
        duration: Math.round(duration),
        resultCount: result.target?.length || 0,
        dataSize: this.estimateDataSize(result),
      });

      if (this.config.enableMetrics) {
        loggerService.performance(
          `${this.config.serviceName}.${operation}`,
          duration,
          true,
          undefined,
          {
            component: this.config.serviceName,
            operation: `${operation}-success`,
            correlationId,
            resultCount: result.target?.length || 0,
          }
        );
      }

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;

      loggerService.error(
        `${this.config.serviceName}: ${operation} failed`,
        error,
        {
          component: this.config.serviceName,
          operation: `${operation}-failed`,
          correlationId,
          cacheKey,
          duration: Math.round(duration),
          request: this.sanitizeRequest(request),
          errorCategory: "data-fetch-error",
          instanceId: this.instanceId,
        }
      );

      // Remove failed promise from cache
      this.cache.delete(cacheKey);

      if (this.config.enableMetrics) {
        loggerService.performance(
          `${this.config.serviceName}.${operation}.Error`,
          duration,
          false,
          undefined,
          {
            component: this.config.serviceName,
            operation: `${operation}-error`,
            correlationId,
            errorType:
              error instanceof Error ? error.constructor.name : "Unknown",
          }
        );
      }

      throw error;
    }
  }

  /**
   * Generic mapping method that can be overridden by subclasses
   */
  mapResponse(
    item: any,
    correlationId: string,
    operation: string
  ): ApiDataResponse<TEntity, TMeta> {
    const resultCount = item.content?.target?.length || 0;

    loggerService.debug(`Mapping ${operation} response`, undefined, {
      component: this.config.serviceName,
      operation: `map-${operation}`,
      correlationId,
      resultCount,
      hasError: !!item.content?.error,
      hasMeta: !!item.content?.meta,
      metaKeys: item.content?.meta ? Object.keys(item.content.meta) : [],
    });

    return {
      target: item.content?.target || [],
      meta: item.content?.meta || ({} as TMeta),
      error: item.content?.error || null,
    };
  }

  // Cache management methods
  private getCachedData(
    key: string,
    correlationId: string
  ): Promise<ApiDataResponse<TEntity, TMeta>> | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (!this.isCacheValid(entry.timestamp)) {
      this.cache.delete(key);
      loggerService.debug("Cache entry expired and removed", undefined, {
        component: this.config.serviceName,
        operation: "cache-expiry",
        cacheKey: key,
        correlationId,
        entryAge: Date.now() - entry.timestamp,
        cacheTimeout: this.config.cacheTimeout,
      });
      return null;
    }

    return entry.data;
  }

  private setCachedData(
    key: string,
    data: Promise<ApiDataResponse<TEntity, TMeta>>,
    correlationId: string
  ): void {
    if (this.cache.size >= this.config.maxCacheSize) {
      this.evictOldestCacheEntry(correlationId);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      key,
      correlationId,
    });

    loggerService.debug("Data cached successfully", undefined, {
      component: this.config.serviceName,
      operation: "cache-set",
      cacheKey: key,
      correlationId,
      cacheSize: this.cache.size,
      maxCacheSize: this.config.maxCacheSize,
    });
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.config.cacheTimeout;
  }

  private evictOldestCacheEntry(correlationId: string): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      loggerService.debug("Cache entry evicted due to size limit", undefined, {
        component: this.config.serviceName,
        operation: "cache-eviction",
        evictedKey: oldestKey,
        correlationId,
        cacheSize: this.cache.size,
        maxCacheSize: this.config.maxCacheSize,
        reason: "size-limit",
      });
    }
  }

  // Utility methods
  protected generateCorrelationId(operation: string): string {
    return `${operation}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  protected estimateDataSize(data: any): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      return 0;
    }
  }

  protected sanitizeRequest(request: any): any {
    // Override in subclasses for service-specific sanitization
    return request;
  }

  // Public cache management methods
  clearCache(): void {
    const totalEntries = this.cache.size;
    this.cache.clear();

    loggerService.info(`${this.config.serviceName} cache cleared`, undefined, {
      component: this.config.serviceName,
      operation: "cache-clear",
      clearedEntries: totalEntries,
      instanceId: this.instanceId,
      userInitiated: true,
      timestamp: new Date().toISOString(),
    });
  }

  getCacheStats() {
    const stats = {
      size: this.cache.size,
      maxSize: this.config.maxCacheSize,
      utilizationPercent: Math.round(
        (this.cache.size / this.config.maxCacheSize) * 100
      ),
      instanceId: this.instanceId,
      serviceName: this.config.serviceName,
    };

    loggerService.debug(
      `${this.config.serviceName} cache statistics requested`,
      undefined,
      {
        component: this.config.serviceName,
        operation: "cache-stats",
        stats,
        timestamp: new Date().toISOString(),
      }
    );

    return stats;
  }
}
