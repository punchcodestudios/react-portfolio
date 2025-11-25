import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, Link, useActionData } from "react-router";
import { ConformInput } from "~/components/form/Input/conform-input";
import { inputTestSchema } from "~/schemas/forms";
import type { Route } from "./+types/input";

/**
 * Input Component Test Page
 *
 * This page tests all input component variants using the shared validation
 * schema from ~/schemas/forms/input-test.schema.ts
 *
 * The same schema is used in production forms, ensuring consistent validation
 * across test and production environments.
 */

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: inputTestSchema });

  if (submission.status !== "success") {
    return { lastResult: submission.reply() };
  }

  console.log("Input test form submitted:", submission.value);

  return {
    lastResult: submission.reply({ resetForm: true }),
    success: true,
  };
}

export default function InputComponentTest() {
  const actionData = useActionData<typeof action>();

  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inputTestSchema });
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
          Input Component Testing
        </h1>
        <p className="text-muted-foreground">
          Testing all input type variants with validation, error handling, and
          accessibility features using shared validation schemas.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          ℹ️ Validation rules defined in:{" "}
          <code>~/schemas/forms/input-test.schema.ts</code>
        </p>
      </div>

      {/* Test Form */}
      <Form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        className="space-y-8 bg-card p-8 rounded-lg border border-border"
      >
        {/* Text Input */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Text Input Types
          </h2>

          <ConformInput
            meta={fields.textInput}
            type="text"
            label="Text Input"
            placeholder="Enter any text"
            required
            helperText="Standard text input with minimum 2 characters"
          />

          <ConformInput
            meta={fields.emailInput}
            type="email"
            label="Email Input"
            placeholder="user@example.com"
            required
            helperText="Must be a valid email address"
          />

          <ConformInput
            meta={fields.telInput}
            type="tel"
            label="Telephone Input"
            placeholder="1234567890"
            required
            helperText="10 digits, no spaces or special characters"
          />

          <ConformInput
            meta={fields.urlInput}
            type="url"
            label="URL Input"
            placeholder="https://example.com"
            required
            helperText="Must be a valid URL with protocol"
          />

          <ConformInput
            meta={fields.passwordInput}
            type="password"
            label="Password Input"
            placeholder="Enter secure password"
            required
            helperText="Minimum 8 characters required"
          />
        </div>

        {/* Specialized Input Types */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Specialized Input Types
          </h2>

          <ConformInput
            meta={fields.numberInput}
            type="number"
            label="Number Input"
            placeholder="Enter a number"
            required
            helperText="Value between 1 and 100"
          />

          <ConformInput
            meta={fields.dateInput}
            type="date"
            label="Date Input"
            required
            helperText="Select a date from the calendar"
          />

          <ConformInput
            meta={fields.timeInput}
            type="time"
            label="Time Input"
            required
            helperText="Select a time"
          />

          <ConformInput
            meta={fields.colorInput}
            type="color"
            label="Color Input"
            required
            helperText="Choose a color from the picker"
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

      {/* Success Feedback */}
      {actionData?.success && (
        <div className="mt-6 p-4 bg-success/10 border border-success text-success-foreground rounded-md">
          <p className="font-medium">
            ✓ All inputs validated and submitted successfully!
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
              <span>All inputs have associated labels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Required fields marked with asterisk</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Helper text properly associated (aria-describedby)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Error messages announced (aria-live="polite")</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Focus indicators visible on all inputs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Keyboard navigation fully supported</span>
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
              <span>ForwardRef support for Conform</span>
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
              <span>Auto-generated unique IDs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>TypeScript type safety throughout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
