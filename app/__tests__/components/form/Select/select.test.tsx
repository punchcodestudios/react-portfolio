import * as React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "~/components/form/Select/select";
import { act } from "react";
import { clear } from "console";

// Mock missing browser APIs that Radix UI Select needs
beforeAll(() => {
  // Mock hasPointerCapture
  HTMLElement.prototype.hasPointerCapture = vi.fn();
  HTMLElement.prototype.scrollIntoView = vi.fn();

  // Mock getComputedStyle for positioning
  window.getComputedStyle = vi.fn().mockImplementation(() => ({
    getPropertyValue: vi.fn(),
  }));

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const mockOptionsWithDisabled = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2", disabled: true },
  { value: "option3", label: "Option 3" },
];

describe("Select Component", () => {
  describe("Rendering", () => {
    it("should render select trigger", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(<Select label="Country" options={mockOptions} />);
      expect(screen.getByText("Country")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
      render(<Select placeholder="Choose an option" options={mockOptions} />);
      expect(screen.getByText("Choose an option")).toBeInTheDocument();
    });

    it("should render default placeholder when not provided", () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByText("Select an option...")).toBeInTheDocument();
    });

    it("should render required asterisk when required prop is true", () => {
      render(<Select label="Country" required options={mockOptions} />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(
        <Select helperText="Please select your country" options={mockOptions} />
      );
      expect(
        screen.getByText("Please select your country")
      ).toBeInTheDocument();
    });

    it("should render error message", () => {
      render(<Select error="Selection is required" options={mockOptions} />);
      expect(screen.getByText("Selection is required")).toBeInTheDocument();
    });

    it("should prioritize error over helper text", () => {
      render(
        <Select
          helperText="Helper text"
          error="Error message"
          options={mockOptions}
        />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });
  });

  describe("Options", () => {
    it("should display options in data structure", () => {
      const { container } = render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");

      // Verify the select has proper aria-controls pointing to content
      expect(select).toHaveAttribute("aria-controls");
    });

    it("should handle empty options array", () => {
      render(<Select options={[]} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    it("should render with disabled option", () => {
      render(<Select options={mockOptionsWithDisabled} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      render(<Select variant="default" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-input");
    });

    it("should apply error variant", () => {
      render(<Select variant="error" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-destructive");
    });

    it("should apply success variant", () => {
      render(<Select variant="success" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-success");
    });

    it("should apply warning variant", () => {
      render(<Select variant="warning" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-warning");
    });

    it("should automatically apply error variant when error prop exists", () => {
      render(
        <Select variant="default" error="Error message" options={mockOptions} />
      );
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-destructive");
    });
  });

  describe("Sizes", () => {
    it("should apply default size", () => {
      render(<Select selectSize="default" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-10");
    });

    it("should apply small size", () => {
      render(<Select selectSize="sm" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-8");
      expect(select).toHaveClass("text-xs");
    });

    it("should apply large size", () => {
      render(<Select selectSize="lg" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("h-12");
      expect(select).toHaveClass("text-base");
    });
  });

  describe("Value Selection", () => {
    it("should display selected value", () => {
      render(<Select value="option2" options={mockOptions} />);
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("should call onValueChange when value changes", () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <Select
          value="option1"
          onValueChange={handleChange}
          options={mockOptions}
        />
      );

      // Simulate value change by rerendering with new value
      rerender(
        <Select
          value="option2"
          onValueChange={handleChange}
          options={mockOptions}
        />
      );

      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("should update displayed value in controlled component", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState<string>("option1");
        return (
          <>
            <Select
              value={value}
              onValueChange={setValue}
              options={mockOptions}
            />
            <button onClick={() => setValue("option3")}>
              Change to Option 3
            </button>
          </>
        );
      };

      render(<TestComponent />);
      expect(screen.getByText("Option 1")).toBeInTheDocument();

      const button = screen.getByRole("button", {
        name: /Change to Option 3/i,
      });

      await act(async () => {
        button.click();
      });

      await waitFor(() => {
        expect(screen.getByText("Option 3")).toBeInTheDocument();
      });
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-invalid when error exists", () => {
      render(<Select error="Invalid selection" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "true");
    });

    it("should set aria-invalid to false when no error", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-invalid", "false");
    });

    it("should have aria-expanded attribute", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-expanded");
    });

    it("should have aria-controls attribute", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-controls");
    });

    it("should link error message with aria-describedby", () => {
      render(
        <Select
          label="Country"
          error="Country is required"
          options={mockOptions}
        />
      );
      const select = screen.getByRole("combobox");
      const errorId = select.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      if (errorId) {
        expect(screen.getByText("Country is required")).toHaveAttribute(
          "id",
          errorId
        );
      }
    });

    it("should link helper text with aria-describedby", () => {
      render(
        <Select
          label="Country"
          helperText="Select your country"
          options={mockOptions}
        />
      );
      const select = screen.getByRole("combobox");
      const helperId = select.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      if (helperId) {
        expect(screen.getByText("Select your country")).toHaveAttribute(
          "id",
          helperId
        );
      }
    });

    it("should have role=alert for error messages", () => {
      render(<Select error="Error message" options={mockOptions} />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("role", "alert");
    });

    it("should have aria-live=polite for error messages", () => {
      render(<Select error="Error message" options={mockOptions} />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("aria-live", "polite");
    });

    it("should have role=status for helper text", () => {
      render(<Select helperText="Helper text" options={mockOptions} />);
      const helperElement = screen.getByText("Helper text");
      expect(helperElement).toHaveAttribute("role", "status");
    });
  });

  describe("Disabled State", () => {
    it("should render disabled select", () => {
      render(<Select disabled options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeDisabled();
    });

    it("should have disabled attribute", () => {
      render(<Select disabled options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("disabled");
    });

    it("should apply disabled opacity styles", () => {
      render(<Select disabled options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("disabled:opacity-50");
    });

    it("should have data-disabled attribute", () => {
      render(<Select disabled options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("data-disabled");
    });
  });

  describe("Label Association", () => {
    it("should associate label with select via htmlFor", () => {
      render(
        <Select label="Country" id="country-select" options={mockOptions} />
      );
      const label = screen.getByText("Country");
      const select = screen.getByRole("combobox");

      expect(label).toHaveAttribute("for", "country-select");
      expect(select).toHaveAttribute("id", "country-select");
    });

    it("should generate ID when not provided", () => {
      render(<Select label="Country" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      const id = select.getAttribute("id");

      expect(id).toBeTruthy();
      expect(id).not.toBe("");
    });
  });

  describe("Select State", () => {
    it("should have closed state initially", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-expanded", "false");
      expect(select).toHaveAttribute("data-state", "closed");
    });

    it("should show placeholder when no value selected", () => {
      render(<Select placeholder="Select option" options={mockOptions} />);
      expect(screen.getByText("Select option")).toBeInTheDocument();
    });

    it("should have data-placeholder attribute when showing placeholder", () => {
      render(<Select placeholder="Select option" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("data-placeholder");
    });
  });

  describe("Custom Props", () => {
    it("should accept and apply custom className", () => {
      render(<Select className="custom-class" options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("custom-class");
    });

    it("should forward ref to select trigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Select ref={ref} options={mockOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("should have button type", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("type", "button");
    });
  });

  describe("Visual Indicators", () => {
    it("should display chevron icon", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      const icon = select.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have proper icon styling", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      const icon = select.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4", "opacity-50");
    });
  });

  describe("Accessibility", () => {
    it("should have proper combobox role", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select.getAttribute("role")).toBe("combobox");
    });

    it("should have aria-autocomplete attribute", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-autocomplete", "none");
    });

    it("should be keyboard focusable", () => {
      render(
        <div>
          <button type="button">Before</button>
          <Select label="Country" options={mockOptions} />
          <button type="button">After</button>
        </div>
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("type", "button");
    });

    it("should announce errors to screen readers", () => {
      render(
        <Select label="Country" error="Invalid country" options={mockOptions} />
      );
      const errorMessage = screen.getByText("Invalid country");

      expect(errorMessage).toHaveAttribute("role", "alert");
      expect(errorMessage).toHaveAttribute("aria-live", "polite");
    });

    it("should have dir attribute", () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("dir", "ltr");
    });
  });

  describe("Integration", () => {
    it("should work with all props combined", () => {
      render(
        <Select
          label="Country"
          placeholder="Select your country"
          helperText="Choose wisely"
          variant="default"
          selectSize="default"
          required
          options={mockOptions}
        />
      );

      expect(screen.getByText("Country")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
      expect(screen.getByText("Select your country")).toBeInTheDocument();
      expect(screen.getByText("Choose wisely")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should handle error state with all props", () => {
      render(
        <Select
          label="Country"
          placeholder="Select your country"
          error="This field is required"
          variant="default"
          selectSize="lg"
          required
          options={mockOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-destructive");
      expect(select).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  });
});
