export interface MetaResponse {
  /** Total number of items in the result set */
  total: number;

  /** Whether this response was served from cache */
  cacheHit: boolean;

  /** Source of the data (api, cache, fallback) */
  source: "api" | "cache" | "fallback";

  /** Correlation ID for request tracing across services */
  correlationId: string;

  /** Request processing duration in milliseconds */
  requestDuration?: number;

  /** Timestamp when the response was generated */
  timestamp?: string;

  /** API version used for this response */
  apiVersion?: string;

  /** Rate limiting information */
  rateLimit?: {
    remaining: number;
    resetTime: number;
    limit: number;
  };

  /** Pagination information (if applicable) */
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };

  /** Performance metrics for AI tracing */
  performance?: {
    dbQueryTime?: number;
    cacheQueryTime?: number;
    serializationTime?: number;
    validationTime?: number;
  };

  /** Debug information (development only) */
  debug?: {
    queryPlan?: string;
    cacheKey?: string;
    executionPath?: string[];
    memoryUsage?: number;
  };
}

export interface BaseRequestParams {
  /** Unique identifier for the resource */
  id?: string;

  /** Slug array for URL-friendly identifiers */
  slug?: string[];

  /** Items to exclude from results */
  exclude?: string[];

  /** Maximum number of items to return */
  limit?: number;

  /** Offset for pagination */
  offset?: number;

  /** Fields to include in response */
  fields?: string[];

  /** Sort order specification */
  sort?: {
    field: string;
    direction: "asc" | "desc";
  }[];

  /** Filtering criteria */
  filters?: Record<string, any>;

  /** Force cache refresh */
  refreshCache?: boolean;

  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Universal API data response type
 * Used across all API services for consistent response handling
 * @template T - The data type being returned
 * @template M - The metadata type (defaults to flexible record)
 */
export interface ApiDataResponse<T, M = Record<string, any>> {
  target: T[];
  meta: M;
  error: string | null;
}

/**
 * Single item API response type
 * For endpoints that return a single item instead of an array
 * @template T - The data type being returned
 * @template M - The metadata type (defaults to flexible record)
 */
export interface ApiItemResponse<T, M = Record<string, any>> {
  target: T;
  meta: M;
  error: string | null;
}

/**
 * Paginated API response type
 * Extends the base response with pagination metadata
 * @template T - The data type being returned
 */
export interface ApiPaginatedResponse<T>
  extends ApiDataResponse<T, PaginationMeta> {}

/**
 * Standard pagination metadata structure
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Search result metadata structure
 */
export interface SearchMeta extends PaginationMeta {
  query: string;
  searchTime: number;
  filters?: Record<string, any>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Cache metadata structure
 */
export interface CacheMeta {
  cached: boolean;
  cacheKey?: string;
  cacheTimestamp?: number;
  cacheTTL?: number;
}
