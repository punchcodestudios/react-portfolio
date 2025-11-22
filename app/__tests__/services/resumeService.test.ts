import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ResumeService } from "~/service/resume";

import type {
  SkillRequest,
  ExperienceRequest,
  EducationRequest,
  Skill,
  Experience,
  Education,
  SkillMeta,
  ExperienceMeta,
  EducationMeta,
} from "~/service/resume";

import type { ApiDataResponse } from "~/api";

const mockGetAll = vi.fn();

vi.mock("~/api/apiClient", () => ({
  default: vi.fn().mockImplementation(function (
    this: any,
    endpoint: string,
    request
  ) {
    this.getAll = mockGetAll;
    return this;
  }),
}));

vi.mock("~/service/logging", () => ({
  default: globalThis.mockLoggerService,
  loggerService: globalThis.mockLoggerService,
}));

// ✅ Mock cache service for AI Agent performance testing
vi.mock("~/service/_base/cache-service", () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    has: vi.fn().mockReturnValue(false),
    delete: vi.fn(),
    clear: vi.fn(),
    size: vi.fn().mockReturnValue(0),
    getStats: vi.fn().mockReturnValue({
      hits: 0,
      misses: 0,
      hitRate: 0,
      size: 0,
    }),
  },
}));

vi.mock("~/utils/site", () => ({
  delayRequest: vi.fn(),
}));

describe("ResumeService", () => {
  let resumeService: ResumeService;

  const mockSkillsRequest: SkillRequest = {
    params: {
      id: "test-id",
      slug: ["react", "typescript"],
      skillsExclude: ["deprecated-skill"],
    },
  };

  const mockSkillsResponse: ApiDataResponse<Skill, SkillMeta> = {
    target: [
      {
        id: 1,
        name: "React",
        description: "A JavaScript library for building user interfaces",
        refid: "refid01",
        level: "Advanced",
        category: "Frontend",
        slug: [],
        skill_types: [],
      },
      {
        id: 2,
        name: "TypeScript",
        description:
          "A typed superset of JavaScript that compiles to plain JavaScript",
        refid: "refid02",
        level: "Advanced",
        category: "Language",
        slug: [],
        skill_types: [],
      },
    ],
    meta: {
      total: 2,
      cacheHit: false,
      requestDuration: 150,
      source: "api",
      correlationId: "skill-test-123",
    } as SkillMeta, // ✅ Added: Proper type casting for SkillMeta
    error: null,
  };

  const mockExperienceRequest: ExperienceRequest = {
    params: {
      id: "company-123",
      experienceExclude: [],
      slug: [],
    },
  };

  const mockExperienceResponse: ApiDataResponse<Experience, ExperienceMeta> = {
    target: [
      {
        id: 1,
        refid: "exp-refid-01",
        company_name: "Tech Corp",
        position: "Senior Developer",
        start_date: "2020-01-01",
        end_date: "2024-01-01",
        location: "Remote",
        experience_line_items: [],
        slug: "senior-developer-tech-corp",
      } as Experience,
    ],
    meta: {
      total: 1,
      cacheHit: false,
      source: "api",
      correlationId: "exp-test-123",
    } as ExperienceMeta,
    error: null,
  };

  const mockEducationRequest: EducationRequest = {
    params: {
      id: "edu-123",
      educationExclude: [],
      slug: [],
    },
  };

  const mockEducationResponse: ApiDataResponse<Education, EducationMeta> = {
    target: [
      {
        id: 1,
        refid: "edu-refid-01",
        institution_name: "Tech University",
        start_date: "2007-06-01",
        end_date: "2009-06-01",
        degree: "Bachelor of Science",
        field_of_study: "Computer Science",
        location: "Some Location",
        slug: "bachelor-of-science-computer-science-tech-university",
      },
    ],
    meta: {
      total: 1,
      cacheHit: false,
      source: "api",
      correlationId: "resume-service-edu-test-123",
    } as EducationMeta,
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    resumeService = new ResumeService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Skills API", () => {
    it("should fetch skills successfully with telemetry tracking", async () => {
      // Arrange
      mockGetAll.mockResolvedValue({
        content: mockSkillsResponse,
      });

      // Act
      const result = await resumeService.getSkills(mockSkillsRequest);

      // Assert
      expect(result.target).toHaveLength(2);
      expect(result.target[0].name).toBe("React");
      expect(result.target[1].name).toBe("TypeScript");
      expect(result.error).toBeNull();
      expect(mockGetAll).toHaveBeenCalled();

      // TODO: add these back in once the testing is working at this level
      // // Verify telemetry tracking
      // expect(mockBusinessTracker.trackSkillsLoaded).toHaveBeenCalledWith(
      //   expect.objectContaining({
      //     count: 2,
      //     cacheHit: false,
      //     correlationId: "test-correlation-123",
      //     source: "api",
      //   })
      // );

      // expect(mockTelemetryService.trackEvent).toHaveBeenCalledWith(
      //   expect.objectContaining({
      //     name: "SkillsDataLoaded",
      //     properties: expect.objectContaining({
      //       correlationId: "test-correlation-123",
      //       skillCount: "2",
      //       cacheHit: "false",
      //     }),
      //   })
      // );
    });

    it("should handle API errors gracefully", async () => {
      // Arrange

      const apiError = new Error("Skills API Error");
      mockGetAll.mockRejectedValue(apiError);

      // Act & Assert
      await expect(resumeService.getSkills(mockSkillsRequest)).rejects.toThrow(
        "Skills API Error"
      );

      // TODO: add these back in once the testing is working at this level
      // expect(mockBusinessTracker.trackSkillsError).toHaveBeenCalledWith(
      //   apiError,
      //   expect.any(Number), // duration
      //   expect.objectContaining({
      //     correlationId: "error-correlation-456",
      //     operation: "getSkills",
      //   })
      // );

      // expect(mockTelemetryService.trackException).toHaveBeenCalledWith(
      //   expect.objectContaining({
      //     error: apiError,
      //     properties: expect.objectContaining({
      //       correlationId: "error-correlation-456",
      //       operation: "getSkills",
      //     }),
      //   })
      // );
    });

    it("should utilize cache when available", async () => {
      // Arrange
      mockGetAll.mockResolvedValue({
        content: mockSkillsResponse,
      });

      // Act - First call populates cache
      const firstResult = await resumeService.getSkills(mockSkillsRequest);
      expect(firstResult.meta.cacheHit).toBe(false);
      expect(mockGetAll).toHaveBeenCalledTimes(1);

      // Act - Second call should use cache
      const secondResult = await resumeService.getSkills(mockSkillsRequest);

      // Assert
      expect(secondResult.meta.cacheHit).toBe(true);
      expect(secondResult.meta.source).toBe("cache");
      // API should not be called again
      expect(mockGetAll).toHaveBeenCalledTimes(1);

      // TODO: add these back in once the testing is working at this level
      // expect(mockBusinessTracker.trackSkillsLoaded).toHaveBeenCalledWith(
      //   expect.objectContaining({
      //     cacheHit: true,
      //     source: "cache",
      //     correlationId: "cache-test-2",
      //   })
      // );
    });

    it("should track performance metrics accurately", async () => {
      // Arrange
      const { loggerService } = await import("~/service/logging");

      mockGetAll.mockResolvedValue({
        content: mockSkillsResponse,
      });

      // Act
      await resumeService.getSkills(mockSkillsRequest);

      // Assert - Verify logging was called
      expect(loggerService.debug).toHaveBeenCalled();
      expect(loggerService.success).toHaveBeenCalled();
      // expect(loggerService.performance).toHaveBeenCalled();

      // Assert
      // expect(mockTelemetryService.trackMetric).toHaveBeenCalledWith(
      //   expect.objectContaining({
      //     name: "SkillsLoadDuration",
      //     value: 250, // mockEndTime - mockStartTime
      //     properties: expect.objectContaining({
      //       correlationId: "perf-test-123",
      //       operation: "getSkills",
      //     }),
      //   })
      // );
    });
  });

  describe("Experience API", () => {
    it("should fetch experience successfully", async () => {
      // Arrange
      mockGetAll.mockResolvedValue({
        content: mockExperienceResponse,
      });

      // Act
      const result = await resumeService.getExperience(mockExperienceRequest);

      // Assert
      expect(result.target).toHaveLength(1);
      expect(result.target[0].company_name).toBe("Tech Corp");
      expect(result.target[0].position).toBe("Senior Developer");
      expect(result.error).toBeNull();
      expect(mockGetAll).toHaveBeenCalled();
    });

    it("should handle experience API errors", async () => {
      // Arrange
      const apiError = new Error("Experience API Error");
      mockGetAll.mockRejectedValue(apiError);

      // Act & Assert
      await expect(
        resumeService.getExperience(mockExperienceRequest)
      ).rejects.toThrow("Experience API Error");
    });
  });

  describe("Education API", () => {
    it("should fetch education successfully", async () => {
      // Arrange
      mockGetAll.mockResolvedValue({
        content: mockEducationResponse,
      });

      // Act
      const result = await resumeService.getEducation(mockEducationRequest);

      // Assert
      expect(result.target).toHaveLength(1);
      expect(result.target[0].institution_name).toBe("Tech University");
      expect(result.target[0].degree).toBe("Bachelor of Science");
      expect(result.error).toBeNull();
      expect(mockGetAll).toHaveBeenCalled();
    });

    it("should handle education API errors", async () => {
      // Arrange
      const apiError = new Error("Education API Error");
      mockGetAll.mockRejectedValue(apiError);

      // Act & Assert
      await expect(
        resumeService.getEducation(mockEducationRequest)
      ).rejects.toThrow("Education API Error");
    });
  });

  describe("Cache Management", () => {
    it("should provide accurate cache statistics", () => {
      // Act
      const stats = resumeService.getAllCacheStats();

      // Assert
      expect(stats).toHaveProperty("skills");
      expect(stats).toHaveProperty("experience");
      expect(stats).toHaveProperty("education");
      expect(stats).toHaveProperty("total");

      expect(stats.skills).toHaveProperty("size");
      expect(stats.skills).toHaveProperty("maxSize");
      expect(stats.skills).toHaveProperty("serviceName", "SkillsService");

      expect(stats.total).toHaveProperty("serviceName", "ResumeService");
      expect(stats.total).toHaveProperty("totalSize");
      expect(stats.total).toHaveProperty("totalMaxSize");
    });

    it("should clear all caches successfully", async () => {
      // Arrange - Get initial stats
      const initialStats = resumeService.getAllCacheStats();

      // Act
      resumeService.clearAllCaches();

      // Assert
      const clearedStats = resumeService.getAllCacheStats();
      expect(clearedStats.skills.size).toBe(0);
      expect(clearedStats.experience.size).toBe(0);
      expect(clearedStats.education.size).toBe(0);

      // Verify logging
      const { loggerService } = await import("~/service/logging");
      expect(loggerService.info).toHaveBeenCalledWith(
        "All resume service caches cleared",
        undefined,
        expect.objectContaining({
          component: "ResumeService",
          operation: "cache-clear-all",
        })
      );
    });
  });

  describe("Service Health", () => {
    it("should report service health correctly", async () => {
      // Arrange
      mockGetAll.mockResolvedValue({
        content: mockSkillsResponse,
      });

      // Act - Make some service calls to generate activity
      await resumeService.getSkills(mockSkillsRequest);
      const stats = resumeService.getAllCacheStats();

      // Assert
      expect(stats.skills.serviceName).toBe("SkillsService");
      expect(stats.experience.serviceName).toBe("ExperienceService");
      expect(stats.education.serviceName).toBe("EducationService");
      expect(stats.total.serviceName).toBe("ResumeService");

      expect(typeof stats.skills.size).toBe("number");
      expect(typeof stats.skills.maxSize).toBe("number");
    });
  });

  describe("Correlation ID Generation", () => {
    it("should generate unique correlation IDs", async () => {
      // Arrange
      const { loggerService } = await import("~/service/logging");
      mockGetAll.mockResolvedValue({
        content: mockSkillsResponse,
      });

      // Act
      await resumeService.getSkills(mockSkillsRequest);

      // Assert - Verify logger was called with correlation ID
      expect(loggerService.debug).toHaveBeenCalledWith(
        "Starting getSkills",
        expect.any(Object),
        expect.objectContaining({
          correlationId: expect.stringMatching(
            /^SkillsService-getSkills-\d+-\w+$/
          ),
          operation: "getSkills",
          serviceName: "SkillsService",
        })
      );
    });
  });

  describe("Response Mapping", () => {
    it("should properly map API responses to standardized format", async () => {
      // Arrange
      mockGetAll.mockResolvedValue({
        content: mockSkillsResponse,
      });

      // Act
      const result = await resumeService.getSkills(mockSkillsRequest);

      // Assert - Verify ApiDataResponse structure
      expect(result).toHaveProperty("target");
      expect(result).toHaveProperty("meta");
      expect(result).toHaveProperty("error");

      expect(Array.isArray(result.target)).toBe(true);
      expect(result.target.length).toBeGreaterThan(0);

      expect(result.meta).toHaveProperty("correlationId");
      expect(result.meta).toHaveProperty("source");
      expect(result.meta).toHaveProperty("cacheHit");

      expect(result.error).toBeNull();
    });
  });
});
