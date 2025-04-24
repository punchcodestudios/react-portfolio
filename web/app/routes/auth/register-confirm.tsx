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
  useLoaderData,
  type LoaderFunctionArgs,
  useParams,
} from "react-router";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { z } from "zod";
import { Field, ErrorList } from "~/components/forms";
import { Spacer } from "~/components/spacer";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import { StatusButton } from "~/components/ui/status-button";
import authService from "~/service/auth-service";
import { validateCSRF } from "~/utils/csrf.server";
import { checkForHoneypot } from "~/utils/honeypot.server";
import { useIsPending } from "~/utils/site";
import {
  ConfirmCodeSchema,
  EncodedStringSchema,
  UsernameSchema,
} from "~/utils/user-validation";
import type { Route } from "./+types/register-confirm";

const ConfirmationFormSchema = z.object({
  username: EncodedStringSchema,
  confirmationCode: ConfirmCodeSchema,
});

export async function loader({ params }: Route.LoaderArgs) {
  console.log("params from confirm loader: ", params);
  return atob(params.username);
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("action");
  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  checkForHoneypot(formData);

  const submission = await parse(formData, {
    schema: (intent) =>
      ConfirmationFormSchema.transform(async (data, ctx) => {
        console.log("formData: ", data);
        if (intent !== "submit") return { ...data };

        const result = await authService.confirmUser({
          confirmationCode: data.confirmationCode,
          username: data.username,
        });
        console.log("confirm result: ", result);
        if (!result.meta.success) {
          ctx.addIssue({
            code: "custom",
            message: "Unable to confirm account.",
          });
          return z.NEVER;
        }
        return result;
      }),
    async: true,
  });

  console.log("submission: ", submission);

  if (submission.intent !== "submit") {
    return data({ status: "idle", submission } as const);
  }
  if (!submission.value) {
    return data({ status: "error", submission } as const, { status: 400 });
  }
  return redirect(`/login`);
}

export default function RegisterConfirmPage() {
  const actionData = useActionData<typeof action>();
  const params = useParams();
  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "confirm-form",
    constraint: getFieldsetConstraint(ConfirmationFormSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ConfirmationFormSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="flex min-h-full flex-col justify-center pb-32 pt-20">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-h1">Confirm your Registration</h1>
          <p className="text-body-md text-muted-foreground">
            A code was sent to the email on file. Please enter this into the
            form below.
          </p>
        </div>
        <Spacer size="xs" />

        <div>
          <div className="mx-auto w-full max-w-md px-8">
            <Form method="POST" {...form.props}>
              <AuthenticityTokenInput />
              <HoneypotInputs />
              <input
                type="hidden"
                value={params.username}
                name="username"
                id="username"
              ></input>

              <Field
                labelProps={{ children: "ConfirmationCode" }}
                inputProps={conform.input(fields.confirmationCode, {
                  type: "text",
                })}
                errors={fields.confirmationCode.errors}
              />

              <ErrorList errors={form.errors} id={form.errorId} />

              <div className="flex items-center justify-between gap-6 pt-3">
                <StatusButton
                  className="w-full text-siteWhite"
                  status={isPending ? "pending" : actionData?.status ?? "idle"}
                  type="submit"
                  disabled={isPending}
                >
                  Confirm
                </StatusButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [{ title: "Confirm your Account" }];
};

export function ErrorBoundary() {
  return <GenericErrorBoundary></GenericErrorBoundary>;
}
