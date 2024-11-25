import * as React from "react";

import { LoginUser, RegisterUser } from "../../entities/User";
import { STATUS } from "../../utils/utils";

const initialState = {
  user: {} as LoginUser | RegisterUser,
  token: null,
  expiresAt: Date.now(),
  isAuthenticated: false,
  status: STATUS.PENDING,
  timetlive: 0,
};

const AuthContext = React.createContext({
  ...initialState,
  login: (user: LoginUser, token: string, expiresAt: string) => {},
  logout: () => {},
  updateUser: () => {},
  setAuthenticationStatus: (status: string) => {},
  registerUser: (user: RegisterUser) => {},
});

export default AuthContext;
