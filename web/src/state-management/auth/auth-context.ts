import React, { Dispatch } from "react";
import { AuthAction, UserState } from "./auth-reducer";

interface AuthContextType {
  user: UserState;
  isLoading: boolean;
  dispatch: Dispatch<AuthAction>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;
