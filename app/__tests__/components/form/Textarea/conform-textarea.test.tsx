import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConformTextarea } from "~/components/form/Textarea/conform-textarea";
import type { FieldMetadata } from "@conform-to/react";
import * as conformReact from "@conform-to/react";

// Mock the conform-to/react module
vi.mock("@conform-to/react", async () => {
  const actual = await vi.importActual("@conform-to/react");
  return {
    ...actual,
    useInputControl: vi.fn(),
  };
});

describe("ConformTextarea Component", () => {
  const createMockMeta = (
    overrides?: Partial<FieldMetadata<string>>
  ): FieldMetadata<string> =>
    ({
      id: "test-field",
      name: "testField",
      formId: "test-form",
      initialValue: "",
      value: "",
      errors: [],
      allErrors: {},
      dirty: false,
      valid: true,
      allValid: true,
      descriptionId: "test-field-description",
      errorId: "test-field-error",
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

  const mockControl = {
    value: "",
    change: vi.fn(),
    blur: vi.fn(),
    focus: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(conformReact.useInputControl).mockReturnValue(mockControl);
  });

  describe("Integration with Conform", () => {
    it("should call useInputControl with meta", () => {
      const useInputControlSpy = vi.mocked(conformReact.useInputControl);

      render(<ConformTextarea meta={mockMeta} />);

      expect(useInputControlSpy).toHaveBeenCalledWith(mockMeta);
    });

    it("should render Textarea with conform props", () => {
      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("id", "test-field");
      expect(textarea).toHaveAttribute("name", "testField");
      expect(textarea).toHaveAttribute("form", "test-form");
    });

    it("should use initialValue from meta", () => {
      const metaWithValue = createMockMeta({
        initialValue: "Initial content",
      });

      // Mock control to return the initialValue
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "Initial content",
      });

      render(<ConformTextarea meta={metaWithValue} />);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("Initial content");
    });
  });

  describe("Error Handling", () => {
    it("should apply error variant when meta has errors", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Field is required"],
      });

      render(<ConformTextarea meta={metaWithErrors} />);

      expect(screen.getByText("Field is required")).toBeInTheDocument();
    });

    it("should pass first error to Textarea component", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Error 1", "Error 2"],
      });

      render(<ConformTextarea meta={metaWithErrors} />);

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
    });

    it("should render without errors when meta.errors is empty", () => {
      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).not.toHaveAttribute("aria-invalid");
    });

    it("should set aria-invalid when errors exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Field is required"],
      });

      render(<ConformTextarea meta={metaWithErrors} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("should prioritize error variant over passed variant", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Field is required"],
      });

      render(<ConformTextarea meta={metaWithErrors} variant="success" />);

      // Error message should be visible (confirming error variant is applied)
      expect(screen.getByText("Field is required")).toBeInTheDocument();
    });
  });

  describe("Control Integration", () => {
    it("should call control.change on textarea input", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "New text");

      expect(mockControl.change).toHaveBeenCalled();
    });

    it("should call control.blur on textarea blur", async () => {
      const user = userEvent.setup();
      mockControl.blur.mockClear();

      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      await user.click(textarea);
      await user.tab();

      expect(mockControl.blur).toHaveBeenCalled();
    });

    it("should call control.focus on textarea focus", async () => {
      const user = userEvent.setup();
      mockControl.focus.mockClear();

      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      await user.click(textarea);

      expect(mockControl.focus).toHaveBeenCalled();
    });

    it("should use control.value for textarea value", () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "Controlled value",
      });

      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("Controlled value");
    });
  });

  describe("Props Forwarding", () => {
    it("should forward additional props to Textarea component", () => {
      render(
        <ConformTextarea
          meta={mockMeta}
          placeholder="Enter text"
          disabled
          className="custom-class"
        />
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("placeholder", "Enter text");
      expect(textarea).toBeDisabled();
    });

    it("should pass label prop to Textarea component", () => {
      render(<ConformTextarea meta={mockMeta} label="Description" required />);

      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should forward maxLength prop", () => {
      render(<ConformTextarea meta={mockMeta} maxLength={100} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("maxlength", "100");
    });

    it("should forward showCharCount prop", () => {
      render(<ConformTextarea meta={mockMeta} showCharCount maxLength={100} />);

      // Character count should be visible
      expect(screen.getByText(/0\s*\/\s*100/)).toBeInTheDocument();
    });

    it("should forward rows prop", () => {
      render(<ConformTextarea meta={mockMeta} rows={5} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "5");
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-describedby from meta", () => {
      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute(
        "aria-describedby",
        "test-field-description"
      );
    });

    it("should set aria-invalid when errors exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      render(<ConformTextarea meta={metaWithErrors} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("should not set aria-invalid when no errors", () => {
      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).not.toHaveAttribute("aria-invalid");
    });
  });

  describe("Variant Handling", () => {
    it("should apply default variant when no errors", () => {
      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });

    it("should apply error variant when meta has errors", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Field is required"],
      });

      render(<ConformTextarea meta={metaWithErrors} />);

      expect(screen.getByText("Field is required")).toBeInTheDocument();
    });

    it("should apply passed variant when no errors", () => {
      render(<ConformTextarea meta={mockMeta} variant="success" />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined errors", () => {
      const metaNoErrors = createMockMeta({
        errors: undefined,
      });

      render(<ConformTextarea meta={metaNoErrors} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
      expect(textarea).not.toHaveAttribute("aria-invalid");
    });

    it("should handle empty string initialValue", () => {
      const metaEmpty = createMockMeta({
        initialValue: "",
      });

      render(<ConformTextarea meta={metaEmpty} />);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("");
    });

    it("should handle multiple errors and show first", () => {
      const metaMultipleErrors = createMockMeta({
        errors: ["Error 1", "Error 2", "Error 3"],
      });

      render(<ConformTextarea meta={metaMultipleErrors} />);

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Error 3")).not.toBeInTheDocument();
    });

    it("should handle long text content", () => {
      const longText = "A".repeat(500);
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: longText,
      });

      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe(longText);
    });
  });

  describe("Form Integration", () => {
    it("should set form attribute from meta.formId", () => {
      render(<ConformTextarea meta={mockMeta} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("form", "test-form");
    });

    it("should handle missing formId gracefully", () => {
      const metaNoForm = createMockMeta({
        formId: undefined,
      });

      render(<ConformTextarea meta={metaNoForm} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });
  });

  describe("Character Counter", () => {
    it("should show character count when showCharCount is true", () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "Test",
      });

      render(<ConformTextarea meta={mockMeta} showCharCount maxLength={100} />);

      expect(screen.getByText(/4\s*\/\s*100/)).toBeInTheDocument();
    });

    it("should update character count on input", async () => {
      const user = userEvent.setup();

      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "",
      });

      const { rerender } = render(
        <ConformTextarea meta={mockMeta} showCharCount maxLength={100} />
      );

      expect(screen.getByText(/0\s*\/\s*100/)).toBeInTheDocument();

      // Simulate value change
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "Hello",
      });

      rerender(
        <ConformTextarea meta={mockMeta} showCharCount maxLength={100} />
      );

      expect(screen.getByText(/5\s*\/\s*100/)).toBeInTheDocument();
    });
  });

  describe("Controlled Value", () => {
    it("should use control.value over initialValue", () => {
      const metaWithInitial = createMockMeta({
        initialValue: "Initial",
      });

      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "Controlled",
      });

      render(<ConformTextarea meta={metaWithInitial} />);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("Controlled");
    });

    it("should update when control.value changes", () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "First value",
      });

      const { rerender } = render(<ConformTextarea meta={mockMeta} />);

      let textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("First value");

      // Update control value
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "Second value",
      });

      rerender(<ConformTextarea meta={mockMeta} />);

      textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toBe("Second value");
    });
  });
});
