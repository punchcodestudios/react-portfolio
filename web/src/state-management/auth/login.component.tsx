import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";

const LoginComponent = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div className="ms-3">
      {!user && (
        <button
          className="btn btn-primary"
          style={{ minWidth: "200px" }}
          onClick={() =>
            dispatch({
              type: "LOGIN",
              username: "admin",
            })
          }
        >
          Login
        </button>
      )}
      {user && (
        <button
          className="btn btn-primary"
          style={{ minWidth: "200px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default LoginComponent;
