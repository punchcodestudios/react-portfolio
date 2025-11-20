import type {
  Skill,
  SkillRequest,
  SkillResponse,
  Experience,
  ExperienceRequest,
  ExperienceResponse,
  Education,
  EducationRequest,
  EducationResponse,
  EducationMeta,
} from "~/entities/resume";
import type { ApiResponse } from "~/entities/api";
import ApiClient from "~/api/apiClient";
import { loggerService } from "~/service/logging";
import { delayRequest } from "~/utils/site";

interface CacheEntry<T> {
  data: Promise<T>;
  timestamp: number;
  key: string;
  correlationId: string;
}

interface ResumeServiceConfig {
  cacheTimeout?: number;
  maxCacheSize?: number;
  enableDelaySimulation?: boolean;
  delayMs?: number;
  enableMetrics?: boolean;
}

/**
 * Enhanced Resume Service with enterprise-grade caching, logging, and telemetry
 * Fully compatible with React Suspense patterns
 */
class ResumeService {
  private skillsCache = new Map<string, CacheEntry<SkillResponse>>();
  private experienceCache = new Map<string, CacheEntry<ExperienceResponse>>();
  private educationCache = new Map<string, CacheEntry<EducationResponse>>();

  private readonly config: Required<ResumeServiceConfig>;
  private readonly instanceId: string;

  constructor(config: ResumeServiceConfig = {}) {
    this.config = {
      cacheTimeout: 5 * 60 * 1000, // 5 minutes
      maxCacheSize: 100,
      enableDelaySimulation: process.env.NODE_ENV === "development",
      delayMs: 2000,
      enableMetrics: true,
      ...config,
    };

    this.instanceId = `resume-service-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    loggerService.debug("ResumeService initialized", undefined, {
      component: "ResumeService",
      operation: "constructor",
      instanceId: this.instanceId,
      config: {
        cacheTimeout: this.config.cacheTimeout,
        maxCacheSize: this.config.maxCacheSize,
        enableDelaySimulation: this.config.enableDelaySimulation,
        enableMetrics: this.config.enableMetrics,
      },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get skills data with enhanced caching and telemetry
   * Fully compatible with React Suspense
   */
  async getSkills(request: SkillRequest): Promise<SkillResponse> {
    const startTime = performance.now();
    const correlationId = this.generateCorrelationId("skills");
    const cacheKey = JSON.stringify(request);

    loggerService.debug("Resume Service: getSkills called", undefined, {
      component: "ResumeService",
      operation: "getSkills",
      correlationId,
      cacheKey,
      request: this.sanitizeRequest(request),
      instanceId: this.instanceId,
      timestamp: new Date().toISOString(),
    });

    try {
      // Check cache first with enhanced logging
      const cached = this.getCachedData(
        this.skillsCache,
        cacheKey,
        correlationId
      );
      if (cached) {
        const duration = performance.now() - startTime;

        loggerService.debug(
          "Skills cache hit - returning cached data",
          undefined,
          {
            component: "ResumeService",
            operation: "cache-hit",
            correlationId,
            cacheKey,
            duration: Math.round(duration),
            cacheSize: this.skillsCache.size,
          }
        );

        // Track cache performance
        if (this.config.enableMetrics) {
          loggerService.performance(
            "ResumeService.getSkills.CacheHit",
            duration,
            true,
            undefined,
            {
              component: "ResumeService",
              operation: "skills-cache-hit",
              correlationId,
            }
          );
        }

        return cached;
      }

      // Create new request with correlation tracking
      loggerService.debug(
        "Skills cache miss - initiating API request",
        undefined,
        {
          component: "ResumeService",
          operation: "cache-miss",
          correlationId,
          cacheKey,
          cacheSize: this.skillsCache.size,
        }
      );

      const promise = this.getSkillsImplementation(request, correlationId);
      this.setCachedData(this.skillsCache, cacheKey, promise, correlationId);

      const result = await promise;
      const duration = performance.now() - startTime;

      loggerService.success("Skills data fetched successfully", undefined, {
        component: "ResumeService",
        operation: "getSkills-success",
        correlationId,
        cacheKey,
        duration: Math.round(duration),
        skillCount: result.target?.length || 0,
        dataSize: this.estimateDataSize(result),
      });

      // Track successful fetch performance
      if (this.config.enableMetrics) {
        loggerService.performance(
          "ResumeService.getSkills",
          duration,
          true,
          undefined,
          {
            component: "ResumeService",
            operation: "skills-fetch-success",
            correlationId,
            skillCount: result.target?.length || 0,
          }
        );
      }

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;

      // Enhanced error logging with correlation
      loggerService.error("Resume Service: getSkills failed", error, {
        component: "ResumeService",
        operation: "getSkills-failed",
        correlationId,
        cacheKey,
        duration: Math.round(duration),
        request: this.sanitizeRequest(request),
        errorCategory: "data-fetch-error",
        instanceId: this.instanceId,
      });

      // Remove failed promise from cache
      this.skillsCache.delete(cacheKey);

      // Track error metrics
      if (this.config.enableMetrics) {
        loggerService.performance(
          "ResumeService.getSkills.Error",
          duration,
          false,
          undefined,
          {
            component: "ResumeService",
            operation: "skills-fetch-error",
            correlationId,
            errorType:
              error instanceof Error ? error.constructor.name : "Unknown",
          }
        );
      }

      throw error; // Maintain Suspense error propagation
    }
  }

  /**
   * Get experience data with enhanced caching and telemetry
   */
  async getExperience(request: ExperienceRequest): Promise<ExperienceResponse> {
    const startTime = performance.now();
    const correlationId = this.generateCorrelationId("experience");
    const cacheKey = JSON.stringify(request);

    loggerService.debug("Resume Service: getExperience called", undefined, {
      component: "ResumeService",
      operation: "getExperience",
      correlationId,
      cacheKey,
      instanceId: this.instanceId,
    });

    try {
      const cached = this.getCachedData(
        this.experienceCache,
        cacheKey,
        correlationId
      );
      if (cached) {
        loggerService.debug("Experience cache hit", undefined, {
          component: "ResumeService",
          operation: "cache-hit",
          correlationId,
          dataType: "experience",
        });
        return cached;
      }

      const promise = this.getExperienceImplementation(request, correlationId);
      this.setCachedData(
        this.experienceCache,
        cacheKey,
        promise,
        correlationId
      );

      const result = await promise;
      const duration = performance.now() - startTime;

      loggerService.success("Experience data fetched successfully", undefined, {
        component: "ResumeService",
        operation: "getExperience-success",
        correlationId,
        duration: Math.round(duration),
        experienceCount: result.target?.length || 0,
      });

      if (this.config.enableMetrics) {
        loggerService.performance(
          "ResumeService.getExperience",
          duration,
          true,
          undefined,
          {
            component: "ResumeService",
            operation: "experience-fetch-success",
            correlationId,
          }
        );
      }

      return result;
    } catch (error) {
      this.experienceCache.delete(cacheKey);

      loggerService.error("Resume Service: getExperience failed", error, {
        component: "ResumeService",
        operation: "getExperience-failed",
        correlationId,
        cacheKey,
        instanceId: this.instanceId,
      });

      throw error;
    }
  }

  /**
   * Get education data with enhanced caching and telemetry
   */
  async getEducation(request: EducationRequest): Promise<EducationResponse> {
    const startTime = performance.now();
    const correlationId = this.generateCorrelationId("education");
    const cacheKey = JSON.stringify(request);

    loggerService.debug("Resume Service: getEducation called", undefined, {
      component: "ResumeService",
      operation: "getEducation",
      correlationId,
      cacheKey,
      instanceId: this.instanceId,
    });

    try {
      const cached = this.getCachedData(
        this.educationCache,
        cacheKey,
        correlationId
      );
      if (cached) {
        loggerService.debug("Education cache hit", undefined, {
          component: "ResumeService",
          operation: "cache-hit",
          correlationId,
          dataType: "education",
        });
        return cached;
      }

      const promise = this.getEducationImplementation(request, correlationId);
      this.setCachedData(this.educationCache, cacheKey, promise, correlationId);

      const result = await promise;
      const duration = performance.now() - startTime;

      loggerService.success("Education data fetched successfully", undefined, {
        component: "ResumeService",
        operation: "getEducation-success",
        correlationId,
        duration: Math.round(duration),
        educationCount: result.target?.length || 0,
      });

      if (this.config.enableMetrics) {
        loggerService.performance(
          "ResumeService.getEducation",
          duration,
          true,
          undefined,
          {
            component: "ResumeService",
            operation: "education-fetch-success",
            correlationId,
          }
        );
      }

      return result;
    } catch (error) {
      this.educationCache.delete(cacheKey);

      loggerService.error("Resume Service: getEducation failed", error, {
        component: "ResumeService",
        operation: "getEducation-failed",
        correlationId,
        cacheKey,
        instanceId: this.instanceId,
      });

      throw error;
    }
  }

  // Cache Management Methods
  private getCachedData<T>(
    cache: Map<string, CacheEntry<T>>,
    key: string,
    correlationId: string
  ): Promise<T> | null {
    const entry = cache.get(key);
    if (!entry) return null;

    if (!this.isCacheValid(entry.timestamp)) {
      cache.delete(key);

      loggerService.debug("Cache entry expired and removed", undefined, {
        component: "ResumeService",
        operation: "cache-expiry",
        cacheKey: key,
        correlationId,
        entryAge: Date.now() - entry.timestamp,
        cacheTimeout: this.config.cacheTimeout,
      });

      return null;
    }

    return entry.data;
  }

  private setCachedData<T>(
    cache: Map<string, CacheEntry<T>>,
    key: string,
    data: Promise<T>,
    correlationId: string
  ): void {
    // Implement cache size limit with LRU eviction
    if (cache.size >= this.config.maxCacheSize) {
      this.evictOldestCacheEntry(cache, correlationId);
    }

    cache.set(key, {
      data,
      timestamp: Date.now(),
      key,
      correlationId,
    });

    loggerService.debug("Data cached successfully", undefined, {
      component: "ResumeService",
      operation: "cache-set",
      cacheKey: key,
      correlationId,
      cacheSize: cache.size,
      maxCacheSize: this.config.maxCacheSize,
    });
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.config.cacheTimeout;
  }

  private evictOldestCacheEntry<T>(
    cache: Map<string, CacheEntry<T>>,
    correlationId: string
  ): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      cache.delete(oldestKey);

      loggerService.debug("Cache entry evicted due to size limit", undefined, {
        component: "ResumeService",
        operation: "cache-eviction",
        evictedKey: oldestKey,
        correlationId,
        cacheSize: cache.size,
        maxCacheSize: this.config.maxCacheSize,
        reason: "size-limit",
      });
    }
  }

  // Debug and Management Methods
  clearAllCaches(): void {
    const totalEntries =
      this.skillsCache.size +
      this.experienceCache.size +
      this.educationCache.size;

    this.skillsCache.clear();
    this.experienceCache.clear();
    this.educationCache.clear();

    loggerService.info("All resume service caches cleared", undefined, {
      component: "ResumeService",
      operation: "cache-clear-all",
      clearedEntries: totalEntries,
      instanceId: this.instanceId,
      userInitiated: true,
      timestamp: new Date().toISOString(),
    });
  }

  getCacheStats() {
    const stats = {
      skills: this.skillsCache.size,
      experience: this.experienceCache.size,
      education: this.educationCache.size,
      total:
        this.skillsCache.size +
        this.experienceCache.size +
        this.educationCache.size,
      maxSize: this.config.maxCacheSize,
      utilizationPercent: Math.round(
        ((this.skillsCache.size +
          this.experienceCache.size +
          this.educationCache.size) /
          (this.config.maxCacheSize * 3)) *
          100
      ),
      instanceId: this.instanceId,
    };

    loggerService.debug("Cache statistics requested", undefined, {
      component: "ResumeService",
      operation: "cache-stats",
      stats,
      timestamp: new Date().toISOString(),
    });

    return stats;
  }

  // Implementation Methods (Private)
  private async getSkillsImplementation(
    request: SkillRequest,
    correlationId: string
  ): Promise<SkillResponse> {
    try {
      const client = new ApiClient<Skill>("resume/get-all-skills", request);

      loggerService.debug("Skills API request initiated", undefined, {
        component: "ResumeService",
        operation: "api-request",
        correlationId,
        endpoint: "resume/get-all-skills",
        params: this.sanitizeRequest(request),
        headers: this.sanitizeHeaders(client.headers),
        instanceId: this.instanceId,
      });

      // Simulate delay in development if enabled
      if (this.config.enableDelaySimulation) {
        loggerService.debug("Simulating API delay for development", undefined, {
          component: "ResumeService",
          operation: "delay-simulation",
          correlationId,
          delayMs: this.config.delayMs,
        });

        await delayRequest(this.config.delayMs);
      }

      const response = await client.getAll();

      loggerService.success(
        "Skills API request completed successfully",
        undefined,
        {
          component: "ResumeService",
          operation: "api-success",
          correlationId,
          endpoint: "resume/get-all-skills",
          responseSize: this.estimateDataSize(response),
        }
      );

      return this.mapSkills(response, correlationId);
    } catch (error: any) {
      loggerService.error("Skills API request failed", error, {
        component: "ResumeService",
        operation: "api-error",
        correlationId,
        endpoint: "resume/get-all-skills",
        errorType: error?.constructor?.name || "Unknown",
        instanceId: this.instanceId,
      });

      throw error;
    }
  }

  private async getExperienceImplementation(
    request: ExperienceRequest,
    correlationId: string
  ): Promise<ExperienceResponse> {
    try {
      const client = new ApiClient<Experience>(
        "resume/get-all-experience",
        request
      );

      loggerService.debug("Experience API request initiated", undefined, {
        component: "ResumeService",
        operation: "api-request",
        correlationId,
        endpoint: "resume/get-all-experience",
      });

      if (this.config.enableDelaySimulation) {
        await delayRequest(this.config.delayMs);
      }

      const response = await client.getAll();

      loggerService.success("Experience API request completed", undefined, {
        component: "ResumeService",
        operation: "api-success",
        correlationId,
        endpoint: "resume/get-all-experience",
      });

      return this.mapExperience(response, correlationId);
    } catch (error) {
      loggerService.error("Experience API request failed", error, {
        component: "ResumeService",
        operation: "api-error",
        correlationId,
        endpoint: "resume/get-all-experience",
      });

      throw error;
    }
  }

  private async getEducationImplementation(
    request: EducationRequest,
    correlationId: string
  ): Promise<EducationResponse> {
    try {
      const client = new ApiClient<Education>(
        "resume/get-all-education",
        request
      );

      loggerService.debug("Education API request initiated", undefined, {
        component: "ResumeService",
        operation: "api-request",
        correlationId,
        endpoint: "resume/get-all-education",
      });

      if (this.config.enableDelaySimulation) {
        await delayRequest(this.config.delayMs);
      }

      const response = await client.getAll();

      loggerService.success("Education API request completed", undefined, {
        component: "ResumeService",
        operation: "api-success",
        correlationId,
        endpoint: "resume/get-all-education",
      });

      return this.mapEducation(response, correlationId);
    } catch (error) {
      loggerService.error("Education API request failed", error, {
        component: "ResumeService",
        operation: "api-error",
        correlationId,
        endpoint: "resume/get-all-education",
      });

      throw error;
    }
  }

  // Mapping Methods with Enhanced Logging
  private mapSkills(
    item: ApiResponse<Skill>,
    correlationId: string
  ): SkillResponse {
    const skillCount = item.content?.target?.length || 0;

    loggerService.debug("Mapping skills response", undefined, {
      component: "ResumeService",
      operation: "map-skills",
      correlationId,
      skillCount,
      hasError: !!item.content?.error,
      hasMeta: !!item.content?.meta,
    });

    // Log first skill for debugging (sanitized)
    if (skillCount > 0 && process.env.NODE_ENV === "development") {
      loggerService.debug("First skill sample (development only)", undefined, {
        component: "ResumeService",
        operation: "skill-sample",
        correlationId,
        sampleSkill: this.sanitizeSkillData(item.content.target[0]),
      });
    }

    const result: SkillResponse = {
      target: item.content?.target || [],
      meta: item.content?.meta || {},
      error: item.content?.error || null,
    };

    return result;
  }

  private mapExperience(
    item: ApiResponse<Experience>,
    correlationId: string
  ): ExperienceResponse {
    loggerService.debug("Mapping experience response", undefined, {
      component: "ResumeService",
      operation: "map-experience",
      correlationId,
      experienceCount: item.content?.target?.length || 0,
    });

    return {
      target: item.content?.target || [],
      meta: item.content?.meta || {},
      error: item.content?.error || null,
    };
  }

  private mapEducation(
    item: ApiResponse<Education>,
    correlationId: string
  ): EducationResponse {
    loggerService.debug("Mapping education response", undefined, {
      component: "ResumeService",
      operation: "map-education",
      correlationId,
      educationCount: item.content?.target?.length || 0,
    });

    return {
      target: item.content?.target || [],
      meta: item.content?.meta || {},
      error: item.content?.error || null,
    };
  }

  // Utility Methods
  private generateCorrelationId(operation: string): string {
    return `${operation}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  private estimateDataSize(data: any): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      return 0;
    }
  }

  private sanitizeRequest(request: any): any {
    // Remove or mask sensitive data for logging
    return {
      ...request,
      // Could add sanitization logic here if needed
    };
  }

  private sanitizeHeaders(headers: any): any {
    // Remove sensitive headers from logs
    const sanitized = { ...headers };
    delete sanitized.Authorization;
    delete sanitized.Cookie;
    return sanitized;
  }

  private sanitizeSkillData(skill: any): any {
    // Return safe subset of skill data for logging
    return {
      id: skill?.id,
      name: skill?.name,
      category: skill?.category,
      // Exclude potentially sensitive fields
    };
  }
}

// Export singleton instance with development-friendly configuration
export const resumeService = new ResumeService({
  enableDelaySimulation: process.env.NODE_ENV === "development",
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
  maxCacheSize: 50,
  enableMetrics: true,
  delayMs: 2000,
});

export default resumeService;
