import React, { useEffect, useReducer, useState } from "react";
import AuthContext from "./auth-context";
import authReducer, { UserState } from "./auth-reducer";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(authReducer, {} as UserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  const value = {
    user,
    isLoading,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
