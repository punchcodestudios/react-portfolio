import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, Link, useActionData } from "react-router";
import { ConformTextarea } from "~/components/form/Textarea/conform-textarea";
import { textareaTestSchema } from "~/schemas/forms";
import type { Route } from "./+types/textarea";

/**
 * Textarea Component Test Page
 *
 * This page tests all textarea component variants using the shared validation
 * schema from ~/schemas/forms/textarea-test.schema.ts
 *
 * The same schema is used in production forms, ensuring consistent validation
 * across test and production environments.
 */

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: textareaTestSchema });

  if (submission.status !== "success") {
    return { lastResult: submission.reply() };
  }

  console.log("Textarea test form submitted:", submission.value);

  return {
    lastResult: submission.reply({ resetForm: true }),
    success: true,
  };
}

export default function TextareaComponentTest({
  actionData,
}: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: textareaTestSchema });
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
          Textarea Component Testing
        </h1>
        <p className="text-muted-foreground">
          Testing all textarea variants with validation, character counting,
          error handling, and accessibility features using shared validation
          schemas.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          ℹ️ Validation rules defined in:{" "}
          <code>~/schemas/forms/textarea-test.schema.ts</code>
        </p>
      </div>

      {/* Test Form */}
      <Form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        className="space-y-8 bg-card p-8 rounded-lg border border-border"
      >
        {/* Basic Textarea */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Basic Textarea Types
          </h2>

          <ConformTextarea
            meta={fields.shortMessage}
            label="Short Message"
            placeholder="Enter a brief message..."
            required
            helperText="1-250 characters"
            textareaSize="sm"
            showCharCount
            maxLength={250}
          />

          <ConformTextarea
            meta={fields.standardMessage}
            label="Standard Message"
            placeholder="Enter your message..."
            required
            helperText="1-1000 characters for standard messages"
            showCharCount
            maxLength={1000}
          />
        </div>

        {/* Sized Textareas */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Size Variants
          </h2>

          <ConformTextarea
            meta={fields.description}
            label="Description (Medium)"
            placeholder="Enter a description..."
            required
            helperText="10-500 characters for descriptions"
            textareaSize="lg"
            showCharCount
            maxLength={500}
          />

          <ConformTextarea
            meta={fields.bio}
            label="Bio (Large)"
            placeholder="Tell us about yourself..."
            required
            helperText="20-1000 characters for detailed bios"
            textareaSize="xl"
            showCharCount
            maxLength={1000}
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
            ✓ All textareas validated and submitted successfully!
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
              <span>All textareas have associated labels</span>
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
              <span>Character counter announced to screen readers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Error messages announced (aria-live="polite")</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Focus indicators visible on all textareas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Keyboard navigation fully supported</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Resizable vertically for user preference</span>
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
              <span>Character counter with warning states</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>CVA variants (default, error, success, warning)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Multiple size options (sm, default, lg, xl)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Vertical resize enabled</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Auto-generated unique IDs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>TypeScript type safety throughout</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Dark mode support</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
