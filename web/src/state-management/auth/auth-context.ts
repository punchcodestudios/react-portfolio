import { ApiResponse } from "@/api/apiResponses";
import React, { Dispatch } from "react";
import { LoginUser, RegisterUser, User } from "../../entities/User";
import { AuthAction } from "./auth-reducer";

interface AuthContextType {
  content: ApiResponse<User>;
  isLoading: boolean;
  error: string;
  dispatch: Dispatch<AuthAction>;
  registerUser: (user: RegisterUser) => void;
  loginUser: (user: LoginUser) => void;
  logoutUser: (_id: string) => void;
  refreshAccessToken: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;
