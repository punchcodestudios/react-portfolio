import { LoginRequest } from "@/entities/User";
import useAuth from "@/state-management/auth/use-auth";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/auth-service";
import ButtonControl from "../common/button/button.control";

const Login = () => {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const { dispatch } = useAuth();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginRequest) => {
    setError("");
    const loginForm = {
      username: values.username,
      password: values.password,
    };
    // console.log("login info: ", loginForm);
    authService
      .login(loginForm)
      .then((response) => {
        // console.log("login response: ", response);
        if (!response.meta.success) {
          setError(response.error.message);
        } else {
          localStorage.setItem("token", response.meta.token);
          dispatch({
            type: "SET_USER",
            payload: { ...response.target[0] },
          });
          if (locationState?.from) {
            navigate(locationState.from);
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="form-container">
      <Toaster></Toaster>
      <div className="formWrapper">
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="formTitle">Sign In</h1>
          {/* {isLoading && <div>loading...</div>} */}
          <Form.Group className="mb-3">
            <input
              className="input"
              type="text"
              id="username"
              aria-label="username"
              autoComplete="false"
              required
              placeholder="username"
              {...register("username", {
                required: { value: true, message: "This field is required." },
              })}
            />
            <div className="validationError">
              <span>{touchedFields.username && errors.username?.message}</span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <input
              className="input"
              type="password"
              id="password"
              required
              autoComplete="false"
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "Password is required." },
              })}
            />
            <div className="validationError">
              <span>{touchedFields.password && errors.password?.message}</span>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <ButtonControl
              id="signin"
              name="signin"
              cssClass="btn btn-primary"
              type="submit"
            >
              {/* {isLoading && <Spinner className="button-spinner" />} */}
              Sign In
            </ButtonControl>
          </Form.Group>
          <p className="text">
            <span>Don't have an account?</span>
            <Link className="link" to="/user/register">
              Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
export default Login;
