import { AuthRecoveryRequest, ConfirmationRequest } from "@/entities/User";
import authService from "@/services/auth-service";
import useAuth from "@/state-management/auth/use-auth";
import { UserStatus } from "@/utils/enums";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Form, Link, useNavigate } from "react-router-dom";
import ButtonControl from "../common/button/button.control";

const AuthRecovery = () => {
  //   const navigate = useNavigate();
  //   const { dispatch, user } = useAuth();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (values: AuthRecoveryRequest) => {
    setIsLoading(true);
    setError("");
    const request = {
      email: values.email,
      username: values.username,
    };

    // authService
    //   .confirmEmail(confirmation)
    //   .then((response) => {
    //     if (response.error && response.error.status > 0) {
    //       toast.error(response.error.message);
    //       dispatch({
    //         type: "SET_STATUS",
    //         payload: UserStatus.REJECTED,
    //       });
    //     } else if (response.target && response.target.length > 0) {
    //       dispatch({
    //         type: "SET_STATUS",
    //         payload: UserStatus.CONFIRMED,
    //       });
    //       navigate("/");
    //     }
    //   })
    //   .catch((error: any) => {
    //     toast.error(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <div className="form-container">
      <Toaster></Toaster>
      <div className="formWrapper">
        {isLoading && <div>loading...</div>}
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="formTitle">Create New Account</h1>
          <div className="formGroup">
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Name"
              {...register("username", {
                required: { value: true, message: "Name is required." },
                minLength: {
                  value: 2,
                  message: "Username cannot be less than 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name cannot be more than 30 characters",
                },
              })}
            />
            <div className="validationError">
              <span>{touchedFields.username && errors.username?.message}</span>
            </div>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Username"
              {...register("username", {
                required: { value: true, message: "Username is required." },
                minLength: {
                  value: 2,
                  message: "Username cannot be less than 2 characters",
                },
              })}
            />
            <div className="validationError">
              <span>{touchedFields.username && errors.username?.message}</span>
            </div>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Email"
              {...register("email", {
                required: { value: true, message: "Email is required." },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <div className="validationError">
              <span>{touchedFields.email && errors.email?.message}</span>
            </div>
          </div>
          <div className="formGroup">
            <ButtonControl
              id="signin"
              name="signin"
              cssClass="btn btn-primary mb-4"
              type="submit"
            >
              Sign Up
            </ButtonControl>
          </div>
          <p className="text">
            <span>Already have an account?</span>
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthRecovery;
