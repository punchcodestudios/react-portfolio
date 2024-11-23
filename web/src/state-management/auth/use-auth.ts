import { useContext } from "react";
import AuthContext from "./auth-context";

const useAuth2 = () => useContext(AuthContext);
export default useAuth2;
