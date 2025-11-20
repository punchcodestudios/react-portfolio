import { suspenseCache } from "~/utils/suspense-fetcher";
import { useCallback } from "react";

export const useCacheManager = () => {
  const clearCache = useCallback((key?: string) => {
    return suspenseCache.clear(key);
  }, []);

  const clearMultipleCaches = useCallback((keys: string[]) => {
    return suspenseCache.clearMultiple(keys);
  }, []);

  const clearExpiredCache = useCallback((maxAgeMs?: number) => {
    return suspenseCache.clearExpired(maxAgeMs);
  }, []);

  const refreshCache = useCallback(
    async <T>(key: string, fetcher: () => Promise<T>) => {
      return suspenseCache.refresh<T>(key, fetcher);
    },
    []
  );

  const getCacheStatus = useCallback(() => {
    return suspenseCache.getStatus();
  }, []);

  const hasCache = useCallback((key: string) => {
    return suspenseCache.exists(key);
  }, []);

  return {
    clearCache,
    clearMultipleCaches,
    clearExpiredCache,
    refreshCache,
    getCacheStatus,
    hasCache,
  };
};
