import { User } from "@/entities/User";
import ApiClient from "./apiClient";
import { ApiResponse } from "./apiResponses";

export const me = async (): Promise<ApiResponse<User>> => {
  console.log("authApi.me(): ", localStorage.getItem("token"));
  const client = new ApiClient<User>(
    "/user/me",
    {},
    { Authorization: `Bearer ${localStorage.getItem("token")}` }
  );
  try {
    return client.getAll().then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};
