import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, Link, useActionData } from "react-router";
import { ConformSelect } from "~/components/form/Select/conform-select";
import { selectTestSchema } from "~/schemas/forms";
import type { ActionFunctionArgs } from "react-router";

/**
 * Select Component Test Page
 *
 * This page tests all select component variants using the shared validation
 * schema from ~/schemas/forms/select-test.schema.ts
 *
 * The same schema is used in production forms, ensuring consistent validation
 * across test and production environments.
 */

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: selectTestSchema });

  if (submission.status !== "success") {
    return { lastResult: submission.reply() };
  }

  console.log("Select test form submitted:", submission.value);

  return {
    lastResult: submission.reply({ resetForm: true }),
    success: true,
  };
}

export default function SelectComponentTest() {
  const actionData = useActionData<typeof action>();

  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: selectTestSchema });
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
          Select Component Testing
        </h1>
        <p className="text-muted-foreground">
          Testing all select/dropdown variants with validation, keyboard
          navigation, error handling, and accessibility features using shared
          validation schemas.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          ℹ️ Validation rules defined in:{" "}
          <code>~/schemas/forms/select-test.schema.ts</code>
        </p>
      </div>

      {/* Test Form */}
      <Form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        className="space-y-8 bg-card p-8 rounded-lg border border-border"
      >
        {/* Basic Select */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Basic Select Types
          </h2>

          <ConformSelect
            meta={fields.basicSelect}
            label="Basic Select"
            placeholder="Choose an option..."
            required
            helperText="Select any option to test basic functionality"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
              {
                value: "option4",
                label: "Option 4 (Disabled)",
                disabled: true,
              },
            ]}
          />

          <ConformSelect
            meta={fields.country}
            label="Country"
            placeholder="Select your country..."
            required
            helperText="ISO 3166-1 alpha-2 country codes"
            selectSize="lg"
            options={[
              { value: "US", label: "United States" },
              { value: "CA", label: "Canada" },
              { value: "GB", label: "United Kingdom" },
              { value: "FR", label: "France" },
              { value: "DE", label: "Germany" },
              { value: "JP", label: "Japan" },
              { value: "AU", label: "Australia" },
              { value: "NZ", label: "New Zealand" },
            ]}
          />
        </div>

        {/* Specialized Selects */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Specialized Select Types
          </h2>

          <ConformSelect
            meta={fields.state}
            label="State/Province"
            placeholder="Select state..."
            required
            helperText="US states and Canadian provinces"
            options={[
              { value: "AL", label: "Alabama" },
              { value: "CA", label: "California" },
              { value: "FL", label: "Florida" },
              { value: "NY", label: "New York" },
              { value: "TX", label: "Texas" },
              { value: "ON", label: "Ontario" },
              { value: "BC", label: "British Columbia" },
              { value: "QC", label: "Quebec" },
            ]}
          />

          <ConformSelect
            meta={fields.role}
            label="User Role"
            placeholder="Select a role..."
            required
            helperText="Enum-validated role selection"
            options={[
              { value: "admin", label: "Administrator" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Viewer" },
              { value: "guest", label: "Guest" },
            ]}
          />

          <ConformSelect
            meta={fields.priority}
            label="Priority Level"
            placeholder="Select priority..."
            required
            helperText="Task priority classification"
            selectSize="sm"
            options={[
              { value: "low", label: "🟢 Low Priority" },
              { value: "medium", label: "🟡 Medium Priority" },
              { value: "high", label: "🟠 High Priority" },
              { value: "urgent", label: "🔴 Urgent" },
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

      {/* Success Feedback */}
      {actionData?.success && (
        <div className="mt-6 p-4 bg-success/10 border border-success text-success-foreground rounded-md">
          <p className="font-medium">
            ✓ All selects validated and submitted successfully!
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
              <span>All selects have associated labels</span>
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
              <span>Keyboard navigation (↑ ↓ Home End PgUp PgDn)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Focus indicators visible on trigger and options</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>ARIA combobox pattern implemented</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Screen reader announces selected value</span>
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
              <span>Radix UI Select for accessibility</span>
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
              <span>Disabled options support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Portal rendering for proper z-index</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Visual indicators for selected items</span>
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
            <p className="font-medium text-foreground mb-2">Opening/Closing:</p>
            <ul className="space-y-1 ml-4">
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> or{" "}
                <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> -
                Open/close dropdown
              </li>
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd> - Close
                dropdown
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">
              Navigating Options:
            </p>
            <ul className="space-y-1 ml-4">
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">↓</kbd> /{" "}
                <kbd className="px-2 py-1 bg-muted rounded">↑</kbd> - Move
                up/down
              </li>
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">Home</kbd> /{" "}
                <kbd className="px-2 py-1 bg-muted rounded">End</kbd> -
                First/last option
              </li>
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">PgUp</kbd> /{" "}
                <kbd className="px-2 py-1 bg-muted rounded">PgDn</kbd> - Jump 10
                items
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
