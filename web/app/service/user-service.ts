import { type User, type UserResponse } from "../entities/user";
import type { ApiResponse } from "../entities/api";
import { me, findUser, getById } from "../api/userApi";

const UserService = {
  isAuthenticated: async () => {
    try {
      const response = await me();
      return Promise.resolve(map(response));
    } catch (error) {
      console.error("there is something wrong with me(): ", error);
      throw error;
    }
  },
  userExists: async (username: string) => {
    try {
      const response: ApiResponse<User> = await findUser(username);
      console.log("user-service.ts response: ", response);
      return Promise.resolve(map(response));
    } catch (error) {
      throw error;
    }
  },
  getById: async (id: string) => {
    try {
      const response: ApiResponse<User> = await getById(id);
      console.log("user-service.ts response: ", response);
      return Promise.resolve(map(response));
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;

const map = (item: ApiResponse<User>): UserResponse => {
  // console.log("map: ", item);
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as UserResponse;

  return res;
};
