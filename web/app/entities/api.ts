export interface ApiErrorResponse {
  status: number;
  message: string;
}

interface ApiContentResponse<T> {
  target: T[];
  meta: {};
  error: ApiErrorResponse;
}

export interface ApiResponse<T> {
  content: ApiContentResponse<T>;
}
