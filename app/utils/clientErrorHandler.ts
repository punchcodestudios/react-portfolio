import { createErrorDetails } from "./error";
import loggerService from "~/service/logging";

interface QueuedError {
  type: "unhandledrejection" | "globalError";
  errorId: string;
  message: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  url: string;
  userAgent: string;
  timestamp: number;
  reason?: any;
}

class ClientErrorHandler {
  private static instance: ClientErrorHandler;
  private errorQueue: Array<{ error: QueuedError; timestamp: number }> = [];
  private isProcessing = false;

  public static getInstance(): ClientErrorHandler {
    if (!ClientErrorHandler.instance) {
      ClientErrorHandler.instance = new ClientErrorHandler();
    }
    return ClientErrorHandler.instance;
  }

  public init() {
    if (typeof window === "undefined") {
      console.warn(
        "ClientErrorHandler: Not in browser environment, skipping initialization"
      );
      return;
    }
    window.addEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    );
    window.addEventListener("error", this.handleGlobalError);
    loggerService.info("ClientErrorHandler: Initialized global error handlers");
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const errorId = `client_rejection_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)}`;

    const errorMessage =
      event.reason instanceof Error
        ? event.reason.message
        : String(event.reason);

    const errorStack =
      event.reason instanceof Error ? event.reason.stack ?? "" : "";

    loggerService.error(
      `Unhandled Promise Rejection: ${errorMessage}`,
      event.reason instanceof Error ? event.reason : new Error(errorMessage),
      {
        errorId,
        type: "unhandledrejection",
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }
    );

    const queuedError: QueuedError = {
      type: "unhandledrejection",
      errorId,
      message: errorMessage,
      stack: errorStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      reason:
        event.reason instanceof Error ? event.reason.message : event.reason,
    };

    this.errorQueue.push({
      error: queuedError,
      timestamp: Date.now(),
    });

    // ✅ Use async processing without blocking
    this.processErrorQueue().catch((error) => {
      console.error("Failed to process error queue:", error);
    });

    event.preventDefault();
  };

  private handleGlobalError = (event: ErrorEvent) => {
    const errorId = `client_error_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)}`;

    const error = event.error || new Error(event.message);

    loggerService.error(`Global Error: ${event.message}`, error, {
      errorId,
      type: "globalError",
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });

    // ✅ Queue error for batch processing
    const queuedError: QueuedError = {
      type: "globalError",
      errorId,
      message: event.message,
      stack: error.stack,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    this.errorQueue.push({
      error: queuedError,
      timestamp: Date.now(),
    });

    // ✅ Use async processing without blocking
    this.processErrorQueue().catch((error) => {
      console.error("Failed to process error queue:", error);
    });
  };

  private processErrorQueue = async () => {
    // ✅ Prevent concurrent processing
    if (this.isProcessing || this.errorQueue.length === 0) return;

    this.isProcessing = true;

    try {
      const errors = [...this.errorQueue];
      this.errorQueue = [];

      loggerService.debug(`Processing ${errors.length} queued client errors`);

      // ✅ Process each error with the consolidated logger service
      for (const { error } of errors) {
        try {
          // ✅ Use the trackGlobalError method for business tracking
          await loggerService.trackGlobalError({
            id: error.errorId,
            message: error.message,
            stack: error.stack || "",
            details: JSON.stringify({
              type: error.type,
              filename: error.filename,
              lineno: error.lineno,
              colno: error.colno,
              reason: error.reason,
            }),
            timestamp: new Date(error.timestamp).toISOString(),
            url: error.url,
            userAgent: error.userAgent,
            retryCount: 0,
          });
        } catch (trackingError) {
          // ✅ Don't fail the entire batch if one tracking fails
          console.error(
            `Failed to track error ${error.errorId}:`,
            trackingError
          );

          // ✅ Log the tracking failure
          loggerService.warn(
            `Failed to track client error: ${error.errorId}`,
            trackingError instanceof Error
              ? trackingError
              : new Error(String(trackingError)),
            {
              originalErrorId: error.errorId,
              originalErrorType: error.type,
            }
          );
        }
      }

      loggerService.success(
        `Successfully processed ${errors.length} client errors`
      );
    } catch (error) {
      console.error("Failed to process error queue:", error);
      loggerService.error(
        "Failed to process client error queue",
        error instanceof Error ? error : new Error(String(error))
      );

      // ✅ Re-add errors to queue for retry (with limit to prevent infinite loops)
      if (this.errorQueue.length < 100) {
        // Prevent memory leaks
        const failedErrors = [...this.errorQueue];
        this.errorQueue.unshift(...failedErrors);
      }
    } finally {
      this.isProcessing = false;
    }
  };

  /**
   * ✅ Get error queue status for monitoring
   */
  public getStatus() {
    return {
      queueLength: this.errorQueue.length,
      isProcessing: this.isProcessing,
      oldestError:
        this.errorQueue.length > 0
          ? new Date(this.errorQueue[0].timestamp).toISOString()
          : null,
      isInitialized: typeof window !== "undefined",
    };
  }

  /**
   * ✅ Force process queue (for testing or manual intervention)
   */
  public async forceProcessQueue() {
    loggerService.info("Forcing client error queue processing");
    await this.processErrorQueue();
  }

  /**
   * ✅ Clear error queue (for testing or emergency cleanup)
   */
  public clearQueue() {
    const clearedCount = this.errorQueue.length;
    this.errorQueue = [];
    loggerService.info(
      `Cleared ${clearedCount} errors from client error queue`
    );
    return clearedCount;
  }

  public cleanup() {
    if (typeof window === "undefined") {
      return;
    }

    // ✅ Process any remaining errors before cleanup
    if (this.errorQueue.length > 0) {
      loggerService.info(
        `Processing ${this.errorQueue.length} remaining errors before cleanup`
      );
      this.forceProcessQueue().catch((error) => {
        console.error(
          "Failed to process remaining errors during cleanup:",
          error
        );
      });
    }

    window.removeEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    );
    window.removeEventListener("error", this.handleGlobalError);

    loggerService.info("ClientErrorHandler: Cleaned up global error handlers");
  }
}
export const clientErrorHandler = ClientErrorHandler.getInstance();
