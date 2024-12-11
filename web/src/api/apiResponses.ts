export interface ApiErrorResponse {
  status: number;
  message: string;
}

interface ApiContentResponse<T> {
  target: T[];
  meta: {};
}

export interface ApiResponse<T> {
  content: ApiContentResponse<T>;
  error: ApiErrorResponse;
}
