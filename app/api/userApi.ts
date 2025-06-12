import { type User } from "../entities/user";
import ApiClient from "./apiClient";
import { type ApiResponse } from "../entities/api";

export const me = async (): Promise<ApiResponse<User>> => {
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

export const findUser = (userName: string): Promise<ApiResponse<User>> => {
  // console.log("userAPI.findUser: ", userName);
  const client = new ApiClient<User>("/user/findUser", {}, {});
  try {
    return client.get(userName).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};

export const getById = (id: string): Promise<ApiResponse<User>> => {
  const client = new ApiClient<User>("/user/getById", { id: id }, {});
  try {
    return client.get(id).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};
