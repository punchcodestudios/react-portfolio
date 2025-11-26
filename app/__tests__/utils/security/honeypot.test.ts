import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  generateHoneypotField,
  validateHoneypot,
  useHoneypot,
} from "~/utils/security/honeypot";

vi.mock("~/service/logging", () => ({
  default: globalThis.mockLoggerService,
}));

describe("Honeypot Security", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("generateHoneypotField", () => {
    it("should generate field with timestamp-based name", () => {
      const field = generateHoneypotField();

      expect(field.fieldName).toBeDefined();
      expect(field.fieldName).toMatch(/^field_[A-Za-z0-9+/=]+$/);
      expect(field.timestamp).toBeGreaterThan(0);
    });

    it("should generate base64 encoded field names", () => {
      const field = generateHoneypotField();

      // Field name should be "field_" + base64 of timestamp (8 chars)
      expect(field.fieldName).toMatch(/^field_[A-Za-z0-9+/=]{8}$/);
    });

    it("should generate different field names over time", () => {
      const time1 = 1000000;
      vi.setSystemTime(time1);
      const field1 = generateHoneypotField();

      const time2 = 2000000;
      vi.setSystemTime(time2);
      const field2 = generateHoneypotField();

      expect(field1.fieldName).not.toBe(field2.fieldName);
      expect(field1.timestamp).toBe(time1);
      expect(field2.timestamp).toBe(time2);
      expect(field1.timestamp).toBeLessThan(field2.timestamp);
    });

    it("should use Date.now() for timestamp", () => {
      const now = 1500000000000;
      vi.setSystemTime(now);

      const field = generateHoneypotField();

      expect(field.timestamp).toBe(now);
    });
  });

  describe("validateHoneypot", () => {
    it("should return true when honeypot field is empty (human user)", () => {
      const formData = new FormData();
      formData.append("field_123_abc", "");

      const result = validateHoneypot(formData, "field_123_abc");

      expect(result).toBe(true);
    });

    it("should return true when honeypot field is null (not present)", () => {
      const formData = new FormData();

      const result = validateHoneypot(formData, "field_123_abc");

      expect(result).toBe(true);
    });

    it("should return false when honeypot field has value (bot detected)", () => {
      const formData = new FormData();
      formData.append("field_123_abc", "bot filled this");

      const result = validateHoneypot(formData, "field_123_abc");

      expect(result).toBe(false);
    });

    it("should handle whitespace-only values as filled (bot behavior)", () => {
      const formData = new FormData();
      formData.append("field_123_abc", "   ");

      const result = validateHoneypot(formData, "field_123_abc");

      // Note: Current implementation treats "   " as filled
      expect(result).toBe(false);
    });

    it("should handle string 'null' as filled", () => {
      const formData = new FormData();
      formData.append("field_123_abc", "null");

      const result = validateHoneypot(formData, "field_123_abc");

      expect(result).toBe(false);
    });

    it("should detect common bot patterns", () => {
      const botValues = [
        "http://example.com",
        "buy now",
        "click here",
        "<script>alert('xss')</script>",
      ];

      botValues.forEach((botValue) => {
        const formData = new FormData();
        formData.append("field_123_abc", botValue);

        const result = validateHoneypot(formData, "field_123_abc");
        expect(result).toBe(false);
      });
    });

    it("should handle number values as filled", () => {
      const formData = new FormData();
      formData.append("field_123_abc", "123");

      const result = validateHoneypot(formData, "field_123_abc");

      expect(result).toBe(false);
    });
  });

  describe("useHoneypot", () => {
    it("should return honeypot component and field name", () => {
      const { result } = renderHook(() => useHoneypot());

      expect(result.current.fieldName).toBeDefined();
      expect(result.current.fieldName).toMatch(/^field_[A-Za-z0-9+/=]{8}$/);
      expect(result.current.component).toBeDefined();
      expect(result.current.component.type).toBe("input");
    });

    it("should generate consistent field name within same render", () => {
      const { result, rerender } = renderHook(() => useHoneypot());
      const firstFieldName = result.current.fieldName;

      rerender();

      // Should be the same due to useState
      expect(result.current.fieldName).toBe(firstFieldName);
    });

    it("should have proper accessibility attributes to hide from users", () => {
      const { result } = renderHook(() => useHoneypot());

      expect(result.current.component.props).toMatchObject({
        "aria-hidden": "true",
        tabIndex: -1,
        autoComplete: "off",
      });
    });

    it("should render visually hidden input", () => {
      const { result } = renderHook(() => useHoneypot());

      expect(result.current.component.props.style).toMatchObject({
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
      });
    });

    it("should have appropriate input attributes", () => {
      const { result } = renderHook(() => useHoneypot());

      expect(result.current.component.props).toMatchObject({
        type: "text",
        name: expect.stringMatching(/^field_[A-Za-z0-9+/=]{8}$/),
      });
    });

    it("should generate different field names across different hook instances", () => {
      vi.setSystemTime(1000000);
      const { result: result1 } = renderHook(() => useHoneypot());

      vi.setSystemTime(2000000);
      const { result: result2 } = renderHook(() => useHoneypot());

      expect(result1.current.fieldName).not.toBe(result2.current.fieldName);
    });

    it("should create input element with correct name attribute", () => {
      const { result } = renderHook(() => useHoneypot());

      expect(result.current.component.props.name).toBe(
        result.current.fieldName
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle FormData with multiple fields", () => {
      const formData = new FormData();
      formData.append("name", "John Doe");
      formData.append("email", "john@example.com");
      formData.append("honeypot_field", "");
      formData.append("message", "Hello");

      const result = validateHoneypot(formData, "honeypot_field");

      expect(result).toBe(true);
    });

    it("should handle concurrent honeypot validations", () => {
      const formData1 = new FormData();
      const formData2 = new FormData();

      formData1.append("field_1", "");
      formData2.append("field_2", "bot value");

      const result1 = validateHoneypot(formData1, "field_1");
      const result2 = validateHoneypot(formData2, "field_2");

      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });

    it("should handle special characters in field names", () => {
      const formData = new FormData();
      formData.append("field-123_test", "");

      const result = validateHoneypot(formData, "field-123_test");

      expect(result).toBe(true);
    });

    it("should handle very long honeypot values", () => {
      const formData = new FormData();
      formData.append("field_test", "a".repeat(10000));

      const result = validateHoneypot(formData, "field_test");

      expect(result).toBe(false);
    });

    it("should handle unicode characters in honeypot value", () => {
      const formData = new FormData();
      formData.append("field_test", "Hello 世界 🌍");

      const result = validateHoneypot(formData, "field_test");

      expect(result).toBe(false);
    });
  });

  describe("Integration", () => {
    it("should work with hook-generated field name", () => {
      const { result } = renderHook(() => useHoneypot());
      const formData = new FormData();
      formData.append(result.current.fieldName, "");

      const isValid = validateHoneypot(formData, result.current.fieldName);

      expect(isValid).toBe(true);
    });

    it("should detect bot when using hook-generated field", () => {
      const { result } = renderHook(() => useHoneypot());
      const formData = new FormData();
      formData.append(result.current.fieldName, "bot value");

      const isValid = validateHoneypot(formData, result.current.fieldName);

      expect(isValid).toBe(false);
    });
  });
});
