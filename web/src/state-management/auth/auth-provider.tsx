import React, { useReducer, useState } from "react";
import { LoginUser, RegisterUser, User } from "../../entities/User";
import AuthContext from "./auth-context";
import authService from "@/services/auth-service";
import authReducer from "./auth-reducer";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {} as User);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const logoutUser = React.useCallback((id: string) => {
    setIsLoading(true);
    try {
      return authService.logout(id).then((response) => {
        dispatch({ type: "LOGOUT_USER" });
        return Promise.resolve(response);
      });
    } catch (error) {
      setError("Error logging out user");
      return Promise.reject(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registerUser = React.useCallback((register: RegisterUser) => {
    let user = {} as User;
    try {
      return authService.register(register).then((response) => {
        user = { ...user, ...response };
        dispatch({ type: "REGISTER_USER", payload: user });
        return Promise.resolve(user);
      });
    } catch (error) {
      setError("Error registering user");
      return Promise.reject(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginUser = React.useCallback((login: LoginUser) => {
    let user = {} as User;
    setIsLoading(true);
    try {
      return authService.login(login).then((response) => {
        user = { ...user, ...response };
        dispatch({ type: "LOGIN_USER", payload: user });
        return Promise.resolve(user);
      });
    } catch (error) {
      setError("Error logging-in user");
      return Promise.reject({} as User);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      //logoutUser(user.id);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      user: { ...state },
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
