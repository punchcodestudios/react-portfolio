import { LogoutRequest } from "@/entities/User";
import useAuth from "@/state-management/auth/use-auth";
import { UserStatus } from "@/utils/enums";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth-service";

const LoginControl = () => {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user && user.status == UserStatus.CONFIRMED) {
      authService.logout({ id: user._id } as LogoutRequest).then(() => {
        dispatch({ type: "INIT" });
      });
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      id="login-control"
      name="logincontrol"
      className="btn btn-primary"
      onClick={handleClick}
    >
      {user && user.status == UserStatus.CONFIRMED ? "Logout" : "Login"}
    </button>
  );
};

export default LoginControl;
