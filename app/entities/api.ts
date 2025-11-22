// /**
//  * Universal API data response interface
//  * Used across all API services for consistent response handling
//  * @template T - The data type being returned
//  * @template M - The metadata type (defaults to flexible record)
//  */
// export interface ApiDataResponse<T, M = Record<string, any>> {
//   target: T[];
//   meta: M;
//   error: string | null;
// }

// /**
//  * Single item API response interface
//  * For endpoints that return a single item instead of an array
//  * @template T - The data type being returned
//  * @template M - The metadata type (defaults to flexible record)
//  */
// export interface ApiItemResponse<T, M = Record<string, any>> {
//   target: T;
//   meta: M;
//   error: string | null;
// }

// /**
//  * Paginated API response interface
//  * Extends the base response with pagination metadata
//  * @template T - The data type being returned
//  */
// export interface ApiPaginatedResponse<T>
//   extends ApiDataResponse<T, PaginationMeta> {}

// /**
//  * Standard pagination metadata structure
//  */
// export interface PaginationMeta {
//   page: number;
//   pageSize: number;
//   totalItems: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
// }

// /**
//  * Search result metadata structure
//  */
// export interface SearchMeta extends PaginationMeta {
//   query: string;
//   searchTime: number;
//   filters?: Record<string, any>;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// }

// /**
//  * Cache metadata structure
//  */
// export interface CacheMeta {
//   cached: boolean;
//   cacheKey?: string;
//   cacheTimestamp?: number;
//   cacheTTL?: number;
// }
