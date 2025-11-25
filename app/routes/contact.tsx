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
import { z } from "zod";
import { GenericErrorBoundary } from "~/components/error/generic-error-boundary";

// TODO: Sprint Phase 1, Item 1.1 - Rebuild Contact Form with Enhanced Components
// This form needs to be completely rebuilt using:
// - ConformInput (text, email, tel)
// - ConformTextarea (message)
// - ConformSelect (subject dropdown)
// - ConformCheckbox (contact method preferences)
// - Honeypot and CSRF protection (Phase 2)
// - Rate limiting (Phase 2)
// - Full accessibility validation
// Reference: /docs/SprintPlanning/FormAccesibilitySprint.html

/*
// ========================================
// COMMENTED OUT - TO BE REBUILT
// ========================================
// This entire contact form implementation is commented out due to
// Conform v1 breaking changes. It will be rebuilt as part of the
// Form Accessibility & Security Sprint using the new enhanced
// Radix UI components with proper Conform integration.

import { useForm } from "@conform-to/react";
import { getFieldsetConstraint, parseWithZod } from "@conform-to/zod";
import { Field } from "~/components/forms";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/text-area";
import type { ContactRequest } from "~/entities/email";
import { EmailService } from "~/service/email-service";
import { redirectWithToast } from "~/utils/toast.server";
import { Select } from "../components/ui/select";
import { Input } from "~/components/ui/input";
import { ChoiceInput } from "~/components/ui/choice-input";
import useUniqueArray from "~/hooks/uniqueArray";

const subjectMaxLength = 100;
const messageMaxLength = 1000;
const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  // Implementation commented out - will be rebuilt with Conform v1
}

// ... rest of old implementation ...
*/

// ========================================
// TEMPORARY PLACEHOLDER
// ========================================

export async function loader({ params }: LoaderFunctionArgs) {
  return data({
    message: "Contact form is being rebuilt with enhanced components",
  });
}

export default function Contact() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-full flex-col justify-center pb-32 pt-20">
      <div className="mx-auto max-w-2xl pt-20 px-8">
        <div className="flex flex-col gap-6 text-center">
          <h1 className="text-4xl font-brand text-foreground">
            Contact Form Under Construction
          </h1>

          <div className="p-8 bg-warning/10 border border-warning rounded-lg text-left">
            <h2 className="text-xl font-header text-foreground mb-4">
              🚧 Currently Being Rebuilt
            </h2>
            <p className="text-muted-foreground mb-4">
              The contact form is being rebuilt as part of our Form
              Accessibility & Security Sprint.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>What's coming:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Enhanced Radix UI form components</li>
                <li>Full Conform v1 integration</li>
                <li>WCAG 2.1 AA accessibility compliance</li>
                <li>
                  Advanced security features (honeypot, CSRF, rate limiting)
                </li>
                <li>Improved validation and error handling</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-header text-foreground mb-3">
              In the meantime
            </h3>
            <p className="text-muted-foreground mb-4">
              You can reach us through:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:contact@punchcode.com"
                className="text-primary hover:underline"
              >
                📧 contact@punchcode.com
              </a>
              <p className="text-muted-foreground">
                Or check out our other pages while we complete this upgrade.
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <Link
              to="/"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Return Home
            </Link>
            <Link
              to="/_test/form-components"
              className="px-6 py-3 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
            >
              View Form Component Tests
            </Link>
          </div>

          <div className="mt-8 text-center">
            <NavLink
              className="mx-3 text-sm text-muted-foreground hover:text-foreground hover:underline"
              to="/privacy-policy"
            >
              Privacy Policy
            </NavLink>
            {" | "}
            <NavLink
              className="mx-3 text-sm text-muted-foreground hover:text-foreground hover:underline"
              to="/terms-of-use"
            >
              Terms of Use
            </NavLink>
          </div>
        </div>
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
