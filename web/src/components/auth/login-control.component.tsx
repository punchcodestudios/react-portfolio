import useAuth from "@/state-management/auth/use-auth";
import { useNavigate } from "react-router-dom";

const LoginControl = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setStatus(isAuthenticated);
  // }, [isAuthenticated]);

  const handleClick = () => {
    if (user?.isAuthenticated) {
      return logoutUser(user.id);
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
      {user?.isAuthenticated ? "Logout" : "Login"}
    </button>
  );
};

export default LoginControl;
