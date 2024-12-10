import { LoginUser, RegisterUser, User, UserContent } from "@/entities/User";
import ApiClient from "./apiClient";
import { ApiSingleResponse } from "./apiResponses";

export const logout = async (
  id: string
): Promise<ApiSingleResponse<Boolean>> => {
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
): Promise<ApiSingleResponse<UserContent>> => {
  console.log("authService.register");
  const client = new ApiClient<UserContent>("auth/sign-up");
  return client.post(user).then((response) => {
    return Promise.resolve(response as ApiSingleResponse<UserContent>);
  });
};

export const login = async (
  user: LoginUser
): Promise<ApiSingleResponse<UserContent>> => {
  const client = new ApiClient<UserContent>("auth/login");
  return client.post(user).then((response) => {
    return Promise.resolve(response as ApiSingleResponse<UserContent>);
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
