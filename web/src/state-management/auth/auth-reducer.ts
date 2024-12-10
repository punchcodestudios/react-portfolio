import { ApiResponse } from "@/api/apiResponses";
import { User, UserContent } from "@/entities/User";
const initialState: UserContent = {
  isAuthenticated: false,
  user: {
    email: "",
    name: "",
    username: "",
    _id: "",
    roles: [],
  },
  userAuth: {
    expiresAt: "",
    timeToLive: 0,
    token: "",
  },
};

interface LoginAction {
  type: "LOGIN_USER";
  payload: ApiResponse<User>;
}

interface LogoutAction {
  type: "REGISTER_USER";
  payload: ApiResponse<User>;
}

interface RegisterAction {
  type: "LOGOUT_USER";
}

export type AuthAction = LoginAction | LogoutAction | RegisterAction;

const authReducer = (
  state: ApiResponse<User>,
  action: AuthAction
): ApiResponse<User> => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, ...action.payload };
    case "REGISTER_USER":
      return { ...state, ...action.payload };
    case "LOGOUT_USER":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default authReducer;
