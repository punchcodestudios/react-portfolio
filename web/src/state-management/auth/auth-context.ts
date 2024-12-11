import React, { Dispatch } from "react";
import {
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
  UserResponse,
} from "../../entities/User";
import { AuthAction } from "./auth-reducer";

interface AuthContextType {
  userResponse: UserResponse;
  isLoading: boolean;
  error: string;
  dispatch: Dispatch<AuthAction>;
  registerUser: (request: RegisterRequest) => void;
  loginUser: (request: LoginRequest) => void;
  logoutUser: (request: LogoutRequest) => void;
  refreshAccessToken: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;
