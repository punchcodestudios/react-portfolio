import React from "react";
import { Dispatch } from "react";
import { AuthAction } from "./auth-provider";

interface AuthContextType {
  user: string;
  dispatch: Dispatch<AuthAction>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
