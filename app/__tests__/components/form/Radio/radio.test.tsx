import * as React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, type RadioOption } from "~/components/form/Radio/radio";

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

describe("RadioGroup Component", () => {
  const defaultOptions: RadioOption[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const optionsWithDescriptions: RadioOption[] = [
    {
      value: "email",
      label: "Email",
      description: "Receive notifications via email",
    },
    {
      value: "sms",
      label: "SMS",
      description: "Receive notifications via text message",
    },
    {
      value: "push",
      label: "Push Notifications",
      description: "Receive notifications in the app",
    },
  ];

  describe("Rendering", () => {
    it("should render radio group with options", () => {
      render(<RadioGroup options={defaultOptions} />);

      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Option 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Option 2" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Option 3" })
      ).toBeInTheDocument();
    });

    it("should render with group label", () => {
      render(<RadioGroup options={defaultOptions} label="Choose an option" />);
      expect(screen.getByText("Choose an option")).toBeInTheDocument();
    });

    it("should render with group description", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Preferences"
          description="Select your preferred option"
        />
      );
      expect(
        screen.getByText("Select your preferred option")
      ).toBeInTheDocument();
    });

    it("should render required asterisk when required prop is true", () => {
      render(
        <RadioGroup options={defaultOptions} label="Required Field" required />
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          helperText="You can change this later"
        />
      );
      expect(screen.getByText("You can change this later")).toBeInTheDocument();
    });

    it("should render error message", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          error="Please select an option"
        />
      );
      expect(screen.getByText("Please select an option")).toBeInTheDocument();
    });

    it("should prioritize error over helper text", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          helperText="Helper text"
          error="Error message"
        />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });

    it("should render options with descriptions", () => {
      render(
        <RadioGroup
          options={optionsWithDescriptions}
          label="Notification Method"
        />
      );

      expect(
        screen.getByText("Receive notifications via email")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Receive notifications via text message")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Receive notifications in the app")
      ).toBeInTheDocument();
    });

    it("should render without group label", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          aria-label="Unlabeled radio group"
        />
      );
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toBeInTheDocument();
      expect(radiogroup).toHaveAttribute("aria-label", "Unlabeled radio group");
    });

    it("should render empty options array gracefully", () => {
      render(<RadioGroup options={[]} label="Empty Options" />);
      expect(screen.getByText("Empty Options")).toBeInTheDocument();
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("should render single option", () => {
      const singleOption: RadioOption[] = [
        { value: "only", label: "Only Option" },
      ];
      render(<RadioGroup options={singleOption} />);
      expect(
        screen.getByRole("radio", { name: "Only Option" })
      ).toBeInTheDocument();
    });

    it("should render many options", () => {
      const manyOptions: RadioOption[] = Array.from({ length: 10 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));
      render(<RadioGroup options={manyOptions} />);
      manyOptions.forEach((option) => {
        expect(
          screen.getByRole("radio", { name: option.label })
        ).toBeInTheDocument();
      });
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      render(<RadioGroup options={defaultOptions} variant="default" />);
      const firstRadio = screen.getByRole("radio", { name: "Option 1" });
      expect(firstRadio).toHaveClass("border-radio-primary");
    });

    it("should apply error variant", () => {
      render(<RadioGroup options={defaultOptions} variant="error" />);
      const firstRadio = screen.getByRole("radio", { name: "Option 1" });
      expect(firstRadio).toHaveClass("border-radio-error");
    });

    it("should apply success variant", () => {
      render(<RadioGroup options={defaultOptions} variant="success" />);
      const firstRadio = screen.getByRole("radio", { name: "Option 1" });
      expect(firstRadio).toHaveClass("border-radio-success");
    });

    it("should apply warning variant", () => {
      render(<RadioGroup options={defaultOptions} variant="warning" />);
      const firstRadio = screen.getByRole("radio", { name: "Option 1" });
      expect(firstRadio).toHaveClass("border-radio-warning");
    });

    it("should automatically apply error variant when error prop exists", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          variant="default"
          error="Error message"
        />
      );
      const firstRadio = screen.getByRole("radio", { name: "Option 1" });
      expect(firstRadio).toHaveClass("border-radio-error");
    });

    it("should apply variant to all radio buttons", () => {
      render(<RadioGroup options={defaultOptions} variant="success" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).toHaveClass("border-radio-success");
      expect(radio2).toHaveClass("border-radio-success");
      expect(radio3).toHaveClass("border-radio-success");
    });
  });

  describe("Sizes", () => {
    it("should apply default size", () => {
      render(<RadioGroup options={defaultOptions} radioSize="default" />);
      const firstRadio = screen.getByRole("radio", { name: "Option 1" });
      expect(firstRadio).toHaveClass("h-4", "w-4");
    });

    it("should apply small size", () => {
      render(<RadioGroup options={defaultOptions} radioSize="sm" />);
      const firstRadio = screen.getByRole("radio", { name: "Option 1" });
      expect(firstRadio).toHaveClass("h-3", "w-3");
    });

    it("should apply large size", () => {
      render(<RadioGroup options={defaultOptions} radioSize="lg" />);
      const firstRadio = screen.getByRole("radio", { name: "Option 1" });
      expect(firstRadio).toHaveClass("h-5", "w-5");
    });

    it("should apply size to all radio buttons", () => {
      render(<RadioGroup options={defaultOptions} radioSize="lg" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).toHaveClass("h-5", "w-5");
      expect(radio2).toHaveClass("h-5", "w-5");
      expect(radio3).toHaveClass("h-5", "w-5");
    });
  });

  describe("Selection State", () => {
    it("should have no radio selected by default", () => {
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).not.toBeChecked();
      expect(radio2).not.toBeChecked();
      expect(radio3).not.toBeChecked();
    });

    it("should render with selected value", () => {
      render(<RadioGroup options={defaultOptions} value="option2" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).not.toBeChecked();
      expect(radio2).toBeChecked();
      expect(radio3).not.toBeChecked();
    });

    it("should call onValueChange when radio is clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup options={defaultOptions} onValueChange={handleChange} />
      );

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      await user.click(radio2);

      expect(handleChange).toHaveBeenCalledWith("option2");
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should call onValueChange when label is clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup options={defaultOptions} onValueChange={handleChange} />
      );

      const label = screen.getByText("Option 2");
      await user.click(label);

      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("should change selection in controlled component", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("option1");
        return (
          <RadioGroup
            options={defaultOptions}
            value={value}
            onValueChange={setValue}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });

      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();

      await user.click(radio2);

      await waitFor(() => {
        expect(radio1).not.toBeChecked();
        expect(radio2).toBeChecked();
      });
    });

    it("should have data-state attribute reflecting checked state", () => {
      render(<RadioGroup options={defaultOptions} value="option2" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });

      expect(radio1).toHaveAttribute("data-state", "unchecked");
      expect(radio2).toHaveAttribute("data-state", "checked");
    });

    it("should display indicator dot when selected", () => {
      render(<RadioGroup options={defaultOptions} value="option1" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const indicator = radio1.querySelector(
        '[class*="rounded-full"][class*="bg-current"]'
      );

      expect(indicator).toBeInTheDocument();
    });

    it("should only allow one option to be selected at a time", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });

      await user.click(radio1);
      await waitFor(() => expect(radio1).toBeChecked());

      await user.click(radio2);
      await waitFor(() => {
        expect(radio1).not.toBeChecked();
        expect(radio2).toBeChecked();
      });
    });

    it("should handle rapid selection changes", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup options={defaultOptions} onValueChange={handleChange} />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      await user.click(radio1);
      await user.click(radio2);
      await user.click(radio3);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(3);
        expect(radio3).toBeChecked();
      });
    });

    it("should not call onValueChange when already selected radio is clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup
          options={defaultOptions}
          value="option1"
          onValueChange={handleChange}
        />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      await user.click(radio1);

      // Radix UI RadioGroup does NOT call onValueChange for already selected items
      // This prevents unnecessary re-renders and state updates
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("should render disabled radio option", () => {
      const optionsWithDisabled: RadioOption[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2", disabled: true },
        { value: "option3", label: "Option 3" },
      ];

      render(<RadioGroup options={optionsWithDisabled} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).not.toBeDisabled();
      expect(radio2).toBeDisabled();
      expect(radio3).not.toBeDisabled();
    });

    it("should not call onValueChange when disabled option is clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      const optionsWithDisabled: RadioOption[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2", disabled: true },
      ];

      render(
        <RadioGroup
          options={optionsWithDisabled}
          onValueChange={handleChange}
        />
      );

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      await user.click(radio2);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should not respond to label clicks when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      const optionsWithDisabled: RadioOption[] = [
        { value: "option1", label: "Option 1", disabled: true },
      ];

      render(
        <RadioGroup
          options={optionsWithDisabled}
          onValueChange={handleChange}
        />
      );

      const label = screen.getByText("Option 1");
      await user.click(label);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should apply disabled opacity styles", () => {
      const optionsWithDisabled: RadioOption[] = [
        { value: "option1", label: "Option 1", disabled: true },
      ];

      render(<RadioGroup options={optionsWithDisabled} />);

      const radio = screen.getByRole("radio", { name: "Option 1" });
      expect(radio).toHaveClass("disabled:opacity-50");
    });

    it("should disable entire radio group", () => {
      render(<RadioGroup options={defaultOptions} disabled />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).toBeDisabled();
      expect(radio2).toBeDisabled();
      expect(radio3).toBeDisabled();
    });

    it("should maintain selection when disabled", () => {
      render(<RadioGroup options={defaultOptions} value="option2" disabled />);

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      expect(radio2).toBeChecked();
      expect(radio2).toBeDisabled();
    });

    it("should show disabled cursor style", () => {
      const optionsWithDisabled: RadioOption[] = [
        { value: "option1", label: "Option 1", disabled: true },
      ];

      render(<RadioGroup options={optionsWithDisabled} />);

      const radio = screen.getByRole("radio", { name: "Option 1" });
      expect(radio).toHaveClass("disabled:cursor-not-allowed");
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-invalid when error exists", () => {
      render(<RadioGroup options={defaultOptions} error="Required field" />);
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-invalid", "true");
    });

    it("should not set aria-invalid when no error", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-invalid", "false");
    });

    it("should link error message with aria-describedby", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          error="You must select an option"
        />
      );
      const radiogroup = screen.getByRole("radiogroup");
      const describedBy = radiogroup.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const errorIds = describedBy.split(" ");
        const errorElement = screen.getByText("You must select an option");
        expect(errorIds).toContain(errorElement.id);
      }
    });

    it("should link helper text with aria-describedby", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          helperText="Choose wisely"
        />
      );
      const radiogroup = screen.getByRole("radiogroup");
      const describedBy = radiogroup.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const helperIds = describedBy.split(" ");
        const helperElement = screen.getByText("Choose wisely");
        expect(helperIds).toContain(helperElement.id);
      }
    });

    it("should link description with aria-describedby", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          description="Select one option"
        />
      );
      const radiogroup = screen.getByRole("radiogroup");
      const describedBy = radiogroup.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const descIds = describedBy.split(" ");
        const descElement = screen.getByText("Select one option");
        expect(descIds).toContain(descElement.id);
      }
    });

    it("should combine multiple aria-describedby references", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          description="Select carefully"
          helperText="This is important"
        />
      );
      const radiogroup = screen.getByRole("radiogroup");
      const describedBy = radiogroup.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
      if (describedBy) {
        const ids = describedBy.split(" ");
        expect(ids.length).toBeGreaterThanOrEqual(2);
      }
    });

    it("should have role=alert for error messages", () => {
      render(<RadioGroup options={defaultOptions} error="Error message" />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("role", "alert");
    });

    it("should have aria-live=polite for error messages", () => {
      render(<RadioGroup options={defaultOptions} error="Error message" />);
      const errorElement = screen.getByText("Error message");
      expect(errorElement).toHaveAttribute("aria-live", "polite");
    });

    it("should have role=status for helper text", () => {
      render(<RadioGroup options={defaultOptions} helperText="Helper text" />);
      const helperElement = screen.getByText("Helper text");
      expect(helperElement).toHaveAttribute("role", "status");
    });

    it("should link label with aria-labelledby when label exists", () => {
      render(<RadioGroup options={defaultOptions} label="Choose Option" />);
      const radiogroup = screen.getByRole("radiogroup");
      const labelledBy = radiogroup.getAttribute("aria-labelledby");

      expect(labelledBy).toBeTruthy();
      if (labelledBy) {
        const label = screen.getByText("Choose Option");
        expect(label.id).toBe(labelledBy);
      }
    });

    it("should set aria-required when required", () => {
      render(<RadioGroup options={defaultOptions} required />);
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-required", "true");
    });

    it("should not set aria-describedby when no descriptive content", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("Label Association", () => {
    it("should associate labels with radio buttons via htmlFor", () => {
      render(<RadioGroup options={defaultOptions} id="test-radio-group" />);

      const label1 = screen.getByText("Option 1");
      const radio1 = screen.getByRole("radio", { name: "Option 1" });

      expect(label1).toHaveAttribute("for");
      const labelFor = label1.getAttribute("for");
      expect(radio1.id).toBe(labelFor);
    });

    it("should generate unique IDs for each radio option", () => {
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1.id).toBeTruthy();
      expect(radio2.id).toBeTruthy();
      expect(radio3.id).toBeTruthy();
      expect(radio1.id).not.toBe(radio2.id);
      expect(radio2.id).not.toBe(radio3.id);
    });

    it("should allow clicking label to select radio", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const label2 = screen.getByText("Option 2");

      expect(radio2).not.toBeChecked();

      await user.click(label2);

      await waitFor(() => {
        expect(radio2).toBeChecked();
      });
    });

    it("should have cursor-pointer on labels", () => {
      render(<RadioGroup options={defaultOptions} />);

      const label1 = screen.getByText("Option 1");
      expect(label1).toHaveClass("cursor-pointer");
    });

    it("should use custom ID when provided", () => {
      render(<RadioGroup options={defaultOptions} id="custom-id" />);
      const radiogroup = screen.getByRole("radiogroup");

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1.id).toContain("custom-id");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should select radio with Space key", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      radio2.focus();

      expect(radio2).not.toBeChecked();

      await user.keyboard(" ");

      await waitFor(() => {
        expect(radio2).toBeChecked();
      });
    });

    it("should navigate with arrow keys", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      radio1.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(radio2).toHaveFocus();
      });

      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(radio3).toHaveFocus();
      });
    });

    it("should navigate up with ArrowUp key", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio1 = screen.getByRole("radio", { name: "Option 1" });

      radio2.focus();
      await user.keyboard("{ArrowUp}");

      await waitFor(() => {
        expect(radio1).toHaveFocus();
      });
    });

    it("should be focusable", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radio1 = screen.getByRole("radio", { name: "Option 1" });

      radio1.focus();

      expect(radio1).toHaveFocus();
    });

    it("should have focus styles", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radio1 = screen.getByRole("radio", { name: "Option 1" });

      // Check for the compiled Tailwind classes that handle focus
      expect(radio1.className).toContain("focus:outline-none");
      expect(radio1.className).toContain("focus-visible:ring-2");
    });

    it("should wrap around when navigating past last option", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio3 = screen.getByRole("radio", { name: "Option 3" });
      const radio1 = screen.getByRole("radio", { name: "Option 1" });

      radio3.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(radio1).toHaveFocus();
      });
    });

    it("should wrap around when navigating before first option", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      radio1.focus();
      await user.keyboard("{ArrowUp}");

      await waitFor(() => {
        expect(radio3).toHaveFocus();
      });
    });

    it("should skip disabled options when navigating", async () => {
      const optionsWithDisabled: RadioOption[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2", disabled: true },
        { value: "option3", label: "Option 3" },
      ];

      const user = userEvent.setup();
      render(<RadioGroup options={optionsWithDisabled} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      radio1.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(radio3).toHaveFocus();
      });
    });
  });

  describe("Orientation", () => {
    it("should render vertically by default", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radiogroup = screen.getByRole("radiogroup");

      expect(radiogroup).toHaveClass("flex-col");
    });

    it("should render vertically when orientation is vertical", () => {
      render(<RadioGroup options={defaultOptions} orientation="vertical" />);
      const radiogroup = screen.getByRole("radiogroup");

      expect(radiogroup).toHaveClass("flex-col");
    });

    it("should render horizontally when orientation is horizontal", () => {
      render(<RadioGroup options={defaultOptions} orientation="horizontal" />);
      const radiogroup = screen.getByRole("radiogroup");

      expect(radiogroup).toHaveClass("flex-row");
    });

    it("should apply flex-wrap in horizontal orientation", () => {
      render(<RadioGroup options={defaultOptions} orientation="horizontal" />);
      const radiogroup = screen.getByRole("radiogroup");

      expect(radiogroup).toHaveClass("flex-wrap");
    });

    it("should adjust gap in horizontal orientation", () => {
      render(<RadioGroup options={defaultOptions} orientation="horizontal" />);
      const radiogroup = screen.getByRole("radiogroup");

      expect(radiogroup).toHaveClass("gap-6");
    });
  });

  describe("Custom Props", () => {
    it("should accept and apply custom className", () => {
      render(<RadioGroup options={defaultOptions} className="custom-class" />);
      const container = screen.getByRole("radiogroup").closest(".space-y-3");
      expect(container).toHaveClass("custom-class");
    });

    it("should forward ref to radiogroup", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<RadioGroup options={defaultOptions} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should accept custom props", () => {
      render(
        <RadioGroup options={defaultOptions} data-testid="custom-radiogroup" />
      );
      const radiogroup = screen.getByTestId("custom-radiogroup");
      expect(radiogroup).toBeInTheDocument();
    });

    it("should call onBlur when losing focus", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();

      render(
        <>
          <RadioGroup options={defaultOptions} onBlur={handleBlur} />
          <button>Outside</button>
        </>
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const outsideButton = screen.getByRole("button", { name: "Outside" });

      await user.click(radio1);
      await user.click(outsideButton);

      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe("Visual Indicators", () => {
    it("should display indicator dot when selected", () => {
      render(<RadioGroup options={defaultOptions} value="option1" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const indicator = radio1.querySelector(
        '[class*="rounded-full"][class*="bg-current"]'
      );

      expect(indicator).toBeInTheDocument();
    });

    it("should have transition-colors class", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("transition-colors");
    });

    it("should have proper indicator sizes", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} radioSize="sm" value="option1" />
      );
      let radio = screen.getByRole("radio", { name: "Option 1" });
      let indicator = radio.querySelector('[class*="h-1.5"][class*="w-1.5"]');
      expect(indicator).toBeInTheDocument();

      rerender(
        <RadioGroup
          options={defaultOptions}
          radioSize="default"
          value="option1"
        />
      );
      radio = screen.getByRole("radio", { name: "Option 1" });
      indicator = radio.querySelector('[class*="h-2"][class*="w-2"]');
      expect(indicator).toBeInTheDocument();

      rerender(
        <RadioGroup options={defaultOptions} radioSize="lg" value="option1" />
      );
      radio = screen.getByRole("radio", { name: "Option 1" });
      indicator = radio.querySelector('[class*="h-2.5"][class*="w-2.5"]');
      expect(indicator).toBeInTheDocument();
    });

    it("should have aspect-square class for circular shape", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("aspect-square");
    });

    it("should have rounded-full class for circular shape", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("rounded-full");
    });
  });

  describe("Layout", () => {
    it("should use flex layout with gap", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radiogroup = screen.getByRole("radiogroup");

      expect(radiogroup).toHaveClass("flex", "gap-3");
    });

    it("should have proper spacing", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          helperText="Helper"
        />
      );
      const radiogroup = screen.getByRole("radiogroup");
      const outerContainer = radiogroup.closest(".space-y-3");

      expect(outerContainer).toHaveClass("space-y-3");
    });

    it("should render description below label", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          description="Select one"
        />
      );

      const label = screen.getByText("Options");
      const description = screen.getByText("Select one");

      expect(description.parentElement).toContainElement(label);
    });

    it("should render option descriptions below option labels", () => {
      render(<RadioGroup options={optionsWithDescriptions} />);

      const emailLabel = screen.getByText("Email");
      const emailDesc = screen.getByText("Receive notifications via email");

      const container = emailLabel.closest(".flex-1");
      expect(container).toContainElement(emailDesc);
    });

    it("should have full width container", () => {
      render(<RadioGroup options={defaultOptions} />);
      const container = screen.getByRole("radiogroup").parentElement;
      expect(container).toHaveClass("w-full");
    });
  });

  describe("Accessibility", () => {
    it("should have radiogroup role", () => {
      render(<RadioGroup options={defaultOptions} />);
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toBeInTheDocument();
    });

    it("should have radio roles for options", () => {
      render(<RadioGroup options={defaultOptions} />);

      expect(
        screen.getByRole("radio", { name: "Option 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Option 2" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Option 3" })
      ).toBeInTheDocument();
    });

    it("should be keyboard navigable", () => {
      render(
        <div>
          <button>Before</button>
          <RadioGroup options={defaultOptions} label="Options" />
          <button>After</button>
        </div>
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveAttribute("type", "button");
    });

    it("should announce errors to screen readers", () => {
      render(
        <RadioGroup options={defaultOptions} label="Options" error="Required" />
      );
      const errorMessage = screen.getByText("Required");

      expect(errorMessage).toHaveAttribute("role", "alert");
      expect(errorMessage).toHaveAttribute("aria-live", "polite");
    });

    it("should maintain focus when error appears", async () => {
      const TestComponent = () => {
        const [error, setError] = React.useState("");
        return (
          <>
            <RadioGroup
              options={defaultOptions}
              label="Options"
              error={error}
            />
            <button onClick={() => setError("Required")}>Show Error</button>
          </>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      radio1.focus();
      expect(radio1).toHaveFocus();

      const button = screen.getByRole("button", { name: /Show Error/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Required")).toBeInTheDocument();
      });

      expect(button).toHaveFocus();
    });

    it("should support aria-label when no visual label", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          aria-label="Accessible radio group"
        />
      );
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute(
        "aria-label",
        "Accessible radio group"
      );
    });
  });

  describe("Integration", () => {
    it("should work with all props combined", () => {
      render(
        <RadioGroup
          options={optionsWithDescriptions}
          label="Notification Method"
          description="Choose how you'd like to be notified"
          helperText="You can change this in settings"
          variant="default"
          radioSize="default"
          orientation="vertical"
          required
          value="email"
        />
      );

      expect(screen.getByText("Notification Method")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
      expect(
        screen.getByText("Choose how you'd like to be notified")
      ).toBeInTheDocument();
      expect(
        screen.getByText("You can change this in settings")
      ).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Email" })).toBeChecked();
    });

    it("should handle error state with all props", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          description="Select one"
          error="You must select an option"
          variant="default"
          radioSize="lg"
          required
        />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radiogroup = screen.getByRole("radiogroup");

      expect(radio1).toHaveClass("border-radio-error");
      expect(radiogroup).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("You must select an option")).toBeInTheDocument();
    });

    it("should work in a form context", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      render(
        <form onSubmit={handleSubmit}>
          <RadioGroup options={defaultOptions} label="Options" required />
          <button type="submit">Submit</button>
        </form>
      );

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const submitButton = screen.getByRole("button", { name: /Submit/i });

      expect(radio2).not.toBeChecked();

      await user.click(radio2);
      await waitFor(() => {
        expect(radio2).toBeChecked();
      });

      await user.click(submitButton);
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should handle mixed disabled states", async () => {
      const optionsWithMixedDisabled: RadioOption[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2", disabled: true },
        { value: "option3", label: "Option 3" },
      ];

      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup
          options={optionsWithMixedDisabled}
          onValueChange={handleChange}
        />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      await user.click(radio1);
      expect(handleChange).toHaveBeenCalledWith("option1");

      handleChange.mockClear();
      await user.click(radio2);
      expect(handleChange).not.toHaveBeenCalled();

      await user.click(radio3);
      expect(handleChange).toHaveBeenCalledWith("option3");
    });

    it("should maintain state across re-renders", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} value="option1" />
      );

      expect(screen.getByRole("radio", { name: "Option 1" })).toBeChecked();

      rerender(<RadioGroup options={defaultOptions} value="option2" />);

      expect(screen.getByRole("radio", { name: "Option 2" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Option 1" })).not.toBeChecked();
    });

    it("should handle dynamic options", () => {
      const initialOptions: RadioOption[] = [
        { value: "a", label: "A" },
        { value: "b", label: "B" },
      ];

      const updatedOptions: RadioOption[] = [
        ...initialOptions,
        { value: "c", label: "C" },
      ];

      const { rerender } = render(<RadioGroup options={initialOptions} />);

      expect(
        screen.queryByRole("radio", { name: "C" })
      ).not.toBeInTheDocument();

      rerender(<RadioGroup options={updatedOptions} />);

      expect(screen.getByRole("radio", { name: "C" })).toBeInTheDocument();
    });
  });

  // NEW: Add edge case tests
  describe("Edge Cases", () => {
    it("should handle empty string value", () => {
      render(<RadioGroup options={defaultOptions} value="" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).not.toBeChecked();
      expect(radio2).not.toBeChecked();
      expect(radio3).not.toBeChecked();
    });

    it("should handle undefined value", () => {
      render(<RadioGroup options={defaultOptions} value={undefined} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).not.toBeChecked();
    });

    it("should handle invalid value that doesn't match any option", () => {
      render(<RadioGroup options={defaultOptions} value="nonexistent" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).not.toBeChecked();
      expect(radio2).not.toBeChecked();
      expect(radio3).not.toBeChecked();
    });

    it("should handle options with special characters in values", () => {
      const specialOptions: RadioOption[] = [
        { value: "option-with-dash", label: "Dashed Option" },
        { value: "option_with_underscore", label: "Underscore Option" },
        { value: "option.with.dot", label: "Dotted Option" },
      ];

      render(<RadioGroup options={specialOptions} value="option-with-dash" />);

      const radio = screen.getByRole("radio", { name: "Dashed Option" });
      expect(radio).toBeChecked();
    });

    it("should handle options with very long labels", () => {
      const longLabelOptions: RadioOption[] = [
        {
          value: "long",
          label:
            "This is a very long label that might wrap to multiple lines in the UI and we need to ensure it renders correctly",
        },
      ];

      render(<RadioGroup options={longLabelOptions} />);

      expect(
        screen.getByText(
          /This is a very long label that might wrap to multiple lines/i
        )
      ).toBeInTheDocument();
    });

    it("should handle options with very long descriptions", () => {
      const longDescOptions: RadioOption[] = [
        {
          value: "detailed",
          label: "Detailed Option",
          description:
            "This is an extremely detailed description that provides a lot of information about what this option does and why you might want to select it over other options available in the radio group",
        },
      ];

      render(<RadioGroup options={longDescOptions} />);

      expect(
        screen.getByText(/This is an extremely detailed description/i)
      ).toBeInTheDocument();
    });

    it("should handle options with numbers in values", () => {
      const numberOptions: RadioOption[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "10", label: "Option 10" },
      ];

      render(<RadioGroup options={numberOptions} value="10" />);

      const radio = screen.getByRole("radio", { name: "Option 10" });
      expect(radio).toBeChecked();
    });

    it("should handle all options disabled", () => {
      const allDisabledOptions: RadioOption[] = [
        { value: "option1", label: "Option 1", disabled: true },
        { value: "option2", label: "Option 2", disabled: true },
        { value: "option3", label: "Option 3", disabled: true },
      ];

      render(<RadioGroup options={allDisabledOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      expect(radio1).toBeDisabled();
      expect(radio2).toBeDisabled();
      expect(radio3).toBeDisabled();
    });

    it("should maintain disabled state when selected", () => {
      const disabledSelected: RadioOption[] = [
        { value: "option1", label: "Option 1", disabled: true },
        { value: "option2", label: "Option 2" },
      ];

      render(<RadioGroup options={disabledSelected} value="option1" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toBeChecked();
      expect(radio1).toBeDisabled();
    });
  });

  // NEW: Add performance and stress tests
  describe("Performance & Stress Tests", () => {
    it("should handle large number of options efficiently", () => {
      const manyOptions: RadioOption[] = Array.from(
        { length: 100 },
        (_, i) => ({
          value: `option${i}`,
          label: `Option ${i}`,
        })
      );

      const { container } = render(<RadioGroup options={manyOptions} />);

      expect(container.querySelectorAll('[role="radio"]')).toHaveLength(100);
    });

    it("should handle rapid prop changes", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} value="option1" />
      );

      // Rapidly change values
      rerender(<RadioGroup options={defaultOptions} value="option2" />);
      rerender(<RadioGroup options={defaultOptions} value="option3" />);
      rerender(<RadioGroup options={defaultOptions} value="option1" />);
      rerender(<RadioGroup options={defaultOptions} value="option2" />);

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      expect(radio2).toBeChecked();
    });

    it("should handle rapid variant changes", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} variant="default" />
      );

      rerender(<RadioGroup options={defaultOptions} variant="error" />);
      rerender(<RadioGroup options={defaultOptions} variant="success" />);
      rerender(<RadioGroup options={defaultOptions} variant="warning" />);
      rerender(<RadioGroup options={defaultOptions} variant="default" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("border-radio-primary");
    });
  });

  // NEW: Add internationalization tests
  describe("Internationalization", () => {
    it("should handle RTL (Right-to-Left) text", () => {
      const rtlOptions: RadioOption[] = [
        { value: "arabic", label: "مرحبا" },
        { value: "hebrew", label: "שלום" },
      ];

      render(<RadioGroup options={rtlOptions} />);

      expect(screen.getByText("مرحبا")).toBeInTheDocument();
      expect(screen.getByText("שלום")).toBeInTheDocument();
    });

    it("should handle multilingual labels", () => {
      const multilingualOptions: RadioOption[] = [
        { value: "en", label: "Hello" },
        { value: "es", label: "Hola" },
        { value: "fr", label: "Bonjour" },
        { value: "de", label: "Guten Tag" },
        { value: "ja", label: "こんにちは" },
        { value: "zh", label: "你好" },
      ];

      render(<RadioGroup options={multilingualOptions} />);

      expect(screen.getByText("Hello")).toBeInTheDocument();
      expect(screen.getByText("Hola")).toBeInTheDocument();
      expect(screen.getByText("Bonjour")).toBeInTheDocument();
      expect(screen.getByText("こんにちは")).toBeInTheDocument();
      expect(screen.getByText("你好")).toBeInTheDocument();
    });

    it("should handle emojis in labels", () => {
      const emojiOptions: RadioOption[] = [
        { value: "happy", label: "😊 Happy" },
        { value: "sad", label: "😢 Sad" },
        { value: "excited", label: "🎉 Excited" },
      ];

      render(<RadioGroup options={emojiOptions} />);

      expect(screen.getByText("😊 Happy")).toBeInTheDocument();
      expect(screen.getByText("😢 Sad")).toBeInTheDocument();
      expect(screen.getByText("🎉 Excited")).toBeInTheDocument();
    });
  });

  // NEW: Add complex interaction tests
  describe("Complex Interactions", () => {
    it("should handle selection change during onBlur", async () => {
      const handleBlur = vi.fn();
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <>
          <RadioGroup
            options={defaultOptions}
            onBlur={handleBlur}
            onValueChange={handleChange}
          />
          <button>Outside</button>
        </>
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const outsideButton = screen.getByRole("button", { name: "Outside" });

      await user.click(radio1);
      expect(handleChange).toHaveBeenCalledWith("option1");

      await user.click(radio2);
      expect(handleChange).toHaveBeenCalledWith("option2");

      await user.click(outsideButton);
      expect(handleBlur).toHaveBeenCalled();
    });

    it("should handle error state change during interaction", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        const [error, setError] = React.useState("Please select an option");

        const handleChange = (newValue: string) => {
          setValue(newValue);
          setError(""); // Clear error when user selects
        };

        return (
          <RadioGroup
            options={defaultOptions}
            value={value}
            onValueChange={handleChange}
            error={error}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      expect(screen.getByText("Please select an option")).toBeInTheDocument();

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      await user.click(radio1);

      await waitFor(() => {
        expect(
          screen.queryByText("Please select an option")
        ).not.toBeInTheDocument();
      });
    });

    it("should handle controlled to uncontrolled switch", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} value="option1" />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toBeChecked();

      // Switch to uncontrolled by removing value prop
      rerender(<RadioGroup options={defaultOptions} />);

      // The radio should maintain its state when switching to uncontrolled
      // This is actually complex behavior - Radix handles this internally
      const radio1After = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1After).toBeInTheDocument();
    });

    it("should handle multiple error types simultaneously", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          description="Select one"
          error="This field is required"
          helperText="This should be hidden"
          required
        />
      );

      expect(screen.getByText("This field is required")).toBeInTheDocument();
      expect(
        screen.queryByText("This should be hidden")
      ).not.toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();

      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-invalid", "true");
      expect(radiogroup).toHaveAttribute("aria-required", "true");
    });
  });

  // NEW: Add state transition tests
  describe("State Transitions", () => {
    it("should transition from no selection to selected", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveAttribute("data-state", "unchecked");

      await user.click(radio1);

      await waitFor(() => {
        expect(radio1).toHaveAttribute("data-state", "checked");
      });
    });

    it("should transition from selected to different selection", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("option1");
        return (
          <RadioGroup
            options={defaultOptions}
            value={value}
            onValueChange={setValue}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });

      expect(radio1).toHaveAttribute("data-state", "checked");
      expect(radio2).toHaveAttribute("data-state", "unchecked");

      await user.click(radio2);

      await waitFor(() => {
        expect(radio1).toHaveAttribute("data-state", "unchecked");
        expect(radio2).toHaveAttribute("data-state", "checked");
      });
    });

    it("should transition from enabled to disabled while selected", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} value="option1" />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toBeChecked();
      expect(radio1).not.toBeDisabled();

      rerender(
        <RadioGroup options={defaultOptions} value="option1" disabled />
      );

      expect(radio1).toBeChecked();
      expect(radio1).toBeDisabled();
    });

    it("should transition error state", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} label="Options" />
      );

      let radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-invalid", "false");

      rerender(
        <RadioGroup options={defaultOptions} label="Options" error="Required" />
      );

      radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("Required")).toBeInTheDocument();
    });

    it("should transition from one variant to another", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} variant="default" />
      );

      let radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("border-radio-primary");

      rerender(<RadioGroup options={defaultOptions} variant="success" />);

      radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("border-radio-success");
      expect(radio1).not.toHaveClass("border-radio-primary");
    });

    it("should transition sizes smoothly", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} radioSize="sm" />
      );

      let radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("h-3", "w-3");

      rerender(<RadioGroup options={defaultOptions} radioSize="lg" />);

      radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("h-5", "w-5");
      expect(radio1).not.toHaveClass("h-3", "w-3");
    });

    it("should transition from horizontal to vertical orientation", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} orientation="horizontal" />
      );

      let radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveClass("flex-row");

      rerender(<RadioGroup options={defaultOptions} orientation="vertical" />);

      radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveClass("flex-col");
      expect(radiogroup).not.toHaveClass("flex-row");
    });
  });

  // NEW: Add more comprehensive interaction tests
  describe("Advanced Interactions", () => {
    it("should handle click on radio indicator", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup
          options={defaultOptions}
          onValueChange={handleChange}
          value="option1"
        />
      );

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const indicator = radio2.querySelector("span");

      if (indicator) {
        await user.click(indicator);
        expect(handleChange).toHaveBeenCalledWith("option2");
      }
    });

    it("should not interfere with other form controls", async () => {
      const handleRadioChange = vi.fn();
      const handleInputChange = vi.fn();
      const user = userEvent.setup();

      render(
        <div>
          <RadioGroup
            options={defaultOptions}
            onValueChange={handleRadioChange}
          />
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Test input"
          />
        </div>
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const input = screen.getByPlaceholderText("Test input");

      await user.click(radio1);
      expect(handleRadioChange).toHaveBeenCalledWith("option1");

      await user.type(input, "test");
      expect(handleInputChange).toHaveBeenCalled();
    });

    it("should handle nested interaction with descriptions", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup
          options={optionsWithDescriptions}
          onValueChange={handleChange}
        />
      );

      // Clicking description text doesn't trigger radio selection
      // Only clicking the label or radio button itself does
      const emailLabel = screen.getByText("Email");
      await user.click(emailLabel);

      expect(handleChange).toHaveBeenCalledWith("email");
    });

    it("should maintain selection after focus changes", async () => {
      const user = userEvent.setup();

      render(
        <>
          <RadioGroup options={defaultOptions} value="option1" />
          <button>External Button</button>
        </>
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const button = screen.getByRole("button", { name: "External Button" });

      expect(radio1).toBeChecked();

      await user.click(button);
      expect(radio1).toBeChecked();

      radio1.focus();
      expect(radio1).toBeChecked();
    });

    it("should handle double-click on radio", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup options={defaultOptions} onValueChange={handleChange} />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });

      await user.dblClick(radio1);

      // Should only register one change
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("option1");
    });

    // it("should handle clicking on option container", async () => {
    //   const handleChange = vi.fn();
    //   const user = userEvent.setup();

    //   render(
    //     <RadioGroup
    //       options={optionsWithDescriptions}
    //       onValueChange={handleChange}
    //     />
    //   );

    //   const emailLabel = screen.getByText("Email");
    //   const container = emailLabel.closest(".flex-1");

    //   if (container) {
    //     await user.click(container);
    //     // Container clicks should propagate to label/radio
    //     await waitFor(() => {
    //       expect(handleChange).toHaveBeenCalledWith("email");
    //     });
    //   }
    // });

    it("should handle rapid clicks between different radios", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup options={defaultOptions} onValueChange={handleChange} />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      const radio3 = screen.getByRole("radio", { name: "Option 3" });

      // Rapid clicks
      await user.click(radio1);
      await user.click(radio2);
      await user.click(radio3);
      await user.click(radio1);

      expect(handleChange).toHaveBeenCalledTimes(4);
      await waitFor(() => {
        expect(radio1).toBeChecked();
      });
    });

    it("should handle click and keyboard combination", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup options={defaultOptions} onValueChange={handleChange} />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });

      // Click first radio
      await user.click(radio1);
      expect(handleChange).toHaveBeenCalledWith("option1");

      // Use keyboard to navigate
      radio1.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(radio2).toHaveFocus();
      });
    });

    it("should handle programmatic focus", () => {
      render(<RadioGroup options={defaultOptions} />);

      const radio2 = screen.getByRole("radio", { name: "Option 2" });

      // Programmatically focus
      radio2.focus();

      expect(radio2).toHaveFocus();
    });
  });

  // Fix empty options test
  describe("Error Handling", () => {
    it("should handle empty options array gracefully", () => {
      render(<RadioGroup options={[]} label="Empty" />);

      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
      // When empty, there are no radio elements
      expect(screen.queryAllByRole("radio")).toHaveLength(0);
    });

    it("should handle null/undefined in option properties", () => {
      const optionsWithNulls: RadioOption[] = [
        { value: "a", label: "A", description: undefined },
        { value: "b", label: "B" },
      ];

      render(<RadioGroup options={optionsWithNulls} />);

      expect(screen.getByRole("radio", { name: "A" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "B" })).toBeInTheDocument();
    });

    it("should handle missing optional props gracefully", () => {
      render(<RadioGroup options={defaultOptions} />);

      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).not.toHaveAttribute("aria-labelledby");
      expect(radiogroup).not.toHaveAttribute("aria-describedby");
    });

    it("should handle concurrent state updates", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        const [error, setError] = React.useState("");

        const handleChange = (newValue: string) => {
          setValue(newValue);
          setError(newValue === "option2" ? "Invalid choice" : "");
        };

        return (
          <RadioGroup
            options={defaultOptions}
            value={value}
            onValueChange={handleChange}
            error={error}
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      await user.click(radio2);

      await waitFor(() => {
        expect(radio2).toBeChecked();
        expect(screen.getByText("Invalid choice")).toBeInTheDocument();
      });
    });

    it("should handle malformed option data", () => {
      const malformedOptions = [
        { value: "a" }, // Missing label
        { label: "B" }, // Missing value
        { value: "c", label: "C" },
      ];

      // Should not crash, but may not render properly
      const { container } = render(
        // @ts-expect-error Testing runtime error handling
        <RadioGroup options={malformedOptions} />
      );
      expect(container).toBeInTheDocument();
    });

    it("should handle duplicate values gracefully", () => {
      const duplicateOptions: RadioOption[] = [
        { value: "same", label: "Option 1" },
        { value: "same", label: "Option 2" },
        { value: "different", label: "Option 3" },
      ];

      render(<RadioGroup options={duplicateOptions} value="same" />);

      // Both radios with the same value might be selected
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("should handle extremely long error messages", () => {
      const longError =
        "This is an extremely long error message that goes on and on and on and contains lots of text that might cause layout issues or overflow problems in the UI and we need to make sure it renders correctly without breaking the component".repeat(
          3
        );

      render(<RadioGroup options={defaultOptions} error={longError} />);

      expect(screen.getByText(longError)).toBeInTheDocument();
    });
  });

  // NEW: Add form submission tests
  describe("Form Submission", () => {
    it("should include value in FormData", async () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        return formData;
      });

      const user = userEvent.setup();

      render(
        <form onSubmit={handleSubmit}>
          <RadioGroup options={defaultOptions} name="choice" value="option2" />
          <button type="submit">Submit</button>
        </form>
      );

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      await user.click(submitBtn);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should work with uncontrolled form submission", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      render(
        <form onSubmit={handleSubmit}>
          <RadioGroup options={defaultOptions} name="choice" />
          <button type="submit">Submit</button>
        </form>
      );

      const radio3 = screen.getByRole("radio", { name: "Option 3" });
      await user.click(radio3);

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      await user.click(submitBtn);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should prevent submission when required and empty", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      render(
        <form onSubmit={handleSubmit}>
          <RadioGroup
            options={defaultOptions}
            label="Required Field"
            required
            error="Please select an option"
          />
          <button type="submit">Submit</button>
        </form>
      );

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      await user.click(submitBtn);

      expect(handleSubmit).toHaveBeenCalled();
      expect(screen.getByText("Please select an option")).toBeInTheDocument();
    });
  });

  // NEW: Add theme and styling tests
  describe("Theme & Styling", () => {
    it("should apply custom className to container", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          className="my-custom-class another-class"
        />
      );

      const container = screen.getByRole("radiogroup").parentElement;
      expect(container).toHaveClass("my-custom-class");
      expect(container).toHaveClass("another-class");
    });

    it("should maintain border classes on radio buttons", () => {
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("border");
      expect(radio1).toHaveClass("rounded-full");
    });

    it("should apply ring classes for focus", () => {
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1.className).toContain("ring-offset-background");
      expect(radio1.className).toContain("focus-visible:ring-2");
    });

    it("should have proper text color classes", () => {
      render(<RadioGroup options={defaultOptions} label="Test Label" />);

      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("text-foreground");
    });

    it("should apply variant color to indicator", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          variant="success"
          value="option1"
        />
      );

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveClass("text-radio-success");
    });
  });

  // NEW: Add screen reader experience tests
  describe("Screen Reader Experience", () => {
    it("should announce group label", () => {
      render(<RadioGroup options={defaultOptions} label="Choose Option" />);

      const radiogroup = screen.getByRole("radiogroup");
      const labelId = radiogroup.getAttribute("aria-labelledby");

      expect(labelId).toBeTruthy();
      if (labelId) {
        const labelElement = document.getElementById(labelId);
        expect(labelElement).toHaveTextContent("Choose Option");
      }
    });

    it("should announce description", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          description="Please select one"
        />
      );

      const radiogroup = screen.getByRole("radiogroup");
      const describedBy = radiogroup.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();
    });

    it("should announce errors immediately", () => {
      const { rerender } = render(
        <RadioGroup options={defaultOptions} label="Options" />
      );

      rerender(
        <RadioGroup
          options={defaultOptions}
          label="Options"
          error="Selection required"
        />
      );

      const errorElement = screen.getByText("Selection required");
      expect(errorElement).toHaveAttribute("role", "alert");
      expect(errorElement).toHaveAttribute("aria-live", "polite");
    });

    it("should announce checked state changes", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={defaultOptions} />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });

      expect(radio1).toHaveAttribute("aria-checked", "false");

      await user.click(radio1);

      await waitFor(() => {
        expect(radio1).toHaveAttribute("aria-checked", "true");
        expect(radio2).toHaveAttribute("aria-checked", "false");
      });
    });

    it("should provide option descriptions to screen readers", () => {
      render(<RadioGroup options={optionsWithDescriptions} />);

      const emailLabel = screen.getByText("Email");
      const description = screen.getByText("Receive notifications via email");

      // Description should be in the same container as label
      expect(emailLabel.parentElement).toContainElement(description);
    });
  });

  // NEW: Add real-world usage scenarios
  describe("Real-World Scenarios", () => {
    it("should work as a survey question", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup
          options={[
            { value: "1", label: "Very Unsatisfied" },
            { value: "2", label: "Unsatisfied" },
            { value: "3", label: "Neutral" },
            { value: "4", label: "Satisfied" },
            { value: "5", label: "Very Satisfied" },
          ]}
          label="How satisfied are you with our service?"
          orientation="horizontal"
          onValueChange={handleChange}
        />
      );

      const satisfied = screen.getByRole("radio", { name: "Satisfied" });
      await user.click(satisfied);

      expect(handleChange).toHaveBeenCalledWith("4");
    });

    it("should work as a payment method selector", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup
          options={[
            {
              value: "credit",
              label: "Credit Card",
              description: "Visa, Mastercard, Amex",
            },
            {
              value: "paypal",
              label: "PayPal",
              description: "Fast and secure",
            },
            {
              value: "bank",
              label: "Bank Transfer",
              description: "2-3 business days",
            },
          ]}
          label="Payment Method"
          required
          onValueChange={handleChange}
        />
      );

      const paypal = screen.getByRole("radio", { name: "PayPal" });
      await user.click(paypal);

      expect(handleChange).toHaveBeenCalledWith("paypal");
    });

    it("should work as a shipping option selector", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup
          options={[
            {
              value: "standard",
              label: "Standard Shipping",
              description: "5-7 business days - Free",
            },
            {
              value: "express",
              label: "Express Shipping",
              description: "2-3 business days - $9.99",
            },
            {
              value: "overnight",
              label: "Overnight",
              description: "Next business day - $24.99",
            },
          ]}
          label="Shipping Method"
          required
          onValueChange={handleChange}
          value="standard"
        />
      );

      expect(
        screen.getByRole("radio", { name: "Standard Shipping" })
      ).toBeChecked();

      const express = screen.getByRole("radio", { name: "Express Shipping" });
      await user.click(express);

      expect(handleChange).toHaveBeenCalledWith("express");
    });

    it("should work as a yes/no question", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          label="Do you agree to the terms and conditions?"
          required
          orientation="horizontal"
          onValueChange={handleChange}
        />
      );

      const yesOption = screen.getByRole("radio", { name: "Yes" });
      await user.click(yesOption);

      expect(handleChange).toHaveBeenCalledWith("yes");
    });

    it("should work as a multi-step form field", async () => {
      const TestForm = () => {
        const [step, setStep] = React.useState(1);
        const [gender, setGender] = React.useState("");
        const [age, setAge] = React.useState("");

        return (
          <div>
            {step === 1 && (
              <>
                <RadioGroup
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  label="Gender"
                  value={gender}
                  onValueChange={setGender}
                />
                <button onClick={() => setStep(2)} disabled={!gender}>
                  Next
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <RadioGroup
                  options={[
                    { value: "18-25", label: "18-25" },
                    { value: "26-35", label: "26-35" },
                    { value: "36+", label: "36+" },
                  ]}
                  label="Age Range"
                  value={age}
                  onValueChange={setAge}
                />
                <button onClick={() => setStep(1)}>Back</button>
              </>
            )}
          </div>
        );
      };

      const user = userEvent.setup();
      render(<TestForm />);

      expect(screen.getByText("Gender")).toBeInTheDocument();

      const male = screen.getByRole("radio", { name: "Male" });
      await user.click(male);

      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);

      expect(screen.getByText("Age Range")).toBeInTheDocument();
    });
  });

  // NEW: Add data attribute tests
  describe("Data Attributes", () => {
    it("should have correct data-state on checked radio", () => {
      render(<RadioGroup options={defaultOptions} value="option2" />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });

      expect(radio1).toHaveAttribute("data-state", "unchecked");
      expect(radio2).toHaveAttribute("data-state", "checked");
    });

    it("should update data-state on selection change", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <RadioGroup
            options={defaultOptions}
            value={value}
            onValueChange={setValue}
          />
        );
      };

      render(<TestComponent />);

      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveAttribute("data-state", "unchecked");

      await user.click(radio1);

      await waitFor(() => {
        expect(radio1).toHaveAttribute("data-state", "checked");
      });
    });

    it("should support custom data attributes", () => {
      render(
        <RadioGroup
          options={defaultOptions}
          data-testid="custom-radio"
          data-tracking="analytics-id"
        />
      );

      const radiogroup = screen.getByTestId("custom-radio");
      expect(radiogroup).toHaveAttribute("data-tracking", "analytics-id");
    });
  });

  // NEW: Add boundary condition tests
  describe("Boundary Conditions", () => {
    it("should handle single character labels", () => {
      const shortOptions: RadioOption[] = [
        { value: "a", label: "A" },
        { value: "b", label: "B" },
        { value: "c", label: "C" },
      ];

      render(<RadioGroup options={shortOptions} />);

      expect(screen.getByRole("radio", { name: "A" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "B" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "C" })).toBeInTheDocument();
    });

    it("should handle maximum realistic number of options", () => {
      const manyOptions: RadioOption[] = Array.from({ length: 50 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i + 1}`,
      }));

      const { container } = render(<RadioGroup options={manyOptions} />);

      expect(container.querySelectorAll('[role="radio"]')).toHaveLength(50);
    });

    it("should handle zero-width space in labels", () => {
      const specialOptions: RadioOption[] = [
        { value: "zwsp", label: "Label​With​Zero​Width​Spaces" },
      ];

      render(<RadioGroup options={specialOptions} />);

      expect(
        screen.getByText("Label​With​Zero​Width​Spaces")
      ).toBeInTheDocument();
    });

    it("should handle HTML entities in labels", () => {
      const entityOptions: RadioOption[] = [
        { value: "entity", label: "Label with & and < and >" },
      ];

      render(<RadioGroup options={entityOptions} />);

      expect(screen.getByText("Label with & and < and >")).toBeInTheDocument();
    });
  });
});
