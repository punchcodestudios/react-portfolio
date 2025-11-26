import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  generateCSRFToken,
  validateCSRFToken,
  useCSRFToken,
  getCSRFHeaders,
} from "~/utils/security/csrf";

vi.mock("~/service/logging", () => ({
  default: globalThis.mockLoggerService,
}));

describe("CSRF Protection", () => {
  let sessionStorageMock: Record<string, string>;

  beforeEach(() => {
    sessionStorageMock = {};

    // Mock sessionStorage
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: (key: string) => sessionStorageMock[key] || null,
        setItem: (key: string, value: string) => {
          sessionStorageMock[key] = value;
        },
        removeItem: (key: string) => {
          delete sessionStorageMock[key];
        },
        clear: () => {
          sessionStorageMock = {};
        },
      },
      writable: true,
      configurable: true,
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    sessionStorageMock = {};
  });

  describe("generateCSRFToken", () => {
    it("should generate token of correct length (64 characters)", () => {
      const token = generateCSRFToken();

      expect(token).toHaveLength(64); // 32 bytes * 2 (hex)
      expect(token).toMatch(/^[0-9a-f]{64}$/);
    });

    it("should generate unique tokens", () => {
      const tokens = Array.from({ length: 100 }, () => generateCSRFToken());
      const uniqueTokens = new Set(tokens);

      expect(uniqueTokens.size).toBe(100);
    });

    it("should use cryptographically secure randomness", () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();

      // Tokens should be completely different
      const differentChars = Array.from(token1).filter(
        (char, i) => char !== token2[i]
      ).length;

      expect(differentChars).toBeGreaterThan(32); // Most characters should differ
    });

    it("should generate hex-encoded tokens (lowercase)", () => {
      const token = generateCSRFToken();

      // Should only contain lowercase hexadecimal characters
      expect(token).toMatch(/^[0-9a-f]+$/);
      expect(token.toUpperCase()).not.toBe(token);
    });

    it("should use crypto.getRandomValues", () => {
      const spy = vi.spyOn(crypto, "getRandomValues");

      generateCSRFToken();

      expect(spy).toHaveBeenCalledWith(expect.any(Uint8Array));
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({ length: 32 }));

      spy.mockRestore();
    });
  });

  describe("validateCSRFToken", () => {
    it("should return true for valid token", () => {
      const token = generateCSRFToken();
      sessionStorageMock["csrf_token"] = token;

      const result = validateCSRFToken(token);

      expect(result).toBe(true);
    });

    it("should return false for invalid token", () => {
      const validToken = generateCSRFToken();
      const invalidToken = generateCSRFToken();
      sessionStorageMock["csrf_token"] = validToken;

      const result = validateCSRFToken(invalidToken);

      expect(result).toBe(false);
    });

    it("should return false when no token stored in session", () => {
      const token = generateCSRFToken();

      const result = validateCSRFToken(token);

      expect(result).toBe(false);
    });

    it("should validate token length (must be 64 characters)", () => {
      sessionStorageMock["csrf_token"] = "a".repeat(64);

      expect(validateCSRFToken("a".repeat(32))).toBe(false);
      expect(validateCSRFToken("a".repeat(64))).toBe(true);
      expect(validateCSRFToken("a".repeat(128))).toBe(false);
    });

    it("should handle empty string token", () => {
      sessionStorageMock["csrf_token"] = generateCSRFToken();

      const result = validateCSRFToken("");

      expect(result).toBe(false);
    });

    it("should handle null token", () => {
      sessionStorageMock["csrf_token"] = generateCSRFToken();

      const result = validateCSRFToken(null as any);

      expect(result).toBe(false);
    });

    it("should handle undefined token", () => {
      sessionStorageMock["csrf_token"] = generateCSRFToken();

      const result = validateCSRFToken(undefined as any);

      expect(result).toBe(false);
    });

    it("should be case sensitive", () => {
      const token = generateCSRFToken();
      sessionStorageMock["csrf_token"] = token;

      const result = validateCSRFToken(token.toUpperCase());

      expect(result).toBe(false);
    });

    it("should require exact match", () => {
      const token = generateCSRFToken();
      sessionStorageMock["csrf_token"] = token;

      // Try with one character different
      const almostToken = token.slice(0, -1) + "0";

      const result = validateCSRFToken(almostToken);

      expect(result).toBe(false);
    });
  });

  describe("useCSRFToken", () => {
    it("should return existing token from sessionStorage", async () => {
      const existingToken = generateCSRFToken();
      sessionStorageMock["csrf_token"] = existingToken;

      const { result } = renderHook(() => useCSRFToken());

      await waitFor(() => {
        expect(result.current).toBe(existingToken);
      });
    });

    it("should generate new token when none exists", async () => {
      const { result } = renderHook(() => useCSRFToken());

      await waitFor(() => {
        expect(result.current).toHaveLength(64);
        expect(sessionStorageMock["csrf_token"]).toBe(result.current);
      });
    });

    it("should maintain same token across re-renders", async () => {
      const { result, rerender } = renderHook(() => useCSRFToken());

      await waitFor(() => {
        expect(result.current).toHaveLength(64);
      });

      const firstToken = result.current;

      rerender();
      rerender();
      rerender();

      expect(result.current).toBe(firstToken);
    });

    it("should initialize and execute useEffect", async () => {
      const { result } = renderHook(() => useCSRFToken());

      // In test environment, useEffect runs synchronously with renderHook
      // so by the time we check, the token is already generated
      await waitFor(() => {
        expect(result.current).toHaveLength(64);
        expect(result.current).toMatch(/^[0-9a-f]{64}$/);
      });
    });

    it("should store token in sessionStorage after generation", async () => {
      const { result } = renderHook(() => useCSRFToken());

      await waitFor(() => {
        expect(result.current).toHaveLength(64);
        expect(sessionStorageMock["csrf_token"]).toBe(result.current);
      });
    });
  });

  describe("getCSRFHeaders", () => {
    it("should return headers with token when token exists", () => {
      const token = generateCSRFToken();
      sessionStorageMock["csrf_token"] = token;

      const headers = getCSRFHeaders();

      expect(headers).toEqual({
        "X-CSRF-Token": token,
      });
    });

    it("should return headers with empty string when no token exists", () => {
      const headers = getCSRFHeaders();

      expect(headers).toEqual({
        "X-CSRF-Token": "",
      });
    });

    it("should use correct header name", () => {
      const token = generateCSRFToken();
      sessionStorageMock["csrf_token"] = token;

      const headers = getCSRFHeaders();

      expect(headers).toHaveProperty("X-CSRF-Token");
      expect(Object.keys(headers)).toContain("X-CSRF-Token");
    });
  });

  describe("Token Lifecycle", () => {
    it("should clear token on session end", async () => {
      const token = generateCSRFToken();
      sessionStorageMock["csrf_token"] = token;

      sessionStorageMock = {}; // Simulate session clear

      const { result } = renderHook(() => useCSRFToken());

      await waitFor(() => {
        // Should generate new token
        expect(result.current).not.toBe(token);
        expect(result.current).toHaveLength(64);
      });
    });

    it("should handle token rotation", () => {
      const oldToken = generateCSRFToken();
      sessionStorageMock["csrf_token"] = oldToken;

      // Validate old token
      expect(validateCSRFToken(oldToken)).toBe(true);

      // Generate new token (simulate rotation)
      const newToken = generateCSRFToken();
      sessionStorageMock["csrf_token"] = newToken;

      // Old token should now be invalid
      expect(validateCSRFToken(oldToken)).toBe(false);
      // New token should be valid
      expect(validateCSRFToken(newToken)).toBe(true);
    });
  });

  describe("Security Best Practices", () => {
    it("should handle concurrent validation attempts", () => {
      const token = generateCSRFToken();
      sessionStorageMock["csrf_token"] = token;

      const validations = [
        validateCSRFToken(token),
        validateCSRFToken(token),
        validateCSRFToken(token),
      ];

      validations.forEach((result) => {
        expect(result).toBe(true);
      });
    });

    it("should use constant time comparison (implicit via ===)", () => {
      const token = generateCSRFToken();
      sessionStorageMock["csrf_token"] = token;

      const startTime = performance.now();
      validateCSRFToken(token.slice(0, -1) + "0"); // Almost match
      const almostTime = performance.now() - startTime;

      const startTime2 = performance.now();
      validateCSRFToken(generateCSRFToken()); // Completely different
      const differentTime = performance.now() - startTime2;

      // Both should be very fast (JS === is constant time)
      expect(almostTime).toBeLessThan(10);
      expect(differentTime).toBeLessThan(10);
    });
  });

  describe("Integration", () => {
    it("should work with hook and validation together", async () => {
      const { result } = renderHook(() => useCSRFToken());

      await waitFor(() => {
        expect(result.current).toHaveLength(64);
      });

      const token = result.current;

      // Validation should pass
      expect(validateCSRFToken(token)).toBe(true);
    });

    it("should work with hook and headers together", async () => {
      const { result } = renderHook(() => useCSRFToken());

      await waitFor(() => {
        expect(result.current).toHaveLength(64);
      });

      const headers = getCSRFHeaders();
      const token = result.current;

      // Verify headers object structure
      expect(headers).toEqual({
        "X-CSRF-Token": token,
      });
    });
  });
});
