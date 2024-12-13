import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginUser } from "@/entities/User";
import useAuth from "@/state-management/auth/use-auth";
import { Form, Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import ButtonControl from "../common/button/button.control";
import { useEffect } from "react";

const Login = () => {
  const { loginUser, isLoading, error } = useAuth();

  if (error) {
    toast(error);
  }

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

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

  const onSubmit = async (values: LoginUser) => {
    const user = {
      username: values.username,
      password: values.password,
    };
    loginUser(user);
  };

  return (
    <div className="form-container">
      <Toaster></Toaster>
      <div className="formWrapper">
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="formTitle">Sign In</h1>
          <Form.Group className="mb-3">
            <input
              className="input"
              type="text"
              id="username"
              aria-label="Username or Email"
              required
              placeholder="Username or Email"
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
              {isLoading && <Spinner className="button-spinner" />}Sign In
            </ButtonControl>
          </Form.Group>
          <p className="text">
            <span>Don't have an account?</span>
            <Link className="link" to="/register">
              Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
export default Login;
