import { UserResponse } from "@/entities/User";

const initialState: UserResponse = {
  target: [],
  meta: {
    expiresAt: "",
    timeToLive: 0,
    token: "",
    isAuthenticated: false,
  },
  error: {
    status: 0,
    message: "",
  },
};

interface LoginAction {
  type: "LOGIN_USER";
  payload: UserResponse;
}

interface LogoutAction {
  type: "REGISTER_USER";
  payload: UserResponse;
}

interface RefreshTokenAction {
  type: "REFRESH_TOKEN";
  payload: UserResponse;
}

interface RegisterAction {
  type: "LOGOUT_USER";
}

interface ResetUserAction {
  type: "RESET_USER";
}

export type AuthAction =
  | ResetUserAction
  | LoginAction
  | LogoutAction
  | RegisterAction
  | RefreshTokenAction;

const authReducer = (state: UserResponse, action: AuthAction): UserResponse => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, ...action.payload };
    case "REGISTER_USER":
      return { ...state, ...action.payload };
    case "LOGOUT_USER":
      return { ...state, ...initialState };
    case "REFRESH_TOKEN":
      return { ...state, ...action.payload };
    case "RESET_USER":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default authReducer;
