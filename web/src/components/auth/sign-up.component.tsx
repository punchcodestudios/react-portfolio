import { RegisterRequest } from "@/entities/User";
import useAuth from "@/state-management/auth/use-auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Form, Link, useNavigate } from "react-router-dom";
import ButtonControl from "../common/button/button.control";
import { useEffect, useState } from "react";
import authService from "../../services/auth-service";
import { UserStatus } from "@/utils/enums";

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

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user, dispatch } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (values: RegisterRequest) => {
    setError("");
    setIsLoading(true);
    const newUser = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    authService
      .register(newUser)
      .then((response) => {
        console.log(response);
        if (!response.meta.success) {
          setError(response.error.message);
        } else if (response.target && response.target.length > 0) {
          console.log("response.target: ", response.target);
          dispatch({
            type: "SET_USER",
            payload: {
              ...user,
              _id: response.target[0]._id,
              username: response.target[0].username,
              email: response.target[0].email,
              status: UserStatus.PENDING,
            },
          });
          console.log("before navigate");
          navigate("/user/confirm-email");
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              id="name"
              placeholder="Name"
              {...register("name", {
                required: { value: true, message: "Name is required." },
                minLength: {
                  value: 2,
                  message: "Name cannot be less than 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name cannot be more than 30 characters",
                },
              })}
            />
            <div className="validationError">
              <span>{touchedFields.name && errors.name?.message}</span>
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
            <input
              className="input"
              type="password"
              id="password"
              autoComplete="new-password"
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "Password is required." },
                minLength: {
                  value: 6,
                  message: "Password cannot be less than 6 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password cannot be more than 30 characters",
                },
              })}
            />
            <div className="validationError">
              <span>{touchedFields.password && errors.password?.message}</span>
            </div>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "confirmPassword is required.",
                },
                validate: (value, formValues) => {
                  if (value !== formValues.password) {
                    return "Confirm password does not match the password";
                  }
                  return true;
                },
              })}
            />
            <div className="validationError">
              <span>
                {touchedFields.confirmPassword &&
                  errors.confirmPassword?.message}
              </span>
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

export default Signup;

// const sendEmail = async () => {
//   const transporter = nodemailer.createTransport({
//     host: "smpt.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "punchcodestudios@gmail.com",
//       pass: "Dr@g0n8473",
//     },
//   });

// const emailHtml = <RegisterEmail name="patrick" email="pschandler@gmail.coma" url="http://www.google.com"></RegisterEmail>;
// const div = document.createElement("div");
// const root = createRoot(div);
// flushSync(() => {
//   root.render(
//     <RegisterEmail
//       name="patrick"
//       email="pschandler@gmail.coma"
//       url="http://www.google.com"
//     ></RegisterEmail>
//   );
// });
//   const options = {
//     from: "punchcodestudios@gmail.com",
//     to: "pschandler@gmail.com",
//     subject: "registration",
//     html: "<div>Hello</div>",
//   };

//   await transporter.sendMail(options);
// };
