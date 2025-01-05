import { ConfirmationRequest } from "@/entities/User";
import useAuth from "@/state-management/auth/use-auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Form, useNavigate } from "react-router-dom";
import authService from "../../services/auth-service";
import ButtonControl from "../common/button/button.control";
import { UserStatus } from "@/utils/enums";
import { Spinner } from "react-bootstrap";

const SignUpConfirmation = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      confirmationCode: "",
      username: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    // console.log("confirm UseEffect: ", user);
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (values: ConfirmationRequest) => {
    // console.log("value: ", values);
    setIsLoading(true);
    setError("");
    const confirmation = {
      confirmationCode: values.confirmationCode,
      username: values.username,
    };

    authService
      .confirmEmail(confirmation)
      .then((response) => {
        // console.log("response from confirmEmail.submit: ", response);
        if (response.error && response.error.status > 0) {
          toast.error(response.error.message);
          dispatch({
            type: "SET_STATUS",
            payload: UserStatus.REJECTED,
          });
        } else if (response.target && response.target.length > 0) {
          dispatch({
            type: "SET_STATUS",
            payload: UserStatus.CONFIRMED,
          });
          navigate("/");
        }
      })
      .catch((error: any) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="form-container">
      <Toaster></Toaster>

      <div className="formWrapper">
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="formTitle">Confirm Your Account</h1>
          <p>
            Please refer to the email sent to the account you recently
            registered. Return here to submit your confirmation code.
          </p>

          <div className="formGroup">
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required.",
                },
                maxLength: {
                  value: 50,
                  message: "Username cannot exceed 50 characters",
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
              id="confirmationCode"
              placeholder="Confirmation Code"
              {...register("confirmationCode", {
                required: {
                  value: true,
                  message: "Confirmation Code is required.",
                },
                minLength: {
                  value: 6,
                  message: "Code must be exactly 6 characters",
                },
                maxLength: {
                  value: 6,
                  message: "Code must be exactly 6 characters",
                },
              })}
            />
            <div className="validationError">
              <span>
                {touchedFields.confirmationCode &&
                  errors.confirmationCode?.message}
              </span>
            </div>
          </div>

          <div className="formGroup">
            <ButtonControl
              id="confirm"
              name="confirm"
              cssClass="btn btn-primary mb-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner></Spinner>}
              {!isLoading && <span>Confirm</span>}
            </ButtonControl>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpConfirmation;
