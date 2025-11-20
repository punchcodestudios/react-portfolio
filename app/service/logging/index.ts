/**
 * CONSOLIDATED LOGGER SERVICE EXPORTS
 *
 * Purpose: Clean export interface for the unified logging service
 * Responsibilities:
 * - Export singleton logger service instance
 * - Export all logging-related TypeScript interfaces
 * - Export service class for advanced scenarios and testing
 * - Maintain clean import paths and backward compatibility
 * - Default export for easy importing throughout the application
 *
 * Following Azure service export patterns and TypeScript module best practices
 */

import { LoggerService } from "./LoggerService";

// Export the singleton instance
export const loggerService = LoggerService.getInstance();

// Export all logging-related types
export type {
  ILogger,
  ILoggerService,
  IBusinessTrackingService,
  IConsoleLoggingService,
  IPerformanceService,
  ITelemetryService,
  ILogEntry,
} from "./types";

// Export service class for advanced scenarios
export { LoggerService };

// Export console logger for direct access if needed
export { consoleLogger } from "./ConsoleLogger";

// Default export as the service instance (maintains compatibility)
export default loggerService;
