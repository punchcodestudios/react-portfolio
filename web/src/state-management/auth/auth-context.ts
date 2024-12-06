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
  login: (_user: LoginUser, _token: string, _expiresAt: string) => {},
  logout: () => {},
  updateUser: () => {},
  setAuthenticationStatus: (_status: string) => {},
  registerUser: (_user: RegisterUser) => {},
});

export default AuthContext;
