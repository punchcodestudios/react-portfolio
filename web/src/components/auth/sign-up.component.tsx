import { RegisterRequest } from "@/entities/User";
import useAuth from "@/state-management/auth/use-auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Form, Link, useNavigate } from "react-router-dom";
import ButtonControl from "../common/button/button.control";

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
  const { registerUser } = useAuth();

  const onSubmit = async (values: RegisterRequest) => {
    const newUser = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      await registerUser(newUser);
      navigate("/login");
    } catch (error: any) {
      // console.log("here: ", error);
      toast.error(error.data.error.message);
    }
  };

  return (
    <div className="form-container">
      <Toaster></Toaster>
      <div className="formWrapper">
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
