import * as React from "react";
import PropTypes from "prop-types";

import { STATUS } from "../utils/utils";
import { useContext } from "react";
import { LoginUser, RegisterUser } from "../entities/User";

// export interface User {
//   name: string;
// }
// export interface NewUser {
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface LoginUser {
//   username: string;
//   password: string;
// }

// const initialState = {
//   user: {} as User,
//   token: null,
//   expiresAt: Date.now(),
//   isAuthenticated: false,
//   status: STATUS.PENDING,
//   timetlive: 0,
// };

// const AuthContext = React.createContext({
//   ...initialState,
//   login: (user: LoginUser, token: string, expiresAt: string) => {},
//   logout: () => {},
//   updateUser: () => {},
//   setAuthenticationStatus: (status: string) => {},
//   registerUser: (user: RegisterUser) => {},
// });

// const authReducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "LOGIN": {
//       console.log("login action hit: ", action.payload);
//       return {
//         user: action.payload.user,
//         token: action.payload.token,
//         expiresAt: action.payload.expiresAt,
//         isAuthenticated: true,
//         verifyingToken: false,
//         status: STATUS.SUCCEEDED,
//       };
//     }
//     case "LOGOUT": {
//       console.log("logout action hit: ");
//       return {
//         ...state,
//         isAuthenticated: false,
//         status: STATUS.IDLE,
//       };
//     }
//     case "UPDATE_USER": {
//       return {
//         ...state,
//         user: action.payload.user,
//       };
//     }
//     case "STATUS": {
//       return {
//         ...state,
//         status: action.payload.status,
//       };
//     }
//     case "REGISTER": {
//       console.log("register action hit: ", action.payload);
//       return {
//         ...state,
//         user: action.payload.user,
//       };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// };

// interface Props {
//   children: React.ReactNode;
// }
// const AuthProvider = ({ children }: Props) => {
//   const [state, dispatch] = React.useReducer(authReducer, initialState);

//   const login = React.useCallback(
//     (user: LoginUser, token: string, expiresAt: string) => {
//       dispatch({
//         type: "LOGIN",
//         payload: {
//           user,
//           token,
//           expiresAt,
//         },
//       });
//     },
//     []
//   );

//   const logout = React.useCallback(() => {
//     dispatch({
//       type: "LOGOUT",
//     });
//   }, []);

//   const updateUser = React.useCallback((user: any) => {
//     dispatch({
//       type: "UPDATE_USER",
//       payload: {
//         user,
//       },
//     });
//   }, []);

//   const setAuthenticationStatus = React.useCallback((status: string) => {
//     dispatch({
//       type: "STATUS",
//       payload: {
//         status,
//       },
//     });
//   }, []);

//   const registerUser = React.useCallback(
//     (user: RegisterUser, token: string, expiresAt: string) => {
//       dispatch({
//         type: "REGISTER",
//         payload: {
//           user,
//           token,
//           expiresAt,
//         },
//       });
//     },
//     []
//   );

//   const value = React.useMemo(
//     () => ({
//       ...state,
//       login,
//       logout,
//       updateUser,
//       setAuthenticationStatus,
//       registerUser,
//     }),
//     [state, setAuthenticationStatus, login, logout, updateUser, registerUser]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used with an AuthProvider");
//   }
//   return context;
// };

// AuthProvider.propTypes = {
//   children: PropTypes.element.isRequired,
// };

// export { AuthProvider, useAuth };
