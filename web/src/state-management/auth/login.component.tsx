import { useContext } from "react";
import AuthContext from "./auth-context";

const LoginComponent = () => {
  const { username, dispatch } = useContext(AuthContext);

  // const handleLogout = () => {
  //   dispatch({
  //     type: "LOGOUT",
  //   });
  //   navigate("/");
  // };
  return (
    <div className="mt-3">
      {!username && (
        <button
          className="btn btn-primary"
          style={{ minWidth: "200px" }}
          onClick={() =>
            dispatch({
              type: "LOGIN",
              username: "",
              password: "",
            })
          }
        >
          Login
        </button>
      )}
      {/* {user && (
        <button
          className="btn btn-primary"
          style={{ minWidth: "200px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      )} */}
    </div>
  );
};

export default LoginComponent;
