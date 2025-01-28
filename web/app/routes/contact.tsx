import {
  data,
  Form,
  redirect,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/text-area";
import { invariantResponse, useIsSubmitting } from "~/utils/site";
import { floatingToolbarClassName } from "~/components/ui/floating-toolbar";
import { z } from "zod";
import { parse, getFieldsetConstraint } from "@conform-to/zod";
import { conform, useForm } from "@conform-to/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { validateCSRF } from "~/utils/csrf.server";
import { CSRFError } from "remix-utils/csrf/server";
import { checkForHoneypot } from "~/utils/honeypot.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const note = { title: "Sample Title", content: "Default Content" };
  if (!note) {
    throw new Response("Note not found", { status: 404 });
  }
  return note;
}

const titleMaxLength = 100;
const contentMaxLength = 1000;

const contactSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title must be at least three character long")
    .max(titleMaxLength, "title cannot be more than that"),
  content: z
    .string({ required_error: "Content is required" })
    .min(1, { message: "Content is required." })
    .max(contentMaxLength),
});

export async function action({ request, params }: ActionFunctionArgs) {
  //invariantResponse(params.noteId, "noteId param is required");
  const formData = await request.formData();
  const intent = formData.get("intent");
  invariantResponse(intent === "submit", "Invalid intent");
  await validateCSRF(formData, request.headers);

  try {
    await checkForHoneypot(formData);
  } catch (error) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const submission = parse(formData, { schema: contactSchema });
  if (submission.error) {
    return data({ status: "error", submission });
  }

  const { title, content } = { ...submission.value };
  return redirect(`/`);
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
      title: data.title,
      content: data.content,
    },
  });
  return (
    <div className="md:w-[80%] inset-0">
      <Form
        method="post"
        className="flex h-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden px-10 pb-28 pt-12"
        {...form.props}
      >
        <HoneypotInputs></HoneypotInputs>
        <AuthenticityTokenInput />
        <div className="flex flex-col gap-1">
          <div>
            <Label htmlFor={fields.title.id}>Title</Label>
            <Input {...conform.input(fields.title)} autoFocus />
            <div className="min-h-[32px] px-4 pb-3 pt-1">
              <ErrorList
                id={fields.title.errorId}
                errors={fields.title.errors}
              />
            </div>
          </div>
          <div>
            <Label htmlFor={fields.content.id}>Content</Label>
            <Textarea {...conform.textarea(fields.content)} />
            <div className="min-h-[32px] px-4 pb-3 pt-1">
              <ErrorList
                id={fields.content.errorId}
                errors={fields.content.errors}
              />
            </div>
          </div>
        </div>
        <ErrorList id={form.errorId} errors={form.errors} />
      </Form>
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
    </div>
  );
};

export default Contact;

export function ErrorBoundary() {
  return (
    <GenericErrorBoundary
      statusHandlers={{
        401: ({ params }) => (
          <>
            <h1>401</h1>
            <p>Unauthorized</p>
          </>
        ),
        403: ({ params }) => (
          <>
            <h1>403</h1>
            <p>Invalid Request</p>
          </>
        ),
        404: ({ params }) => (
          <>
            <h1>404</h1>
            <p>Not Found</p>
          </>
        ),
      }}
    />
  );
}
