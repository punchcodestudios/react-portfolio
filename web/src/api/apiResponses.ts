export interface ApiErrorResponse {
  status: number;
  message: string;
}

export interface ApiSingleResponse<T> {
  data: {
    content: T;
    error: ApiErrorResponse;
  };
}

export interface ApiMultipleResponse<T> {
  data: {
    content: T[];
    error: ApiErrorResponse;
  };
}
