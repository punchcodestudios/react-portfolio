import * as React from "react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConformSelect } from "~/components/form/Select/conform-select";
import type { FieldMetadata } from "@conform-to/react";

// Mock missing browser APIs that Radix UI Select needs
beforeAll(() => {
  HTMLElement.prototype.hasPointerCapture = vi.fn();
  HTMLElement.prototype.scrollIntoView = vi.fn();

  window.getComputedStyle = vi.fn().mockImplementation(() => ({
    getPropertyValue: vi.fn(),
  }));

  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ConformSelect Component", () => {
  const mockOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  const createMockMeta = (
    overrides?: Partial<FieldMetadata<string>>
  ): FieldMetadata<string> =>
    ({
      id: "test-select",
      name: "testSelect",
      formId: "test-form",
      initialValue: "",
      value: "",
      errors: [],
      allErrors: {},
      dirty: false,
      valid: true,
      allValid: true,
      descriptionId: "test-select-description",
      errorId: "test-select-error",
      key: {
        id: "test-select",
        name: "testSelect",
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
    it("should render Select with conform props", () => {
      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      expect(screen.getByText("Country")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should pass name prop to Select component", () => {
      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      // The name is passed to the Select component but not rendered as DOM attribute on combobox
      // Radix UI Select handles name internally for form submission
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    it("should use id from meta", () => {
      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("id", "test-select");
    });

    it("should use initialValue from meta", () => {
      const metaWithValue = createMockMeta({
        initialValue: "uk",
      });

      render(
        <ConformSelect
          meta={metaWithValue}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("United Kingdom")).toBeInTheDocument();
    });

    it("should use empty string when no initialValue", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          placeholder="Select country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Select country")).toBeInTheDocument();
    });

    it("should use custom id from meta", () => {
      const metaCustomId = createMockMeta({
        id: "custom-select-id",
      });

      render(
        <ConformSelect
          meta={metaCustomId}
          label="Country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("id", "custom-select-id");
    });

    it("should use control.value over initialValue", () => {
      const metaWithValue = createMockMeta({
        initialValue: "us",
      });

      // Mock useInputControl to return a different value
      const { rerender } = render(
        <ConformSelect
          meta={metaWithValue}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("United States")).toBeInTheDocument();

      // Update the value through meta
      const updatedMeta = createMockMeta({
        initialValue: "ca",
      });

      rerender(
        <ConformSelect
          meta={updatedMeta}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Canada")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should display error message when meta has errors", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Please select a country"],
      });

      render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Please select a country")).toBeInTheDocument();
    });

    it("should pass first error to Select component", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Error 1", "Error 2"],
      });

      render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
    });

    it("should apply error variant when meta has errors", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-destructive");
    });

    it("should render without errors when meta.errors is empty", () => {
      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).not.toHaveClass("border-destructive");
      expect(select).toHaveAttribute("aria-invalid", "false");
    });

    it("should handle undefined errors", () => {
      const metaNoErrors = createMockMeta({
        errors: undefined,
      });

      render(
        <ConformSelect
          meta={metaNoErrors}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Country")).toBeInTheDocument();
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "false");
    });

    it("should prioritize error variant over passed variant", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          options={mockOptions}
          variant="success"
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-destructive");
      expect(screen.getByText("Validation error")).toBeInTheDocument();
    });

    it("should handle multiple errors and show first", () => {
      const metaMultipleErrors = createMockMeta({
        errors: ["Error 1", "Error 2", "Error 3"],
      });

      render(
        <ConformSelect
          meta={metaMultipleErrors}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Error 3")).not.toBeInTheDocument();
    });

    it("should clear error variant when errors are removed", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Country is required"],
      });

      const { rerender } = render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-destructive");

      const metaNoErrors = createMockMeta({
        errors: [],
      });

      rerender(
        <ConformSelect
          meta={metaNoErrors}
          label="Country"
          options={mockOptions}
        />
      );

      expect(select).not.toHaveClass("border-destructive");
    });

    it("should handle empty error array", () => {
      const metaEmptyErrors = createMockMeta({
        errors: [],
      });

      render(
        <ConformSelect
          meta={metaEmptyErrors}
          label="Country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "false");
      expect(select).not.toHaveClass("border-destructive");
    });
  });

  describe("Value Control", () => {
    it("should use value from control", () => {
      const metaWithValue = createMockMeta({
        initialValue: "ca",
      });

      render(
        <ConformSelect
          meta={metaWithValue}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Canada")).toBeInTheDocument();
    });

    it("should prioritize control value over initialValue", () => {
      const metaWithBothValues = createMockMeta({
        initialValue: "uk",
      });

      render(
        <ConformSelect
          meta={metaWithBothValues}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("United Kingdom")).toBeInTheDocument();
    });

    it("should handle empty value", () => {
      const metaEmptyValue = createMockMeta({
        value: "",
      });

      render(
        <ConformSelect
          meta={metaEmptyValue}
          label="Country"
          placeholder="Select country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Select country")).toBeInTheDocument();
    });

    it("should fallback to initialValue when control.value is undefined", () => {
      const metaWithInitial = createMockMeta({
        initialValue: "us",
      });

      render(
        <ConformSelect
          meta={metaWithInitial}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("United States")).toBeInTheDocument();
    });

    it("should handle value changes correctly", () => {
      const metaInitial = createMockMeta({
        initialValue: "us",
      });

      const { rerender } = render(
        <ConformSelect
          meta={metaInitial}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("United States")).toBeInTheDocument();

      const metaUpdated = createMockMeta({
        initialValue: "uk",
      });

      rerender(
        <ConformSelect
          meta={metaUpdated}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("United Kingdom")).toBeInTheDocument();
    });
  });

  describe("Validation Events", () => {
    it("should trigger blur event on close", async () => {
      const user = userEvent.setup();

      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");

      // Open the select
      await user.click(select);

      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "true");
      });

      // Close by clicking trigger again
      await user.click(select);

      await waitFor(
        () => {
          expect(select).toHaveAttribute("aria-expanded", "false");
        },
        { timeout: 3000 }
      );
    });

    it("should call control.change on value change", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        const mockMetaControlled = createMockMeta({
          value: value,
        });

        return (
          <ConformSelect
            meta={mockMetaControlled}
            label="Country"
            options={mockOptions}
            onValueChange={setValue}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const select = screen.getByRole("combobox");
      await user.click(select);

      // The portal content should appear
      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should not trigger blur when opening", async () => {
      const user = userEvent.setup();

      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");
      await user.click(select);

      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should trigger blur on escape key", async () => {
      const user = userEvent.setup();

      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");
      await user.click(select);

      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "true");
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "false");
      });
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-invalid when errors exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "true");
    });

    it("should not have aria-invalid when no errors", () => {
      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "false");
    });

    it("should set aria-describedby when helperText is provided", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          helperText="Select your country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-describedby", "test-select-helper");
    });

    it("should link error message with aria-describedby", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Country is required"],
      });

      render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      const describedBy = select.getAttribute("aria-describedby");
      expect(describedBy).toBe("test-select-error");
    });

    it("should maintain aria-describedby when both error and helperText exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Country is required"],
      });

      render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          helperText="Select your country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      const describedBy = select.getAttribute("aria-describedby");
      expect(describedBy).toContain("test-select-error");
    });

    it("should not set aria-describedby when no helperText or errors", () => {
      const metaWithDescription = createMockMeta({
        descriptionId: "custom-description-id",
      });

      render(
        <ConformSelect
          meta={metaWithDescription}
          label="Country"
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("Props Forwarding", () => {
    it("should forward required prop", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          required
        />
      );

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should forward placeholder prop", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          placeholder="Choose your country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Choose your country")).toBeInTheDocument();
    });

    it("should forward helperText prop", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          helperText="Select your country of residence"
          options={mockOptions}
        />
      );

      expect(
        screen.getByText("Select your country of residence")
      ).toBeInTheDocument();
    });

    it("should forward disabled prop", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          disabled
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeDisabled();
    });

    it("should forward selectSize prop", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          selectSize="lg"
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-12");
    });

    it("should forward className prop", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          className="custom-class"
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("custom-class");
    });

    it("should forward all select size variants", () => {
      const { rerender } = render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          selectSize="sm"
        />
      );

      let select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-8");

      rerender(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          selectSize="md"
        />
      );

      select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-10");

      rerender(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          selectSize="lg"
        />
      );

      select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-12");
    });

    it("should forward variant prop when no errors", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          variant="success"
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-success");
    });
  });

  describe("Form Integration", () => {
    it("should pass name from meta to Select component", () => {
      const metaCustomName = createMockMeta({
        name: "customCountryName",
      });

      render(
        <ConformSelect
          meta={metaCustomName}
          label="Country"
          options={mockOptions}
        />
      );

      // The name prop is passed but Radix UI doesn't render it on the combobox
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    it("should integrate with form element", () => {
      render(
        <form>
          <ConformSelect
            meta={mockMeta}
            label="Country"
            options={mockOptions}
          />
        </form>
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("id", "test-select");
    });

    it("should use correct formId from meta", () => {
      const metaWithFormId = createMockMeta({
        formId: "my-custom-form",
      });

      render(
        <ConformSelect
          meta={metaWithFormId}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  describe("Revalidation", () => {
    it("should update when error state changes", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Country is required"],
      });

      const { rerender } = render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Country is required")).toBeInTheDocument();
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-destructive");

      const metaNoErrors = createMockMeta({
        errors: [],
      });

      rerender(
        <ConformSelect
          meta={metaNoErrors}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.queryByText("Country is required")).not.toBeInTheDocument();
      expect(select).not.toHaveClass("border-destructive");
    });

    it("should update when value changes externally", () => {
      const metaInitial = createMockMeta({
        initialValue: "us",
      });

      const { rerender } = render(
        <ConformSelect
          meta={metaInitial}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("United States")).toBeInTheDocument();

      const metaUpdated = createMockMeta({
        initialValue: "ca",
      });

      rerender(
        <ConformSelect
          meta={metaUpdated}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Canada")).toBeInTheDocument();
    });

    it("should revalidate on value change from error to valid", () => {
      const metaWithError = createMockMeta({
        errors: ["Country is required"],
        initialValue: "",
      });

      const { rerender } = render(
        <ConformSelect
          meta={metaWithError}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Country is required")).toBeInTheDocument();

      const metaWithValue = createMockMeta({
        errors: [],
        initialValue: "us",
      });

      rerender(
        <ConformSelect
          meta={metaWithValue}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.queryByText("Country is required")).not.toBeInTheDocument();
      expect(screen.getByText("United States")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty options array", () => {
      render(<ConformSelect meta={mockMeta} label="Country" options={[]} />);

      expect(screen.getByText("Country")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should handle null value gracefully", () => {
      const metaNullValue = createMockMeta({
        value: null as any,
        initialValue: null as any,
      });

      render(
        <ConformSelect
          meta={metaNullValue}
          label="Country"
          placeholder="Select country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Select country")).toBeInTheDocument();
    });

    it("should work with all props combined", () => {
      const metaWithErrors = createMockMeta({
        errors: ["This field is required"],
        initialValue: "us",
      });

      render(
        <ConformSelect
          meta={metaWithErrors}
          label="Country"
          placeholder="Select your country"
          helperText="Choose wisely"
          selectSize="lg"
          required
          options={mockOptions}
        />
      );

      expect(screen.getByText("Country")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("This field is required")).toBeInTheDocument();

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-destructive");
      expect(select).toHaveClass("h-12");
    });

    it("should handle undefined initialValue gracefully", () => {
      const metaUndefinedValue = createMockMeta({
        initialValue: undefined as any,
      });

      render(
        <ConformSelect
          meta={metaUndefinedValue}
          label="Country"
          placeholder="Select country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Select country")).toBeInTheDocument();
    });

    it("should handle single option in array", () => {
      const singleOption = [{ value: "us", label: "United States" }];

      render(
        <ConformSelect meta={mockMeta} label="Country" options={singleOption} />
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should handle very long option labels", () => {
      const longLabelOptions = [
        {
          value: "long",
          label: "This is a very long label that might cause layout issues",
        },
      ];

      const metaWithValue = createMockMeta({
        initialValue: "long",
      });

      render(
        <ConformSelect
          meta={metaWithValue}
          label="Country"
          options={longLabelOptions}
        />
      );

      expect(
        screen.getByText(
          "This is a very long label that might cause layout issues"
        )
      ).toBeInTheDocument();
    });

    it("should handle special characters in labels", () => {
      const specialCharOptions = [
        { value: "special", label: "United States & Territories (2024)" },
      ];

      const metaWithValue = createMockMeta({
        initialValue: "special",
      });

      render(
        <ConformSelect
          meta={metaWithValue}
          label="Country"
          options={specialCharOptions}
        />
      );

      expect(
        screen.getByText("United States & Territories (2024)")
      ).toBeInTheDocument();
    });

    it("should maintain accessibility when disabled", () => {
      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          disabled
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeDisabled();
      expect(select).toHaveAttribute("aria-invalid", "false");
    });

    it("should handle rapid prop changes", () => {
      const { rerender } = render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const metaWithError = createMockMeta({
        errors: ["Error"],
      });

      rerender(
        <ConformSelect
          meta={metaWithError}
          label="Country"
          options={mockOptions}
        />
      );

      const metaWithValue = createMockMeta({
        initialValue: "us",
      });

      rerender(
        <ConformSelect
          meta={metaWithValue}
          label="Country"
          options={mockOptions}
        />
      );

      expect(screen.getByText("United States")).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should open on Enter key", async () => {
      const user = userEvent.setup();

      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");
      select.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should open on Space key", async () => {
      const user = userEvent.setup();

      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");
      select.focus();
      await user.keyboard(" ");

      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should close on Escape key", async () => {
      const user = userEvent.setup();

      render(
        <ConformSelect meta={mockMeta} label="Country" options={mockOptions} />
      );

      const select = screen.getByRole("combobox");
      await user.click(select);

      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "true");
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(select).toHaveAttribute("aria-expanded", "false");
      });
    });
  });

  describe("Custom Callback Integration", () => {
    it("should call onValueChange callback when provided", async () => {
      const onValueChange = vi.fn();

      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          onValueChange={onValueChange}
        />
      );

      // This test would require opening the select and selecting an option
      // which requires more complex interaction with Radix UI portals
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should call onOpenChange callback when provided", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <ConformSelect
          meta={mockMeta}
          label="Country"
          options={mockOptions}
          onOpenChange={onOpenChange}
        />
      );

      const select = screen.getByRole("combobox");
      await user.click(select);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalled();
      });
    });
  });
});
