import { vi } from "vitest";
// import "@testing-library/jest-dom";

console.log("✅ Vitest setup loaded successfully");

globalThis.createMockCorrelationId = function (serviceName, operation) {
  return `${serviceName}-${operation}-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;
};

// ✅ Mock Azure Insights for AI Agent telemetry testing
globalThis.mockAzureInsights = {
  trackEvent: vi.fn(),
  trackException: vi.fn(),
  trackDependency: vi.fn(),
  trackMetric: vi.fn(),
};

// ✅ Mock Logger Service for AI Agent observability testing
globalThis.mockLoggerService = {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  success: vi.fn(),
  performance: vi.fn(),
  initialize: vi.fn().mockResolvedValue(undefined),
  isInitialized: vi.fn().mockReturnValue(true),
  flush: vi.fn(),
  trackFeatureUsage: vi.fn().mockResolvedValue(undefined),
  trackComponentPerformance: vi.fn().mockResolvedValue(undefined),
  trackGlobalError: vi.fn().mockResolvedValue(undefined),
  measure: vi.fn((name, fn, context) => fn()),
};

console.log("setup loaded");
