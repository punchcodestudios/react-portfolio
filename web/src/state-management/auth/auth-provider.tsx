import { ReactNode, useReducer } from "react";
import AuthContext from "./auth-context";
import authService from "@/services/authService";

interface LoginAction {
  type: "LOGIN";
  username: string;
  password: string;
}

interface LogoutAction {
  type: "LOGOUT";
}

export type AuthAction = LoginAction | LogoutAction;

const authReducer = (state: string, action: AuthAction): string => {
  switch (action.type) {
    case "LOGIN":
      console.log("login action");
      authService
        .post({ email: action.username, password: action.password })
        .then((res) => {
          console.log("Res: ", res);
          // localStorage.setItem("token", res);
          console.log(action.username);
          return action.username;
        })
        .catch((err) => {
          console.log(err.response.data);
          return err.response.data;
        });
      return "";
    case "LOGOUT":
      return "";
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [username, dispatch] = useReducer(authReducer, "");
  return (
    <AuthContext.Provider value={{ username, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
