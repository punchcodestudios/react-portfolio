import { useContext } from "react";
import AuthContext from "./auth-context";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};

export default useAuth;
