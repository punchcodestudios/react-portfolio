import { useForm, conform } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import {
  type ActionFunctionArgs,
  redirect,
  useActionData,
  Form,
  Link,
  type MetaFunction,
  data,
} from "react-router";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { z } from "zod";
import { ErrorList, Field } from "~/components/forms";
import { StatusButton } from "~/components/ui/status-button";
import { validateCSRF } from "~/utils/csrf.server";
import { PasswordSchema, UsernameSchema } from "~/utils/user-validation";
import { checkForHoneypot } from "~/utils/honeypot.server";
import { Spacer } from "~/components/spacer";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import { useIsPending } from "~/utils/site";
import { sessionStorage } from "~/utils/session.server";
import authService from "~/service/auth-service";

const LoginFormSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  checkForHoneypot(formData);

  const submission = await parse(formData, {
    schema: (intent) =>
      LoginFormSchema.transform(async (data, ctx) => {
        if (intent !== "submit") return { ...data, user: null };

        const userResponse = await authService.login({
          username: data.username,
          password: data.password,
        });

        if (userResponse.meta.total == 0) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid username or password",
          });
          return z.NEVER;
        }

        // verify the password (we'll do this later)
        const user = userResponse;
        console.log("user: ", user);
        return { ...data, user };
      }),
    async: true,
  });

  // console.log("submission: ", submission);
  // get the password off the payload that's sent back
  const password = submission.payload.password;

  if (submission.intent !== "submit") {
    console.log("intent error");
    // delete submission.value?.password;
    return data({ status: "idle", submission } as const);
  }
  console.log("submission: ", submission);
  if (!submission.value?.user) {
    console.log("submission error");
    return data({ status: "error", submission } as const, { status: 400 });
  }

  const { user } = submission.value;
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  cookieSession.set("userId", user.target[0]._id);

  return redirect("/", {
    headers: {
      "set-cookie": await sessionStorage.commitSession(cookieSession),
    },
  });
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "login-form",
    constraint: getFieldsetConstraint(LoginFormSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: LoginFormSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="flex min-h-full flex-col justify-center pb-32 pt-20">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-h1">Welcome back!</h1>
          <p className="text-body-md text-muted-foreground">
            Please enter your details.
          </p>
        </div>
        <Spacer size="xs" />

        <div>
          <div className="mx-auto w-full max-w-md px-8">
            <Form method="POST" {...form.props}>
              <AuthenticityTokenInput />
              <HoneypotInputs />
              <Field
                labelProps={{ children: "Username" }}
                inputProps={{
                  ...conform.input(fields.username),
                  autoFocus: true,
                  className: "lowercase",
                }}
                errors={fields.username.errors}
              />

              <Field
                labelProps={{ children: "Password" }}
                inputProps={conform.input(fields.password, {
                  type: "password",
                })}
                errors={fields.password.errors}
              />

              <div className="flex justify-between">
                <div />
                <div>
                  <Link
                    to="/forgot-password"
                    className="text-body-xs font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <ErrorList errors={form.errors} id={form.errorId} />

              <div className="flex items-center justify-between gap-6 pt-3">
                <StatusButton
                  className="w-full text-siteWhite"
                  status={isPending ? "pending" : actionData?.status ?? "idle"}
                  type="submit"
                  disabled={isPending}
                >
                  Log in
                </StatusButton>
              </div>
            </Form>
            <div className="flex items-center justify-center gap-2 pt-6">
              <span className="text-muted-foreground">New here?</span>
              <Link to="/signup">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [{ title: "Login to Punchcode Studios" }];
};

export function ErrorBoundary() {
  return <GenericErrorBoundary></GenericErrorBoundary>;
}
