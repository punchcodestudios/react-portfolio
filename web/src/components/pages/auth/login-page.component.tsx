import { useContext, useRef } from "react";
import AuthContext from "../../../state-management/auth/auth-context";

const LoginPage = () => {
  const { username, dispatch } = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="row mb-3">
        <label htmlFor="email">username:</label>
        <input
          id="email"
          name="email"
          type="text"
          ref={emailRef}
          className="form-control"
        ></input>
      </div>
      <div className="row mb-3">
        <label htmlFor="password">password:</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
          className="form-control"
        ></input>
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary"
          style={{ minWidth: "200px" }}
          onClick={() =>
            dispatch({
              type: "LOGIN",
              username: emailRef.current?.value || "",
              password: passwordRef.current?.value || "",
            })
          }
        >
          Login
        </button>
        )
      </div>
    </>
  );
};

export default LoginPage;
