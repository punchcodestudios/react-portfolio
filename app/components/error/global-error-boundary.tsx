import { Component, type ErrorInfo, type ReactNode } from "react";
import loggerService from "~/service/logging";
import type { GlobalError } from "~/entities/error";

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
  retryCount: number;
  isLoggerInitialized: boolean;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
      retryCount: 0,
      isLoggerInitialized: false,
    };
  }

  componentDidMount() {
    // ✅ Check logger initialization status
    this.setState({
      isLoggerInitialized: loggerService.isInitialized(),
    });
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `client_error_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId,
      retryCount: 0,
      isLoggerInitialized: true, // Assume true here; actual status checked in componentDidMount
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.logErrorToService(error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logErrorToService = async (error: Error, errorInfo: ErrorInfo) => {
    const errorId = this.state.errorId || "unknown";

    try {
      // ✅ Use the correct LoggerService API: (message, error, metadata)
      loggerService.error(`Global Error Boundary: ${error.message}`, error, {
        errorId,
        componentStack: errorInfo.componentStack || "",
        errorBoundary: "GlobalErrorBoundary",
        retryCount: this.state.retryCount.toString(),
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      });

      // ✅ Use the business tracking for global errors
      if (loggerService.isInitialized()) {
        const globalError: GlobalError = {
          id: errorId,
          message: error.message,
          stack: error.stack || "",
          details: errorInfo.componentStack || "",
          timestamp: new Date().toISOString(),
          url: typeof window !== "undefined" ? window.location.href : "",
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : "",
          retryCount: this.state.retryCount,
        };

        await loggerService.trackGlobalError(globalError);
      }
    } catch (loggingError) {
      // ✅ Fallback to console if logger service fails
      console.error(
        "❌ [GlobalErrorBoundary] Failed to log error to service:",
        loggingError
      );
      console.error("❌ [GlobalErrorBoundary] Original error:", error);
      console.error("❌ [GlobalErrorBoundary] Error info:", errorInfo);
    }
  };

  private handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1;

    // ✅ Log retry attempt
    loggerService.info("User initiated error boundary retry", undefined, {
      errorId: this.state.errorId || "unknown",
      retryCount: newRetryCount.toString(),
      originalError: this.state.error?.message || "unknown",
    });

    // ✅ Track retry as feature usage
    loggerService
      .trackFeatureUsage("ErrorBoundary", "retry-attempt", {
        errorId: this.state.errorId || "unknown",
        retryCount: newRetryCount.toString(),
      })
      .catch((error) => {
        console.warn("Failed to track retry attempt:", error);
      });

    this.setState({
      hasError: false,
      error: null,
      errorId: null,
      retryCount: newRetryCount,
    });
  };

  private handleReload = () => {
    // ✅ Log page reload attempt
    loggerService.info(
      "User initiated page reload from error boundary",
      undefined,
      {
        errorId: this.state.errorId || "unknown",
        retryCount: this.state.retryCount.toString(),
        originalError: this.state.error?.message || "unknown",
      }
    );

    // ✅ Track reload as feature usage
    loggerService
      .trackFeatureUsage("ErrorBoundary", "page-reload", {
        errorId: this.state.errorId || "unknown",
        retryCount: this.state.retryCount.toString(),
      })
      .catch((error) => {
        console.warn("Failed to track page reload:", error);
      });

    // ✅ Flush any pending telemetry before reload
    loggerService.flush();

    // Small delay to allow telemetry to flush
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  private isDevelopment(): boolean {
    return (
      (typeof process !== "undefined" &&
        process.env?.NODE_ENV === "development") ||
      (typeof import.meta !== "undefined" &&
        import.meta.env?.MODE === "development")
    );
  }

  // TODO: use punchcodestudios styled components for buttons
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                The system administrator has been notified and will investigate
                the issue.
              </p>

              {this.state.errorId && (
                <p className="mt-1 text-xs text-gray-500 font-mono">
                  Error ID: {this.state.errorId}
                </p>
              )}

              {this.state.retryCount > 0 && (
                <p className="mt-1 text-xs text-amber-600">
                  Retry attempts: {this.state.retryCount}
                </p>
              )}

              {/* ✅ Logger status indicator in development */}
              {this.isDevelopment() && (
                <p className="mt-1 text-xs text-blue-600">
                  Logger Status:{" "}
                  {this.state.isLoggerInitialized
                    ? "✅ Active"
                    : "⚠️ Initializing"}
                </p>
              )}
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={this.handleRetry}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>

              <button
                onClick={this.handleReload}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Reload Page
              </button>
            </div>

            {/* ✅ Enhanced development error details */}
            {this.isDevelopment() && this.state.error && (
              <details className="mt-4 p-4 bg-red-50 rounded-md border border-red-200">
                <summary className="cursor-pointer text-red-800 font-medium hover:text-red-900 transition-colors duration-200">
                  🔍 Error Details (Development Only)
                </summary>

                <div className="mt-3 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-red-800">
                      Error Message:
                    </h4>
                    <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">
                      {this.state.error.message}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-red-800">
                      Stack Trace:
                    </h4>
                    <pre className="mt-1 text-xs text-red-700 bg-red-100 p-2 rounded overflow-auto max-h-48">
                      {this.state.error.stack}
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-red-800">
                      Error Metadata:
                    </h4>
                    <div className="mt-1 text-xs text-red-700 bg-red-100 p-2 rounded">
                      <p>
                        <strong>Error ID:</strong> {this.state.errorId}
                      </p>
                      <p>
                        <strong>Retry Count:</strong> {this.state.retryCount}
                      </p>
                      <p>
                        <strong>Logger Status:</strong>{" "}
                        {this.state.isLoggerInitialized
                          ? "Initialized"
                          : "Not Initialized"}
                      </p>
                      <p>
                        <strong>Timestamp:</strong> {new Date().toISOString()}
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            )}

            {/* ✅ User guidance */}
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-sm text-blue-800">
                💡 <strong>What happened?</strong> A component in the
                application encountered an unexpected error. The error has been
                automatically logged for investigation.
              </p>
              {this.state.retryCount < 3 && (
                <p className="mt-1 text-sm text-blue-700">
                  Try clicking "Try Again" to recover from temporary issues.
                </p>
              )}
              {this.state.retryCount >= 3 && (
                <p className="mt-1 text-sm text-amber-700">
                  ⚠️ Multiple retry attempts detected. Consider reloading the
                  page.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { GlobalErrorBoundary };
