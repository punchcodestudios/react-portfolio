import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConformInput } from "~/components/form/Input/conform-input";
import type { FieldMetadata } from "@conform-to/react";
import * as conformReact from "@conform-to/react";

// Mock the conform-to/react module
vi.mock("@conform-to/react", async () => {
  const actual = await vi.importActual("@conform-to/react");
  return {
    ...actual,
    getInputProps: vi.fn(),
  };
});

// Mock the form-helper utility
vi.mock("~/utils/form-helper", () => ({
  getConformInputType: vi.fn((type) => {
    // Default mapping logic
    if (type === "date" || type === "time") return "text";
    return type || "text";
  }),
}));

describe("ConformInput Component", () => {
  const createMockMeta = (
    overrides?: Partial<FieldMetadata<string>>
  ): FieldMetadata<string> =>
    ({
      id: "test-field",
      name: "testField",
      initialValue: "",
      value: "",
      errors: [],
      allErrors: {},
      dirty: false,
      valid: true,
      allValid: true,
      key: {
        id: "test-field",
        name: "testField",
        initialValue: "",
        value: "",
      },
      getFieldList: () => [],
      getFieldset: () => ({}),
      ...overrides,
    }) as unknown as FieldMetadata<string>;

  const mockMeta = createMockMeta();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Integration with Conform", () => {
    it("should call getInputProps with meta and correct type", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "testField",
        id: "test-field",
        name: "testField",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      expect(getInputPropsSpy).toHaveBeenCalledWith(mockMeta, {
        type: "text",
        ariaAttributes: true,
      });
    });

    it("should pass type conversion for date inputs", async () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);

      // Mock getConformInputType to return "text" for date
      const formHelper = await import("~/utils/form-helper");
      const getConformInputTypeSpy = vi.spyOn(
        formHelper,
        "getConformInputType"
      );
      getConformInputTypeSpy.mockReturnValue("text");

      getInputPropsSpy.mockReturnValue({
        key: "dateField",
        id: "date-field",
        name: "dateField",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      render(<ConformInput meta={mockMeta} type="date" />);

      expect(getConformInputTypeSpy).toHaveBeenCalledWith("date");
      expect(getInputPropsSpy).toHaveBeenCalledWith(mockMeta, {
        type: "text",
        ariaAttributes: true,
      });
    });

    it("should render Input component with conform props", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "email",
        id: "email-field",
        name: "email",
        form: "test-form",
        defaultValue: "test@example.com",
        type: "email",
        "aria-invalid": false,
      });

      render(<ConformInput meta={mockMeta} type="email" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "email-field");
      expect(input).toHaveAttribute("name", "email");
      expect(input).toHaveAttribute("type", "email");
    });
  });

  describe("Error Handling", () => {
    it("should pass first error to Input component", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Field is required", "Must be valid email"],
      });

      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "errorField",
        id: "error-field",
        name: "errorField",
        form: "test-form",
        defaultValue: "",
        type: "text",
        "aria-invalid": true,
      });

      render(<ConformInput meta={metaWithErrors} type="text" />);

      expect(screen.getByText("Field is required")).toBeInTheDocument();
    });

    it("should render without errors when meta.errors is empty", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "validField",
        id: "valid-field",
        name: "validField",
        form: "test-form",
        defaultValue: "",
        type: "text",
        "aria-invalid": false,
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("should render without errors when meta.errors is undefined", () => {
      const metaNoErrors = createMockMeta({
        errors: undefined,
      });

      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "noErrorField",
        id: "no-error-field",
        name: "noErrorField",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      render(<ConformInput meta={metaNoErrors} type="text" />);

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Props Forwarding", () => {
    it("should forward additional props to Input component", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "customField",
        id: "custom-field",
        name: "customField",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      const { container } = render(
        <ConformInput
          meta={mockMeta}
          type="text"
          placeholder="Enter text"
          disabled
          className="custom-class"
        />
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", "Enter text");
      expect(input).toBeDisabled();

      // Find the wrapper div with the custom class
      const wrapper = container.querySelector(".custom-class");
      expect(wrapper).toBeInTheDocument();
    });

    it("should preserve original type for rendering", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "password",
        id: "password-field",
        name: "password",
        form: "test-form",
        defaultValue: "",
        type: "password",
      });

      render(<ConformInput meta={mockMeta} type="password" />);

      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "password");
    });

    it("should pass label prop to Input component", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "labeledField",
        id: "labeled-field",
        name: "labeledField",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      render(
        <ConformInput meta={mockMeta} type="text" label="Username" required />
      );

      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("Type Variants", () => {
    it("should handle text type", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "textField",
        id: "text-field",
        name: "textField",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "text");
    });

    it("should handle email type", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "emailField",
        id: "email-field",
        name: "emailField",
        form: "test-form",
        defaultValue: "",
        type: "email",
      });

      render(<ConformInput meta={mockMeta} type="email" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("should handle number type", () => {
      const metaNumber = createMockMeta() as unknown as FieldMetadata<number>;

      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "numberField",
        id: "number-field",
        name: "numberField",
        form: "test-form",
        defaultValue: "0",
        type: "number",
      });

      render(<ConformInput meta={metaNumber} type="number" />);

      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("type", "number");
    });

    it("should handle tel type", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "telField",
        id: "tel-field",
        name: "telField",
        form: "test-form",
        defaultValue: "",
        type: "tel",
      });

      render(<ConformInput meta={mockMeta} type="tel" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "tel");
    });

    it("should handle url type", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "urlField",
        id: "url-field",
        name: "urlField",
        form: "test-form",
        defaultValue: "",
        type: "url",
      });

      render(<ConformInput meta={mockMeta} type="url" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "url");
    });
  });

  describe("ARIA Attributes", () => {
    it("should enable ariaAttributes in getInputProps", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "ariaField",
        id: "aria-field",
        name: "ariaField",
        form: "test-form",
        defaultValue: "",
        type: "text",
        "aria-invalid": false,
        "aria-describedby": "aria-field-error",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      expect(getInputPropsSpy).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          ariaAttributes: true,
        })
      );
    });

    it("should pass through ARIA attributes from conform", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "ariaField",
        id: "aria-field",
        name: "ariaField",
        form: "test-form",
        defaultValue: "",
        type: "text",
        "aria-invalid": true,
        "aria-describedby": "aria-field-error",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", "aria-field-error");
    });
  });

  describe("Default Values", () => {
    it("should render with defaultValue from conform", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "defaultField",
        id: "default-field",
        name: "defaultField",
        form: "test-form",
        defaultValue: "Initial value",
        type: "text",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input).toHaveValue("Initial value");
    });

    it("should handle empty defaultValue", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "emptyField",
        id: "empty-field",
        name: "emptyField",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input).toHaveValue("");
    });
  });

  describe("Edge Cases", () => {
    it("should handle multiple errors and only show first", () => {
      const metaMultipleErrors = createMockMeta({
        errors: ["Error 1", "Error 2", "Error 3"],
      });

      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "multiErrorField",
        id: "multi-error-field",
        name: "multiErrorField",
        form: "test-form",
        defaultValue: "",
        type: "text",
        "aria-invalid": true,
      });

      render(<ConformInput meta={metaMultipleErrors} type="text" />);

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Error 3")).not.toBeInTheDocument();
    });

    it("should not override conform-provided id", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "testField",
        id: "conform-generated-id",
        name: "testField",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "conform-generated-id");
    });

    it("should not override conform-provided name", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "testField",
        id: "test-id",
        name: "conform-generated-name",
        form: "test-form",
        defaultValue: "",
        type: "text",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("name", "conform-generated-name");
    });
  });

  describe("Type Omissions", () => {
    it("should handle conform-controlled props", () => {
      const getInputPropsSpy = vi.mocked(conformReact.getInputProps);
      getInputPropsSpy.mockReturnValue({
        key: "testField",
        id: "controlled-id",
        name: "controlledName",
        form: "test-form",
        defaultValue: "controlled-default",
        type: "text",
      });

      render(<ConformInput meta={mockMeta} type="text" />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input).toHaveAttribute("id", "controlled-id");
      expect(input).toHaveAttribute("name", "controlledName");
      expect(input).toHaveValue("controlled-default");
    });
  });
});
