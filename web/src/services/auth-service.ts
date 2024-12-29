import {
  ConfirmationRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  User,
  UserResponse,
} from "@/entities/User";
import {
  login,
  logout,
  register,
  refreshAccessToken,
  confirmEmail,
} from "../api/authApi";
import { ApiResponse } from "@/api/apiResponses";

const authService = {
  logout: async (request: LogoutRequest) => {
    try {
      const response = await logout(request);
      localStorage.removeItem("token");
      return Promise.resolve(map(response));
    } catch (error) {
      // console.error("Error logging out: ", error);
      throw error;
    }
  },
  register: async (request: RegisterRequest) => {
    try {
      const response = await register(request);
      return Promise.resolve(map(response));
    } catch (error) {
      // console.error("Error registering: ", error);
      throw error;
    }
  },
  login: async (request: LoginRequest): Promise<UserResponse> => {
    // console.log("login: ", request);
    try {
      const response = await login(request);
      return Promise.resolve(map(response));
    } catch (error: any) {
      // console.log("error in service: ", error);
      return Promise.resolve(map(error));
    }
  },
  refreshAccessToken: async () => {
    try {
      const response = await refreshAccessToken();
      // console.log("refresh access token: ", response);
      return Promise.resolve(map(response));
    } catch (error) {
      // console.log("Error while refreshing access token", error);
      throw error;
    }
  },
  confirmEmail: async (request: ConfirmationRequest): Promise<UserResponse> => {
    try {
      const response = await confirmEmail(request);
      return Promise.resolve(map(response));
    } catch (error: any) {
      return Promise.resolve(map(error));
    }
  },
};
export default authService;

const map = (item: ApiResponse<User>): UserResponse => {
  // console.log("map: ", item);
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as UserResponse;

  return res;
};
