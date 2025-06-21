import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { useState } from "react";
import {
  data,
  Form,
  isRouteErrorResponse,
  Link,
  useActionData,
  useLoaderData,
  useRouteError,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { z } from "zod";
import { Field } from "~/components/forms";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/text-area";
import type { ContactRequest } from "~/entities/email";
import { emailService } from "~/service/email-service";
import { validateCSRF } from "~/utils/csrf.server";
import { checkForHoneypot } from "~/utils/honeypot.server";
import { redirectWithToast } from "~/utils/toast.server";
import { Select } from "../components/ui/select";
import { Input } from "~/components/ui/input";
import GenericErrorBoundary from "~/components/ui/error-boundary";

export async function loader({ params }: LoaderFunctionArgs) {
  const note = {
    subject: "",
    content: "",
    name: "",
    formOfContact: "",
    emailAddress: "",
    phoneNumber: "",
  };
  if (!note) {
    throw new Response("Note not found", { status: 404 });
  }
  return note;
}

const subjectMaxLength = 100;
const messageMaxLength = 1000;
const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

const ContactSchema = z.object({
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
  firstName: z
    .string({ required_error: "Please enter your first name." })
    .max(50, { message: "First Name is restricted to 50 characters." }),
  lastName: z
    .string({ required_error: "Please enter your last name." })
    .max(50, { message: "Last Name is restricted to 50 characters." }),
  organization: z
    .string()
    .max(50, { message: "Last Name is restricted to 50 characters." })
    .optional(),
  formOfContact: z.string({
    message: "Please indicate a preferred method of contact.",
  }),
  phoneNumber: z
    .string()
    .regex(phoneRegex, { message: "Please enter a valid phone number." })
    .optional(),
  emailAddress: z.string().email("Invalid Email address").optional(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  // console.log("formData: ", formData);
  await validateCSRF(formData, request.headers);
  checkForHoneypot(formData);

  const submission = await parse(formData, {
    schema: (intent) =>
      ContactSchema.transform((data, ctx) => {
        if (intent !== "submit") {
          // console.log("intent: ", intent);
          return { ...data };
        }

        if (data.formOfContact == "email" && !data.emailAddress) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "A valid email address is required when contact method is 'email'",
            path: ["emailAddress"],
          });
          return z.NEVER;
        }

        if (data.formOfContact == "telephone" && !data.phoneNumber) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "A valid phone number is required when contact method is 'telephone'",
            path: ["phoneNumber"],
          });
          return z.NEVER;
        }

        // if (data.phoneNumber && !phoneRegex.test(data.phoneNumber)) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message:
        //       "A valid phone number is required when contact method is 'telephone'",
        //     path: ["phoneNumber"],
        //   });
        //   return z.NEVER;
        // }
        return data;
      }),
  });

  if (submission.intent !== "submit") {
    // console.log("submisssion.intent: ", submission.intent);
    return data({ status: "idle", submission } as const);
  }
  if (!submission.value) {
    // console.log("submission.value: ", submission.value);
    return data({ status: "error", submission } as const, { status: 400 });
  }

  const contactRequest: ContactRequest = {
    params: {
      subject: submission.value.subject,
      message: submission.value.message,
      formOfContact: submission.value.formOfContact,
      emailAddress: submission.value.emailAddress || "",
      phoneNumber: submission.value.phoneNumber || "",
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      organization: submission.value.organization || "",
    },
  };

  // console.log("contact request: ", contactRequest);
  const response = await emailService.sendContactEmail(contactRequest);
  // console.log("emailService sendContactEmail.response: ", response);

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

export default function Contact() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [selectedContactMethod, setSelectedContactMethod] =
    useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const handleContactMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("handleContactMethod: ", event);
    setSelectedContactMethod(event.target.value);
  };

  const [form, fields] = useForm({
    id: "contact-form",
    constraint: getFieldsetConstraint(ContactSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      // console.log("form data: ", formData);
      const validation = parse(formData, { schema: ContactSchema });
      // console.log(validation);
      return validation;
    },
    defaultValue: {
      subject: data.subject,
      message: data.content,
      name: data.name,
      mailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      contactMethod: data.formOfContact,
    },
    shouldRevalidate: "onBlur",
  });
  return (
    <div className="flex min-h-full flex-col justify-center pb-32 pt-20">
      <div className="mx-auto w-full  bg-white pt-20 rounded-xl">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-h2 md:text-h1 font-header lowercase text-secondary">
            Send a message
          </h1>
          <p className="font-text text-body-md text-muted-foreground">
            We are happy to hear from you.
          </p>
        </div>
        <Form
          method="post"
          className="flex h-full w-full flex-col px-4 gap-y-4 overflow-y-auto overflow-x-hidden md:px-10 pb-28 pt-12"
          {...form.props}
        >
          <HoneypotInputs></HoneypotInputs>
          <AuthenticityTokenInput />

          <div className="flex flex-col gap-1">
            {/* Subject */}
            <div className="flex flex-row">
              <div className="w-full">
                <Label
                  htmlFor={fields.subject.id}
                  className="font-navItem text-md"
                >
                  Subject:
                </Label>
                <Select
                  {...conform.input(fields.subject)}
                  className="dark:text-siteWhite dark:bg-slate-600 mt-3"
                  onChange={(event) => setSelectedSubject(event.target.value)}
                >
                  <option value="">Please Select</option>
                  <option value="request_demo">Request a demontration</option>
                  <option value="general">General correspondence</option>
                </Select>
                <div className="min-h-[32px] px-4 pb-3 pt-1">
                  <ErrorList
                    id={fields.subject.errorId}
                    errors={fields.subject.errors}
                  />
                </div>
              </div>
            </div>
            {/* First Name / Last Name*/}
            <div className="flex flex-row flex-wrap">
              <div className="w-full lg:w-1/3 lg:pe-2">
                <Label
                  htmlFor={fields.firstName.id}
                  className="font-navItem text-md"
                >
                  First Name:
                </Label>
                <Input
                  {...conform.textarea(fields.firstName)}
                  type="text"
                  className="mt-3"
                />
                <div className="min-h-[32px] px-4 pb-3 pt-1">
                  <ErrorList
                    id={fields.firstName.errorId}
                    errors={fields.firstName.errors}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/3 lg:pe-2">
                <Label
                  htmlFor={fields.lastName.id}
                  className="font-navItem text-md"
                >
                  Last Name:
                </Label>
                <Input
                  {...conform.textarea(fields.lastName)}
                  type="text"
                  className="mt-3"
                />
                <div className="min-h-[32px] px-4 pb-3 pt-1">
                  <ErrorList
                    id={fields.lastName.errorId}
                    errors={fields.lastName.errors}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <Label
                  htmlFor={fields.organization.id}
                  className="font-navItem text-md"
                >
                  Organization:
                </Label>
                <Input
                  {...conform.textarea(fields.organization)}
                  type="text"
                  className="mt-3"
                />
                <div className="min-h-[32px] px-4 pb-3 pt-1">
                  <ErrorList
                    id={fields.organization.errorId}
                    errors={fields.organization.errors}
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label
                htmlFor={fields.message.id}
                className="font-navItem text-md"
              >
                Message
              </Label>
              <Textarea
                {...conform.textarea(fields.message)}
                className="mt-3"
              />
              <div className="min-h-[32px] px-4 pb-3 pt-1">
                <ErrorList
                  id={fields.message.errorId}
                  errors={fields.message.errors}
                />
              </div>
            </div>

            {/* Preferred Method of Contact */}
            <div className="flex w-full">
              <fieldset className="bg-slate-100 flex w-full flex-col md:flex-row md:flex-wrap">
                <legend className="font-navItem text-md mb-3 bg-background p-3">
                  Preferred method of contact:
                </legend>
                <div className="flex flex-col w-full md:flex-row">
                  {selectedSubject != "request_demo" && (
                    <div key={0} className="flex items-center ms-4">
                      <label
                        className="relative flex items-center cursor-pointer"
                        html-for={fields.formOfContact.id}
                      >
                        <input
                          id="contact_method_0"
                          type="radio"
                          name={fields.formOfContact.name}
                          value={"do not contact"}
                          defaultChecked={
                            fields.formOfContact.defaultValue ===
                            "do not contact"
                          }
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                          onChange={(event) => handleContactMethod(event)}
                        ></input>
                        <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                      </label>
                      <Label htmlFor={fields.formOfContact.id} className="m-3">
                        {"do not contact"}
                      </Label>
                    </div>
                  )}
                  {[
                    { id: "1", value: "email" },
                    { id: "2", value: "telephone" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center ms-4">
                      <label
                        className="relative flex items-center cursor-pointer"
                        html-for={fields.formOfContact.id}
                      >
                        <input
                          id={`contact_method_${item.id}`}
                          type="radio"
                          name={fields.formOfContact.name}
                          value={item.value}
                          defaultChecked={
                            fields.formOfContact.defaultValue === item.value
                          }
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                          onChange={(event) => handleContactMethod(event)}
                        ></input>
                        <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                      </label>
                      <Label htmlFor={fields.formOfContact.id} className="m-3">
                        {item.value}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row w-full">
                  <div
                    className={`flex mx-4 mt-3 md:w-full ${
                      selectedContactMethod == "telephone" ? "block" : "hidden"
                    }`}
                  >
                    <Field
                      labelProps={{
                        children: "Phone Number",
                      }}
                      inputProps={{
                        ...conform.input(fields.phoneNumber),
                        autoFocus: true,
                        className: "lowercase flex w-full mt-4",
                        placeholder: "(XXX)-XXX-XXXX",
                      }}
                      className="w-full"
                      errors={fields.phoneNumber.errors}
                    />
                  </div>
                  <div
                    className={`flex mx-4 mt-3 md:w-full ${
                      selectedContactMethod == "email" ? "block" : "hidden"
                    }`}
                  >
                    <Field
                      labelProps={{ children: "Email Address" }}
                      inputProps={{
                        ...conform.input(fields.emailAddress),
                        autoFocus: true,
                        className: "lowercase mt-4",
                      }}
                      className="w-full"
                      errors={fields.emailAddress.errors}
                    />
                  </div>
                  <div className="min-h-[32px] px-4 pb-3 pt-1">
                    <ErrorList
                      id={fields.formOfContact.errorId}
                      errors={fields.formOfContact.errors}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <ErrorList id={form.errorId} errors={form.errors} />

          <div className="w-full p-3 mt-3">
            <Button
              form={form.id}
              type="submit"
              variant="secondary"
              name="intent"
              value="submit"
              className=""
            >
              Send Message
            </Button>
          </div>
          <div className="text-center">
            <Link to="/">Privacy Policy</Link> |{" "}
            <Link to="/">Terms of Use</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          Route Error: {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return <GenericErrorBoundary></GenericErrorBoundary>;
  } else {
    return <h1>Unknown Error</h1>;
  }
}
