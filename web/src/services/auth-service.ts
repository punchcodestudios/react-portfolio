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
  register: async (user: RegisterUser) => {
    try {
      const response = await register(user);
      return response;
    } catch (error) {
      console.error("Error registering: ", error);
      throw error;
    }
  },
  login: async (user: LoginUser) => {
    try {
      const response = await login(user);
      return response;
    } catch (error) {
      console.error("Error logging in");
      throw error;
    }
  },
  refreshAccessToken: async () => {
    try {
      const response = await refreshAccessToken();
      return response;
    } catch (error) {
      console.error("Error while refreshing access token");
      throw error;
    }
  },
};
export default authService;
