import { LoginRequest, LogoutRequest } from "@/entities/User";
import useAuth from "@/state-management/auth/use-auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginControl = () => {
  const { userResponse, logoutUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userResponse.meta) {
      setIsAuthenticated(userResponse?.meta.isAuthenticated);
    }
  }, [userResponse]);

  const handleClick = () => {
    if (isAuthenticated) {
      logoutUser({ _id: userResponse.target[0]._id } as LogoutRequest);
      setIsAuthenticated(false);
      navigate("/");
    }
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
