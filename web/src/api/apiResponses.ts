export interface ApiErrorResponse {
  status: number;
  message: string;
}

export interface ApiContentResponse<T> {
  target: T[];
  meta: string[];
}

export interface ApiResponse<T> {
  content: ApiContentResponse<T>;
  error: ApiErrorResponse;
}
