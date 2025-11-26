import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "~/components/form/Input/input";

describe("Input Component", () => {
  describe("Rendering", () => {
    it("should render input element", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(<Input label="Email Address" />);
      expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
      render(<Input placeholder="Enter your email" />);
      expect(
        screen.getByPlaceholderText("Enter your email")
      ).toBeInTheDocument();
    });

    it("should render required asterisk when required prop is true", () => {
      render(<Input label="Email" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(<Input helperText="We'll never share your email" />);
      expect(
        screen.getByText("We'll never share your email")
      ).toBeInTheDocument();
    });

    it("should render error message", () => {
      render(<Input error="Email is required" />);
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });

    it("should prioritize error over helper text", () => {
      render(<Input helperText="Helper text" error="Error message" />);
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      render(<Input variant="default" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-input");
    });

    it("should apply error variant", () => {
      render(<Input variant="error" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-destructive");
    });

    it("should apply success variant", () => {
      render(<Input variant="success" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-success");
    });

    it("should apply warning variant", () => {
      render(<Input variant="warning" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-warning");
    });

    it("should automatically apply error variant when error prop exists", () => {
      render(<Input variant="default" error="Error message" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-destructive");
    });
  });

  describe("Sizes", () => {
    it("should apply default size", () => {
      render(<Input inputSize="default" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-10");
    });

    it("should apply small size", () => {
      render(<Input inputSize="sm" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-8");
      expect(input).toHaveClass("text-xs");
    });

    it("should apply large size", () => {
      render(<Input inputSize="lg" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-12");
      expect(input).toHaveClass("text-base");
    });
  });

  describe("Input Types", () => {
    it("should render text input by default", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      // HTML5 inputs without explicit type attribute default to "text"
      // but may not have the attribute in the DOM
      expect(input.tagName).toBe("INPUT");
    });

    it("should render email input", () => {
      render(<Input type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("should render password input", () => {
      render(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it("should render tel input", () => {
      render(<Input type="tel" />);
      const input = document.querySelector('input[type="tel"]');
      expect(input).toBeInTheDocument();
    });

    it("should render url input", () => {
      render(<Input type="url" />);
      const input = document.querySelector('input[type="url"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe("Autocomplete", () => {
    it("should auto-set email autocomplete for email type", () => {
      render(<Input type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("autocomplete", "email");
    });

    it("should auto-set tel autocomplete for tel type", () => {
      render(<Input type="tel" />);
      const input = document.querySelector('input[type="tel"]');
      expect(input).toHaveAttribute("autocomplete", "tel");
    });

    it("should auto-set current-password for password type", () => {
      render(<Input type="password" name="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toHaveAttribute("autocomplete", "current-password");
    });

    it("should auto-set new-password for new password fields", () => {
      render(<Input type="password" name="newPassword" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toHaveAttribute("autocomplete", "new-password");
    });

    it("should auto-set given-name for firstName", () => {
      render(<Input name="firstName" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("autocomplete", "given-name");
    });

    it("should auto-set family-name for lastName", () => {
      render(<Input name="lastName" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("autocomplete", "family-name");
    });

    it("should allow explicit autocomplete override", () => {
      render(<Input type="email" autoComplete="off" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("autocomplete", "off");
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-invalid when error exists", () => {
      render(<Input error="Invalid input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("should set aria-invalid to false when no error", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      // Component sets aria-invalid="false" by default
      expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("should link error message with aria-describedby", () => {
      render(<Input label="Email" error="Email is required" />);
      const input = screen.getByLabelText("Email");
      const errorId = input.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      if (errorId) {
        expect(screen.getByText("Email is required")).toHaveAttribute(
          "id",
          errorId
        );
      }
    });

    it("should link helper text with aria-describedby", () => {
      render(<Input label="Email" helperText="Enter your email address" />);
      const input = screen.getByLabelText("Email");
      const helperId = input.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      if (helperId) {
        expect(screen.getByText("Enter your email address")).toHaveAttribute(
          "id",
          helperId
        );
      }
    });

    it("should have role=alert for error messages", () => {
      render(<Input error="Error message" />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("role", "alert");
    });

    it("should have aria-live=polite for error messages", () => {
      render(<Input error="Error message" />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("aria-live", "polite");
    });

    it("should have role=status for helper text", () => {
      render(<Input helperText="Helper text" />);
      const helperElement = screen.getByText("Helper text");
      expect(helperElement).toHaveAttribute("role", "status");
    });
  });

  describe("User Interactions", () => {
    it("should handle onChange event", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test");

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue("test");
    });

    it("should handle onBlur event", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should handle onFocus event", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole("textbox");
      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("should be focusable via keyboard", async () => {
      const user = userEvent.setup();
      render(
        <>
          <button type="button">Before</button>
          <Input label="Test Input" />
        </>
      );

      const button = screen.getByRole("button");
      const input = screen.getByLabelText("Test Input");

      button.focus();
      await user.tab();

      expect(input).toHaveFocus();
    });
  });

  describe("Disabled State", () => {
    it("should render disabled input", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("should not trigger events when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input disabled onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, "test");

      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue("");
    });

    it("should apply disabled opacity styles", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("disabled:opacity-50");
    });
  });

  describe("Value Handling", () => {
    it("should render with defaultValue", () => {
      render(<Input defaultValue="default text" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("default text");
    });

    it("should render with controlled value", () => {
      render(<Input value="controlled" onChange={() => {}} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("controlled");
    });

    it("should update controlled value", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const input = screen.getByRole("textbox");
      await user.type(input, "new value");

      expect(input).toHaveValue("new value");
    });
  });

  describe("Label Association", () => {
    it("should associate label with input via htmlFor", () => {
      render(<Input label="Test Label" id="test-input" />);
      const label = screen.getByText("Test Label");
      const input = screen.getByLabelText("Test Label");

      expect(label).toHaveAttribute("for", "test-input");
      expect(input).toHaveAttribute("id", "test-input");
    });

    it("should generate ID when not provided", () => {
      render(<Input label="Test Label" />);
      const input = screen.getByLabelText("Test Label");
      const id = input.getAttribute("id");

      // Should have an ID generated
      expect(id).toBeTruthy();
      expect(id).not.toBe("");
    });

    it("should allow clicking label to focus input", async () => {
      const user = userEvent.setup();
      render(<Input label="Click Me" />);

      const label = screen.getByText("Click Me");
      const input = screen.getByLabelText("Click Me");

      await user.click(label);
      expect(input).toHaveFocus();
    });
  });

  describe("Custom Props", () => {
    it("should accept and apply custom className", () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("custom-class");
    });

    it("should forward ref to input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("should spread additional props to input", () => {
      render(<Input data-testid="custom-input" maxLength={10} />);
      const input = screen.getByTestId("custom-input");
      expect(input).toHaveAttribute("maxLength", "10");
    });
  });

  describe("Accessibility", () => {
    it("should be keyboard navigable", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Input label="First" />
          <Input label="Second" />
        </div>
      );

      const first = screen.getByLabelText("First");
      const second = screen.getByLabelText("Second");

      first.focus();
      await user.tab();

      expect(second).toHaveFocus();
    });

    it("should announce errors to screen readers", () => {
      render(<Input label="Email" error="Invalid email" />);
      const errorMessage = screen.getByText("Invalid email");

      expect(errorMessage).toHaveAttribute("role", "alert");
      expect(errorMessage).toHaveAttribute("aria-live", "polite");
    });

    it("should maintain focus management", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Input label="Test" />);

      const input = screen.getByLabelText("Test");
      await user.click(input);
      expect(input).toHaveFocus();

      rerender(<Input label="Test" error="Error occurred" />);
      expect(input).toHaveFocus();
    });
  });
});
