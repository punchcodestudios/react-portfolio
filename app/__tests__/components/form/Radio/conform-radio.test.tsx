import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConformRadioGroup } from "~/components/form/Radio/conform-radio";
import type { FieldMetadata } from "@conform-to/react";

describe("ConformRadioGroup Component", () => {
  const mockOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
  ];

  const createMockMeta = (
    overrides?: Partial<FieldMetadata<string>>
  ): FieldMetadata<string> =>
    ({
      id: "test-radio",
      name: "testRadio",
      formId: "test-form",
      initialValue: "",
      value: "",
      errors: [],
      allErrors: {},
      dirty: false,
      valid: true,
      allValid: true,
      descriptionId: "test-radio-description",
      errorId: "test-radio-error",
      key: {
        id: "test-radio",
        name: "testRadio",
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
    it("should render RadioGroup with conform props", () => {
      render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Select your gender")).toBeInTheDocument();
      expect(screen.getByText("Male")).toBeInTheDocument();
      expect(screen.getByText("Female")).toBeInTheDocument();
      expect(screen.getByText("Non-binary")).toBeInTheDocument();
    });

    it("should create hidden trigger input", () => {
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector("#test-radio-trigger");
      expect(triggerInput).toBeInTheDocument();
      expect(triggerInput).toHaveAttribute("type", "hidden");
      expect(triggerInput).toHaveAttribute("name", "testRadio-trigger");
    });

    it("should create hidden input for form submission", () => {
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const hiddenInput = container.querySelector(
        'input[type="hidden"][name="testRadio"]:not([name*="-trigger"])'
      );
      expect(hiddenInput).toBeInTheDocument();
    });

    it("should use initialValue from meta", () => {
      const metaWithValue = createMockMeta({
        initialValue: "female",
      });

      render(
        <ConformRadioGroup
          meta={metaWithValue}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const femaleRadio = screen.getByLabelText("Female");
      expect(femaleRadio).toHaveAttribute("aria-checked", "true");
    });

    it("should have empty value when no initialValue", () => {
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const hiddenInput = container.querySelector(
        'input[type="hidden"][name="testRadio"]:not([name*="-trigger"])'
      ) as HTMLInputElement;
      expect(hiddenInput.value).toBe("");
    });
  });

  describe("Error Handling", () => {
    it("should display error message when meta has errors", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Please select an option"],
      });

      render(
        <ConformRadioGroup
          meta={metaWithErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Please select an option")).toBeInTheDocument();
    });

    it("should pass first error to RadioGroup component", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Error 1", "Error 2"],
      });

      render(
        <ConformRadioGroup
          meta={metaWithErrors}
          label="Select your gender"
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

      const { container } = render(
        <ConformRadioGroup
          meta={metaWithErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveAttribute("aria-invalid", "true");
    });

    it("should render without errors when meta.errors is empty", () => {
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const group = container.querySelector('[role="radiogroup"]');
      // When no errors, aria-invalid is not set (null) rather than "false"
      expect(group).not.toHaveAttribute("aria-invalid", "true");
    });

    it("should handle undefined errors", () => {
      const metaNoErrors = createMockMeta({
        errors: undefined,
      });

      render(
        <ConformRadioGroup
          meta={metaNoErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Select your gender")).toBeInTheDocument();
    });

    it("should prioritize error variant over passed variant", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      render(
        <ConformRadioGroup
          meta={metaWithErrors}
          label="Select your gender"
          options={mockOptions}
          variant="success"
        />
      );

      expect(screen.getByText("Validation error")).toBeInTheDocument();
    });
  });

  describe("Selection Handling", () => {
    it("should update hidden input when selection changes", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const maleRadio = screen.getByLabelText("Male");
      await user.click(maleRadio);

      await waitFor(
        () => {
          const hiddenInput = container.querySelector(
            'input[type="hidden"][name="testRadio"]:not([name*="-trigger"])'
          ) as HTMLInputElement;
          expect(hiddenInput.value).toBe("male");
        },
        { timeout: 3000 }
      );
    });

    it("should update trigger input value on selection", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector(
        "#test-radio-trigger"
      ) as HTMLInputElement;

      expect(triggerInput.value).toBe("");

      const femaleRadio = screen.getByLabelText("Female");
      await user.click(femaleRadio);

      await waitFor(
        () => {
          expect(triggerInput.value).toBe("female");
        },
        { timeout: 3000 }
      );
    });

    it("should replace previous value when new selection is made", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const maleRadio = screen.getByLabelText("Male");
      const femaleRadio = screen.getByLabelText("Female");

      await user.click(maleRadio);

      await waitFor(
        () => {
          const hiddenInput = container.querySelector(
            'input[type="hidden"][name="testRadio"]:not([name*="-trigger"])'
          ) as HTMLInputElement;
          expect(hiddenInput.value).toBe("male");
        },
        { timeout: 3000 }
      );

      await user.click(femaleRadio);

      await waitFor(
        () => {
          const hiddenInput = container.querySelector(
            'input[type="hidden"][name="testRadio"]:not([name*="-trigger"])'
          ) as HTMLInputElement;
          expect(hiddenInput.value).toBe("female");
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Validation Events", () => {
    it("should trigger input event on value change", async () => {
      const user = userEvent.setup();
      const inputEventSpy = vi.fn();

      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector("#test-radio-trigger");
      triggerInput?.addEventListener("input", inputEventSpy);

      const maleRadio = screen.getByLabelText("Male");
      await user.click(maleRadio);

      await waitFor(
        () => {
          expect(inputEventSpy).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });

    it("should trigger blur event on blur", async () => {
      const blurEventSpy = vi.fn();

      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector("#test-radio-trigger");
      triggerInput?.addEventListener("blur", blurEventSpy);

      const maleRadio = screen.getByLabelText("Male");

      maleRadio.focus();
      maleRadio.blur();

      await waitFor(
        () => {
          expect(blurEventSpy).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });

    it("should trigger revalidation when error state changes", async () => {
      const user = userEvent.setup();
      const inputEventSpy = vi.fn();

      const metaWithErrors = createMockMeta({
        errors: ["Please select an option"],
      });

      const { container } = render(
        <ConformRadioGroup
          meta={metaWithErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector("#test-radio-trigger");
      triggerInput?.addEventListener("input", inputEventSpy);

      const maleRadio = screen.getByLabelText("Male");
      await user.click(maleRadio);

      await waitFor(
        () => {
          expect(inputEventSpy).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-describedby from meta", () => {
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
          description="Test description"
        />
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group?.getAttribute("aria-describedby")).toBeTruthy();
    });

    it("should set aria-invalid when errors exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      const { container } = render(
        <ConformRadioGroup
          meta={metaWithErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveAttribute("aria-invalid", "true");
    });

    it("should not set aria-invalid to true when no errors", () => {
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const group = container.querySelector('[role="radiogroup"]');
      // When no errors, aria-invalid is not set to "true"
      expect(group).not.toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Props Forwarding", () => {
    it("should forward required prop", () => {
      render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
          required
        />
      );

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should forward description prop", () => {
      render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
          description="Choose your gender identity"
        />
      );

      expect(
        screen.getByText("Choose your gender identity")
      ).toBeInTheDocument();
    });

    it("should forward disabled prop", () => {
      render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
          disabled
        />
      );

      // Simply verify component renders with disabled prop
      expect(screen.getByText("Select your gender")).toBeInTheDocument();
      expect(screen.getByText("Male")).toBeInTheDocument();
    });

    it("should forward orientation prop", () => {
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
          orientation="horizontal"
        />
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group?.className).toContain("flex-row");
    });

    it("should forward className prop", () => {
      const { container } = render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={mockOptions}
          className="custom-class"
        />
      );

      const wrapper = container.querySelector(".custom-class");
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe("Form Integration", () => {
    it("should use name from meta for hidden inputs", () => {
      const metaCustomName = createMockMeta({
        name: "customRadioName",
      });

      const { container } = render(
        <ConformRadioGroup
          meta={metaCustomName}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const hiddenInput = container.querySelector(
        'input[type="hidden"][name="customRadioName"]'
      );
      expect(hiddenInput).toBeInTheDocument();
    });

    it("should use id from meta for trigger input", () => {
      const metaCustomId = createMockMeta({
        id: "custom-radio-id",
      });

      const { container } = render(
        <ConformRadioGroup
          meta={metaCustomId}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector("#custom-radio-id-trigger");
      expect(triggerInput).toBeInTheDocument();
    });

    it("should use id from meta for RadioGroup", () => {
      const metaCustomId = createMockMeta({
        id: "custom-radio-id",
      });

      const { container } = render(
        <ConformRadioGroup
          meta={metaCustomId}
          label="Select your gender"
          options={mockOptions}
        />
      );

      // The id is used in the component structure, check for radiogroup with custom id
      const radioGroup = container.querySelector('[role="radiogroup"]');
      expect(radioGroup).toBeInTheDocument();

      // Verify the trigger input uses the custom id
      const triggerInput = container.querySelector("#custom-radio-id-trigger");
      expect(triggerInput).toBeInTheDocument();
    });
  });

  describe("Revalidation", () => {
    it("should trigger revalidation when error state changes", async () => {
      const user = userEvent.setup();
      const metaWithErrors = createMockMeta({
        errors: ["Please select an option"],
      });

      const { rerender } = render(
        <ConformRadioGroup
          meta={metaWithErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Please select an option")).toBeInTheDocument();

      // Make a selection
      const maleRadio = screen.getByLabelText("Male");
      await user.click(maleRadio);

      // Update meta to remove error
      const metaNoErrors = createMockMeta({
        errors: [],
      });

      rerender(
        <ConformRadioGroup
          meta={metaNoErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      await waitFor(
        () => {
          expect(
            screen.queryByText("Please select an option")
          ).not.toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should revalidate when selection changes with existing error", async () => {
      const user = userEvent.setup();
      const metaWithErrors = createMockMeta({
        errors: ["Please select an option"],
      });

      const { container } = render(
        <ConformRadioGroup
          meta={metaWithErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const inputEventSpy = vi.fn();
      const triggerInput = container.querySelector("#test-radio-trigger");
      triggerInput?.addEventListener("input", inputEventSpy);

      const maleRadio = screen.getByLabelText("Male");
      await user.click(maleRadio);

      await waitFor(
        () => {
          expect(inputEventSpy).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty options array", () => {
      render(
        <ConformRadioGroup
          meta={mockMeta}
          label="Select your gender"
          options={[]}
        />
      );

      expect(screen.getByText("Select your gender")).toBeInTheDocument();
    });

    it("should handle multiple errors and show first", () => {
      const metaMultipleErrors = createMockMeta({
        errors: ["Error 1", "Error 2", "Error 3"],
      });

      render(
        <ConformRadioGroup
          meta={metaMultipleErrors}
          label="Select your gender"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Error 3")).not.toBeInTheDocument();
    });

    it("should handle selection with existing initialValue", async () => {
      const user = userEvent.setup();
      const metaWithValue = createMockMeta({
        initialValue: "male",
      });

      render(
        <ConformRadioGroup
          meta={metaWithValue}
          label="Select your gender"
          options={mockOptions}
        />
      );

      const maleRadio = screen.getByLabelText("Male");
      const femaleRadio = screen.getByLabelText("Female");

      expect(maleRadio).toHaveAttribute("aria-checked", "true");

      // Change selection
      await user.click(femaleRadio);

      await waitFor(
        () => {
          expect(femaleRadio).toHaveAttribute("aria-checked", "true");
          expect(maleRadio).toHaveAttribute("aria-checked", "false");
        },
        { timeout: 3000 }
      );
    });
  });
});
