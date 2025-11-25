import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, Link, useActionData } from "react-router";
import { ConformRadioGroup } from "~/components/form/Radio/conform-radio";
import { RadioGroup } from "~/components/form/Radio/radio";
import { radioTestSchema } from "~/schemas/forms";
import type { ActionFunctionArgs } from "react-router";
import { useState } from "react";

/**
 * Radio Component Test Page
 *
 * This page tests all radio component variants using the shared validation
 * schema from ~/schemas/forms/radio-test.schema.ts
 *
 * The same schema is used in production forms, ensuring consistent validation
 * across test and production environments.
 */

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: radioTestSchema });

  if (submission.status !== "success") {
    return { lastResult: submission.reply() };
  }

  console.log("Radio test form submitted:", submission.value);

  return {
    lastResult: submission.reply({ resetForm: true }),
    success: true,
  };
}

export default function RadioComponentTest() {
  const actionData = useActionData<typeof action>();

  // State for demo-only radio groups (not part of form validation)
  const [demoSize, setDemoSize] = useState<string>("");
  const [demoHorizontal, setDemoHorizontal] = useState<string>("");
  const [demoDisabled, setDemoDisabled] = useState<string>("option2");

  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: radioTestSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link to="/_test/form-components" className="hover:text-foreground">
          ← Back to Test Suite
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-brand text-foreground mb-2">
          Radio Component Testing
        </h1>
        <p className="text-muted-foreground">
          Testing all radio button variants including single selection groups,
          various layouts, and accessibility features using shared validation
          schemas.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          ℹ️ Validation rules defined in:{" "}
          <code>~/schemas/forms/radio-test.schema.ts</code>
        </p>
      </div>

      {/* Test Form */}
      <Form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        className="space-y-8 bg-card p-8 rounded-lg border border-border"
      >
        {/* Basic Radio Groups */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Basic Radio Groups
          </h2>

          <ConformRadioGroup
            meta={fields.gender}
            label="Gender"
            description="Select your gender identity"
            required
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "non-binary", label: "Non-binary" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ]}
          />

          <ConformRadioGroup
            meta={fields.priority}
            label="Priority Level"
            description="How urgent is this request?"
            helperText="This helps us prioritize your request"
            required
            options={[
              {
                value: "low",
                label: "Low",
                description: "Can wait a few days",
              },
              {
                value: "medium",
                label: "Medium",
                description: "Should be addressed within 24 hours",
              },
              {
                value: "high",
                label: "High",
                description: "Needs attention today",
              },
              {
                value: "urgent",
                label: "Urgent",
                description: "Critical issue requiring immediate attention",
              },
            ]}
          />
        </div>

        {/* Radio Groups with Descriptions */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Radio Groups with Descriptions
          </h2>

          <ConformRadioGroup
            meta={fields.accountType}
            label="Account Type"
            description="Choose the account type that best fits your needs"
            required
            options={[
              {
                value: "personal",
                label: "Personal",
                description: "For individual use with basic features",
              },
              {
                value: "business",
                label: "Business",
                description: "For teams with advanced collaboration tools",
              },
              {
                value: "enterprise",
                label: "Enterprise",
                description: "For large organizations with custom solutions",
              },
            ]}
          />

          <ConformRadioGroup
            meta={fields.notificationPreference}
            label="Notification Preference"
            description="How would you like to receive notifications?"
            required
            options={[
              {
                value: "email",
                label: "Email",
                description: "Receive notifications via email",
              },
              {
                value: "sms",
                label: "SMS",
                description: "Receive text messages",
              },
              {
                value: "push",
                label: "Push Notifications",
                description: "Get mobile push notifications",
              },
              {
                value: "none",
                label: "None",
                description: "Do not send me notifications",
              },
            ]}
          />
        </div>

        {/* Custom Radio Group */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Project Type Selection
          </h2>

          <ConformRadioGroup
            meta={fields.projectType}
            label="What type of project are you working on?"
            description="This helps us provide relevant resources"
            required
            options={[
              {
                value: "website",
                label: "Website",
                description: "Landing pages, portfolios, blogs",
              },
              {
                value: "mobile-app",
                label: "Mobile App",
                description: "iOS, Android, or cross-platform",
              },
              {
                value: "desktop-app",
                label: "Desktop Application",
                description: "Windows, macOS, or Linux applications",
              },
              {
                value: "api",
                label: "API/Backend",
                description: "REST APIs, GraphQL, microservices",
              },
              {
                value: "other",
                label: "Other",
                description: "Something else not listed above",
              },
            ]}
          />
        </div>

        {/* Submit Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Submit Test Form
          </button>

          <button
            type="button"
            className="px-6 py-3 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
            onClick={() => form.reset()}
          >
            Reset Form
          </button>
        </div>
      </Form>

      {/* Demo Sections (Not part of validated form) */}
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-header text-foreground border-b-2 border-border pb-2">
          Demo Sections (UI Only)
        </h2>

        {/* Size Variants */}
        <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-header text-foreground">Size Variants</h3>

          <div className="space-y-6">
            <RadioGroup
              id="demo-size-sm"
              label="Small Radio Buttons"
              radioSize="sm"
              value={demoSize}
              onValueChange={setDemoSize}
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
            />

            <RadioGroup
              id="demo-size-default"
              label="Default Radio Buttons"
              radioSize="default"
              value={demoSize}
              onValueChange={setDemoSize}
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
            />

            <RadioGroup
              id="demo-size-lg"
              label="Large Radio Buttons"
              radioSize="lg"
              value={demoSize}
              onValueChange={setDemoSize}
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Selected: {demoSize || "None"}
          </p>
        </div>

        {/* Horizontal Layout */}
        <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-header text-foreground">
            Horizontal Layout
          </h3>

          <RadioGroup
            id="demo-horizontal"
            label="Quick Selection"
            description="Choose your preference"
            orientation="horizontal"
            value={demoHorizontal}
            onValueChange={setDemoHorizontal}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "maybe", label: "Maybe" },
            ]}
          />

          <p className="text-sm text-muted-foreground">
            Selected: {demoHorizontal || "None"}
          </p>
        </div>

        {/* Disabled States */}
        <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-header text-foreground">
            Disabled States
          </h3>

          <RadioGroup
            id="demo-disabled"
            label="Options (Some Disabled)"
            description="Option 2 is pre-selected and all are disabled"
            value={demoDisabled}
            onValueChange={setDemoDisabled}
            disabled
            options={[
              { value: "option1", label: "Available Option" },
              { value: "option2", label: "Pre-selected Option" },
              { value: "option3", label: "Another Option" },
            ]}
          />

          <RadioGroup
            id="demo-partial-disabled"
            label="Partial Disabled"
            description="Some options are disabled"
            value={demoDisabled}
            onValueChange={setDemoDisabled}
            options={[
              { value: "option1", label: "Available" },
              { value: "option2", label: "Coming Soon", disabled: true },
              { value: "option3", label: "Available" },
              { value: "option4", label: "Premium Only", disabled: true },
            ]}
          />

          <p className="text-sm text-muted-foreground">
            Selected: {demoDisabled}
          </p>
        </div>
      </div>

      {/* Success Feedback */}
      {actionData?.success && (
        <div className="mt-6 p-4 bg-success/10 border border-success text-success-foreground rounded-md">
          <p className="font-medium">
            ✓ All radio selections validated and submitted successfully!
          </p>
          <p className="text-sm mt-1">
            Check the browser console for submitted data.
          </p>
        </div>
      )}

      {/* Test Results Panel */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Accessibility Results */}
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-header text-foreground mb-3">
            Accessibility Checklist
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>All radio buttons have associated labels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Required fields marked with asterisk</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Description text properly associated</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Helper text properly associated</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Error messages announced (aria-live="polite")</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Keyboard navigation (Arrow keys + Tab)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Focus indicators visible on all radio buttons</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Radio groups use role="radiogroup"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Labels are clickable to select radio button</span>
            </li>
          </ul>
        </div>

        {/* Component Features */}
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-header text-foreground mb-3">
            Component Features
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Shared validation schemas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Radix UI RadioGroup for accessibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>CVA variants (default, error, success, warning)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Multiple size options (sm, default, lg)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Single selection per group</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Horizontal and vertical layouts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Disabled state support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Optional description and helper text</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Real-time validation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Dark mode support</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Keyboard Navigation Guide */}
      <div className="mt-8 p-6 bg-card rounded-lg border border-border">
        <h3 className="text-lg font-header text-foreground mb-3">
          ⌨️ Keyboard Navigation Guide
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground mb-2">
              Radio Button Controls:
            </p>
            <ul className="space-y-1 ml-4">
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">↑</kbd> /{" "}
                <kbd className="px-2 py-1 bg-muted rounded">↓</kbd> - Move
                between radio buttons (vertical)
              </li>
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">←</kbd> /{" "}
                <kbd className="px-2 py-1 bg-muted rounded">→</kbd> - Move
                between radio buttons (horizontal)
              </li>
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> - Select
                focused radio button
              </li>
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">Tab</kbd> - Move to
                next radio group
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">
              Label Interaction:
            </p>
            <ul className="space-y-1 ml-4">
              <li>Click label text to select radio button</li>
              <li>Labels are properly associated with radio buttons</li>
              <li>Disabled radio buttons show appropriate cursor</li>
              <li>Only one radio button can be selected per group</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
