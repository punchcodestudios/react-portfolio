import * as React from "react";
import PropTypes from "prop-types";

import { STATUS } from "../utils/utils";

export interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface User {
  username: string;
  password: string;
}

const initialState = {
  user: {},
  token: null,
  expiresAt: null,
  isAuthenticated: false,
  status: STATUS.PENDING,
};

const AuthContext = React.createContext({
  ...initialState,
  login: (user: any, token: string, expiresAt: string) => {},
  logout: () => {},
  updateUser: () => {},
  setAuthenticationStatus: (status: string) => {},
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        user: action.payload.user,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        isAuthenticated: true,
        verifyingToken: false,
        status: STATUS.SUCCEEDED,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        status: STATUS.IDLE,
      };
    }
    case "UPDATE_USER": {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case "STATUS": {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

interface Props {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const login = React.useCallback(
    (user: User, token: string, expiresAt: string) => {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
          expiresAt,
        },
      });
    },
    []
  );

  const logout = React.useCallback(() => {
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const updateUser = React.useCallback((user: any) => {
    dispatch({
      type: "UPDATE_USER",
      payload: {
        user,
      },
    });
  }, []);

  const setAuthenticationStatus = React.useCallback((status: string) => {
    dispatch({
      type: "STATUS",
      payload: {
        status,
      },
    });
  }, []);

  const value = React.useMemo(
    () => ({ ...state, login, logout, updateUser, setAuthenticationStatus }),
    [state, setAuthenticationStatus, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AuthProvider, useAuth };
