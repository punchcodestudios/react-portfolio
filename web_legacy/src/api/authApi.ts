import {
  ConfirmationRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  User,
} from "@/entities/User";
import ApiClient from "./apiClient";
import { ApiResponse } from "./apiResponses";

export const logout = async (
  request: LogoutRequest
): Promise<ApiResponse<User>> => {
  // console.log("authApi.logout()");
  const client = new ApiClient<User>("/user/logout");
  try {
    return client.post(request.id).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};

export const register = async (
  request: RegisterRequest
): Promise<ApiResponse<User>> => {
  // console.log("authService.register");
  const client = new ApiClient<User>("user/sign-up");
  try {
    return client.post(request).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};

export const login = async (
  request: LoginRequest
): Promise<ApiResponse<User>> => {
  const client = new ApiClient<User>("user/login");
  try {
    return client.post(request).then((response) => {
      // console.log("authApi.login response: ", response);
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};

export const refreshAccessToken = async (): Promise<ApiResponse<User>> => {
  // console.log("authService.refreshAccessToken");
  const client = new ApiClient<User>("auth/refresh");
  try {
    return client.post({}).then((response) => {
      // console.log("response in authAPI: ", response);
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};

export const confirmEmail = async (
  request: ConfirmationRequest
): Promise<ApiResponse<User>> => {
  const client = new ApiClient<User>("user/confirm");
  // console.log("confirm request: ", request);
  try {
    return client.post(request).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};
