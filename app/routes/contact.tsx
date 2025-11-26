import { useState, useEffect, useRef } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, useActionData, useNavigate, useLocation } from "react-router";
import { ConformInput } from "~/components/form/Input/conform-input";
import { ConformTextarea } from "~/components/form/Textarea/conform-textarea";
import { ConformRadioGroup } from "~/components/form/Radio/conform-radio";
import { ConformCheckbox } from "~/components/form/Checkbox/conform-checkbox";
import {
  contactFormSchema,
  USER_CONTEXTS,
  getUserContextLabel,
  getUserContextDescription,
  CONTACT_METHODS,
  type ContactFormData,
  type UserContext,
} from "~/schemas/forms/contact.schema";
import { useHoneypot, validateHoneypot } from "~/utils/security/honeypot";
import { useCSRFToken, validateCSRFToken } from "~/utils/security";
import { useRateLimit } from "~/utils/security";
import type { ActionFunctionArgs } from "react-router";

/**
 * Contact Form Page
 *
 * Main contact form for Punch Code Studios portfolio site.
 * Implements progressive disclosure, real-time validation, and security measures.
 */

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // Security: Validate CSRF token
  const csrfToken = formData.get("csrf_token") as string;
  const isValidCSRF = await validateCSRFToken(csrfToken);

  if (!isValidCSRF) {
    console.warn("CSRF validation failed - potential CSRF attack");

    // Silent rejection - don't tell attackers they failed
    const submission = parseWithZod(formData, { schema: contactFormSchema });
    return {
      lastResult: submission.reply({ resetForm: true }),
      silent: true,
      error: "Security validation failed",
    };
  }

  // Security: Validate honeypot
  const honeypotFieldName = formData.get("honeypot_field_name") as string;
  if (!validateHoneypot(formData, honeypotFieldName)) {
    console.warn("Honeypot triggered - potential bot submission");

    const submission = parseWithZod(formData, { schema: contactFormSchema });
    return {
      lastResult: submission.reply({ resetForm: true }),
      silent: true,
    };
  }

  // Parse and validate form data
  const submission = parseWithZod(formData, { schema: contactFormSchema });

  if (submission.status !== "success") {
    return { lastResult: submission.reply() };
  }

  // TODO Phase 2: Submit to Azure Function
  console.log("Contact form submitted:", submission.value);

  // Simulate network delay for testing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return {
    lastResult: submission.reply({ resetForm: true }),
    success: true,
    message: "Message sent successfully! We'll get back to you soon.",
  };
}

export default function ContactPage() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const location = useLocation();
  const honeypot = useHoneypot();
  const csrfToken = useCSRFToken();
  const { checkRateLimit, getRemainingSubmissions } = useRateLimit();

  // Form state
  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // Rate limit state - initialize with safe default for SSR
  const [rateLimitInfo, setRateLimitInfo] = useState({
    remaining: 3, // Default value for SSR
    resetTime: 0,
  });

  // Track previous actionData to detect changes
  const prevActionDataRef = useRef(actionData);

  // Initialize rate limit from localStorage on client side only
  useEffect(() => {
    console.log("location.state:", location.state);
    // This only runs on the client after hydration
    const remaining = getRemainingSubmissions();
    setRateLimitInfo({
      remaining,
      resetTime: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once after mount

  // Update remaining count when action completes successfully
  useEffect(() => {
    // Only process if actionData actually changed
    if (actionData === prevActionDataRef.current) {
      return;
    }

    prevActionDataRef.current = actionData;

    if (actionData?.success && !actionData?.silent) {
      // Increment submission count on successful submission
      checkRateLimit();
      // Update UI with new remaining count
      const remaining = getRemainingSubmissions();
      setRateLimitInfo({
        remaining,
        resetTime: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]); // Only depend on actionData

  // Handle form submission with rate limit check
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const remaining = getRemainingSubmissions();

    if (remaining === 0) {
      event.preventDefault();
      setRateLimitInfo({
        remaining: 0,
        resetTime: Date.now() + 60 * 60 * 1000, // 1 hour from now
      });
      return;
    }

    // Allow form to submit normally (Conform will handle validation)
  };

  // Redirect on success
  useEffect(() => {
    if (actionData?.success && !actionData?.silent) {
      // Redirect to referrer or home after short delay
      const redirectTimer = setTimeout(() => {
        // Check if there's a navigation state with a 'from' location
        const from = location.state?.from;

        // Determine destination
        let destination = "/";

        if (from && from !== location.pathname) {
          // If we have a 'from' location and it's not the current page, use it
          destination = from;
        } else {
          // Fall back to document.referrer if available and valid
          const referrer = document.referrer;
          if (referrer) {
            try {
              const referrerUrl = new URL(referrer);
              const currentHost = window.location.host;
              const currentPath = window.location.pathname;

              // Use referrer if:
              // 1. It's from the same host (not external)
              // 2. It's not the contact page itself
              if (
                referrerUrl.host === currentHost &&
                referrerUrl.pathname !== currentPath
              ) {
                destination =
                  referrerUrl.pathname + referrerUrl.search + referrerUrl.hash;
              }
            } catch {
              // Invalid URL, fall back to home
              destination = "/";
            }
          }
        }

        navigate(destination, {
          state: { successMessage: actionData.message },
        });
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [actionData, navigate, location]);

  // Calculate field visibility directly from field values (no useState needed)
  const selectedContext = fields.iAmA.value as UserContext | undefined;
  const hasEmail = !!fields.email.value;
  const hasPhone = !!fields.phone.value;

  const showEmail = selectedContext !== undefined;
  const showLocation = selectedContext === "recruiter";
  const showPreferredContact = hasEmail && hasPhone;

  // Determine if form should be hidden
  const shouldHideForm =
    rateLimitInfo.remaining === 0 ||
    (actionData?.success && !actionData?.silent);

  // Determine if rate limit messages should be hidden
  const shouldHideRateLimitMessages =
    actionData?.success && !actionData?.silent;

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-brand text-foreground mb-3">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground">
          Have a question or want to work together? Fill out the form below and
          I'll get back to you as soon as possible.
        </p>
      </div>

      {/* Rate Limit Warning - Hidden during success redirect */}
      {!shouldHideRateLimitMessages &&
        rateLimitInfo.remaining <= 1 &&
        rateLimitInfo.remaining > 0 && (
          <div className="mb-6 p-4 bg-warning/10 border border-warning rounded-lg">
            <p className="text-sm text-warning-foreground">
              ⚠️ You have {rateLimitInfo.remaining} submission
              {rateLimitInfo.remaining !== 1 ? "s" : ""} remaining in the next
              hour. Please ensure your message is complete before submitting.
            </p>
          </div>
        )}

      {/* Rate Limit Exceeded - Hidden during success redirect */}
      {!shouldHideRateLimitMessages && rateLimitInfo.remaining === 0 && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm text-destructive-foreground font-medium mb-2">
            ⛔ Submission limit reached
          </p>
          <p className="text-sm text-destructive-foreground mb-3">
            You've reached the maximum number of submissions. Please try again
            later or contact me directly:
          </p>
          <div className="space-y-1 text-sm">
            <p>
              📧 Email:{" "}
              <a
                href="mailto:contact@punchcodestudios.com"
                className="underline"
              >
                contact@punchcodestudios.com
              </a>
            </p>
            <p>
              💼 LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/yourprofile"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect with me
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {actionData?.success && !actionData?.silent && (
        <div className="mb-6 p-4 bg-success/10 border border-success text-success-foreground rounded-md">
          <p className="font-medium">✓ {actionData.message}</p>
          <p className="text-sm mt-1">Redirecting you back...</p>
        </div>
      )}

      {/* Contact Form - Hidden when rate limited or successful submission */}
      {!shouldHideForm && (
        <Form
          method="post"
          id={form.id}
          onSubmit={(e) => {
            handleSubmit(e);
            form.onSubmit(e);
          }}
          className="space-y-6 bg-card p-8 rounded-lg border border-border dark:border-secondary"
        >
          {/* Honeypot field */}
          {honeypot.component}
          <input
            type="hidden"
            name="honeypot_field_name"
            value={honeypot.fieldName}
          />

          {/* CSRF token */}
          <input type="hidden" name="csrf_token" value={csrfToken} />

          {/* User Context Selection */}
          <ConformRadioGroup
            meta={fields.iAmA}
            label="I am a..."
            description="Help us route your message to the right person"
            required
            options={USER_CONTEXTS.map((context) => ({
              value: context,
              label: getUserContextLabel(context),
              description: getUserContextDescription(context),
            }))}
          />

          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <ConformInput
              meta={fields.firstName}
              type="text"
              label="First Name"
              required
              placeholder="John"
            />

            <ConformInput
              meta={fields.lastName}
              type="text"
              label="Last Name"
              required
              placeholder="Doe"
            />
          </div>

          {/* Email Field (Progressive Disclosure) */}
          {showEmail && (
            <ConformInput
              meta={fields.email}
              type="email"
              label="Email Address"
              required={selectedContext !== "casual-user"}
              placeholder="john.doe@example.com"
              helperText="We'll never share your email with anyone else"
            />
          )}

          {/* Phone Field (Always Visible, Optional) */}
          <ConformInput
            meta={fields.phone}
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            helperText="Optional - Include if you'd like to be contacted by phone"
          />

          {/* Location Field (Progressive Disclosure - Recruiter Only) */}
          {showLocation && (
            <ConformInput
              meta={fields.location}
              type="text"
              label="Location (City, State)"
              required
              placeholder="San Francisco, CA"
              helperText="Helps us verify job location compatibility"
            />
          )}

          {/* Preferred Contact Method (Conditional) */}
          {showPreferredContact && (
            <ConformRadioGroup
              meta={fields.preferredContactMethod}
              label="Preferred Contact Method"
              description="Since you provided both email and phone, how would you prefer to be contacted?"
              required
              orientation="horizontal"
              options={CONTACT_METHODS.map((method) => ({
                value: method,
                label:
                  method === "either"
                    ? "Either method is fine"
                    : method.charAt(0).toUpperCase() + method.slice(1),
              }))}
            />
          )}

          {/* Message Field */}
          <ConformTextarea
            meta={fields.message}
            label="Message"
            helperText="Tell me about your project, question, or inquiry"
            required
            placeholder="I'm reaching out because..."
            rows={6}
            showCharCount={true}
            maxLength={2000}
          />

          {/* Policy Acceptance */}
          <ConformCheckbox
            meta={fields.acceptedPolicies}
            label={
              <>
                I have reviewed and accept the{" "}
                <a
                  href="/privacy"
                  className="text-anchor-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms"
                  className="text-anchor-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Use
                </a>
              </>
            }
            required
          />

          {/* Remaining Submissions Counter */}
          {rateLimitInfo.remaining > 0 && (
            <p className="text-sm text-muted-foreground">
              Submissions remaining: {rateLimitInfo.remaining} / 3
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rateLimitInfo.remaining === 0 || actionData?.success}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionData?.success ? "Message Sent! ✓" : "Send Message"}
          </button>
        </Form>
      )}
    </div>
  );
}
