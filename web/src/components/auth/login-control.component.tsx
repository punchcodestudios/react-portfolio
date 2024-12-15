import useAuth from "@/state-management/auth/use-auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginControl = () => {
  const { userResponse, logoutUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("userResponse: ", userResponse);
    // setIsAuthenticated(userResponse.isAuthenticated);
  }, [userResponse]);

  const handleClick = () => {
    // if (userResponse?.content.meta.isAuthenticated) {
    //   return logoutUser(userResponse.content.target[0].);
    // }
    navigate("/login");
  };

  return (
    <button
      id="login-control"
      name="logincontrol"
      className="btn btn-primary"
      onClick={handleClick}
    >
      {isAuthenticated ? "Logout" : "Login"}
    </button>
  );
};

export default LoginControl;
