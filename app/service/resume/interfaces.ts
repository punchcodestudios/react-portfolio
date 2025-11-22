import type { MetaResponse, BaseRequestParams } from "~/api/interfaces";

export interface ResumeMeta extends MetaResponse {
  /** Resume processing specific metrics */
  resumeMetrics?: {
    sectionsProcessed: number;
    validationErrors: string[];
    contentScore: number;
  };
}

export interface ExperienceMeta extends MetaResponse {
  /** Experience processing specific metrics */
  experienceMetrics?: {
    companiesCount: number;
    positionsCount: number;
    yearsCovered: number;
    skillsExtracted: number;
  };

  /** Experience filtering information */
  filters?: {
    appliedFilters: string[];
    excludedItems: number;
    dateRange?: {
      start: string;
      end: string;
    };
  };
}

export interface SkillMeta extends MetaResponse {
  /** Skills processing specific metrics */
  skillMetrics?: {
    categoriesCount: number;
    levelsDistribution: Record<string, number>;
    technicalSkillsCount: number;
    softSkillsCount: number;
  };

  /** Skills grouping information */
  grouping?: {
    byCategory: Record<string, number>;
    byLevel: Record<string, number>;
    byType: Record<string, number>;
  };

  /** Skills recommendation data */
  recommendations?: {
    suggestedSkills: string[];
    trendingSkills: string[];
    skillGaps: string[];
  };
}

export interface EducationMeta extends MetaResponse {
  /** Education processing specific metrics */
  educationMetrics?: {
    institutionsCount: number;
    degreesCount: number;
    certificationsCount: number;
    yearsOfEducation: number;
  };

  /** Education validation information */
  validation?: {
    verifiedInstitutions: number;
    pendingVerification: number;
    accreditationStatus: Record<string, string>;
  };

  /** Education timeline data */
  timeline?: {
    earliestDate: string;
    latestDate: string;
    gaps: Array<{
      start: string;
      end: string;
      duration: number;
    }>;
  };
}

export interface SkillRequestParams extends BaseRequestParams {
  /** Skills to exclude from results */
  skillsExclude?: string[];

  /** Filter by skill categories */
  categories?: string[];

  /** Filter by skill levels */
  levels?: string[];

  /** Filter by skill types */
  types?: string[];

  /** Include related skills */
  includeRelated?: boolean;

  /** Minimum proficiency level */
  minLevel?: string;

  /** Group skills by category */
  groupByCategory?: boolean;
}

export interface ExperienceRequestParams extends BaseRequestParams {
  /** Experience items to exclude */
  experienceExclude?: string[];

  /** Filter by company names */
  companies?: string[];

  /** Filter by job positions */
  positions?: string[];

  /** Date range filter */
  dateRange?: {
    start?: string;
    end?: string;
  };

  /** Filter by employment type */
  employmentType?: string[];

  /** Filter by location */
  location?: string[];

  /** Include current positions only */
  currentOnly?: boolean;

  /** Minimum duration in months */
  minDuration?: number;
}

export interface EducationRequestParams extends BaseRequestParams {
  /** Education items to exclude */
  educationExclude?: string[];

  /** Filter by institution names */
  institutions?: string[];

  /** Filter by degree types */
  degreeTypes?: string[];

  /** Filter by fields of study */
  fieldsOfStudy?: string[];

  /** Filter by graduation year range */
  graduationYearRange?: {
    start?: number;
    end?: number;
  };

  /** Include certifications */
  includeCertifications?: boolean;

  /** Filter by education level */
  educationLevel?: string[];

  /** Include incomplete degrees */
  includeIncomplete?: boolean;
}
