interface CacheEntry<T> {
  status: "pending" | "resolved" | "rejected";
  value?: T;
  error?: Error;
  promise?: Promise<T>;
  timestamp?: number;
}

class SuspenseCache {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string, fetcher: () => Promise<T>): T {
    let entry = this.cache.get(key);

    if (!entry) {
      entry = { status: "pending", timestamp: Date.now() };
      this.cache.set(key, entry);

      entry.promise = fetcher()
        .then((result) => {
          entry!.status = "resolved";
          entry!.value = result;
          entry!.timestamp = Date.now();
          return result;
        })
        .catch((error) => {
          entry!.status = "rejected";
          entry!.error = error;
          entry!.timestamp = Date.now();
          throw error;
        });
    }

    if (entry.status === "pending") {
      throw entry.promise;
    }

    if (entry.status === "rejected") {
      throw entry.error;
    }

    return entry.value;
  }

  // ✅ NEW: Add peek method for cache inspection without triggering fetch
  peek<T>(key: string): T | undefined {
    const entry = this.cache.get(key);

    // Only return value if cache entry exists and is resolved
    if (entry && entry.status === "resolved") {
      return entry.value;
    }

    // Return undefined for pending, rejected, or non-existent entries
    return undefined;
  }

  // ✅ NEW: Check if cache has resolved data (for telemetry)
  hasResolvedData(key: string): boolean {
    const entry = this.cache.get(key);
    return entry?.status === "resolved";
  }

  // ✅ NEW: Get entry status for telemetry
  getEntryStatus(
    key: string
  ): "pending" | "resolved" | "rejected" | "not-found" {
    const entry = this.cache.get(key);
    return entry?.status ?? "not-found";
  }

  clear(key?: string) {
    if (key) {
      const deleted = this.cache.delete(key);
      console.log(`Cache cleared for key: ${key}`, deleted);
      return deleted;
    } else {
      const size = this.cache.size;
      this.cache.clear();
      console.log(`All cache cleared, ${size} entries removed`);
      return true;
    }
  }

  clearMultiple(keys: string[]) {
    let cleared = 0;
    keys.forEach((key) => {
      if (this.cache.delete(key)) {
        cleared++;
      }
    });
    console.log(`Cleared ${cleared} cache entries`);
    return cleared;
  }

  clearExpired(maxAgeMs: number = 5 * 60 * 1000) {
    const now = Date.now();
    let cleared = 0;
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp && now - entry.timestamp > maxAgeMs) {
        this.cache.delete(key);
        expiredKeys.push(key);
        cleared++;
      }
    }

    if (cleared > 0) {
      console.log(`Cleared ${cleared} expired cache entries:`, expiredKeys);
    }

    return cleared;
  }

  // ✅ ENHANCED: Better status reporting for telemetry
  getStatus() {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => {
      return {
        key,
        status: entry.status,
        age: entry.timestamp ? now - entry.timestamp : null,
        ageFormatted: entry.timestamp
          ? this.formatAge(now - entry.timestamp)
          : null,
        hasValue: !!entry.value,
        hasError: !!entry.error,
        errorMessage: entry.error?.message,
      };
    });

    const statusCounts = entries.reduce((acc, entry) => {
      acc[entry.status] = (acc[entry.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEntries: this.cache.size,
      statusCounts,
      entries,
      summary: {
        totalEntries: this.cache.size,
        resolved: statusCounts.resolved || 0,
        pending: statusCounts.pending || 0,
        rejected: statusCounts.rejected || 0,
      },
    };
  }

  // ✅ NEW: Format age for human readability
  private formatAge(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
    return `${(ms / 3600000).toFixed(1)}h`;
  }

  exists(key: string): boolean {
    return this.cache.has(key);
  }

  async refresh<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    console.log(`Refreshing cache for key: ${key}`);
    this.clear(key);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = this.get(key, fetcher);
          resolve(result);
        } catch (promise) {
          if (promise instanceof Promise) {
            promise.then(resolve).catch(reject);
          } else {
            reject(promise);
          }
        }
      }, 0);
    });
  }

  // ✅ NEW: Get cache statistics for monitoring
  getStatistics() {
    const status = this.getStatus();
    const now = Date.now();

    const ages = status.entries
      .filter((e) => e.age !== null)
      .map((e) => e.age!);

    const avgAge =
      ages.length > 0 ? ages.reduce((a, b) => a + b, 0) / ages.length : 0;
    const maxAge = ages.length > 0 ? Math.max(...ages) : 0;
    const minAge = ages.length > 0 ? Math.min(...ages) : 0;

    return {
      ...status.summary,
      performance: {
        averageAge: this.formatAge(avgAge),
        maxAge: this.formatAge(maxAge),
        minAge: this.formatAge(minAge),
        totalMemoryUsage: this.estimateMemoryUsage(),
      },
      timestamp: now,
    };
  }

  // ✅ NEW: Estimate memory usage for monitoring
  private estimateMemoryUsage(): string {
    let totalSize = 0;

    for (const [key, entry] of this.cache.entries()) {
      // Rough estimation
      totalSize += key.length * 2; // Unicode characters
      if (entry.value) {
        try {
          totalSize += JSON.stringify(entry.value).length * 2;
        } catch {
          totalSize += 1000; // Fallback estimate for non-serializable objects
        }
      }
      if (entry.error) {
        totalSize += (entry.error.message?.length || 0) * 2;
        totalSize += (entry.error.stack?.length || 0) * 2;
      }
    }

    if (totalSize < 1024) return `${totalSize} bytes`;
    if (totalSize < 1024 * 1024) return `${(totalSize / 1024).toFixed(1)} KB`;
    return `${(totalSize / (1024 * 1024)).toFixed(1)} MB`;
  }
}

export const suspenseCache = new SuspenseCache();
