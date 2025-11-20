import React from "react";
import { useCacheManager } from "~/hooks/useCacheManager";

interface CacheControlProps {
  cacheKey?: string;
  showStatus?: boolean;
}

export const CacheControl: React.FC<CacheControlProps> = ({
  cacheKey,
  showStatus = false,
}) => {
  const {
    clearCache,
    clearMultipleCaches,
    clearExpiredCache,
    refreshCache,
    getCacheStatus,
    hasCache,
  } = useCacheManager();

  const [status, setStatus] = React.useState<any>(null);
  const handleClearSpecific = () => {
    if (cacheKey) {
      const result = clearCache(cacheKey);
      console.log(`Cleared cache for key: ${cacheKey}`, result);
    }
  };

  const handleClearAll = () => {
    const result = clearCache();
    console.log("Cleared all cache", result);
  };

  const handleClearExpired = () => {
    const result = clearExpiredCache();
    console.log("Cleared expired cache entries", result);
  };

  const handleShowStatus = () => {
    const status = getCacheStatus();
    setStatus(status);
    console.log("Cache Status:", status);
  };

  // TODO : use punchcodestudio buttons in place of basic HTML
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg">
      <h3 className="w-full text-sm font-bold mb-2">Cache Controls</h3>

      {cacheKey && (
        <button
          onClick={handleClearSpecific}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Clear {cacheKey}
        </button>
      )}

      <button
        onClick={handleClearAll}
        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
      >
        Clear All Cache
      </button>

      <button
        onClick={handleClearExpired}
        className="px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        Clear Expired
      </button>

      {showStatus && (
        <button
          onClick={handleShowStatus}
          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
        >
          Show Status
        </button>
      )}

      {status && (
        <div className="w-full mt-2 p-2 bg-white rounded text-xs">
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
