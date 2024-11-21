import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth, NewUser } from "../../contexts/auth-context";
import { STATUS } from "../../utils/utils";

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { login, setAuthenticationStatus } = useAuth();

  const onSubmit = async (values: NewUser) => {
    console.log("on submit");
    console.log(values);
    const newUser = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      setAuthenticationStatus(STATUS.PENDING);
      const response = await axios.post(
        "http://localhost:3000/api/auth/sign-up",
        newUser
      );
      setAuthenticationStatus(STATUS.SUCCEEDED);
      const { user, token, expiresAt } = response.data;
      console.log("USER after register: ", user);
      login(user, token, expiresAt);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create New Account</h1>
      <div className="form-group">
        <input
          type="text"
          //   name="name"
          id="name"
          placeholder="name"
          {...register("name", {
            required: { value: true, message: "name is required." },
            minLength: { value: 2, message: "minlength is 2" },
            maxLength: { value: 30, message: "max length is 30" },
          })}
        ></input>
        <div className="validation-error">
          <span>{touchedFields.name && errors.name?.message}</span>
        </div>
      </div>

      <div className="form-group">
        <input
          type="text"
          //   name="username"
          id="username"
          placeholder="username"
          {...register("username", {
            required: { value: true, message: "username is required." },
            minLength: { value: 2, message: "minlength is 2" },
            maxLength: { value: 30, message: "max length is 30" },
          })}
        ></input>
        <div className="validation-error">
          <span>{touchedFields.username && errors.username?.message}</span>
        </div>
      </div>

      <div className="form-group">
        <input
          type="email"
          //   name="email"
          id="email"
          autoComplete="email"
          placeholder="email"
          {...register("email", {
            required: { value: true, message: "email is required." },
          })}
        ></input>
        <div className="validation-error">
          <span>{touchedFields.email && errors.email?.message}</span>
        </div>
      </div>

      <div className="form-group">
        <input
          type="password"
          //   name="password"
          id="password"
          autoComplete="new-password"
          placeholder="password"
          {...register("password", {
            required: { value: true, message: "password is required." },
          })}
        ></input>
        <div className="validation-error">
          <span>{touchedFields.password && errors.password?.message}</span>
        </div>
      </div>

      <div className="form-group">
        <input
          type="password"
          //   name="confirmPassword"
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="confirmPassword"
          {...register("confirmPassword", {
            required: { value: true, message: "confirmPassword is required." },
          })}
        ></input>
        <div className="validation-error">
          <span>
            {touchedFields.confirmPassword && errors.confirmPassword?.message}
          </span>
        </div>
      </div>

      <div className="form-group">
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </div>

      <p>
        <span>Already have an account?</span> <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
