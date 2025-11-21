import { suspenseCache } from "~/utils/suspense-fetcher";
import resumeService from "~/service/resume/resume-service";
import { type SkillResponse } from "~/entities/resume";
import { createErrorDetails, createGlobalError } from "~/utils/error";
import loggerService from "~/service/logging";

export const useSkillsResource = () => {
  const cacheKey = "skills-data-v1";

  const skills = suspenseCache.get<SkillResponse>(cacheKey, async () => {
    const startTime = performance.now();

    const cachedData = suspenseCache.peek?.(cacheKey);
    const cacheHit = cachedData !== undefined;

    loggerService.debug("useSkillsResource: Fetching skills with Suspense...", {
      cacheKey,
      operation: "suspense-fetch",
      service: "resumeService.getSkills",
      cacheHit,
      timestamp: new Date().toISOString(),
    });

    const response = await resumeService.getSkills({
      params: { id: "", slug: [], skillsExclude: [] },
    });

    // ✅ Simple validation - let errors throw naturally for Error Boundary
    if (!response || typeof response !== "object") {
      loggerService.warn(
        "useSkillsResource: Invalid response structure received",
        {
          responseType: typeof response,
          hasResponse: !!response,
        }
      );
      throw new Error("Invalid skills response structure");
    }

    // ✅ Test for circular references - let errors throw naturally
    JSON.stringify(response); // This will throw if circular references exist

    const skillCount = response.target?.length || 0;
    const duration = performance.now() - startTime;

    loggerService.success(
      `useSkillsResource: Skills loaded successfully (${skillCount} skills)`,
      {
        skillCount,
        duration: Math.round(duration),
        cacheHit,
        cacheKey,
      }
    );

    // ✅ Fire-and-forget telemetry - don't block the data return
    loggerService
      .trackSkillsLoaded(skillCount, cacheHit, duration, "suspense-cache")
      .catch((error) => {
        // Silent telemetry failure - don't affect the main flow
        console.warn("Telemetry tracking failed:", error);
      });

    return response;
  });

  return skills;
};

export const clearSkillsCache = () => {
  loggerService.info("Clearing skills cache", {
    cacheKey: "skills-data-v1",
    operation: "cache-clear",
  });

  suspenseCache.clear("skills-data-v1");

  // ✅ Fire-and-forget telemetry
  loggerService
    .trackFeatureUsage("SkillsCache", "cache-clear", {
      cacheKey: "skills-data-v1",
    })
    .catch((error) => {
      console.warn("Failed to track cache clear:", error);
    });
};

/**
 * ✅ Simple preload operation
 */
export const preloadSkills = () => {
  loggerService.info("Preloading skills", {
    cacheKey: "skills-data-v1",
    operation: "preload",
  });

  // ✅ Fire-and-forget telemetry
  loggerService
    .trackFeatureUsage("SkillsCache", "preload", {
      cacheKey: "skills-data-v1",
    })
    .catch((error) => {
      console.warn("Failed to track preload:", error);
    });

  // This will trigger the suspense mechanism
  useSkillsResource();
};
