import React, { useState, useCallback } from "react";
import { clearSkillsCache, preloadSkills } from "~/hooks/useSkillsResource";
import loggerService from "~/service/logging";

const SkillsDebugPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastAction, setLastAction] = useState<string>("");

  const logAction = useCallback((action: string, details?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    setLastAction(`${timestamp}: ${action}`);

    // ✅ Use console logging for debug actions (no telemetry needed)
    loggerService.debug(`[SkillsDebugPanel] ${action}`, details, {
      component: "SkillsDebugPanel",
      debugAction: action,
      timestamp: new Date().toISOString(),
      // Note: This metadata won't be sent to telemetry in debug calls
    });
  }, []);

  const handleClearCache = useCallback(() => {
    logAction("Manually clearing skills cache");
    clearSkillsCache();

    // ✅ Small delay to show the action before reload
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }, [logAction]);

  const handlePreload = useCallback(() => {
    logAction("Manually preloading skills");
    preloadSkills();
  }, [logAction]);

  const handleForceError = useCallback(() => {
    logAction("Forcing error for testing");
    // ✅ Wrapped in setTimeout to ensure log is written first
    setTimeout(() => {
      throw new Error(
        "🧪 Test error for debugging - triggered by SkillsDebugPanel"
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

  // ✅ Enhanced cache inspection
  const handleInspectCache = useCallback(() => {
    // Note: This would depend on your cache implementation
    logAction("Inspecting skills cache state");
    console.group("🔍 Skills Cache Inspection");
    console.log("Cache inspection requested at:", new Date().toISOString());
    console.log("Logger initialized:", loggerService.isInitialized());
    console.groupEnd();
  }, [logAction]);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  // TODO: Add to future sprint: UI: use styled components and convert to tailwind css architecture
  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 text-white rounded-lg shadow-xl z-50 border border-gray-600">
      <div
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-800 rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-sm font-bold">🔧 Skills Debug Panel</h4>
        <span className="text-xs">{isExpanded ? "▼" : "▶"}</span>
      </div>

      {isExpanded && (
        <div className="p-3 border-t border-gray-600">
          <div className="flex flex-col gap-2 mb-3">
            <button
              onClick={handleClearCache}
              className="px-3 py-1 bg-red-600 text-xs rounded hover:bg-red-700 transition-colors"
              title="Clears skills cache and reloads the page"
            >
              🗑️ Clear Cache & Reload
            </button>

            <button
              onClick={handlePreload}
              className="px-3 py-1 bg-blue-600 text-xs rounded hover:bg-blue-700 transition-colors"
              title="Manually triggers skills preloading"
            >
              📥 Preload Skills
            </button>

            <button
              onClick={handleInspectCache}
              className="px-3 py-1 bg-purple-600 text-xs rounded hover:bg-purple-700 transition-colors"
              title="Logs current cache state to console"
            >
              🔍 Inspect Cache
            </button>

            <button
              onClick={handleToggleLogger}
              className="px-3 py-1 bg-green-600 text-xs rounded hover:bg-green-700 transition-colors"
              title="Check logger service initialization status"
            >
              📊 Check Logger
            </button>

            <button
              onClick={handleForceError}
              className="px-3 py-1 bg-orange-600 text-xs rounded hover:bg-orange-700 transition-colors"
              title="Throws a test error to test error boundaries"
            >
              💥 Force Error
            </button>
          </div>

          {/* ✅ Status display */}
          <div className="text-xs border-t border-gray-600 pt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-400">Logger:</span>
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

            {lastAction && (
              <div className="text-gray-300 text-xs bg-gray-800 p-1 rounded mt-1">
                <strong>Last Action:</strong>
                <div className="font-mono text-xs">{lastAction}</div>
              </div>
            )}
          </div>

          {/* ✅ Quick tips */}
          <div className="text-xs text-gray-400 mt-2 border-t border-gray-600 pt-2">
            <p>
              💡 <strong>Tips:</strong>
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 mt-1">
              <li>All actions are logged to console</li>
              <li>Check browser devtools for detailed logs</li>
              <li>No telemetry sent from debug actions</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsDebugPanel;
