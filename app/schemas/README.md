# Validation Schema Library

This directory contains all validation schemas used throughout the application. Schemas are organized into **field-level** (atomic) and **form-level** (composite) validations.

## Architecture

```
schemas/
├── fields/          # Atomic field validations (building blocks)
│   ├── text.ts      # Text input validations
│   ├── email.ts     # Email validations
│   ├── phone.ts     # Phone number validations
│   ├── name.ts      # Name field validations
│   ├── password.ts  # Password validations
│   ├── url.ts       # URL validations
│   ├── number.ts    # Number validations
│   ├── date.ts      # Date/time validations
│   ├── color.ts     # Color validations
│   └── index.ts     # Export all fields
├── forms/           # Form-level schemas (compositions)
│   ├── contact.schema.ts       # Contact form
│   ├── input-test.schema.ts    # Input component tests
│   └── index.ts                # Export all forms
└── README.md        # This file
```

## Usage

### Using Field Schemas

Field schemas are atomic validation rules for individual input fields.

```typescript
import { emailField, phoneField } from "~/schemas/fields";

const mySchema = z.object({
  email: emailField,
  phone: phoneField,
});
```

### Using Form Schemas

Form schemas are pre-composed validations for complete forms.

```typescript
import { contactSchema } from "~/schemas/forms";

// Use default contact schema
const schema = contactSchema;

// Or create custom variant
import { createContactSchema } from "~/schemas/forms";
const customSchema = createContactSchema({
  requirePhone: true,
});
```

## Design Principles

### 1. Single Source of Truth

Every validation rule is defined once and reused everywhere. Tests and production code reference the same schemas.

**✅ Good:**

```typescript
// Test page
import { inputTestSchema } from "~/schemas/forms";

// Production page
import { inputTestSchema } from "~/schemas/forms";
// Both use identical validation
```

**❌ Bad:**

```typescript
// Test page
const testSchema = z.object({ email: z.string().email() });

// Production page
const prodSchema = z.object({ email: z.string().email() });
// Duplicate definitions can drift apart
```

### 2. Composability

Field schemas are composable building blocks for form schemas.

```typescript
import { emailField, phoneField } from "~/schemas/fields";

export const contactSchema = z.object({
  email: emailField,
  phone: phoneField,
  // Compose other fields...
});
```

### 3. Documentation

Every schema includes JSDoc comments explaining:

- What it validates
- Where it's used
- Validation rules
- Examples

```typescript
/**
 * Email validation
 * Used for: all email input fields
 *
 * Validation rules:
 * - Valid email format (RFC 5322)
 * - Maximum 255 characters
 *
 * @example
 * emailField.parse("user@example.com") // ✓ valid
 */
export const emailField = z.string().email();
```

### 4. Type Safety

All schemas export TypeScript types for type-safe form data.

```typescript
export type ContactFormData = z.infer<typeof contactSchema>;

// Use in components
function handleSubmit(data: ContactFormData) {
  // data is fully typed
}
```

## Available Field Schemas

### Text Fields

- `textField` - Standard text (2-100 chars)
- `shortTextField` - Short text (1-50 chars)
- `longTextField` - Long text (10-500 chars)
- `messageField` - Messages/comments (1-1000 chars)

### Contact Fields

- `emailField` - Email with RFC 5322 validation
- `phoneField` - US phone (10 digits)
- `internationalPhoneField` - International phone
- `firstNameField` - First name (letters, spaces, hyphens)
- `lastNameField` - Last name (same rules)
- `fullNameField` - Full name (2-100 chars)
- `organizationField` - Organization/company name

### Security Fields

- `passwordField` - Strong password (8+ chars, mixed case, numbers, symbols)
- `simplePasswordField` - Basic password (8+ chars)
- `createPasswordConfirmation()` - Password confirmation factory

### Other Fields

- `urlField` - URL with protocol requirement
- `numberField` - Number (1-100)
- `dateField` - Date picker (ISO format)
- `timeField` - Time picker (HH:MM)
- `colorField` - Hex color (#RRGGBB)

## Available Form Schemas

### Contact Forms

- `contactSchema` - Default contact form
- `createContactSchema(options)` - Custom contact form factory

### Test Forms

- `inputTestSchema` - Input component test suite

## Testing

Schema unit tests are located in `schemas/__tests__/`.

```bash
# Run schema tests
npm test -- schemas
```

Example test:

```typescript
describe("emailField", () => {
  it("accepts valid emails", () => {
    expect(emailField.parse("user@example.com")).toBe("user@example.com");
  });

  it("rejects invalid emails", () => {
    expect(() => emailField.parse("invalid")).toThrow();
  });
});
```

## Best Practices

### When to Create New Schemas

**Create a field schema when:**

- The validation will be reused in multiple forms
- The field has specific validation rules
- You want consistent validation across the app

**Create a form schema when:**

- You're building a new form
- You need custom validation logic
- You want to test the complete form

### Naming Conventions

- Field schemas: `<name>Field` (e.g., `emailField`)
- Optional fields: `optional<Name>Field` (e.g., `optionalEmailField`)
- Form schemas: `<name>Schema` (e.g., `contactSchema`)
- Factory functions: `create<Name>Schema` (e.g., `createContactSchema`)

### Updating Schemas

When updating a schema:

1. Update the schema definition
2. Update JSDoc comments
3. Run tests to ensure nothing breaks
4. Update this README if adding new schemas

## Migration Guide

### From Inline Schemas

**Before:**

```typescript
// routes/contact.tsx
const ContactSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/),
});
```

**After:**

```typescript
// routes/contact.tsx
import { createContactSchema } from "~/schemas/forms";

const ContactSchema = createContactSchema();
```

### From Duplicate Schemas

**Before:**

```typescript
// routes/_test/form.tsx
const testSchema = z.object({ email: z.string().email() });

// routes/contact.tsx
const prodSchema = z.object({ email: z.string().email() });
```

**After:**

```typescript
// Both files
import { emailField } from "~/schemas/fields";

const schema = z.object({ email: emailField });
```

## Contributing

When adding new schemas:

1. Choose appropriate directory (`fields/` or `forms/`)
2. Add comprehensive JSDoc comments
3. Export from `index.ts`
4. Write unit tests in `__tests__/`
5. Update this README
6. Update relevant form components

---

For questions or suggestions, see the [Form Accessibility Sprint documentation](../../docs/SprintPlanning/FormAccesibilitySprint.html).
