import type {
  ApiDataResponse,
  ApiItemResponse,
  SearchMeta,
  CacheMeta,
} from "~/api";
import type {
  SkillRequestParams,
  ExperienceRequestParams,
  EducationRequestParams,
} from "./interfaces";

export type Skill = {
  id: string | number;
  name: string;
  description: string;
  refid: string;
  slug: string[];
  skill_types: SkillType[];
  level?: string;
  category?: string;
};

export type Experience = {
  id: string | number;
  refid: string;
  company_name: string;
  start_date: string;
  end_date: string;
  position: string;
  location: string;
  experience_line_items: ExperienceLineItem[];
  slug: string;
};

export type Education = {
  id: string | number;
  institution_name: string;
  refid: string;
  start_date: string;
  end_date: string;
  degree: string;
  field_of_study: string;
  location: string;
  slug: string;
};

export type SkillType = {
  name: string;
  description: string;
  refid: string;
};

export type ResumeRequest = {
  params: {
    id?: string | number;
    skillsExclude: SkillType[];
    slug?: string[];
  };
};

export interface ExperienceLineItem {
  text: string;
  refid: string;
  parent_ref_id: string;
  sort_order: string;
}

export type SkillRequest = {
  params: SkillRequestParams;
  metadata?: {
    requestId?: string;
    userId?: string;
    clientVersion?: string;
    timestamp?: string;
  };
};

export type ExperienceRequest = {
  params: ExperienceRequestParams;
  metadata?: {
    requestId?: string;
    userId?: string;
    clientVersion?: string;
    timestamp?: string;
  };
};

export type EducationRequest = {
  params: EducationRequestParams;
  metadata?: {
    requestId?: string;
    userId?: string;
    clientVersion?: string;
    timestamp?: string;
  };
};

export type SkillResponse = ApiDataResponse<Skill>;
export type ExperienceResponse = ApiDataResponse<Experience>;
export type EducationResponse = ApiDataResponse<Education>;

// If you need specific metadata, extend the universal types:
export type SkillSearchResponse = ApiDataResponse<Skill, SearchMeta>;
export type SkillCachedResponse = ApiDataResponse<Skill, CacheMeta>;

// For single item responses:
export type SkillItemResponse = ApiItemResponse<Skill>;
export type ExperienceItemResponse = ApiItemResponse<Experience>;
export type EducationItemResponse = ApiItemResponse<Education>;
