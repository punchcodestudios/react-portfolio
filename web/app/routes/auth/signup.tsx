import {
  EmailSchema,
  NameSchema,
  PasswordSchema,
  UsernameSchema,
} from "~/utils/user-validation";
import { z } from "zod";
import {
  data,
  Form,
  redirect,
  useActionData,
  type ActionFunctionArgs,
  type MetaFunction,
} from "react-router";
import { validateCSRF } from "~/utils/csrf.server";
import { checkForHoneypot } from "~/utils/honeypot.server";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { ErrorList, Field } from "~/components/forms";
import { StatusButton } from "~/components/ui/status-button";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { conform, useForm } from "@conform-to/react";
import { useIsPending } from "~/utils/site";

const SignupFormSchema = z
  .object({
    username: UsernameSchema,
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
    agreeToTermsOfServiceAndPrivacyPolicy: z.boolean({
      required_error:
        "You must agree to the terms of service and privacy policy",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords must match",
      });
    }
  });

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  checkForHoneypot(formData);
  const submission = await parse(formData, {
    schema: SignupFormSchema.superRefine(async (data, ctx) => {
      // const existingUser = {id: '8', userName: 'patrick'}
      const existingUser = undefined;
      //   const existingUser = await prisma.user.findUnique({
      //     where: { username: data.username },
      //     select: { id: true },
      //   });
      if (existingUser) {
        ctx.addIssue({
          path: ["username"],
          code: z.ZodIssueCode.custom,
          message: "A user already exists with this username",
        });
        return;
      }
    }),
    async: true,
  });

  if (submission.intent !== "submit") {
    return data({ status: "idle", submission } as const);
  }
  if (!submission.value) {
    return data({ status: "error", submission } as const, { status: 400 });
  }

  //create user here'

  return redirect("/");
}

export const meta: MetaFunction = () => {
  return [{ title: "Setup Epic Notes Account" }];
};

export default function SignupRoute() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "signup-form",
    constraint: getFieldsetConstraint(SignupFormSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: SignupFormSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="container flex min-h-full flex-col justify-center pb-32 pt-20">
      <div className="mx-auto w-full max-w-lg">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-h1">Welcome aboard!</h1>
          <p className="text-body-md text-muted-foreground">
            Please enter your details.
          </p>
        </div>
        {/* <Spacer size="xs" /> */}
        <Form
          method="POST"
          className="mx-auto min-w-[368px] max-w-sm"
          {...form.props}
        >
          <AuthenticityTokenInput />
          <HoneypotInputs />
          <Field
            labelProps={{ htmlFor: fields.email.id, children: "Email" }}
            inputProps={{
              ...conform.input(fields.email),
              autoComplete: "email",
              autoFocus: true,
              className: "lowercase",
            }}
            errors={fields.email.errors}
          />
          <Field
            labelProps={{ htmlFor: fields.username.id, children: "Username" }}
            inputProps={{
              ...conform.input(fields.username),
              autoComplete: "username",
              className: "lowercase",
            }}
            errors={fields.username.errors}
          />
          <Field
            labelProps={{ htmlFor: fields.name.id, children: "Name" }}
            inputProps={{
              ...conform.input(fields.name),
              autoComplete: "name",
            }}
            errors={fields.name.errors}
          />
          <Field
            labelProps={{ htmlFor: fields.password.id, children: "Password" }}
            inputProps={{
              ...conform.input(fields.password, { type: "password" }),
              autoComplete: "new-password",
            }}
            errors={fields.password.errors}
          />

          <Field
            labelProps={{
              htmlFor: fields.confirmPassword.id,
              children: "Confirm Password",
            }}
            inputProps={{
              ...conform.input(fields.confirmPassword, { type: "password" }),
              autoComplete: "new-password",
            }}
            errors={fields.confirmPassword.errors}
          />

          {/* <CheckboxField
            labelProps={{
              htmlFor: fields.agreeToTermsOfServiceAndPrivacyPolicy.id,
              children:
                "Do you agree to our Terms of Service and Privacy Policy?",
            }}
            buttonProps={conform.input(
              fields.agreeToTermsOfServiceAndPrivacyPolicy,
              { type: "checkbox" }
            )}
            errors={fields.agreeToTermsOfServiceAndPrivacyPolicy.errors}
          /> */}

          <ErrorList errors={form.errors} id={form.errorId} />

          <div className="flex items-center justify-between gap-6">
            <StatusButton
              className="w-full text-siteWhite"
              status={isPending ? "pending" : actionData?.status ?? "idle"}
              type="submit"
              disabled={isPending}
            >
              Create an account
            </StatusButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
