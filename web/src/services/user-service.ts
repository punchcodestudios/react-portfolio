import { User, UserResponse } from "@/entities/User";
import { ApiResponse } from "@/api/apiResponses";
import { me } from "@/api/userApi";

const UserService = {
  isAuthenticated: async () => {
    try {
      const response = await me();
      return Promise.resolve(map(response));
    } catch (error) {
      // console.error("there is something wrong with me(): ", error);
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
