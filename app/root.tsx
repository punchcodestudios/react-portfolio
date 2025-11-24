import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useFetchers,
  useLoaderData,
  type ActionFunctionArgs,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "react-router";
// import { AuthenticityTokenInput } from "remix-utils/react/authenticity-token";
// import { HoneypotInputs } from "remix-utils/react/honeypot";
import { toast as showToast, Toaster } from "sonner";
import { z } from "zod";
import type { Route } from "./+types/root";

import { IconService } from "./service/icon-service";
// import UserService from "./service/user-service";

// import { csrf } from "./utils/csrf.server";
// import { honeypot } from "./utils/honeypot.server";
import { SolidIcon } from "./utils/enums";
import { getEnv } from "./utils/env.server";
import { sessionStorage } from "./utils/session.server";
import { combineHeaders, invariantResponse } from "./utils/site";
import { getTheme, setTheme, type Theme } from "./utils/theme.server";
import { getToast, type Toast } from "./utils/toast.server";

import { ErrorList } from "./components/forms";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";
import { clientErrorHandler } from "~/utils/clientErrorHandler";
import { GlobalErrorBoundary } from "~/components/error/global-error-boundary";

import { getTelemetryConfig } from "./config/telemetry";
import loggerService from "./service/logging";
import DevelopmentDebugPanel from "./__tests__/components/developmentDebugPanel";
import { ThemeProvider } from "./components/style-guide/ThemeProvider";

const ThemeFormSchema = z.object({
  theme: z.enum(["light", "dark"]),
});

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("loader function called from root");
  try {
    // console.log("Getting CSRF token");
    //const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);
    // console.log("CSRF token obtained:", csrfToken);
    // console.log("Getting honeypot input props");
    // const honeyProps = await honeypot.getInputProps();
    // console.log("Honeypot input props obtained:", honeyProps);
    console.log("Getting toast props");
    const { toast, headers: toastHeaders } = await getToast(request);
    console.log("Toast props obtained:", toast);

    // console.log("toast: ", toast);
    console.log("Getting session from cookies");
    const cookieSession = await sessionStorage.getSession(
      request.headers.get("cookie")
    );
    console.log("Session obtained:", cookieSession);

    console.log("Getting user ID from session");
    const userId = cookieSession?.get("userId");
    console.log("User ID obtained:", userId);
    // const response = userId ? await UserService.getById(userId) : null;
    let user = null;
    // if (response !== null) {
    //   user = response?.meta.success ? response?.target[0] : null;
    // }
    return data(
      {
        userId,
        user,
        // honeyProps,
        // csrfToken,
        theme: getTheme(request),
        toast: toast,
        ENV: getEnv(),
      },
      {
        headers: combineHeaders(
          // csrfCookieHeader ? { "set-cookie": csrfCookieHeader } : null,
          toastHeaders
        ),
      }
    );
  } catch (error: any) {
    console.error("💥 Error in root loader:", error);
    console.error("💥 Error stack:", error?.stack);
    console.error("💥 Error message:", error?.message);
    // Return a fallback response or re-throw with proper handling
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    invariantResponse(
      formData.get("intent") === "update-theme",
      "Invalid intent",
      { status: 400 }
    );

    // parse comes from conform/to-zod
    const submission = parse(formData, {
      schema: ThemeFormSchema,
    });

    if (submission.intent !== "submit") {
      return { status: "success", submission: submission };
    }
    if (!submission.value) {
      return { status: "error", submission } as const;
    }

    const { theme } = submission.value;

    const response = new Response(formData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": setTheme(theme),
      },
    });

    return data({ submission }, response);
  } catch (error) {
    console.error("Error in root action:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}

function Layout({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: Theme;
}) {
  return (
    <html lang="en" className={`light`}>
      <head>
        {/* <Meta /> */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <Links /> */}
        <link rel="stylesheet" href="https://use.typekit.net/utp7gyp.css" />
        <link rel="stylesheet" href="/styles/tailwind.build.css" />
      </head>
      <body
        suppressHydrationWarning={true}
        className="flex justify-center w-full"
      >
        <div className="flex flex-col align-center grow min-h-screen w-[95%] max-w-[2100px]">
          {children}
        </div>
        <Toaster closeButton position="top-center" />
        <DevelopmentDebugPanel />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function useLoggerService() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initializationError, setInitializationError] = useState<Error | null>(
    null
  );
  const { ENV } = useLoaderData<typeof loader>();

  const initializeLogger = useCallback(async () => {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        attempt++;

        if (ENV.MODE === "development") {
          console.log(
            `🚀 [useLoggerService] Initializing (attempt ${attempt}/${maxRetries})`
          );
        }

        // ✅ Service initialization SHOULD use try/catch
        await loggerService.initialize();

        if (!loggerService.isInitialized()) {
          throw new Error("Logger service initialization failed silently");
        }

        const config = getTelemetryConfig();

        loggerService.success("✅ Logger service initialized successfully", {
          environment: config.environment,
          enabled: config.enabled,
          telemetryEnabled: config.enabled.toString(),
          attempt: attempt.toString(),
        });

        // ✅ Business logic operations SHOULD use try/catch for AI tracing
        await loggerService.trackFeatureUsage(
          "LoggerService",
          "initialization-success",
          {
            attempt: attempt.toString(),
            maxRetries: maxRetries.toString(),
            environment: config.environment,
          }
        );

        setIsInitialized(true);
        setInitializationError(null);
        return;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));

        if (ENV.MODE === "development") {
          console.error(
            `❌ [useLoggerService] Attempt ${attempt} failed:`,
            errorObj
          );
        }

        if (attempt >= maxRetries) {
          setInitializationError(errorObj);
          setIsInitialized(false);
          console.error(
            `❌ [useLoggerService] Failed after ${maxRetries} attempts:`,
            errorObj
          );
          return;
        }

        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }, [ENV.MODE]);

  useEffect(() => {
    // ✅ Async initialization should be wrapped in try/catch
    initializeLogger().catch((error) => {
      console.error(
        "❌ [useLoggerService] Unhandled initialization error:",
        error
      );
      setInitializationError(
        error instanceof Error ? error : new Error(String(error))
      );
    });

    return () => {
      // ✅ Cleanup operations SHOULD use try/catch
      if (isInitialized) {
        try {
          loggerService.info("🧹 Logger service cleanup");
          loggerService.flush();
        } catch (error) {
          console.error("❌ [useLoggerService] Cleanup error:", error);
        }
      }
    };
  }, [initializeLogger, isInitialized]);

  return { isInitialized, initializationError };
}

function usePerformanceTracking(isLoggerInitialized: boolean) {
  useEffect(() => {
    if (!isLoggerInitialized) return;

    // ✅ Browser API calls SHOULD use try/catch
    try {
      if (typeof window !== "undefined" && window.performance) {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;

        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          const domContentLoadedTime =
            navigation.domContentLoadedEventEnd - navigation.fetchStart;

          // Business logic wrapped in try/catch for AI tracing best practices
          loggerService
            .trackComponentPerformance(
              "ApplicationRoot",
              "InitialPageLoad",
              loadTime,
              true,
              {
                fetchStart: navigation.fetchStart.toString(),
                domContentLoaded: domContentLoadedTime.toString(),
                loadComplete: loadTime.toString(),
                navigationTiming: "measured",
              }
            )
            .catch((error) => {
              console.error(
                "❌ [usePerformanceTracking] Failed to track performance:",
                error
              );
            });
        }
      }
    } catch (error) {
      console.error("❌ [usePerformanceTracking] Browser API error:", error);
    }
  }, [isLoggerInitialized]);
}

function useBrowserLifecycle(isLoggerInitialized: boolean) {
  useEffect(() => {
    if (!isLoggerInitialized) return;

    // ✅ Event handlers SHOULD use try/catch for browser API reliability
    const handleVisibilityChange = () => {
      try {
        if (document.visibilityState === "hidden") {
          loggerService.debug("📱 Page hidden - flushing telemetry");
          loggerService.flush();
        } else if (document.visibilityState === "visible") {
          loggerService.debug("📱 Page visible - user returned");
          // Async operations should handle their own errors
          loggerService
            .trackFeatureUsage("ApplicationRoot", "visibility-visible", {
              timestamp: new Date().toISOString(),
            })
            .catch((error) => {
              console.error(
                "❌ [useBrowserLifecycle] Failed to track visibility:",
                error
              );
            });
        }
      } catch (error) {
        console.error(
          "❌ [useBrowserLifecycle] Visibility change error:",
          error
        );
      }
    };

    const handleBeforeUnload = () => {
      try {
        loggerService.info("🚪 Application unloading");
        loggerService.flush();
      } catch (error) {
        console.error("❌ [useBrowserLifecycle] Unload error:", error);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoggerInitialized]);
}

function App() {
  const data = useLoaderData<typeof loader>();
  const theme = useTheme();

  const { isInitialized: isLoggerInitialized, initializationError } =
    useLoggerService();

  useEffect(() => {
    try {
      clientErrorHandler.init();
      return () => {
        try {
          clientErrorHandler.cleanup();
        } catch (error) {
          console.error("❌ [App] Client error handler cleanup failed:", error);
        }
      };
    } catch (error) {
      console.error(
        "❌ [App] Client error handler initialization failed:",
        error
      );
    }
  }, []);

  // ✅ Use custom hooks for complex operations
  usePerformanceTracking(isLoggerInitialized);
  useBrowserLifecycle(isLoggerInitialized);

  const handleGlobalError = useCallback(
    async (error: Error, errorInfo: React.ErrorInfo) => {
      // ❌ DON'T wrap this in try/catch - let the error boundary handle failures
      if (isLoggerInitialized) {
        await loggerService.trackGlobalError({
          id: `root_error_${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 9)}`,
          message: error.message,
          stack: error.stack || "",
          details: errorInfo.componentStack || "",
          timestamp: new Date().toISOString(),
          url:
            typeof window !== "undefined" ? (window.location?.href ?? "") : "",
          userAgent:
            typeof navigator !== "undefined"
              ? (navigator?.userAgent ?? "")
              : "",
          retryCount: 0,
        });
      }
    },
    [isLoggerInitialized]
  );

  // ✅ Memoize development indicator to prevent unnecessary re-renders
  const loggerStatusIndicator = useMemo(() => {
    if (data.ENV.MODE !== "development") return null;

    return (
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "12px",
          fontFamily: "monospace",
          zIndex: 9999,
          backgroundColor: isLoggerInitialized
            ? "rgba(34, 197, 94, 0.1)"
            : initializationError
              ? "rgba(239, 68, 68, 0.1)"
              : "rgba(251, 191, 36, 0.1)",
          border: `1px solid ${
            isLoggerInitialized
              ? "rgb(34, 197, 94)"
              : initializationError
                ? "rgb(239, 68, 68)"
                : "rgb(251, 191, 36)"
          }`,
          color: isLoggerInitialized
            ? "rgb(34, 197, 94)"
            : initializationError
              ? "rgb(239, 68, 68)"
              : "rgb(251, 191, 36)",
        }}
      >
        Logger:{" "}
        {isLoggerInitialized
          ? "✅ Ready"
          : initializationError
            ? "❌ Failed"
            : "⏳ Initializing..."}
        {initializationError && (
          <div style={{ fontSize: "10px", marginTop: "4px" }}>
            {initializationError.message}
          </div>
        )}
      </div>
    );
  }, [data.ENV.MODE, isLoggerInitialized, initializationError]);

  return (
    <ThemeProvider>
      <GlobalErrorBoundary onError={handleGlobalError}>
        {/* {loggerStatusIndicator} */}

        <Layout theme={theme}>
          <ThemeSwitch userPreference={theme} />
          <div id="siteContainer" className="flex grow flex-col w-full mx-auto">
            <Navbar />
            <main className="grow w-full mx-auto">
              <Outlet />
            </main>
            <Footer />
          </div>
          {data.toast ? <ShowToast toast={data.toast} /> : null}
        </Layout>
      </GlobalErrorBoundary>
    </ThemeProvider>
  );
}

export default function Root() {
  const data = useLoaderData<typeof loader>();

  return (
    // <AuthenticityTokenProvider token={data.csrfToken}>
    //   <HoneypotProvider {...data.honeyProps}>
    <App></App>
    //   </HoneypotProvider>
    // </AuthenticityTokenProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  // Fallback logging - simple console, no complex try/catch needed
  console.error("❌ [Root ErrorBoundary] Application error:", error);

  // ✅ Simple attempt to log - if it fails, that's okay
  if (loggerService.isInitialized()) {
    loggerService
      .trackGlobalError({
        id: `root_error_boundary_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2, 9)}`,
        message: error.message,
        stack: error.stack || "",
        details: "Root Error Boundary",
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        retryCount: 0,
      })
      .catch((loggerError) => {
        // Simple fallback - don't over-complicate error boundary
        console.error("❌ [Root ErrorBoundary] Logger error:", loggerError);
      });
  }

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ color: "#ef4444", marginBottom: "1rem" }}>
          ❌ Application Error
        </h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            maxWidth: "600px",
          }}
        >
          Something went wrong. The error has been logged and will be
          investigated.
        </p>
        <details style={{ marginTop: "1rem" }}>
          <summary style={{ cursor: "pointer", marginBottom: "1rem" }}>
            Technical Details
          </summary>
          <pre
            style={{
              backgroundColor: "#f3f4f6",
              padding: "1rem",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "0.875rem",
            }}
          >
            {error.stack || error.message}
          </pre>
        </details>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          🔄 Reload Application
        </button>
      </div>
    </Layout>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Punchcode Studios | Portfolio" },
    {
      name: "description",
      content:
        "Porfolio project showcasing React Development for PunchcodeStudios design company",
    },
  ];
}

function ShowToast({ toast }: { toast: Toast }) {
  const { id, type, title, description } = toast;

  useEffect(() => {
    setTimeout(() => {
      showToast[type](title, { id, description });
    }, 0);
  }, [description, id, title, type]);
  return null;
}

function useTheme() {
  // console.log("inside useTheme");
  const data = useLoaderData<typeof loader>();
  // console.log("data", data);
  const fetchers = useFetchers();
  const fetcher = fetchers.find(
    (f) => f.formData?.get("intent") === "update-theme"
  );
  const optimisticTheme = fetcher?.formData?.get("theme");
  if (optimisticTheme === "light" || optimisticTheme === "dark") {
    return optimisticTheme;
  }

  return data.theme;
}

function ThemeSwitch({ userPreference }: { userPreference?: Theme }) {
  const fetcher = useFetcher<typeof action>();

  const [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ThemeFormSchema });
    },
  });

  const mode = userPreference ?? "light";
  const nextMode = mode === "light" ? "dark" : "light";

  const modeLabel = {
    light: (
      <div className="w-full flex flex-row items-center">
        <FontAwesomeIcon
          icon={IconService.getSolid(SolidIcon.DARK_THEME)}
          fontSize={12}
          className="text-siteWhite"
        ></FontAwesomeIcon>
        <span className="text-siteWhite ms-5">Switch to Dark Mode</span>
      </div>
    ),
    dark: (
      <div className="w-full flex flex-row items-center">
        <FontAwesomeIcon
          icon={IconService.getSolid(SolidIcon.LIGHT_THEME)}
          fontSize={12}
          className="text-siteWhite"
        ></FontAwesomeIcon>
        <span className="text-siteWhite ms-5">Switch to Light Mode</span>
      </div>
    ),
  };

  return (
    <fetcher.Form method="POST" {...form.props}>
      <input type="hidden" name="theme" value={nextMode}></input>
      <div className="flex gap-2 h-[50px]">
        <button
          name="intent"
          value="update-theme"
          type="submit"
          className="flex h-[50px] w-[300px] cursor-pointer items-center justify-center"
        >
          {modeLabel[mode]}
        </button>
      </div>
      <ErrorList errors={form.errors} id={form.errorId}></ErrorList>
    </fetcher.Form>
  );
}
