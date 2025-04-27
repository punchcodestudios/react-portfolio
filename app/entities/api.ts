export interface ApiErrorResponse {
  status: number;
  message: string;
}

export interface MetaResponse {
  total: number;
  success: boolean;
}

interface ApiContentResponse<T> {
  target: T[];
  meta: {};
  error: ApiErrorResponse;
}

export interface ApiResponse<T> {
  content: ApiContentResponse<T>;
}
