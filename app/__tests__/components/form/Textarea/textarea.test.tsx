import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "~/components/form/Textarea/textarea";

describe("Textarea Component", () => {
  describe("Rendering", () => {
    it("should render textarea element", () => {
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("should render with label", () => {
      render(<Textarea label="Message" />);
      expect(screen.getByLabelText("Message")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
      render(<Textarea placeholder="Enter your message" />);
      expect(
        screen.getByPlaceholderText("Enter your message")
      ).toBeInTheDocument();
    });

    it("should render required asterisk when required prop is true", () => {
      render(<Textarea label="Message" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(<Textarea helperText="Maximum 500 characters" />);
      expect(screen.getByText("Maximum 500 characters")).toBeInTheDocument();
    });

    it("should render error message", () => {
      render(<Textarea error="Message is required" />);
      expect(screen.getByText("Message is required")).toBeInTheDocument();
    });

    it("should prioritize error over helper text", () => {
      render(<Textarea helperText="Helper text" error="Error message" />);
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });
  });

  describe("Character Count", () => {
    it("should display character count when showCharCount is true", () => {
      render(
        <Textarea
          showCharCount
          maxLength={100}
          value="Hello"
          onChange={() => {}}
        />
      );
      expect(screen.getByText(/5/)).toBeInTheDocument();
      expect(screen.getByText(/100/)).toBeInTheDocument();
    });

    it("should update character count on input", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <Textarea
            showCharCount
            maxLength={50}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "Hello World");

      expect(screen.getByText(/11/)).toBeInTheDocument();
      expect(screen.getByText(/50/)).toBeInTheDocument();
    });

    it("should not display character count when showCharCount is false", () => {
      render(
        <Textarea
          showCharCount={false}
          maxLength={100}
          value="Hello"
          onChange={() => {}}
        />
      );
      expect(screen.queryByText(/5/)).not.toBeInTheDocument();
    });

    it("should show count with maxLength when showCharCount is true", () => {
      render(
        <Textarea
          showCharCount
          maxLength={100}
          value="Hello"
          onChange={() => {}}
        />
      );
      expect(screen.getByText(/5/)).toBeInTheDocument();
      expect(screen.getByText(/100/)).toBeInTheDocument();
    });

    it("should apply warning style when approaching maxLength", () => {
      render(
        <Textarea
          showCharCount
          maxLength={100}
          value={"a".repeat(91)}
          onChange={() => {}}
        />
      );
      const textarea = screen.getByRole("textbox");
      const countElementId = textarea.getAttribute("aria-describedby");
      if (countElementId) {
        const countElement = document.getElementById(countElementId);
        expect(countElement).toHaveClass("text-warning");
      }
    });

    it("should apply error style when at maxLength", () => {
      render(
        <Textarea
          showCharCount
          maxLength={100}
          value={"a".repeat(100)}
          onChange={() => {}}
        />
      );
      const textarea = screen.getByRole("textbox");
      const countElementId = textarea.getAttribute("aria-describedby");
      if (countElementId) {
        const countElement = document.getElementById(countElementId);
        expect(countElement).toHaveClass("text-destructive");
      }
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      render(<Textarea variant="default" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-input");
    });

    it("should apply error variant", () => {
      render(<Textarea variant="error" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-destructive");
    });

    it("should apply success variant", () => {
      render(<Textarea variant="success" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-success");
    });

    it("should apply warning variant", () => {
      render(<Textarea variant="warning" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-warning");
    });

    it("should automatically apply error variant when error prop exists", () => {
      render(<Textarea variant="default" error="Error message" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-destructive");
    });
  });

  describe("Sizes", () => {
    it("should apply default size", () => {
      render(<Textarea textareaSize="default" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("min-h-[80px]");
    });

    it("should apply small size", () => {
      render(<Textarea textareaSize="sm" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("min-h-[60px]");
      expect(textarea).toHaveClass("text-xs");
    });

    it("should apply large size", () => {
      render(<Textarea textareaSize="lg" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("min-h-[120px]");
      expect(textarea).toHaveClass("text-base");
    });
  });

  describe("Resize Behavior", () => {
    it("should allow vertical resize by default", () => {
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("resize-y");
    });
  });

  describe("Rows", () => {
    it("should apply custom rows", () => {
      render(<Textarea rows={5} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "5");
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-invalid when error exists", () => {
      render(<Textarea error="Invalid input" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("should not set aria-invalid when no error", () => {
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "false");
    });

    it("should link error message with aria-describedby", () => {
      render(<Textarea label="Message" error="Message is required" />);
      const textarea = screen.getByLabelText("Message");
      const errorId = textarea.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      if (errorId) {
        expect(screen.getByText("Message is required")).toHaveAttribute(
          "id",
          errorId
        );
      }
    });

    it("should link helper text with aria-describedby", () => {
      render(<Textarea label="Message" helperText="Enter your message" />);
      const textarea = screen.getByLabelText("Message");
      const helperId = textarea.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      if (helperId) {
        expect(screen.getByText("Enter your message")).toHaveAttribute(
          "id",
          helperId
        );
      }
    });

    it("should have role=alert for error messages", () => {
      render(<Textarea error="Error message" />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("role", "alert");
    });

    it("should have aria-live=polite for error messages", () => {
      render(<Textarea error="Error message" />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("aria-live", "polite");
    });

    it("should have role=status for helper text", () => {
      render(<Textarea helperText="Helper text" />);
      const helperElement = screen.getByText("Helper text");
      expect(helperElement).toHaveAttribute("role", "status");
    });
  });

  describe("User Interactions", () => {
    it("should handle onChange event", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onChange={handleChange} />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "test message");

      expect(handleChange).toHaveBeenCalled();
      expect(textarea).toHaveValue("test message");
    });

    it("should handle onBlur event", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onBlur={handleBlur} />);

      const textarea = screen.getByRole("textbox");
      await user.click(textarea);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should handle onFocus event", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onFocus={handleFocus} />);

      const textarea = screen.getByRole("textbox");
      await user.click(textarea);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("should be focusable via keyboard", async () => {
      const user = userEvent.setup();
      render(
        <>
          <button type="button">Before</button>
          <Textarea label="Test Textarea" />
        </>
      );

      const button = screen.getByRole("button");
      const textarea = screen.getByLabelText("Test Textarea");

      button.focus();
      await user.tab();

      expect(textarea).toHaveFocus();
    });

    it("should support multiline input", async () => {
      const user = userEvent.setup();
      render(<Textarea />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "Line 1{Enter}Line 2{Enter}Line 3");

      expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
    });
  });

  describe("Disabled State", () => {
    it("should render disabled textarea", () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
    });

    it("should not trigger events when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea disabled onChange={handleChange} />);

      const textarea = screen.getByRole("textbox");
      await user.click(textarea);
      await user.type(textarea, "test");

      expect(handleChange).not.toHaveBeenCalled();
      expect(textarea).toHaveValue("");
    });

    it("should apply disabled opacity styles", () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("disabled:opacity-50");
    });
  });

  describe("Value Handling", () => {
    it("should render with defaultValue", () => {
      render(<Textarea defaultValue="default message" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveValue("default message");
    });

    it("should render with controlled value", () => {
      render(<Textarea value="controlled" onChange={() => {}} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveValue("controlled");
    });

    it("should update controlled value", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "new value");

      expect(textarea).toHaveValue("new value");
    });
  });

  describe("Label Association", () => {
    it("should associate label with textarea via htmlFor", () => {
      render(<Textarea label="Test Label" id="test-textarea" />);
      const label = screen.getByText("Test Label");
      const textarea = screen.getByLabelText("Test Label");

      expect(label).toHaveAttribute("for", "test-textarea");
      expect(textarea).toHaveAttribute("id", "test-textarea");
    });

    it("should generate ID when not provided", () => {
      render(<Textarea label="Test Label" />);
      const textarea = screen.getByLabelText("Test Label");
      const id = textarea.getAttribute("id");

      expect(id).toBeTruthy();
      expect(id).not.toBe("");
    });

    it("should allow clicking label to focus textarea", async () => {
      const user = userEvent.setup();
      render(<Textarea label="Click Me" />);

      const label = screen.getByText("Click Me");
      const textarea = screen.getByLabelText("Click Me");

      await user.click(label);
      expect(textarea).toHaveFocus();
    });
  });

  describe("MaxLength", () => {
    it("should enforce maxLength", async () => {
      const user = userEvent.setup();
      render(<Textarea maxLength={10} />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "12345678901234567890");

      expect(textarea).toHaveValue("1234567890");
    });

    it("should accept long text without maxLength", () => {
      const longText = "a".repeat(1000);
      render(<Textarea value={longText} onChange={() => {}} />);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value.length).toBe(1000);
    });
  });

  describe("Custom Props", () => {
    it("should accept and apply custom className", () => {
      render(<Textarea className="custom-class" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("custom-class");
    });

    it("should forward ref to textarea element", () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it("should spread additional props to textarea", () => {
      render(<Textarea data-testid="custom-textarea" spellCheck={false} />);
      const textarea = screen.getByTestId("custom-textarea");
      expect(textarea).toHaveAttribute("spellCheck", "false");
    });
  });

  describe("Accessibility", () => {
    it("should be keyboard navigable", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Textarea label="First" />
          <Textarea label="Second" />
        </div>
      );

      const first = screen.getByLabelText("First");
      const second = screen.getByLabelText("Second");

      first.focus();
      await user.tab();

      expect(second).toHaveFocus();
    });

    it("should announce errors to screen readers", () => {
      render(<Textarea label="Message" error="Invalid message" />);
      const errorMessage = screen.getByText("Invalid message");

      expect(errorMessage).toHaveAttribute("role", "alert");
      expect(errorMessage).toHaveAttribute("aria-live", "polite");
    });

    it("should maintain focus management", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Textarea label="Test" />);

      const textarea = screen.getByLabelText("Test");
      await user.click(textarea);
      expect(textarea).toHaveFocus();

      rerender(<Textarea label="Test" error="Error occurred" />);
      expect(textarea).toHaveFocus();
    });
  });
});
