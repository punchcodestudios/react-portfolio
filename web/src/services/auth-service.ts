import { LoginUser, RegisterUser, User } from "@/entities/User";
import { login, logout, register, refreshAccessToken } from "../api/authApi";

const authService = {
  logout: async (id: string) => {
    try {
      const response = await logout(id);
      return response;
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  },
  register: (user: RegisterUser) => {
    try {
      const response = register(user);
      return response;
    } catch (error) {
      console.error("Error registering: ", error);
      throw error;
    }
  },
  login: async (user: LoginUser) => {
    console.log("login: ", user);
    try {
      const response = await login(user);
      console.log("authservice.login.response: ", response);
      return response;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  },
  refreshAccessToken: async () => {
    try {
      const response = await refreshAccessToken();
      return response;
    } catch (error) {
      console.log("Error while refreshing access token", error);
      throw error;
    }
  },
};
export default authService;
