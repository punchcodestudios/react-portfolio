import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

import { useAuth } from "../../contexts/auth-context";
import { STATUS } from "../../utils/utils";

import styles from "./Login.module.scss";
import { LoginUser } from "@/entities/User";
import NodeAPIClient from "@/services/node-api-client";

const Login = () => {
  const { login, setAuthenticationStatus } = useAuth();
  const apiClient = new NodeAPIClient<LoginUser>("/auth/login");

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

  const navigate = useNavigate();

  const onSubmit = async (values: LoginUser) => {
    const user = {
      username: values.username,
      password: values.password,
    };
    setAuthenticationStatus(STATUS.PENDING);
    apiClient
      .post(user)
      .then((response) => {
        setAuthenticationStatus(STATUS.SUCCEEDED);
        console.log("response: ", response);
        const { user: userObj, token, expiresAt } = response;
        login(userObj, token, expiresAt);
        navigate("/");
      })
      .catch((error) => {
        console.log("error with login: ", error);
        alert(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.formTitle}>Sign In</h1>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="text"
              id="username"
              aria-label="Username or Email"
              required
              placeholder="Username or Email"
              {...register("username", {
                required: { value: true, message: "This field is required." },
              })}
            />
            <div className={styles.validationError}>
              <span>{touchedFields.username && errors.username?.message}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="password"
              id="password"
              required
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "Password is required." },
              })}
            />
            <div className={styles.validationError}>
              <span>{touchedFields.password && errors.password?.message}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <button className={styles.submitButton} type="submit">
              Sign In
            </button>
          </div>
          <p className={styles.text}>
            <span>Don't have an account?</span>
            <Link className={styles.link} to="/register">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
