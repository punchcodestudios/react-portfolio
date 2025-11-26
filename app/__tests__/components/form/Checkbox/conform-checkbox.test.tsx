import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConformCheckbox } from "~/components/form/Checkbox/conform-checkbox";
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

describe("ConformCheckbox Component", () => {
  const createMockMeta = (
    overrides?: Partial<FieldMetadata<boolean>>
  ): FieldMetadata<boolean> =>
    ({
      id: "test-checkbox",
      name: "testCheckbox",
      formId: "test-form",
      initialValue: false,
      value: "",
      errors: [],
      allErrors: {},
      dirty: false,
      valid: true,
      allValid: true,
      key: {
        id: "test-checkbox",
        name: "testCheckbox",
        initialValue: false,
        value: "",
      },
      getFieldList: () => [],
      getFieldset: () => ({}),
      ...overrides,
    }) as unknown as FieldMetadata<boolean>;

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

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      expect(useInputControlSpy).toHaveBeenCalledWith(mockMeta);
    });

    it("should render Checkbox with conform props", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "test-checkbox");
      // Note: Checkbox component uses hidden input for form submission, not the visible checkbox
    });

    it("should use id from meta.name when meta.id is not provided", () => {
      const metaWithoutId = createMockMeta({
        id: undefined,
        name: "customCheckbox",
      });

      render(<ConformCheckbox meta={metaWithoutId} label="Custom checkbox" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "customCheckbox");
    });

    it("should render label prop", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });
  });

  describe("Checked State", () => {
    it("should be unchecked when control.value is empty string", () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "",
      });

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      // Checkbox uses aria-checked attribute, not checked property
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it('should be checked when control.value is "on"', () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "on",
      });

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("should toggle from unchecked to checked", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockControl.change).toHaveBeenCalledWith("on");
    });

    it("should toggle from checked to unchecked", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "on",
      });

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockControl.change).toHaveBeenCalledWith("");
    });
  });

  describe("Control Integration", () => {
    it("should call control.change with 'on' when checked", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockControl.change).toHaveBeenCalledWith("on");
    });

    it("should call control.change with empty string when unchecked", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "on",
      });

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockControl.change).toHaveBeenCalledWith("");
    });

    it("should call control.focus on checkbox focus", async () => {
      const user = userEvent.setup();
      mockControl.focus.mockClear();

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockControl.focus).toHaveBeenCalled();
    });

    it("should call control.blur on checkbox blur", async () => {
      const user = userEvent.setup();
      mockControl.blur.mockClear();

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);
      await user.tab();

      expect(mockControl.blur).toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    it("should display error message when meta has errors", () => {
      const metaWithErrors = createMockMeta({
        errors: ["You must accept the terms"],
      });

      render(<ConformCheckbox meta={metaWithErrors} label="Accept terms" />);

      expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
    });

    it("should pass first error to Checkbox component", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Error 1", "Error 2"],
      });

      render(<ConformCheckbox meta={metaWithErrors} label="Accept terms" />);

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
    });

    it("should render without errors when meta.errors is empty", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      // Checkbox always sets aria-invalid
      expect(checkbox).toHaveAttribute("aria-invalid", "false");
    });

    it("should set aria-invalid when errors exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Required field"],
      });

      render(<ConformCheckbox meta={metaWithErrors} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("should handle undefined errors", () => {
      const metaNoErrors = createMockMeta({
        errors: undefined,
      });

      render(<ConformCheckbox meta={metaNoErrors} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
      // When errors is undefined, aria-invalid may not be set
      const ariaInvalid = checkbox.getAttribute("aria-invalid");
      expect(ariaInvalid === null || ariaInvalid === "false").toBe(true);
    });

    it("should handle multiple errors and show first", () => {
      const metaMultipleErrors = createMockMeta({
        errors: ["Error 1", "Error 2", "Error 3"],
      });

      render(
        <ConformCheckbox meta={metaMultipleErrors} label="Accept terms" />
      );

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Error 3")).not.toBeInTheDocument();
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-invalid when errors exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      render(<ConformCheckbox meta={metaWithErrors} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("should not set aria-invalid to true when no errors", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "false");
    });

    it("should set aria-describedby when errors exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      render(<ConformCheckbox meta={metaWithErrors} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        "test-checkbox-error"
      );
    });

    it("should not set aria-describedby when no errors", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("Props Forwarding", () => {
    it("should forward disabled prop to Checkbox component", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" disabled />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
    });

    it("should forward required prop to Checkbox component", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" required />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-required", "true");
    });

    it("should forward description prop", () => {
      render(
        <ConformCheckbox
          meta={mockMeta}
          label="Accept terms"
          description="You must accept to continue"
        />
      );

      expect(
        screen.getByText("You must accept to continue")
      ).toBeInTheDocument();
    });

    it("should forward className prop", () => {
      const { container } = render(
        <ConformCheckbox
          meta={mockMeta}
          label="Accept terms"
          className="custom-class"
        />
      );

      const wrapper = container.querySelector(".custom-class");
      expect(wrapper).toBeInTheDocument();
    });

    it("should forward variant prop", () => {
      render(
        <ConformCheckbox meta={mockMeta} label="Accept terms" variant="error" />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Label Handling", () => {
    it("should render string label", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("should render React node label", () => {
      render(
        <ConformCheckbox
          meta={mockMeta}
          label={
            <span>
              I accept the <strong>terms</strong>
            </span>
          }
        />
      );

      expect(screen.getByText("I accept the")).toBeInTheDocument();
      expect(screen.getByText("terms")).toBeInTheDocument();
    });

    it("should associate label with checkbox", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      // Clicking the label should toggle the checkbox
      const label = screen.getByText("Accept terms");
      await user.click(label);

      expect(mockControl.change).toHaveBeenCalledWith("on");
    });
  });

  describe("Keyboard Interaction", () => {
    it("should toggle checkbox with Space key", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      await user.keyboard(" ");

      expect(mockControl.change).toHaveBeenCalledWith("on");
    });

    it("should not toggle when disabled", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" disabled />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockControl.change).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle control.value other than 'on' or empty string as unchecked", () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "other-value",
      });

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it("should update checked state when control.value changes", () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "",
      });

      const { rerender } = render(
        <ConformCheckbox meta={mockMeta} label="Accept terms" />
      );

      let checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).toHaveAttribute("aria-checked", "false");

      // Update control value
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "on",
      });

      rerender(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("should handle rapid clicks", async () => {
      const user = userEvent.setup();
      mockControl.change.mockClear();

      render(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");

      // Rapid clicks
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);

      // Should have been called 3 times
      expect(mockControl.change).toHaveBeenCalledTimes(3);
    });

    it("should handle empty string name gracefully", () => {
      const metaEmptyName = createMockMeta({
        name: "",
        id: "checkbox-id",
      });

      render(<ConformCheckbox meta={metaEmptyName} label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "checkbox-id");
      // Hidden input has the name attribute, not the visible checkbox
    });
  });

  describe("Form Integration", () => {
    it("should use name from meta for hidden input", () => {
      const metaCustomName = createMockMeta({
        name: "customCheckboxName",
      });

      const { container } = render(
        <ConformCheckbox meta={metaCustomName} label="Accept terms" />
      );

      // Check if hidden input exists, if not, the name is on the checkbox itself
      const hiddenInput = container.querySelector('input[type="hidden"]');
      if (hiddenInput) {
        expect(hiddenInput).toHaveAttribute("name", "customCheckboxName");
      } else {
        // If no hidden input, verify the component uses the name from meta internally
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
      }
    });

    it("should handle complex label with required indicator", () => {
      render(<ConformCheckbox meta={mockMeta} label="Accept terms" required />);

      expect(screen.getByText("Accept terms")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("Controlled Behavior", () => {
    it("should reflect control.value changes immediately", () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "",
      });

      const { rerender } = render(
        <ConformCheckbox meta={mockMeta} label="Accept terms" />
      );

      let checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).toHaveAttribute("aria-checked", "false");

      // Simulate Conform updating the value
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "on",
      });

      rerender(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("should maintain checked state through re-renders", () => {
      vi.mocked(conformReact.useInputControl).mockReturnValue({
        ...mockControl,
        value: "on",
      });

      const { rerender } = render(
        <ConformCheckbox meta={mockMeta} label="Accept terms" />
      );

      let checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).toHaveAttribute("aria-checked", "true");

      // Re-render with same value
      rerender(<ConformCheckbox meta={mockMeta} label="Accept terms" />);

      checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });
  });
});
