import React, { Dispatch } from "react";
import { AuthAction } from "./auth-reducer";
import { LoginUser, RegisterUser, User } from "../../entities/User";
import { STATUS } from "../../utils/utils";

const initialState = {
  user: {} as User,
};

interface AuthContextType {
  user: User;
  isLoading: boolean;
  error: string;
  dispatch: Dispatch<AuthAction>;
  registerUser: (user: RegisterUser) => Promise<User>;
  loginUser: (user: LoginUser) => Promise<User>;
  logoutUser: (_id: string) => Promise<Boolean>;
  refreshAccessToken: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;
