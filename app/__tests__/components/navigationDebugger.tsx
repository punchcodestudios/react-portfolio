import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import loggerService from "~/service/logging";

const NavigationDebugger: React.FC = () => {
  const location = useLocation();
  const [isClient, setIsClient] = useState(false);
  const [navigationMethod, setNavigationMethod] = useState<string>("unknown");

  // ✅ SSR-safe client detection
  useEffect(() => {
    setIsClient(true);

    // ✅ Safe document access after hydration
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      setNavigationMethod(document.referrer ? "link-click" : "direct-access");
    }
  }, []);

  useEffect(() => {
    // ✅ Only run navigation tracking on client-side
    if (!isClient) return;

    // ✅ Enhanced navigation tracking with route validation
    const validRoutes = [
      "/",
      "/about",
      "/contact",
      "/privacy-policy",
      "/terms-of-use",
      "/resume",
      "/resume/skills",
      "/resume/experience",
      "/resume/education",
      "/ui/index",
      "/ui/data-table",
      "/ui/data-gallery",
      "/ui/suspense",
      "/test/health",
      "/exam-prep",
    ];

    const isValidRoute =
      validRoutes.includes(location.pathname) ||
      location.pathname.startsWith("/.well-known/");

    // ✅ Safe document access with proper checks
    const referrer =
      typeof document !== "undefined" ? document.referrer : "unknown";
    const currentMethod = referrer ? "navigation" : "direct";

    loggerService.debug("Navigation event detected", undefined, {
      component: "NavigationDebugger",
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      isValidRoute: isValidRoute.toString(),
      matchedRoute:
        validRoutes.find((route) => route === location.pathname) || "none",
      navigationMethod: currentMethod,
      referrer: referrer || "none",
      isClientSide: "true",
      timestamp: new Date().toISOString(),
    });

    // ✅ Track navigation problems
    if (!isValidRoute) {
      loggerService.warn(
        "Invalid route detected during navigation",
        undefined,
        {
          component: "NavigationDebugger",
          attemptedPath: location.pathname,
          availableRoutes: validRoutes.join(", "),
          possibleCause: "navbar-link-mismatch",
          navigationMethod: currentMethod,
          timestamp: new Date().toISOString(),
        }
      );
    }
  }, [location, isClient]);

  // ✅ Don't render anything during SSR or in production
  if (!isClient || process.env.NODE_ENV !== "development") return null;

  // ✅ Safe rendering after client hydration
  return (
    <div className="fixed top-4 left-4 bg-green-900 text-white text-xs p-2 rounded shadow-lg z-50 max-w-sm">
      <div className="font-bold mb-1">🧭 Navigation Debug</div>
      <div>
        <strong>Current:</strong>{" "}
        <span className="font-mono">{location.pathname}</span>
      </div>
      <div>
        <strong>Method:</strong> {navigationMethod}
      </div>
      <div>
        <strong>Referrer:</strong>{" "}
        {typeof document !== "undefined"
          ? document.referrer || "None"
          : "Loading..."}
      </div>
      <div>
        <strong>Client:</strong>{" "}
        <span className="text-green-400">✅ Hydrated</span>
      </div>
    </div>
  );
};

export default NavigationDebugger;
