import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router";
import { clearSkillsCache, preloadSkills } from "~/hooks/useSkillsResource";
import loggerService from "~/service/logging";

const DevelopmentDebugPanel: React.FC = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [lastAction, setLastAction] = useState<string>("");
  const [navigationMethod, setNavigationMethod] = useState<string>("unknown");
  const [performanceData, setPerformanceData] = useState({
    loadTime: 0,
    renderTime: 0,
    navigationCount: 0,
  });

  // ✅ SSR-safe client detection
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined" && typeof document !== "undefined") {
      setNavigationMethod(document.referrer ? "link-click" : "direct-access");
    }

    // ✅ Track performance data
    const navigationStart = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (navigationStart) {
      setPerformanceData({
        loadTime: Math.round(
          navigationStart.loadEventEnd - navigationStart.loadEventStart
        ),
        renderTime: Math.round(
          navigationStart.domContentLoadedEventEnd -
            navigationStart.domContentLoadedEventStart
        ),
        navigationCount: performance.getEntriesByType("navigation").length,
      });
    }
  }, []);

  // ✅ Track navigation changes for debugging
  useEffect(() => {
    if (!isClient) return;

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

    loggerService.debug("Navigation event detected", undefined, {
      component: "DevelopmentDebugPanel",
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      isValidRoute: isValidRoute.toString(),
      matchedRoute:
        validRoutes.find((route) => route === location.pathname) || "none",
      navigationMethod: navigationMethod,
      timestamp: new Date().toISOString(),
    });

    if (!isValidRoute) {
      loggerService.warn(
        "Invalid route detected during navigation",
        undefined,
        {
          component: "DevelopmentDebugPanel",
          attemptedPath: location.pathname,
          availableRoutes: validRoutes.join(", "),
          possibleCause: "navbar-link-mismatch",
          timestamp: new Date().toISOString(),
        }
      );
    }
  }, [location, isClient, navigationMethod]);

  // ✅ Debug action logger
  const logAction = useCallback((action: string, details?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    setLastAction(`${timestamp}: ${action}`);

    loggerService.debug(`[DevelopmentDebugPanel] ${action}`, details, {
      component: "DevelopmentDebugPanel",
      debugAction: action,
      timestamp: new Date().toISOString(),
    });
  }, []);

  // ✅ Skills debug actions
  const handleClearCache = useCallback(() => {
    logAction("Manually clearing skills cache");
    clearSkillsCache();
    setTimeout(() => window.location.reload(), 500);
  }, [logAction]);

  const handlePreload = useCallback(() => {
    logAction("Manually preloading skills");
    preloadSkills();
  }, [logAction]);

  const handleForceError = useCallback(() => {
    logAction("Forcing error for testing");
    setTimeout(() => {
      throw new Error(
        "🧪 Test error for debugging - triggered by DevelopmentDebugPanel"
      );
    }, 100);
  }, [logAction]);

  const handleToggleLogger = useCallback(() => {
    const isInitialized = loggerService.isInitialized();
    logAction(
      `Logger service status check: ${
        isInitialized ? "initialized" : "not initialized"
      }`
    );
  }, [logAction]);

  const handleInspectCache = useCallback(() => {
    logAction("Inspecting skills cache state");
    console.group("🔍 Skills Cache Inspection");
    console.log("Cache inspection requested at:", new Date().toISOString());
    console.log("Logger initialized:", loggerService.isInitialized());
    console.groupEnd();
  }, [logAction]);

  // ✅ Don't render during SSR or in production
  if (!isClient || process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white border-b border-gray-600 z-50 shadow-xl">
      {/* ✅ Header Bar - Always Visible */}
      <div
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-800 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <h3 className="text-sm font-bold text-blue-400">
            🔧 Development Debug Panel
          </h3>

          {/* ✅ Quick Status Indicators */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
              Logger: {loggerService.isInitialized() ? "Ready" : "Loading"}
            </span>

            <span className="text-gray-400">|</span>

            <span className="font-mono text-blue-300">
              Route: {location.pathname}
            </span>

            <span className="text-gray-400">|</span>

            <span className="text-purple-300">Nav: {navigationMethod}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            {isExpanded ? "Click to collapse" : "Click to expand"}
          </span>
          <span className="text-lg">{isExpanded ? "▼" : "▶"}</span>
        </div>
      </div>

      {/* ✅ Expanded Debug Content */}
      {isExpanded && (
        <div className="border-t border-gray-700 bg-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            {/* ✅ Navigation Debug Section */}
            <div className="bg-gray-900 rounded-lg p-3 border border-green-600">
              <h4 className="text-sm font-bold text-green-400 mb-2">
                🧭 Navigation Debug
              </h4>
              <div className="space-y-1 text-xs">
                <div>
                  <strong>Current:</strong>{" "}
                  <span className="font-mono text-blue-300">
                    {location.pathname}
                  </span>
                </div>
                <div>
                  <strong>Method:</strong>{" "}
                  <span className="text-yellow-300">{navigationMethod}</span>
                </div>
                <div>
                  <strong>Search:</strong>{" "}
                  <span className="font-mono">{location.search || "None"}</span>
                </div>
                <div>
                  <strong>Hash:</strong>{" "}
                  <span className="font-mono">{location.hash || "None"}</span>
                </div>
                <div>
                  <strong>Referrer:</strong>
                  <span className="font-mono text-xs break-all">
                    {typeof document !== "undefined"
                      ? document.referrer || "None"
                      : "Loading..."}
                  </span>
                </div>
              </div>
            </div>

            {/* ✅ Logger Status Section */}
            <div className="bg-gray-900 rounded-lg p-3 border border-blue-600">
              <h4 className="text-sm font-bold text-blue-400 mb-2">
                📊 Logger Status
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span>Service:</span>
                  <span
                    className={`font-mono ${
                      loggerService.isInitialized()
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {loggerService.isInitialized() ? "✅ Ready" : "⏳ Loading"}
                  </span>
                </div>

                <button
                  onClick={handleToggleLogger}
                  className="w-full px-2 py-1 bg-blue-600 text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  Check Logger Status
                </button>
              </div>
            </div>

            {/* ✅ Performance Data Section */}
            <div className="bg-gray-900 rounded-lg p-3 border border-purple-600">
              <h4 className="text-sm font-bold text-purple-400 mb-2">
                ⚡ Performance
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Load Time:</span>
                  <span className="font-mono text-green-300">
                    {performanceData.loadTime}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Render Time:</span>
                  <span className="font-mono text-blue-300">
                    {performanceData.renderTime}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Navigation Count:</span>
                  <span className="font-mono text-yellow-300">
                    {performanceData.navigationCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Skills Debug Actions Section */}
          <div className="border-t border-gray-700 p-4">
            <h4 className="text-sm font-bold text-orange-400 mb-3">
              🗂️ Skills Debug Actions
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
              <button
                onClick={handleClearCache}
                className="px-3 py-2 bg-red-600 text-xs rounded hover:bg-red-700 transition-colors"
                title="Clears skills cache and reloads the page"
              >
                🗑️ Clear & Reload
              </button>

              <button
                onClick={handlePreload}
                className="px-3 py-2 bg-blue-600 text-xs rounded hover:bg-blue-700 transition-colors"
                title="Manually triggers skills preloading"
              >
                📥 Preload Skills
              </button>

              <button
                onClick={handleInspectCache}
                className="px-3 py-2 bg-purple-600 text-xs rounded hover:bg-purple-700 transition-colors"
                title="Logs current cache state to console"
              >
                🔍 Inspect Cache
              </button>

              <button
                onClick={handleToggleLogger}
                className="px-3 py-2 bg-green-600 text-xs rounded hover:bg-green-700 transition-colors"
                title="Check logger service initialization status"
              >
                📊 Check Logger
              </button>

              <button
                onClick={handleForceError}
                className="px-3 py-2 bg-orange-600 text-xs rounded hover:bg-orange-700 transition-colors"
                title="Throws a test error to test error boundaries"
              >
                💥 Force Error
              </button>
            </div>

            {/* ✅ Last Action Display */}
            {lastAction && (
              <div className="bg-gray-900 rounded p-2 border border-gray-600">
                <div className="text-xs">
                  <strong className="text-yellow-400">Last Action:</strong>
                  <div className="font-mono text-gray-300 mt-1">
                    {lastAction}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ✅ Tips Section */}
          <div className="border-t border-gray-700 p-3 bg-gray-700">
            <div className="text-xs text-gray-300">
              <p>
                <strong className="text-blue-400">💡 Tips:</strong>
              </p>
              <ul className="list-disc list-inside text-xs space-y-1 mt-1 text-gray-400">
                <li>All debug actions are logged to browser console</li>
                <li>Navigation events are tracked with full telemetry</li>
                <li>Performance metrics updated on each route change</li>
                <li>Panel auto-hides in production builds</li>
                <li>Use F12 DevTools for detailed logging output</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevelopmentDebugPanel;
