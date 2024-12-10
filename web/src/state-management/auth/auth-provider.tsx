import authService from "@/services/auth-service";
import React, { useReducer, useState } from "react";
import {
  LoginUser,
  RegisterUser,
  User,
  UserContent,
} from "../../entities/User";
import AuthContext from "./auth-context";
import authReducer from "./auth-reducer";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {} as UserContent);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const logoutUser = React.useCallback((id: string) => {
    setIsLoading(true);
    try {
      authService.logout(id).then((response) => {
        console.log("Response from Logout: ", response);
        dispatch({ type: "LOGOUT_USER" });
        return response.data.content;
      });
    } catch (error: any) {
      setError(`Error logging in: ${error.data.error.message}`);
      return Promise.reject(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registerUser = React.useCallback((register: RegisterUser) => {
    let userContent = {} as UserContent;
    try {
      return authService.register(register).then((response) => {
        userContent = { ...userContent, ...response.data.content };
        dispatch({ type: "REGISTER_USER", payload: userContent });
        return response;
      });
    } catch (error: any) {
      setError(`Rgistration error: ${error.data.error.message}`);
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginUser = (login: LoginUser): void => {
    setIsLoading(true);
    setError("");
    authService
      .login(login)
      .then((response) => {
        console.log("response: loginUser: ", response.data.content);
        if (response.data.content) {
          dispatch({ type: "LOGIN_USER", payload: response.data.content });
        }
      })
      .catch((error) => {
        console.log("error in provider", error);
        setError(`Error logging in: ${error.data.error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const refreshAccessToken = React.useCallback(async () => {
    try {
      const response = await authService.refreshAccessToken();
      console.log("refreshAcessToken.response: ", response);
      // if (response.status === 204) {
      //   console.log("response status === 204: ", response);
      //   logoutUser(user.id);
      // } else {
      //   console.log("all is well, carry on: ", response);
      //   loginUser(user);
      // }
    } catch (error) {
      console.log("error caught: ", error);
      // logoutUser(user.id);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      userContent: { ...state },
      isLoading,
      error,
      dispatch,
      loginUser,
      logoutUser,
      registerUser,
      refreshAccessToken,
    }),
    [
      state,
      isLoading,
      error,
      loginUser,
      logoutUser,
      registerUser,
      refreshAccessToken,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
