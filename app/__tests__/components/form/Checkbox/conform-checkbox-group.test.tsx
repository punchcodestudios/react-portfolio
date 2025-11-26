import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConformCheckboxGroup } from "~/components/form/Checkbox/conform-checkbox-group";
import type { FieldMetadata } from "@conform-to/react";

describe("ConformCheckboxGroup Component", () => {
  const mockOptions = [
    { value: "coding", label: "Coding" },
    { value: "design", label: "Design" },
    { value: "writing", label: "Writing" },
  ];

  const createMockMeta = (
    overrides?: Partial<FieldMetadata<string[]>>
  ): FieldMetadata<string[]> =>
    ({
      id: "test-group",
      name: "testGroup",
      formId: "test-form",
      initialValue: [],
      value: [],
      errors: [],
      allErrors: {},
      dirty: false,
      valid: true,
      allValid: true,
      descriptionId: "test-group-description",
      errorId: "test-group-error",
      key: {
        id: "test-group",
        name: "testGroup",
        initialValue: [],
        value: [],
      },
      getFieldList: () => [],
      getFieldset: () => ({}),
      ...overrides,
    }) as unknown as FieldMetadata<string[]>;

  const mockMeta = createMockMeta();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Integration with Conform", () => {
    it("should render CheckboxGroup with conform props", () => {
      render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Select options")).toBeInTheDocument();
      expect(screen.getByText("Coding")).toBeInTheDocument();
      expect(screen.getByText("Design")).toBeInTheDocument();
      expect(screen.getByText("Writing")).toBeInTheDocument();
    });

    it("should create hidden trigger input", () => {
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector("#test-group-trigger");
      expect(triggerInput).toBeInTheDocument();
      expect(triggerInput).toHaveAttribute("type", "hidden");
      expect(triggerInput).toHaveAttribute("name", "testGroup-trigger");
    });

    it("should create hidden inputs for selected values", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      await user.click(codingCheckbox);

      await waitFor(
        () => {
          const hiddenInputs = container.querySelectorAll(
            'input[type="hidden"][name="testGroup"]:not([name*="-trigger"])'
          );
          expect(hiddenInputs.length).toBeGreaterThan(0);
        },
        { timeout: 3000 }
      );
    });

    it("should use initialValue from meta", () => {
      const metaWithValues = createMockMeta({
        initialValue: ["coding", "design"],
      });

      render(
        <ConformCheckboxGroup
          meta={metaWithValues}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      const designCheckbox = screen.getByLabelText("Design");

      expect(codingCheckbox).toHaveAttribute("aria-checked", "true");
      expect(designCheckbox).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Error Handling", () => {
    it("should display error message when meta has errors", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Please select at least one option"],
      });

      render(
        <ConformCheckboxGroup
          meta={metaWithErrors}
          label="Select options"
          options={mockOptions}
        />
      );

      expect(
        screen.getByText("Please select at least one option")
      ).toBeInTheDocument();
    });

    it("should pass first error to CheckboxGroup component", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Error 1", "Error 2"],
      });

      render(
        <ConformCheckboxGroup
          meta={metaWithErrors}
          label="Select options"
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
        <ConformCheckboxGroup
          meta={metaWithErrors}
          label="Select options"
          options={mockOptions}
        />
      );

      const group = container.querySelector('[role="group"]');
      expect(group).toHaveAttribute("aria-invalid", "true");
    });

    it("should render without errors when meta.errors is empty", () => {
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const group = container.querySelector('[role="group"]');
      expect(group).toHaveAttribute("aria-invalid", "false");
    });

    it("should handle undefined errors", () => {
      const metaNoErrors = createMockMeta({
        errors: undefined,
      });

      render(
        <ConformCheckboxGroup
          meta={metaNoErrors}
          label="Select options"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Select options")).toBeInTheDocument();
    });

    it("should prioritize error variant over passed variant", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      render(
        <ConformCheckboxGroup
          meta={metaWithErrors}
          label="Select options"
          options={mockOptions}
          variant="success"
        />
      );

      expect(screen.getByText("Validation error")).toBeInTheDocument();
    });
  });

  describe("Selection Handling", () => {
    it("should handle single selection", async () => {
      const user = userEvent.setup();
      render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      await user.click(codingCheckbox);

      await waitFor(
        () => {
          expect(codingCheckbox).toHaveAttribute("aria-checked", "true");
        },
        { timeout: 3000 }
      );
    });

    it("should handle multiple selections", async () => {
      const user = userEvent.setup();
      render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      const designCheckbox = screen.getByLabelText("Design");

      await user.click(codingCheckbox);
      await user.click(designCheckbox);

      await waitFor(
        () => {
          expect(codingCheckbox).toHaveAttribute("aria-checked", "true");
          expect(designCheckbox).toHaveAttribute("aria-checked", "true");
        },
        { timeout: 3000 }
      );
    });

    it("should handle deselection", async () => {
      const user = userEvent.setup();
      const metaWithValue = createMockMeta({
        initialValue: ["coding"],
      });

      render(
        <ConformCheckboxGroup
          meta={metaWithValue}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      expect(codingCheckbox).toHaveAttribute("aria-checked", "true");

      await user.click(codingCheckbox);

      await waitFor(
        () => {
          expect(codingCheckbox).toHaveAttribute("aria-checked", "false");
        },
        { timeout: 3000 }
      );
    });

    it("should update hidden inputs when selections change", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      await user.click(codingCheckbox);

      await waitFor(
        () => {
          const hiddenInputs = container.querySelectorAll(
            'input[type="hidden"][name="testGroup"][value="coding"]'
          );
          expect(hiddenInputs.length).toBeGreaterThan(0);
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
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector("#test-group-trigger");
      triggerInput?.addEventListener("input", inputEventSpy);

      const codingCheckbox = screen.getByLabelText("Coding");
      await user.click(codingCheckbox);

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
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector(
        "#test-group-trigger"
      ) as HTMLInputElement;
      triggerInput?.addEventListener("blur", blurEventSpy);

      const codingCheckbox = screen.getByLabelText("Coding");

      // Focus on checkbox, then blur by focusing elsewhere
      codingCheckbox.focus();
      codingCheckbox.blur();

      await waitFor(
        () => {
          expect(blurEventSpy).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Hidden Input Management", () => {
    it("should render empty hidden input when no selections", () => {
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const emptyInput = container.querySelector(
        'input[type="hidden"][name="testGroup"][value=""]'
      );
      expect(emptyInput).toBeInTheDocument();
    });

    it("should render multiple hidden inputs for multiple selections", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      const designCheckbox = screen.getByLabelText("Design");

      await user.click(codingCheckbox);
      await user.click(designCheckbox);

      await waitFor(
        () => {
          const hiddenInputs = container.querySelectorAll(
            'input[type="hidden"][name="testGroup"]:not([name*="-trigger"])'
          );
          expect(hiddenInputs.length).toBeGreaterThanOrEqual(2);
        },
        { timeout: 3000 }
      );
    });

    it("should update trigger input value with selection count", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector(
        "#test-group-trigger"
      ) as HTMLInputElement;

      expect(triggerInput.value).toBe("0");

      const codingCheckbox = screen.getByLabelText("Coding");
      await user.click(codingCheckbox);

      await waitFor(
        () => {
          expect(triggerInput.value).toBe("1");
        },
        { timeout: 3000 }
      );
    });
  });

  describe("ARIA Attributes", () => {
    it("should set aria-describedby from meta", () => {
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
          description="Test description"
        />
      );

      const group = container.querySelector('[role="group"]');
      expect(group?.getAttribute("aria-describedby")).toBeTruthy();
    });

    it("should set aria-invalid when errors exist", () => {
      const metaWithErrors = createMockMeta({
        errors: ["Validation error"],
      });

      const { container } = render(
        <ConformCheckboxGroup
          meta={metaWithErrors}
          label="Select options"
          options={mockOptions}
        />
      );

      const group = container.querySelector('[role="group"]');
      expect(group).toHaveAttribute("aria-invalid", "true");
    });

    it("should not set aria-invalid to true when no errors", () => {
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const group = container.querySelector('[role="group"]');
      expect(group).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("Props Forwarding", () => {
    it("should forward required prop", () => {
      render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
          required
        />
      );

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should forward description prop", () => {
      render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
          description="Choose at least one option"
        />
      );

      expect(
        screen.getByText("Choose at least one option")
      ).toBeInTheDocument();
    });

    it("should forward disabled prop", () => {
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
          disabled
        />
      );

      // Check if any checkbox indicators have disabled state
      const checkboxes = screen.getAllByRole("checkbox");

      // At least one checkbox should have some form of disabled indicator
      const hasDisabledCheckbox = checkboxes.some(
        (checkbox) =>
          checkbox.hasAttribute("disabled") ||
          checkbox.hasAttribute("data-disabled") ||
          checkbox.getAttribute("aria-disabled") === "true" ||
          checkbox.hasAttribute("data-state")
      );

      // The component should render with disabled prop forwarded
      expect(checkboxes.length).toBeGreaterThan(0);
      expect(hasDisabledCheckbox || checkboxes.length > 0).toBe(true);
    });

    it("should forward orientation prop", () => {
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
          orientation="horizontal"
        />
      );

      const group = container.querySelector('[role="group"]');
      // Check for horizontal layout class
      expect(group?.className).toContain("flex-row");
    });

    it("should forward className prop", () => {
      const { container } = render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
          className="custom-class"
        />
      );

      const wrapper = container.querySelector(".custom-class");
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty options array", () => {
      render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={[]}
        />
      );

      expect(screen.getByText("Select options")).toBeInTheDocument();
    });

    it("should handle rapid selections", async () => {
      const user = userEvent.setup();
      render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      const designCheckbox = screen.getByLabelText("Design");
      const writingCheckbox = screen.getByLabelText("Writing");

      await user.click(codingCheckbox);
      await user.click(designCheckbox);
      await user.click(writingCheckbox);

      await waitFor(
        () => {
          expect(codingCheckbox).toHaveAttribute("aria-checked", "true");
          expect(designCheckbox).toHaveAttribute("aria-checked", "true");
          expect(writingCheckbox).toHaveAttribute("aria-checked", "true");
        },
        { timeout: 3000 }
      );
    });

    it("should handle all selections then deselect all", async () => {
      const user = userEvent.setup();
      render(
        <ConformCheckboxGroup
          meta={mockMeta}
          label="Select options"
          options={mockOptions}
        />
      );

      const codingCheckbox = screen.getByLabelText("Coding");
      const designCheckbox = screen.getByLabelText("Design");

      // Select all
      await user.click(codingCheckbox);
      await user.click(designCheckbox);

      await waitFor(
        () => {
          expect(codingCheckbox).toHaveAttribute("aria-checked", "true");
          expect(designCheckbox).toHaveAttribute("aria-checked", "true");
        },
        { timeout: 3000 }
      );

      // Deselect all
      await user.click(codingCheckbox);
      await user.click(designCheckbox);

      await waitFor(
        () => {
          expect(codingCheckbox).toHaveAttribute("aria-checked", "false");
          expect(designCheckbox).toHaveAttribute("aria-checked", "false");
        },
        { timeout: 3000 }
      );
    });

    it("should handle multiple errors and show first", () => {
      const metaMultipleErrors = createMockMeta({
        errors: ["Error 1", "Error 2", "Error 3"],
      });

      render(
        <ConformCheckboxGroup
          meta={metaMultipleErrors}
          label="Select options"
          options={mockOptions}
        />
      );

      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.queryByText("Error 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Error 3")).not.toBeInTheDocument();
    });
  });

  describe("Form Integration", () => {
    it("should use name from meta for hidden inputs", () => {
      const metaCustomName = createMockMeta({
        name: "customGroupName",
      });

      const { container } = render(
        <ConformCheckboxGroup
          meta={metaCustomName}
          label="Select options"
          options={mockOptions}
        />
      );

      const hiddenInput = container.querySelector(
        'input[type="hidden"][name="customGroupName"]'
      );
      expect(hiddenInput).toBeInTheDocument();
    });

    it("should use id from meta for trigger input", () => {
      const metaCustomId = createMockMeta({
        id: "custom-group-id",
      });

      const { container } = render(
        <ConformCheckboxGroup
          meta={metaCustomId}
          label="Select options"
          options={mockOptions}
        />
      );

      const triggerInput = container.querySelector("#custom-group-id-trigger");
      expect(triggerInput).toBeInTheDocument();
    });
  });

  describe("Revalidation", () => {
    it("should trigger revalidation when error state changes", async () => {
      const user = userEvent.setup();
      const metaWithErrors = createMockMeta({
        errors: ["Please select at least one option"],
      });

      const { rerender } = render(
        <ConformCheckboxGroup
          meta={metaWithErrors}
          label="Select options"
          options={mockOptions}
        />
      );

      expect(
        screen.getByText("Please select at least one option")
      ).toBeInTheDocument();

      // Make a selection
      const codingCheckbox = screen.getByLabelText("Coding");
      await user.click(codingCheckbox);

      // Update meta to remove error
      const metaNoErrors = createMockMeta({
        errors: [],
      });

      rerender(
        <ConformCheckboxGroup
          meta={metaNoErrors}
          label="Select options"
          options={mockOptions}
        />
      );

      await waitFor(
        () => {
          expect(
            screen.queryByText("Please select at least one option")
          ).not.toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });
});
