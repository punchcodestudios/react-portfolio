import { LoginUser, RegisterUser, User } from "@/entities/User";
import ApiClient from "./apiClient";

export const logout = async (id: string) => {
  console.log("authApi.logout()");
  const client = new ApiClient<boolean>("/auth/logout");
  try {
    const response = await client.post(id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (user: RegisterUser) => {
  console.log("authService.register");
  const client = new ApiClient<User>("auth/register");
  try {
    const response = await client.post(user);
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (user: LoginUser) => {
  console.log("authService.login");
  const client = new ApiClient<User>("auth/login");
  try {
    const response = await client.post(user);
    return response;
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = async () => {
  console.log("authService.refreshAccessToken");
  const client = new ApiClient<User>("auth/refresh");
  try {
    const response = await client.post({});
    return response;
  } catch (error) {
    throw error;
  }
};
