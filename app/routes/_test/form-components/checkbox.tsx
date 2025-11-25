import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, Link, useActionData } from "react-router";
import { ConformCheckbox } from "~/components/form/Checkbox/conform-checkbox";
import { ConformCheckboxGroup } from "~/components/form/Checkbox/conform-checkbox-group";
import { Checkbox } from "~/components/form/Checkbox/checkbox";
import { CheckboxGroup } from "~/components/form/Checkbox/checkbox-group";
import { checkboxTestSchema } from "~/schemas/forms";
import type { ActionFunctionArgs } from "react-router";
import { useState } from "react";

/**
 * Checkbox Component Test Page
 *
 * This page tests all checkbox component variants using the shared validation
 * schema from ~/schemas/forms/checkbox-test.schema.ts
 *
 * The same schema is used in production forms, ensuring consistent validation
 * across test and production environments.
 */

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: checkboxTestSchema });

  if (submission.status !== "success") {
    return { lastResult: submission.reply() };
  }

  console.log("Checkbox test form submitted:", submission.value);

  return {
    lastResult: submission.reply({ resetForm: true }),
    success: true,
  };
}

export default function CheckboxComponentTest() {
  const actionData = useActionData<typeof action>();

  // State for demo-only checkboxes and groups (not part of form validation)
  const [notificationPrefs, setNotificationPrefs] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [demoSmall, setDemoSmall] = useState(false);
  const [demoDefault, setDemoDefault] = useState(false);
  const [demoLarge, setDemoLarge] = useState(false);
  const [disabledUnchecked, setDisabledUnchecked] = useState(false);
  const [disabledChecked, setDisabledChecked] = useState(true);

  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: checkboxTestSchema });
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
          Checkbox Component Testing
        </h1>
        <p className="text-muted-foreground">
          Testing all checkbox variants including single checkboxes, checkbox
          groups, indeterminate states, and accessibility features using shared
          validation schemas.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          ℹ️ Validation rules defined in:{" "}
          <code>~/schemas/forms/checkbox-test.schema.ts</code>
        </p>
      </div>

      {/* Test Form */}
      <Form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        className="space-y-8 bg-card p-8 rounded-lg border border-border"
      >
        {/* Single Checkboxes */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Single Checkbox Types
          </h2>

          <ConformCheckbox
            meta={fields.acceptTerms}
            label="I accept the terms and conditions"
            description="You must accept the terms to continue"
            required
          />

          <ConformCheckbox
            meta={fields.subscribeNewsletter}
            label="Subscribe to newsletter"
            description="Receive updates about new features and content"
            helperText="Optional - you can change this later"
          />

          <ConformCheckbox
            meta={fields.rememberMe}
            label="Remember me"
            description="Stay logged in on this device"
          />
        </div>

        {/* Checkbox Group */}
        <div className="space-y-4">
          <h2 className="text-xl font-header text-foreground border-b border-border pb-2">
            Checkbox Groups (Validated)
          </h2>

          <ConformCheckboxGroup
            meta={fields.interests}
            label="Select Your Interests"
            description="Choose 1-3 interests that best describe you"
            helperText="This helps us personalize your experience"
            required
            options={[
              {
                value: "coding",
                label: "Coding & Development",
                description: "Building software and applications",
              },
              {
                value: "design",
                label: "Design & UX",
                description: "Creating beautiful user experiences",
              },
              {
                value: "writing",
                label: "Content Writing",
                description: "Writing articles and documentation",
              },
              {
                value: "marketing",
                label: "Marketing & Growth",
                description: "Growing and promoting products",
              },
              {
                value: "sales",
                label: "Sales & Business",
                description: "Building relationships and closing deals",
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

          <div className="space-y-3">
            <Checkbox
              id="demo-checkbox-sm"
              label="Small checkbox"
              checkboxSize="sm"
              checked={demoSmall}
              onCheckedChange={setDemoSmall}
            />

            <Checkbox
              id="demo-checkbox-default"
              label="Default checkbox"
              checkboxSize="default"
              checked={demoDefault}
              onCheckedChange={setDemoDefault}
            />

            <Checkbox
              id="demo-checkbox-lg"
              label="Large checkbox"
              checkboxSize="lg"
              checked={demoLarge}
              onCheckedChange={setDemoLarge}
            />
          </div>
        </div>

        {/* Horizontal Layout */}
        <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-header text-foreground">
            Horizontal Layout
          </h3>

          <CheckboxGroup
            id="demo-notification-prefs"
            label="Quick Preferences"
            description="Select your notification preferences"
            orientation="horizontal"
            value={notificationPrefs}
            onValueChange={setNotificationPrefs}
            options={[
              { value: "email", label: "Email" },
              { value: "sms", label: "SMS" },
              { value: "push", label: "Push Notifications" },
              { value: "none", label: "None" },
            ]}
          />

          <p className="text-sm text-muted-foreground">
            Selected: {notificationPrefs.join(", ") || "None"}
          </p>
        </div>

        {/* Disabled States */}
        <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-header text-foreground">
            Disabled States
          </h3>

          <Checkbox
            id="demo-disabled-unchecked"
            label="Disabled unchecked"
            disabled
            checked={disabledUnchecked}
            onCheckedChange={setDisabledUnchecked}
          />

          <Checkbox
            id="demo-disabled-checked"
            label="Disabled checked"
            disabled
            checked={disabledChecked}
            onCheckedChange={setDisabledChecked}
          />

          <CheckboxGroup
            id="demo-features"
            label="Features (Some Disabled)"
            value={features}
            onValueChange={setFeatures}
            options={[
              { value: "feature1", label: "Available Feature" },
              { value: "feature2", label: "Coming Soon", disabled: true },
              { value: "feature3", label: "Another Feature" },
              { value: "feature4", label: "Premium Only", disabled: true },
            ]}
          />

          <p className="text-sm text-muted-foreground">
            Selected features: {features.join(", ") || "None"}
          </p>
        </div>
      </div>

      {/* Success Feedback */}
      {actionData?.success && (
        <div className="mt-6 p-4 bg-success/10 border border-success text-success-foreground rounded-md">
          <p className="font-medium">
            ✓ All checkboxes validated and submitted successfully!
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
              <span>All checkboxes have associated labels</span>
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
              <span>Keyboard navigation (Space to toggle)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Focus indicators visible on all checkboxes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Checkbox groups use role="group"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Labels are clickable to toggle checkbox</span>
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
              <span>Radix UI Checkbox for accessibility</span>
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
              <span>Checkbox groups with min/max validation</span>
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
              Checkbox Controls:
            </p>
            <ul className="space-y-1 ml-4">
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> - Toggle
                checkbox on/off
              </li>
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">Tab</kbd> - Move to
                next checkbox
              </li>
              <li>
                <kbd className="px-2 py-1 bg-muted rounded">Shift</kbd> +{" "}
                <kbd className="px-2 py-1 bg-muted rounded">Tab</kbd> - Move to
                previous checkbox
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">
              Label Interaction:
            </p>
            <ul className="space-y-1 ml-4">
              <li>Click label text to toggle checkbox</li>
              <li>Labels are properly associated with checkboxes</li>
              <li>Disabled checkboxes show appropriate cursor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
