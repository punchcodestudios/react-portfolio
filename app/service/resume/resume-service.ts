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
} from "./types";
import { BaseDataService } from "../_base/BaseDataService";
import ApiClient from "~/api/apiClient";
import { delayRequest } from "~/utils/site";
import { loggerService } from "~/service/logging"; // Add this import
import type { ApiDataResponse } from "~/api/interfaces";

/**
 * Enhanced Resume Service extending universal BaseDataService
 * Provides skills, experience, and education data with enterprise-grade caching and telemetry
 */
export class ResumeService extends BaseDataService<
  Skill | Experience | Education
> {
  private skillsService: BaseDataService<Skill>;
  private experienceService: BaseDataService<Experience>;
  private educationService: BaseDataService<Education>;

  constructor() {
    super({ serviceName: "ResumeService" });

    // Initialize individual services with proper configurations
    this.skillsService = new BaseDataService<Skill>({
      serviceName: "SkillsService",
    });
    this.experienceService = new BaseDataService<Experience>({
      serviceName: "ExperienceService",
    });
    this.educationService = new BaseDataService<Education>({
      serviceName: "EducationService",
    });
  }

  /**
   * Get skills data - uses the universal fetch pattern
   */
  async getSkills(request: SkillRequest): Promise<SkillResponse> {
    return this.skillsService.fetchData(
      request,
      "getSkills",
      (req, correlationId) => this.getSkillsImplementation(req, correlationId)
    );
  }

  /**
   * Get experience data - uses the universal fetch pattern
   */
  async getExperience(request: ExperienceRequest): Promise<ExperienceResponse> {
    return this.experienceService.fetchData(
      request,
      "getExperience",
      (req, correlationId) =>
        this.getExperienceImplementation(req, correlationId)
    );
  }

  /**
   * Get education data - uses the universal fetch pattern
   */
  async getEducation(request: EducationRequest): Promise<EducationResponse> {
    return this.educationService.fetchData(
      request,
      "getEducation",
      (req, correlationId) =>
        this.getEducationImplementation(req, correlationId)
    );
  }

  // Implementation methods - these handle the actual API calls
  private async getSkillsImplementation(
    request: SkillRequest,
    correlationId: string
  ): Promise<SkillResponse> {
    const client = new ApiClient<Skill>("resume/get-all-skills", request);

    if (this.config.enableDelaySimulation) {
      await delayRequest(this.config.delayMs || 1000);
    }

    const response = await client.getAll();
    return this.mapResponse(response, correlationId, "skills") as SkillResponse;
  }

  private async getExperienceImplementation(
    request: ExperienceRequest,
    correlationId: string
  ): Promise<ExperienceResponse> {
    const client = new ApiClient<Experience>(
      "resume/get-all-experience",
      request
    );

    if (this.config.enableDelaySimulation) {
      await delayRequest(this.config.delayMs || 1000);
    }

    const response = await client.getAll();
    return this.mapResponse(
      response,
      correlationId,
      "experience"
    ) as ExperienceResponse;
  }

  private async getEducationImplementation(
    request: EducationRequest,
    correlationId: string
  ): Promise<EducationResponse> {
    const client = new ApiClient<Education>(
      "resume/get-all-education",
      request
    );

    if (this.config.enableDelaySimulation) {
      await delayRequest(this.config.delayMs || 1000);
    }

    const response = await client.getAll();
    return this.mapResponse(
      response,
      correlationId,
      "education"
    ) as EducationResponse;
  }

  protected mapResponse(
    response: any,
    correlationId: string,
    entityType: string
  ): ApiDataResponse<any, any> {
    // Handle different response formats from ApiClient
    const responseData = response.content || response.data || response;

    return {
      target: responseData.target || responseData || [],
      meta: {
        ...responseData.meta,
        correlationId,
        entityType,
        source: "api",
        cacheHit: false,
        requestTimestamp: new Date().toISOString(),
      },
      error: responseData.error || null,
    };
  }
  // Override sanitization for resume-specific data
  protected sanitizeRequest(request: any): any {
    // Remove potentially sensitive fields from logs
    const { sensitiveField, ...sanitized } = request;
    return sanitized;
  }

  // Unified cache management across all resume data types
  clearAllCaches(): void {
    this.skillsService.clearCache();
    this.experienceService.clearCache();
    this.educationService.clearCache();

    loggerService.info("All resume service caches cleared", undefined, {
      component: "ResumeService",
      operation: "cache-clear-all",
      instanceId: this.instanceId,
      userInitiated: true,
      timestamp: new Date().toISOString(),
    });
  }

  getAllCacheStats() {
    return {
      skills: this.skillsService.getCacheStats(),
      experience: this.experienceService.getCacheStats(),
      education: this.educationService.getCacheStats(),
      total: {
        serviceName: "ResumeService",
        instanceId: this.instanceId,
        totalSize:
          this.skillsService.getCacheStats().size +
          this.experienceService.getCacheStats().size +
          this.educationService.getCacheStats().size,
        totalMaxSize: (this.skillsService.getCacheStats().maxSize || 100) * 3,
      },
    };
  }
}

// Export singleton instance
export const resumeService = new ResumeService();
export default resumeService;
