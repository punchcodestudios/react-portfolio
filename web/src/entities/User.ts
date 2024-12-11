import { ApiErrorResponse } from "@/api/apiResponses";

export interface LogoutRequest {
  id: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  roles: string[];
}

export interface UserAuth {
  expiresAt: string;
  timeToLive: number;
  token: string;
  isAuthenticated: boolean;
}

export interface UserResponse {
  target: User[];
  meta: UserAuth;
  error: ApiErrorResponse;
}
