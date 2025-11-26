import * as React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CheckboxGroup,
  type CheckboxOption,
} from "~/components/form/Checkbox/checkbox-group";
import { act } from "react";

// Mock missing browser APIs
beforeAll(() => {
  HTMLElement.prototype.hasPointerCapture = vi.fn();
  HTMLElement.prototype.scrollIntoView = vi.fn();

  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockOptions: CheckboxOption[] = [
  {
    value: "email",
    label: "Email",
    description: "Receive email notifications",
  },
  { value: "sms", label: "SMS", description: "Receive text messages" },
  { value: "push", label: "Push Notifications" },
];

const mockOptionsWithDisabled: CheckboxOption[] = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS", disabled: true },
  { value: "push", label: "Push Notifications" },
];

describe("CheckboxGroup Component", () => {
  describe("Rendering", () => {
    it("should render checkbox group", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(
        <CheckboxGroup label="Notification Preferences" options={mockOptions} />
      );
      expect(screen.getByText("Notification Preferences")).toBeInTheDocument();
    });

    it("should render with description", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          description="Select all that apply"
          options={mockOptions}
        />
      );
      expect(screen.getByText("Select all that apply")).toBeInTheDocument();
    });

    it("should render required asterisk when required prop is true", () => {
      render(
        <CheckboxGroup label="Contact Methods" required options={mockOptions} />
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          helperText="You can change these later"
          options={mockOptions}
        />
      );
      expect(
        screen.getByText("You can change these later")
      ).toBeInTheDocument();
    });

    it("should render error message", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          error="At least one option is required"
          options={mockOptions}
        />
      );
      expect(
        screen.getByText("At least one option is required")
      ).toBeInTheDocument();
    });

    it("should prioritize error over helper text", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          helperText="Helper text"
          error="Error message"
          options={mockOptions}
        />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });

    it("should render all checkbox options", () => {
      render(<CheckboxGroup options={mockOptions} />);
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("SMS")).toBeInTheDocument();
      expect(screen.getByText("Push Notifications")).toBeInTheDocument();
    });

    it("should render option descriptions", () => {
      render(<CheckboxGroup options={mockOptions} />);
      expect(
        screen.getByText("Receive email notifications")
      ).toBeInTheDocument();
      expect(screen.getByText("Receive text messages")).toBeInTheDocument();
    });

    it("should handle empty options array", () => {
      render(<CheckboxGroup options={[]} />);
      const group = screen.getByRole("group");
      expect(group).toBeInTheDocument();
      expect(group.children.length).toBe(0);
    });
  });

  describe("Orientation", () => {
    it("should apply vertical orientation by default", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toHaveClass("flex-col");
    });

    it("should apply vertical orientation explicitly", () => {
      render(<CheckboxGroup orientation="vertical" options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toHaveClass("flex", "flex-col", "gap-3");
    });

    it("should apply horizontal orientation", () => {
      render(<CheckboxGroup orientation="horizontal" options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toHaveClass("flex", "flex-row", "flex-wrap", "gap-6");
    });
  });

  describe("Value Management", () => {
    it("should start with no selections by default", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });

    it("should render with initial selected values", () => {
      render(<CheckboxGroup options={mockOptions} value={["email", "sms"]} />);
      const emailCheckbox = screen.getByLabelText("Email");
      const smsCheckbox = screen.getByLabelText("SMS");
      const pushCheckbox = screen.getByLabelText("Push Notifications");

      expect(emailCheckbox).toBeChecked();
      expect(smsCheckbox).toBeChecked();
      expect(pushCheckbox).not.toBeChecked();
    });

    it("should call onValueChange when checkbox is checked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <CheckboxGroup
          options={mockOptions}
          value={[]}
          onValueChange={handleChange}
        />
      );

      const emailCheckbox = screen.getByLabelText("Email");
      await user.click(emailCheckbox);

      expect(handleChange).toHaveBeenCalledWith(["email"]);
    });

    it("should call onValueChange when checkbox is unchecked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <CheckboxGroup
          options={mockOptions}
          value={["email", "sms"]}
          onValueChange={handleChange}
        />
      );

      const emailCheckbox = screen.getByLabelText("Email");
      await user.click(emailCheckbox);

      expect(handleChange).toHaveBeenCalledWith(["sms"]);
    });

    it("should handle multiple selections", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState<string[]>([]);
        return (
          <CheckboxGroup
            options={mockOptions}
            value={value}
            onValueChange={setValue}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const emailCheckbox = screen.getByLabelText("Email");
      const smsCheckbox = screen.getByLabelText("SMS");

      await user.click(emailCheckbox);
      await waitFor(() => {
        expect(emailCheckbox).toBeChecked();
      });

      await user.click(smsCheckbox);
      await waitFor(() => {
        expect(emailCheckbox).toBeChecked();
        expect(smsCheckbox).toBeChecked();
      });
    });

    it("should toggle selections correctly", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState<string[]>(["email"]);
        return (
          <CheckboxGroup
            options={mockOptions}
            value={value}
            onValueChange={setValue}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const emailCheckbox = screen.getByLabelText("Email");
      expect(emailCheckbox).toBeChecked();

      await user.click(emailCheckbox);
      await waitFor(() => {
        expect(emailCheckbox).not.toBeChecked();
      });

      await user.click(emailCheckbox);
      await waitFor(() => {
        expect(emailCheckbox).toBeChecked();
      });
    });

    it("should maintain independent checkbox states", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState<string[]>([]);
        return (
          <CheckboxGroup
            options={mockOptions}
            value={value}
            onValueChange={setValue}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const emailCheckbox = screen.getByLabelText("Email");
      const pushCheckbox = screen.getByLabelText("Push Notifications");

      await user.click(emailCheckbox);
      await waitFor(() => {
        expect(emailCheckbox).toBeChecked();
        expect(pushCheckbox).not.toBeChecked();
      });

      await user.click(pushCheckbox);
      await waitFor(() => {
        expect(emailCheckbox).toBeChecked();
        expect(pushCheckbox).toBeChecked();
      });
    });
  });

  describe("Disabled State", () => {
    it("should render disabled options", () => {
      render(<CheckboxGroup options={mockOptionsWithDisabled} />);
      const smsCheckbox = screen.getByLabelText("SMS");
      expect(smsCheckbox).toBeDisabled();
    });

    it("should not call onValueChange for disabled options", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <CheckboxGroup
          options={mockOptionsWithDisabled}
          onValueChange={handleChange}
        />
      );

      const smsCheckbox = screen.getByLabelText("SMS");
      await user.click(smsCheckbox);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should allow checking enabled options while others are disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <CheckboxGroup
          options={mockOptionsWithDisabled}
          value={[]}
          onValueChange={handleChange}
        />
      );

      const emailCheckbox = screen.getByLabelText("Email");
      await user.click(emailCheckbox);

      expect(handleChange).toHaveBeenCalledWith(["email"]);
    });
  });

  describe("Variant Propagation", () => {
    it("should pass variant to child checkboxes", () => {
      render(<CheckboxGroup variant="error" options={mockOptions} />);
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveClass("border-checkbox-error");
      });
    });

    it("should pass success variant to child checkboxes", () => {
      render(<CheckboxGroup variant="success" options={mockOptions} />);
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveClass("border-checkbox-success");
      });
    });
  });

  describe("Size Propagation", () => {
    it("should pass size to child checkboxes", () => {
      render(<CheckboxGroup checkboxSize="sm" options={mockOptions} />);
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveClass("h-3", "w-3");
      });
    });

    it("should pass large size to child checkboxes", () => {
      render(<CheckboxGroup checkboxSize="lg" options={mockOptions} />);
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveClass("h-5", "w-5");
      });
    });
  });

  describe("ARIA Attributes", () => {
    it("should have role=group", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toBeInTheDocument();
    });

    it("should set aria-labelledby when label exists", () => {
      render(<CheckboxGroup label="Preferences" options={mockOptions} />);
      const group = screen.getByRole("group");
      const labelledBy = group.getAttribute("aria-labelledby");

      expect(labelledBy).toBeTruthy();
      if (labelledBy) {
        const label = screen.getByText("Preferences");
        expect(label).toHaveAttribute("id", labelledBy);
      }
    });

    it("should not set aria-labelledby when no label", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).not.toHaveAttribute("aria-labelledby");
    });

    it("should set aria-invalid when error exists", () => {
      render(<CheckboxGroup error="Required" options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("aria-invalid", "true");
    });

    it("should not set aria-invalid when no error", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("aria-invalid", "false");
    });

    it("should link error message with aria-describedby", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          error="Selection required"
          options={mockOptions}
        />
      );
      const group = screen.getByRole("group");
      const describedBy = group.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const errorIds = describedBy.split(" ");
        const errorElement = screen.getByText("Selection required");
        expect(errorIds).toContain(errorElement.id);
      }
    });

    it("should link helper text with aria-describedby", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          helperText="Select all that apply"
          options={mockOptions}
        />
      );
      const group = screen.getByRole("group");
      const describedBy = group.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const helperIds = describedBy.split(" ");
        const helperElement = screen.getByText("Select all that apply");
        expect(helperIds).toContain(helperElement.id);
      }
    });

    it("should link description with aria-describedby", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          description="Choose your notification methods"
          options={mockOptions}
        />
      );
      const group = screen.getByRole("group");
      const describedBy = group.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const descIds = describedBy.split(" ");
        const descElement = screen.getByText(
          "Choose your notification methods"
        );
        expect(descIds).toContain(descElement.id);
      }
    });

    it("should combine multiple aria-describedby references", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          description="Notification settings"
          helperText="You can change these later"
          options={mockOptions}
        />
      );
      const group = screen.getByRole("group");
      const describedBy = group.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const ids = describedBy.split(" ");
        expect(ids.length).toBeGreaterThanOrEqual(2);
      }
    });

    it("should have role=alert for error messages", () => {
      render(<CheckboxGroup error="Error message" options={mockOptions} />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("role", "alert");
    });

    it("should have aria-live=polite for error messages", () => {
      render(<CheckboxGroup error="Error message" options={mockOptions} />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("aria-live", "polite");
    });

    it("should have role=status for helper text", () => {
      render(<CheckboxGroup helperText="Helper text" options={mockOptions} />);
      const helperElement = screen.getByText("Helper text");
      expect(helperElement).toHaveAttribute("role", "status");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should allow tabbing through checkboxes", async () => {
      const user = userEvent.setup();
      render(<CheckboxGroup options={mockOptions} />);

      const emailCheckbox = screen.getByLabelText("Email");
      const smsCheckbox = screen.getByLabelText("SMS");

      emailCheckbox.focus();
      expect(emailCheckbox).toHaveFocus();

      await user.tab();
      expect(smsCheckbox).toHaveFocus();
    });

    it("should toggle checkbox with Space key", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState<string[]>([]);
        return (
          <CheckboxGroup
            options={mockOptions}
            value={value}
            onValueChange={setValue}
          />
        );
      };

      render(<TestComponent />);

      const emailCheckbox = screen.getByLabelText("Email");
      emailCheckbox.focus();

      expect(emailCheckbox).not.toBeChecked();

      await user.keyboard(" ");

      await waitFor(() => {
        expect(emailCheckbox).toBeChecked();
      });
    });
  });

  describe("Blur Handling", () => {
    it("should call onBlur when checkbox loses focus", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();

      render(<CheckboxGroup options={mockOptions} onBlur={handleBlur} />);

      const emailCheckbox = screen.getByLabelText("Email");
      emailCheckbox.focus();
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });

    it("should propagate onBlur to all checkboxes", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();

      render(<CheckboxGroup options={mockOptions} onBlur={handleBlur} />);

      const smsCheckbox = screen.getByLabelText("SMS");
      smsCheckbox.focus();
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe("Custom Props", () => {
    it("should accept and apply custom className", () => {
      render(<CheckboxGroup className="custom-class" options={mockOptions} />);
      const container = screen.getByRole("group").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("should forward ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CheckboxGroup ref={ref} options={mockOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should accept custom id and use it in aria-labelledby", () => {
      render(
        <CheckboxGroup
          id="custom-id"
          label="Test Label"
          options={mockOptions}
        />
      );
      const group = screen.getByRole("group");
      const labelledBy = group.getAttribute("aria-labelledby");

      // The labelledBy should include the custom-id-label format
      expect(labelledBy).toBeTruthy();
      expect(labelledBy).toContain("custom-id");
    });

    it("should generate unique ids when not provided", () => {
      const { container } = render(
        <>
          <CheckboxGroup label="Group 1" options={mockOptions} />
          <CheckboxGroup label="Group 2" options={mockOptions} />
        </>
      );

      const groups = container.querySelectorAll('[role="group"]');
      const id1 = groups[0].getAttribute("aria-labelledby");
      const id2 = groups[1].getAttribute("aria-labelledby");

      expect(id1).not.toBe(id2);
    });
  });

  describe("Layout and Spacing", () => {
    it("should have proper spacing classes", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const container = screen.getByRole("group").parentElement;
      expect(container).toHaveClass("space-y-3");
    });

    it("should apply gap-3 for vertical orientation", () => {
      render(<CheckboxGroup orientation="vertical" options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toHaveClass("gap-3");
    });

    it("should apply gap-6 for horizontal orientation", () => {
      render(<CheckboxGroup orientation="horizontal" options={mockOptions} />);
      const group = screen.getByRole("group");
      expect(group).toHaveClass("gap-6");
    });

    it("should have full width", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const container = screen.getByRole("group").parentElement;
      expect(container).toHaveClass("w-full");
    });
  });

  describe("Edge Cases", () => {
    it("should handle single option", () => {
      const singleOption = [{ value: "single", label: "Single Option" }];
      render(<CheckboxGroup options={singleOption} />);

      expect(screen.getByLabelText("Single Option")).toBeInTheDocument();
    });

    it("should handle options without descriptions", () => {
      const optionsNoDesc = [
        { value: "opt1", label: "Option 1" },
        { value: "opt2", label: "Option 2" },
      ];
      render(<CheckboxGroup options={optionsNoDesc} />);

      expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
    });

    it("should handle value array with non-existent option values", () => {
      render(
        <CheckboxGroup options={mockOptions} value={["email", "nonexistent"]} />
      );

      const emailCheckbox = screen.getByLabelText("Email");
      expect(emailCheckbox).toBeChecked();
    });

    it("should not break with undefined value prop", () => {
      render(<CheckboxGroup options={mockOptions} value={undefined} />);
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe("Accessibility", () => {
    it("should be keyboard accessible", () => {
      render(<CheckboxGroup options={mockOptions} />);
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute("type", "button");
      });
    });

    it("should announce errors to screen readers", () => {
      render(
        <CheckboxGroup
          label="Preferences"
          error="Required"
          options={mockOptions}
        />
      );
      const errorMessage = screen.getByText("Required");

      expect(errorMessage).toHaveAttribute("role", "alert");
      expect(errorMessage).toHaveAttribute("aria-live", "polite");
    });

    it("should have proper label association", () => {
      render(<CheckboxGroup label="Preferences" options={mockOptions} />);
      const group = screen.getByRole("group");
      const labelledBy = group.getAttribute("aria-labelledby");

      expect(labelledBy).toBeTruthy();
      expect(screen.getByText("Preferences")).toHaveAttribute(
        "id",
        labelledBy!
      );
    });
  });

  describe("Integration", () => {
    it("should work with all props combined", () => {
      render(
        <CheckboxGroup
          label="Notification Preferences"
          description="Choose how you want to be notified"
          helperText="You can change these anytime"
          variant="default"
          checkboxSize="default"
          orientation="vertical"
          required
          value={["email"]}
          options={mockOptions}
        />
      );

      expect(screen.getByText("Notification Preferences")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
      expect(
        screen.getByText("Choose how you want to be notified")
      ).toBeInTheDocument();
      expect(
        screen.getByText("You can change these anytime")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeChecked();
    });

    it("should handle error state with all props", () => {
      render(
        <CheckboxGroup
          label="Contact Methods"
          description="Select at least one"
          error="You must select at least one option"
          variant="error"
          checkboxSize="lg"
          required
          options={mockOptions}
        />
      );

      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("aria-invalid", "true");
      expect(
        screen.getByText("You must select at least one option")
      ).toBeInTheDocument();

      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveClass("border-checkbox-error");
        expect(checkbox).toHaveClass("h-5", "w-5");
      });
    });

    it("should work in a form context", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      const TestForm = () => {
        const [value, setValue] = React.useState<string[]>([]);
        return (
          <form onSubmit={handleSubmit}>
            <CheckboxGroup
              label="Preferences"
              options={mockOptions}
              value={value}
              onValueChange={setValue}
              required
            />
            <button type="submit">Submit</button>
          </form>
        );
      };

      render(<TestForm />);

      const emailCheckbox = screen.getByLabelText("Email");
      const submitButton = screen.getByRole("button", { name: /Submit/i });

      await user.click(emailCheckbox);
      await waitFor(() => {
        expect(emailCheckbox).toBeChecked();
      });

      await user.click(submitButton);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
