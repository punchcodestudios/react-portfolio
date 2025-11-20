/**
 * CONSOLE LOGGING IMPLEMENTATION
 *
 * Purpose: Structured console output for development and debugging
 * Responsibilities:
 * - Formatted console logging with consistent styling
 * - Log level management and environment-based output
 * - Performance timing with human-readable formatting
 * - Retry operation logging with attempt tracking
 * - Error formatting with stack trace handling
 *
 * Following structured logging best practices for AI application development
 */

import type { ILogEntry, IConsoleLoggingService } from "./types";

export class ConsoleLogger implements IConsoleLoggingService {
  private isDevelopment = import.meta.env.MODE === "development";
  private isVerbose = import.meta.env.VITE_LOG_VERBOSE === "true";

  /**
   * Debug level logging (development only)
   */
  debug(message: string, data?: any): void {
    if (this.isDevelopment && this.isVerbose) {
      this.log({ level: "debug", message, data });
    }
  }

  /**
   * Info level logging
   */
  info(message: string, data?: any): void {
    this.log({ level: "info", message, data });
  }

  /**
   * Success level logging
   */
  success(message: string, data?: any): void {
    this.log({ level: "success", message, data });
  }

  /**
   * Warning level logging
   */
  warn(message: string, data?: any): void {
    this.log({ level: "warn", message, data });
  }

  /**
   * Error level logging
   */
  error(message: string, error?: Error | any): void {
    this.log({ level: "error", message, data: error });
  }

  /**
   * Performance logging with duration formatting
   */
  performance(
    operation: string,
    duration: number,
    success: boolean = true,
    data?: any
  ): void {
    const status = success ? "✅" : "❌";
    const statusText = success ? "success" : "failed";
    const formattedDuration = this.formatDuration(duration);

    this.log({
      level: success ? "success" : "warn",
      message: `Performance: ${operation} (${formattedDuration}, ${statusText}) ${status}`,
      data,
    });
  }

  /**
   * Retry operation logging
   */
  retry(
    message: string,
    attempt: number,
    maxAttempts: number,
    data?: any
  ): void {
    this.log({
      level: "warn",
      message: `🔄 Retry ${attempt}/${maxAttempts}: ${message}`,
      data,
    });
  }

  /**
   * Internal logging method with consistent formatting
   */
  private log(entry: ILogEntry): void {
    const timestamp = entry.timestamp || new Date().toISOString();
    const icon = this.getIcon(entry.level);
    const formattedMessage = `${icon} [${timestamp}] ${entry.message}`;

    switch (entry.level) {
      case "debug":
        console.debug(formattedMessage, entry.data || "");
        break;
      case "info":
        console.log(formattedMessage, entry.data || "");
        break;
      case "success":
        console.log(formattedMessage, entry.data || "");
        break;
      case "warn":
        console.warn(formattedMessage, entry.data || "");
        break;
      case "error":
        console.error(formattedMessage, entry.data || "");
        break;
    }
  }

  /**
   * Get emoji icon for log level
   */
  private getIcon(level: string): string {
    const icons = {
      debug: "🔍",
      info: "ℹ️",
      success: "✅",
      warn: "⚠️",
      error: "❌",
    };
    return icons[level as keyof typeof icons] || "ℹ️";
  }

  /**
   * Format duration for readability
   */
  private formatDuration(ms: number): string {
    if (ms < 1000) {
      return `${Math.round(ms)}ms`;
    } else if (ms < 60000) {
      return `${(ms / 1000).toFixed(1)}s`;
    } else {
      return `${(ms / 60000).toFixed(1)}min`;
    }
  }
}

export const consoleLogger = new ConsoleLogger();
