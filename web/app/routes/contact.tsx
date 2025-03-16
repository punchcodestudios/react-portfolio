import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import {
  data,
  Form,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { floatingToolbarClassName } from "~/components/ui/floating-toolbar";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/text-area";
import type { ContactRequest } from "~/entities/email";
import { emailService } from "~/service/email-service";
import { validateCSRF } from "~/utils/csrf.server";
import { checkForHoneypot } from "~/utils/honeypot.server";
import { invariantResponse, useIsSubmitting } from "~/utils/site";
import { redirectWithToast } from "~/utils/toast.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const note = { title: "", content: "" };
  if (!note) {
    throw new Response("Note not found", { status: 404 });
  }
  return note;
}

const subjectMaxLength = 100;
const messageMaxLength = 1000;

const contactSchema = z.object({
  subject: z
    .string({ required_error: "Subject is required" })
    .min(1, "Subject must be at least three character long")
    .max(
      subjectMaxLength,
      `Subject cannot be more than ${subjectMaxLength} characters`
    ),
  message: z
    .string({ required_error: "Message is required" })
    .min(1, { message: "Message is required." })
    .max(
      messageMaxLength,
      `Message cannot be more than ${messageMaxLength} characters`
    ),
});

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  const submission = parse(formData, { schema: contactSchema });

  if (submission.intent !== "submit") {
    return data({ status: "idle", submission } as const);
  }
  if (!submission.value) {
    return data({ status: "error", submission } as const, { status: 400 });
  }

  try {
    await checkForHoneypot(formData);
  } catch (error) {
    return data({ status: "error", submission } as const, { status: 401 });
  }

  const contactRequest: ContactRequest = {
    params: {
      subject: submission.value.subject,
      message: submission.value.message,
    },
  };
  emailService.sendContactEmail(contactRequest);

  throw await redirectWithToast("/", {
    type: "success",
    title: "Success",
    description: "Contact successfully submitted.",
  });
}

function ErrorList({
  errors,
  id,
}: {
  errors?: Array<string> | null;
  id?: string;
}) {
  return errors?.length ? (
    <ul id={id} className="flex flex-col gap-1">
      {errors.map((error, i) => (
        <li key={i} className="text-[10px] text-foreground-destructive">
          {error}
        </li>
      ))}
    </ul>
  ) : null;
}

const Contact = () => {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const isSubmitting = useIsSubmitting();

  const [form, fields] = useForm({
    id: "contact-form",
    constraint: getFieldsetConstraint(contactSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: contactSchema });
    },
    defaultValue: {
      subject: data.title,
      message: data.content,
    },
  });
  return (
    <div className="container flex min-h-full flex-col justify-center pb-32 pt-20">
      <div className="mx-auto w-full max-w-lg bg-white pt-20 rounded-xl">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-h2 md:text-h1">Send a message</h1>
          <p className="text-body-md text-muted-foreground">
            We are happy to hear from you.
          </p>
        </div>
        <Form
          method="post"
          className="flex h-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden px-10 pb-28 pt-12"
          {...form.props}
        >
          <HoneypotInputs></HoneypotInputs>
          <AuthenticityTokenInput />
          <div className="flex flex-col gap-1">
            <div>
              <Label htmlFor={fields.subject.id}>Subject</Label>
              <Input {...conform.input(fields.subject)} autoFocus />
              <div className="min-h-[32px] px-4 pb-3 pt-1">
                <ErrorList
                  id={fields.subject.errorId}
                  errors={fields.subject.errors}
                />
              </div>
            </div>
            <div>
              <Label htmlFor={fields.message.id}>Message</Label>
              <Textarea {...conform.textarea(fields.message)} />
              <div className="min-h-[32px] px-4 pb-3 pt-1">
                <ErrorList
                  id={fields.message.errorId}
                  errors={fields.message.errors}
                />
              </div>
            </div>
          </div>
          <ErrorList id={form.errorId} errors={form.errors} />
          <div className={floatingToolbarClassName}>
            <Button
              form={form.id}
              type="submit"
              variant="outline"
              name="intent"
              value="submit"
            >
              Send Message
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
