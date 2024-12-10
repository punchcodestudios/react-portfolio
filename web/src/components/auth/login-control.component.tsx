import useAuth from "@/state-management/auth/use-auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginControl = () => {
  const { userContent, logoutUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userContent: ", userContent);
    setIsAuthenticated(userContent.isAuthenticated);
  }, [userContent]);

  const handleClick = () => {
    if (userContent?.isAuthenticated) {
      return logoutUser(userContent.user._id);
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
