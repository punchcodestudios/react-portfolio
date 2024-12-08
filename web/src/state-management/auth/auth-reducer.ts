import { User } from "@/entities/User";

interface LoginAction {
  type: "LOGIN_USER";
  payload: User;
}

interface LogoutAction {
  type: "REGISTER_USER";
  payload: User;
}

interface RegisterAction {
  type: "LOGOUT_USER";
}

export type AuthAction = LoginAction | LogoutAction | RegisterAction;

const authReducer = (state: User, action: AuthAction): User => {
  switch (action.type) {
    case "LOGIN_USER":
      const user = { ...action.payload, isAuthenticated: true };
      return { ...state, ...user };
    case "REGISTER_USER":
      return action.payload;
    case "LOGOUT_USER":
      return {} as User;
    default:
      return state;
  }
};

export default authReducer;
