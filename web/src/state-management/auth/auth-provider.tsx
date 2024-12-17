import authService from "@/services/auth-service";
import React, { useEffect, useReducer, useState } from "react";
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

  const loginUser = React.useCallback((request: LoginRequest): boolean => {
    setIsLoading(true);
    setError("");
    authService
      .login(request)
      .then((response) => {
        // console.log("response: loginUser: ", response);
        if (response.target && response.target.length > 0) {
          dispatch({ type: "LOGIN_USER", payload: response });
          return true;
        }
        if (response.error) {
          setError(response.error.message);
          return false;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    return false;
  }, []);

  const refreshAccessToken = React.useCallback(async () => {
    // console.log("refreshAccessToken");
    setIsLoading(true);
    setError("");
    authService
      .refreshAccessToken()
      .then((response) => {
        if (response.target.length > 0) {
          console.log("response.target: ", response.target);
          dispatch({ type: "REFRESH_TOKEN", payload: response });
        }
        if (response.error) {
          // setError(response.error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const resetUser = React.useCallback(() => {
    dispatch({ type: "RESET_USER" });
  }, []);

  useEffect(() => {
    setError("");
    setIsLoading(false);
    dispatch({ type: "RESET_USER" });
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
      resetUser,
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
