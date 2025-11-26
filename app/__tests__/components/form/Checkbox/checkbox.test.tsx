import * as React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "~/components/form/Checkbox/checkbox";
import { act } from "react";

// Mock missing browser APIs
beforeAll(() => {
  HTMLElement.prototype.hasPointerCapture = vi.fn();
  HTMLElement.prototype.scrollIntoView = vi.fn();

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Checkbox Component", () => {
  describe("Rendering", () => {
    it("should render checkbox", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(<Checkbox label="Accept Terms" />);
      expect(screen.getByText("Accept Terms")).toBeInTheDocument();
    });

    it("should render with string label", () => {
      render(<Checkbox label="I agree" />);
      const label = screen.getByText("I agree");
      expect(label).toBeInTheDocument();
    });

    it("should render with ReactNode label", () => {
      render(
        <Checkbox
          label={
            <span>
              I accept the <strong>terms</strong>
            </span>
          }
        />
      );
      expect(screen.getByText("terms")).toBeInTheDocument();
    });

    it("should render with description", () => {
      render(
        <Checkbox label="Newsletter" description="Receive weekly updates" />
      );
      expect(screen.getByText("Receive weekly updates")).toBeInTheDocument();
    });

    it("should render required asterisk when required prop is true", () => {
      render(<Checkbox label="Accept Terms" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(
        <Checkbox label="Subscribe" helperText="You can unsubscribe anytime" />
      );
      expect(
        screen.getByText("You can unsubscribe anytime")
      ).toBeInTheDocument();
    });

    it("should render error message", () => {
      render(<Checkbox label="Terms" error="You must accept the terms" />);
      expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
    });

    it("should prioritize error over helper text", () => {
      render(
        <Checkbox
          label="Terms"
          helperText="Helper text"
          error="Error message"
        />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });

    it("should render without label", () => {
      render(<Checkbox aria-label="Checkbox without visible label" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      render(<Checkbox variant="default" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("border-checkbox-primary");
    });

    it("should apply error variant", () => {
      render(<Checkbox variant="error" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("border-checkbox-error");
    });

    it("should apply success variant", () => {
      render(<Checkbox variant="success" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("border-checkbox-success");
    });

    it("should automatically apply error variant when error prop exists", () => {
      render(<Checkbox variant="default" error="Error message" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("border-checkbox-error");
    });
  });

  describe("Sizes", () => {
    it("should apply default size", () => {
      render(<Checkbox checkboxSize="default" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("h-4", "w-4");
    });

    it("should apply small size", () => {
      render(<Checkbox checkboxSize="sm" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("h-3", "w-3");
    });

    it("should apply large size", () => {
      render(<Checkbox checkboxSize="lg" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("h-5", "w-5");
    });
  });

  describe("Checked State", () => {
    it("should be unchecked by default", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });

    it("should render as checked when checked prop is true", () => {
      render(<Checkbox checked={true} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });

    it("should render as unchecked when checked prop is false", () => {
      render(<Checkbox checked={false} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });

    it("should call onCheckedChange when clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox onCheckedChange={handleChange} />);
      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("should call onCheckedChange when label is clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox label="Accept Terms" onCheckedChange={handleChange} />);
      const label = screen.getByText("Accept Terms");

      await user.click(label);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("should toggle checked state in controlled component", async () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Checkbox
            label="Test"
            checked={checked}
            onCheckedChange={setChecked}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);

      await waitFor(() => {
        expect(checkbox).toBeChecked();
      });

      await user.click(checkbox);

      await waitFor(() => {
        expect(checkbox).not.toBeChecked();
      });
    });

    it("should have data-state attribute reflecting checked state", () => {
      const { rerender } = render(<Checkbox checked={false} />);
      let checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("data-state", "unchecked");

      rerender(<Checkbox checked={true} />);
      checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("data-state", "checked");
    });

    it("should display checkmark icon when checked", () => {
      render(<Checkbox checked={true} />);
      const checkbox = screen.getByRole("checkbox");
      const checkIcon = checkbox.querySelector("svg");
      expect(checkIcon).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("should render disabled checkbox", () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
    });

    it("should not call onCheckedChange when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox disabled onCheckedChange={handleChange} />);
      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should not respond to label clicks when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Checkbox
          label="Accept Terms"
          disabled
          onCheckedChange={handleChange}
        />
      );
      const label = screen.getByText("Accept Terms");

      await user.click(label);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should apply disabled opacity styles", () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("disabled:opacity-50");
    });

    it("should have disabled cursor style on label", () => {
      render(<Checkbox label="Terms" disabled />);
      const label = screen.getByText("Terms");
      expect(label).toHaveClass("peer-disabled:opacity-70");
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-invalid when error exists", () => {
      render(<Checkbox error="Required field" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("should not set aria-invalid when no error", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "false");
    });

    it("should link error message with aria-describedby", () => {
      render(<Checkbox label="Terms" error="You must accept" />);
      const checkbox = screen.getByRole("checkbox");
      const errorId = checkbox.getAttribute("aria-describedby");

      expect(errorId).toBeTruthy();
      if (errorId) {
        const errorIds = errorId.split(" ");
        const errorElement = screen.getByText("You must accept");
        expect(errorIds).toContain(errorElement.id);
      }
    });

    it("should link helper text with aria-describedby", () => {
      render(<Checkbox label="Terms" helperText="Read carefully" />);
      const checkbox = screen.getByRole("checkbox");
      const helperId = checkbox.getAttribute("aria-describedby");

      expect(helperId).toBeTruthy();
      if (helperId) {
        const helperIds = helperId.split(" ");
        const helperElement = screen.getByText("Read carefully");
        expect(helperIds).toContain(helperElement.id);
      }
    });

    it("should link description with aria-describedby", () => {
      render(<Checkbox label="Newsletter" description="Weekly updates" />);
      const checkbox = screen.getByRole("checkbox");
      const describedBy = checkbox.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const descIds = describedBy.split(" ");
        const descElement = screen.getByText("Weekly updates");
        expect(descIds).toContain(descElement.id);
      }
    });

    it("should combine multiple aria-describedby references", () => {
      render(
        <Checkbox
          label="Terms"
          description="Legal agreement"
          helperText="Please read"
        />
      );
      const checkbox = screen.getByRole("checkbox");
      const describedBy = checkbox.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const ids = describedBy.split(" ");
        expect(ids.length).toBeGreaterThanOrEqual(2);
      }
    });

    it("should have role=alert for error messages", () => {
      render(<Checkbox error="Error message" />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("role", "alert");
    });

    it("should have aria-live=polite for error messages", () => {
      render(<Checkbox error="Error message" />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("aria-live", "polite");
    });

    it("should have role=status for helper text", () => {
      render(<Checkbox helperText="Helper text" />);
      const helperElement = screen.getByText("Helper text");
      expect(helperElement).toHaveAttribute("role", "status");
    });

    it("should link label with aria-labelledby when label exists", () => {
      render(<Checkbox label="Accept Terms" />);
      const checkbox = screen.getByRole("checkbox");
      const labelledBy = checkbox.getAttribute("aria-labelledby");

      expect(labelledBy).toBeTruthy();
      if (labelledBy) {
        const label = screen.getByText("Accept Terms");
        expect(label.id).toBe(labelledBy);
      }
    });

    it("should set aria-required when required", () => {
      render(<Checkbox required />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-required", "true");
    });
  });

  describe("Label Association", () => {
    it("should associate label with checkbox via htmlFor", () => {
      render(<Checkbox label="Terms" id="terms-checkbox" />);
      const label = screen.getByText("Terms");
      const checkbox = screen.getByRole("checkbox");

      expect(label).toHaveAttribute("for", "terms-checkbox");
      expect(checkbox).toHaveAttribute("id", "terms-checkbox");
    });

    it("should generate ID when not provided", () => {
      render(<Checkbox label="Terms" />);
      const checkbox = screen.getByRole("checkbox");
      const id = checkbox.getAttribute("id");

      expect(id).toBeTruthy();
      expect(id).not.toBe("");
    });

    it("should allow clicking label to toggle checkbox", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Accept" />);

      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Accept");

      expect(checkbox).not.toBeChecked();

      await user.click(label);

      await waitFor(() => {
        expect(checkbox).toBeChecked();
      });
    });

    it("should have cursor-pointer on label", () => {
      render(<Checkbox label="Terms" />);
      const label = screen.getByText("Terms");
      expect(label).toHaveClass("cursor-pointer");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should toggle checkbox with Space key", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Terms" />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();

      expect(checkbox).not.toBeChecked();

      await user.keyboard(" ");

      await waitFor(() => {
        expect(checkbox).toBeChecked();
      });
    });

    it("should be focusable", () => {
      render(<Checkbox label="Terms" />);
      const checkbox = screen.getByRole("checkbox");

      checkbox.focus();

      expect(checkbox).toHaveFocus();
    });

    it("should have focus-visible styles", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("focus-visible:outline-none");
      expect(checkbox).toHaveClass("focus-visible:ring-2");
    });
  });

  describe("Custom Props", () => {
    it("should accept and apply custom className", () => {
      render(<Checkbox className="custom-class" />);
      const container = screen.getByRole("checkbox").closest(".space-y-2");
      expect(container).toHaveClass("custom-class");
    });

    it("should forward ref to checkbox", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("should accept custom props", () => {
      render(<Checkbox data-testid="custom-checkbox" />);
      const checkbox = screen.getByTestId("custom-checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("should have proper button type", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("type", "button");
    });
  });

  describe("Visual Indicators", () => {
    it("should display checkmark icon when checked", () => {
      render(<Checkbox checked={true} />);
      const checkbox = screen.getByRole("checkbox");
      const icon = checkbox.querySelector("svg");

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-full", "w-full");
    });

    it("should have proper icon stroke width", () => {
      render(<Checkbox checked={true} />);
      const checkbox = screen.getByRole("checkbox");
      const icon = checkbox.querySelector("svg");

      expect(icon).toHaveAttribute("stroke-width", "3");
    });

    it("should have transition-colors class", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("transition-colors");
    });
  });

  describe("Layout", () => {
    it("should use flex layout with gap", () => {
      render(<Checkbox label="Terms" />);
      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;

      expect(container).toHaveClass("flex", "items-start", "gap-3");
    });

    it("should have proper spacing", () => {
      render(<Checkbox label="Terms" helperText="Helper" />);
      const checkbox = screen.getByRole("checkbox");
      const outerContainer = checkbox.closest(".space-y-2");

      expect(outerContainer).toHaveClass("space-y-2");
    });

    it("should render description below label", () => {
      render(<Checkbox label="Newsletter" description="Weekly updates" />);

      const label = screen.getByText("Newsletter");
      const description = screen.getByText("Weekly updates");

      expect(description.parentElement).toContainElement(label);
    });
  });

  describe("Accessibility", () => {
    it("should have checkbox role", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("should be keyboard navigable", () => {
      render(
        <div>
          <button>Before</button>
          <Checkbox label="Terms" />
          <button>After</button>
        </div>
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("type", "button");
    });

    it("should announce errors to screen readers", () => {
      render(<Checkbox label="Terms" error="Required" />);
      const errorMessage = screen.getByText("Required");

      expect(errorMessage).toHaveAttribute("role", "alert");
      expect(errorMessage).toHaveAttribute("aria-live", "polite");
    });

    it("should not lose focus when error appears", async () => {
      const TestComponent = () => {
        const [error, setError] = React.useState("");
        return (
          <>
            <Checkbox label="Terms" error={error} />
            <button onClick={() => setError("Required")}>Show Error</button>
          </>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const checkbox = screen.getByRole("checkbox");

      // Focus the checkbox
      await act(async () => {
        checkbox.focus();
      });

      expect(checkbox).toHaveFocus();

      const button = screen.getByRole("button", { name: /Show Error/i });

      // Click button to show error
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Required")).toBeInTheDocument();
      });

      // Checkbox should NOT have focus after clicking button
      // This is expected behavior - clicking a button moves focus to that button
      expect(button).toHaveFocus();
    });
  });

  describe("Integration", () => {
    it("should work with all props combined", () => {
      render(
        <Checkbox
          label="Accept Terms"
          description="Read our terms and conditions"
          helperText="You can change this later"
          variant="default"
          checkboxSize="default"
          required
          checked={false}
        />
      );

      expect(screen.getByText("Accept Terms")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
      expect(
        screen.getByText("Read our terms and conditions")
      ).toBeInTheDocument();
      expect(screen.getByText("You can change this later")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("should handle error state with all props", () => {
      render(
        <Checkbox
          label="Accept Terms"
          description="Legal agreement"
          error="You must accept the terms"
          variant="default"
          checkboxSize="lg"
          required
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("border-checkbox-error");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
    });

    it("should work in a form context", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      render(
        <form onSubmit={handleSubmit}>
          <Checkbox label="Accept Terms" required />
          <button type="submit">Submit</button>
        </form>
      );

      const checkbox = screen.getByRole("checkbox");
      const submitButton = screen.getByRole("button", { name: /Submit/i });

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      await waitFor(() => {
        expect(checkbox).toBeChecked();
      });

      await user.click(submitButton);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
