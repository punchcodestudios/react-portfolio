import authService from "@/services/auth-service";
import React, { useReducer, useState } from "react";
import {
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
  UserResponse,
} from "../../entities/User";
import AuthContext from "./auth-context";
import authReducer from "./auth-reducer";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [userResponse, dispatch] = useReducer(authReducer, {} as UserResponse);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const logoutUser = React.useCallback((request: LogoutRequest): void => {
    setIsLoading(true);
    setError("");
    authService
      .logout(request)
      .then((response) => {
        if (response.target) {
          dispatch({ type: "LOGOUT_USER" });
        }
        if (response.error) {
          setError(response.error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const registerUser = React.useCallback((request: RegisterRequest): void => {
    setIsLoading(true);
    setError("");
    authService
      .register(request)
      .then((response) => {
        if (response.target) {
          dispatch({ type: "REGISTER_USER", payload: response });
        }
        if (response.error) {
          setError(response.error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loginUser = React.useCallback((request: LoginRequest): void => {
    setIsLoading(true);
    setError("");
    authService
      .login(request)
      .then((response) => {
        // console.log("response: loginUser: ", response);
        if (response.target) {
          dispatch({ type: "LOGIN_USER", payload: response });
        }
        if (response.error) {
          setError(response.error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const refreshAccessToken = React.useCallback(async () => {
    try {
      console.log("refreshAccessToken");
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
      userResponse,
      isLoading,
      error,
      dispatch,
      loginUser,
      logoutUser,
      registerUser,
      refreshAccessToken,
    }),
    [
      userResponse,
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
