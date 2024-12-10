import { LoginUser, RegisterUser, User, UserContent } from "@/entities/User";
import ApiClient from "./apiClient";
import { ApiResponse } from "./apiResponses";

export const logout = async (id: string): Promise<ApiResponse<Boolean>> => {
  console.log("authApi.logout()");
  const client = new ApiClient<boolean>("/auth/logout");
  try {
    return client.post(id).then((response) => {
      return response;
    });
  } catch (error) {
    throw error;
  }
};

export const register = async (
  user: RegisterUser
): Promise<ApiResponse<User>> => {
  console.log("authService.register");
  const client = new ApiClient<User>("auth/sign-up");
  return client.post(user).then((response) => {
    return Promise.resolve(response as ApiResponse<User>);
  });
};

export const login = async (user: LoginUser): Promise<ApiResponse<User>> => {
  const client = new ApiClient<User>("auth/login");
  return client.post(user).then((response) => {
    console.log("Response from apiClient: ", response);
    return Promise.resolve(response as ApiResponse<User>);
  });
};

export const refreshAccessToken = async () => {
  console.log("authService.refreshAccessToken");
  const client = new ApiClient<User>("auth/refresh");
  try {
    return client.post({}).then((response) => {
      console.log("response: ", response);
      return Promise.resolve(response);
    });
  } catch (error) {
    throw error;
  }
};
