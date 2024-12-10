import React, { Dispatch } from "react";
import { LoginUser, RegisterUser, UserContent } from "../../entities/User";
import { AuthAction } from "./auth-reducer";

interface AuthContextType {
  userContent: UserContent;
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
