export interface ILogger {
  debug(message: string, data?: any, context?: any): void;
  info(message: string, data?: any, context?: any): void;
  warn(message: string, data?: any, context?: any): void;
  error(message: string, error?: any, context?: any): void;
  success(message: string, data?: any, context?: any): void;
  performance(message: string, duration: number, context?: any): void;
}

export interface ITelemetryService {
  trackEvent(event: { name: string; properties?: Record<string, any> }): void;
  trackMetric(metric: {
    name: string;
    value: number;
    properties?: Record<string, any>;
  }): void;
  trackDependency(dependency: {
    name: string;
    duration: number;
    success: boolean;
    properties?: Record<string, any>;
  }): void;
  trackException(exception: {
    error: Error;
    properties?: Record<string, any>;
  }): void;
}

export interface BaseDataServiceConfig {
  serviceName: string;
  enableDelaySimulation?: boolean;
  delayMs?: number;
  cacheConfig?: {
    maxSize?: number;
    defaultTtl?: number;
  };
}

export interface CacheEntry<T> {
  data: Promise<T>;
  timestamp: number;
  key: string;
  correlationId: string;
}

// export interface IApiClient {
//   get<T>(url: string, config?: any): Promise<{ data: T }>;
//   post<T>(url: string, data?: any, config?: any): Promise<{ data: T }>;
//   put<T>(url: string, data?: any, config?: any): Promise<{ data: T }>;
//   delete<T>(url: string, config?: any): Promise<{ data: T }>;
// }

// export interface IBusinessTracker {
//   trackDataLoaded(
//     entityType: string,
//     metrics: {
//       count: number;
//       cacheHit: boolean;
//       correlationId: string;
//       source: string;
//     }
//   ): void;
//   trackDataError(
//     entityType: string,
//     error: Error,
//     duration: number,
//     context: any
//   ): void;
//   trackCacheOperation(
//     operation: string,
//     entityType: string,
//     success: boolean
//   ): void;
//   trackPerformance(operation: string, duration: number, context: any): void;
// }

// export interface ICacheService {
//   get<T>(key: string): T | null;
//   set<T>(key: string, value: T, ttl?: number): void;
//   delete(key: string): boolean;
//   clear(): void;
//   getStats(): {
//     size: number;
//     maxSize: number;
//     hitRate: number;
//     missRate: number;
//   };
// }
