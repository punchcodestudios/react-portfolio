import { useAuth } from "@/contexts/auth-context";
import NodeAPIClient from "@/services/node-api-client";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginControl = () => {
  const { isAuthenticated, logout } = useAuth();
  const [status, setStatus] = useState<Boolean>(false);
  const apiClient = new NodeAPIClient("./auth/logout");
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(isAuthenticated);
  }, [isAuthenticated]);

  const handleClick = () => {
    if (status) {
      apiClient.post({}).then((response) => {
        console.log("response: ", response);
        return logout();
      });
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
      {status ? "Logout" : "Login"}
    </button>
  );
};

export default LoginControl;
