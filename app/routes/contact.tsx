import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { useState } from "react";
import {
  data,
  Form,
  isRouteErrorResponse,
  Link,
  NavLink,
  useActionData,
  useLoaderData,
  useRouteError,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
// TODO: add to futre sprint - Forms and Accesibility anti forgery and spam bots
// import { AuthenticityTokenInput } from "remix-utils/csrf/react";
// import { HoneypotInputs } from "remix-utils/honeypot/react";
import { z } from "zod";
import { Field } from "~/components/forms";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/text-area";
import type { ContactRequest } from "~/entities/email";
import { EmailService } from "~/service/email-service";
// import { validateCSRF } from "~/utils/csrf.server";
// import { checkForHoneypot } from "~/utils/honeypot.server";
import { redirectWithToast } from "~/utils/toast.server";
import { Select } from "../components/ui/select";
import { Input } from "~/components/ui/input";
import { GenericErrorBoundary } from "~/components/error/generic-error-boundary";
import { ChoiceInput } from "~/components/ui/choice-input";
import useUniqueArray from "~/hooks/uniqueArray";

const subjectMaxLength = 100;
const messageMaxLength = 1000;
const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // TODO: add to future sprint - Forms and Accessibility improve regex for email validation

export async function loader({ params }: LoaderFunctionArgs) {
  const contact = {
    subject: "",
    content: "",
    name: "",
    formOfContact: [],
    emailAddress: "",
    phoneNumber: "",
  };
  if (!contact) {
    throw new Response("Contact not found", { status: 404 });
  }
  return contact;
}

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
  formOfContact: z.array(z.string().min(1).max(50)),
  telephone: z
    .string()
    .regex(phoneRegex, { message: "Please enter a valid phone number." })
    .optional(),
  emailAddress: z.string().email("Invalid Email address").optional(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log("formData: ", formData);
  //await validateCSRF(formData, request.headers);
  //checkForHoneypot(formData);

  const submission = await parse(formData, {
    schema: (intent) =>
      ContactSchema.transform((data, ctx) => {
        if (intent !== "submit") {
          // console.log("intent: ", intent);
          return { ...data };
        }

        if (
          data.formOfContact.find((contact) => contact === "email") &&
          !data.emailAddress
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "A valid email address is required when contact method is 'email'",
            path: ["emailAddress"],
          });
          return z.NEVER;
        }

        if (
          data.formOfContact.find((contact) => contact === "telephone") &&
          !data.telephone
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "A valid phone number is required when contact method is 'telephone'",
            path: ["telephone"],
          });
          return z.NEVER;
        }

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
      phoneNumber: submission.value.telephone || "",
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      organization: submission.value.organization || "",
    },
  };

  // console.log("contact request: ", contactRequest);
  // const response = await EmailService.sendContactEmail(contactRequest);
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
  const availableContactMethods = [
    { id: "0", value: "no contact" },
    { id: "1", value: "email" },
    { id: "2", value: "telephone" },
  ];

  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const {
    array: selectedContactMethod,
    addUnique,
    clear,
    remove,
    setArray,
  } = useUniqueArray(["no contact"]);

  // Function to clear contact field values
  const clearContactFields = () => {
    // Clear email field
    const emailField = document.querySelector(
      `input[name="${fields.emailAddress.name}"]`
    ) as HTMLInputElement;
    if (emailField) emailField.value = "";

    // Clear phone field
    const phoneField = document.querySelector(
      `input[name="${fields.telephone.name}"]`
    ) as HTMLInputElement;
    if (phoneField) phoneField.value = "";
  };

  // Helper function to check if a method is selected
  const isMethodSelected = (method: string) => {
    return selectedContactMethod.includes(method);
  };

  const handleContactMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentChecked = event.target.checked;
    const currentSelected = event.target.value;

    // console.log("currentSelected: ", currentSelected);
    // console.log("currentChecked: ", currentChecked);

    if (currentSelected === "no contact") {
      if (currentChecked) {
        // Clear all other selections and set only "no contact"
        setArray(["no contact"]);
        // Clear the form fields for email and phone
        clearContactFields();
      } else {
        // If unchecking "no contact", remove it from array
        remove(currentSelected);
      }
    } else {
      // For email or telephone selections
      if (currentChecked) {
        // Remove "no contact" if present and add the new method
        const newArray = selectedContactMethod.filter(
          (method) => method !== "no contact"
        );
        setArray([...newArray, currentSelected]);
      } else {
        // Remove the unchecked method
        remove(currentSelected);
        // If no methods are selected, default back to "no contact"
        if (
          selectedContactMethod.length === 1 &&
          selectedContactMethod.includes(currentSelected)
        ) {
          setArray(["no contact"]);
        }
      }
    }
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
      contactMethod: "no contact",
    },
    shouldRevalidate: "onBlur",
  });
  return (
    <div className="flex min-h-full flex-col justify-center pb-32 pt-20">
      <div
        className={`mx-auto pt-20 rounded-xl 
        border border-slate-700 dark:border-slate-200 dark:bg-slate-500/40
        dark:ring dark:ring-offset-2 dark:ring-offset-secondary
        `}
      >
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
          className="flex h-full flex-col px-4 gap-y-4 overflow-y-auto overflow-x-hidden md:px-10 pb-28 pt-12"
          {...form.props}
        >
          //TODO: Add to future sprint - Forms and Accessibility honeypot and
          csrf
          {/* <HoneypotInputs></HoneypotInputs>
          <AuthenticityTokenInput /> */}
          {/* Hidden input to submit the selected contact methods array */}
          {selectedContactMethod.map((method, index) => (
            <input
              key={index}
              type="hidden"
              name={fields.formOfContact.name}
              value={method}
            />
          ))}
          <div className="flex flex-col gap-1">
            {/* Subject */}
            <div className="flex flex-row">
              <div className="w-full">
                <Label htmlFor={fields.subject.id} className="font-nav text-md">
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
                  className="font-nav text-md"
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
                  className="font-nav text-md"
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
                  className="font-nav text-md"
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
              <Label htmlFor={fields.message.id} className="font-nav text-md">
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
              <fieldset className="flex w-full flex-col lg:flex-row lg:flex-wrap">
                <legend className="font-nav text-md mb-3 p-3">
                  Preferred method of contact:
                </legend>

                <div className="flex flex-col w-full lg:flex-row">
                  {availableContactMethods.map((item) => (
                    <div key={item.id} className="flex items-center ms-4">
                      <label
                        className="relative flex items-center cursor-pointer"
                        html-for={fields.formOfContact.id}
                      >
                        <ChoiceInput
                          id={`contact_method_${item.id}`}
                          name={fields.formOfContact.name}
                          value={item.value}
                          onCheckedChange={(event: any) =>
                            handleContactMethod(event)
                          }
                          type="checkbox"
                          selected={isMethodSelected(item.value)}
                        ></ChoiceInput>
                        {/* <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span> */}
                      </label>
                      <Label htmlFor={fields.formOfContact.id} className="m-3">
                        {item.value}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col lg:flex-row w-full">
                  <div
                    className={`flex mx-4 mt-3 md:w-full ${
                      isMethodSelected("telephone") ? "block" : "hidden"
                    }`}
                  >
                    <Field
                      labelProps={{
                        children: "Phone Number",
                      }}
                      inputProps={{
                        ...conform.input(fields.telephone),
                        autoFocus: true,
                        className: "lowercase flex w-full mt-4",
                        placeholder: "(XXX)-XXX-XXXX",
                      }}
                      className="w-full"
                      errors={fields.telephone.errors}
                    />
                  </div>
                  <div
                    className={`flex mx-4 mt-3 md:w-full ${
                      isMethodSelected("email") ? "block" : "hidden"
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
            <NavLink
              className="mx-3 font-control text-secondary hover:text-secondary-muted hover:underline"
              to="/privacy-policy"
            >
              Privacy Policy
            </NavLink>{" "}
            |{" "}
            <NavLink
              className="mx-3 font-control text-secondary hover:text-secondary-muted hover:underline"
              to="/terms-of-use"
            >
              Terms of Use
            </NavLink>
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
