import type {
  ApiDataResponse,
  ApiItemResponse,
  SearchMeta,
  CacheMeta,
} from "~/entities/api";

// export type Resume = {
//   skillResponse: SkillResponse;
//   experienceResponse: ExperienceResponse;
// };

export type Skill = {
  name: string;
  description: string;
  refid: string;
  slug: string;
  skill_types: SkillType[];
};

export type Experience = {
  company_name: string;
  refid: string;
  start_date: string;
  end_date: string;
  position: string;
  location: string;
  skills: Skill[];
  sort_order: string;
  experience_line_items: ExperienceLineItem[];
  slug: string;
};

export type Education = {
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

export type SkillRequest = {
  params: {
    id?: string | number;
    skillsExclude: SkillType[];
    slug?: string[];
  };
};

export type ExperienceRequest = {
  params: {
    id?: string | number;
    experienceExclude?: string[];
    slug?: string[];
  };
};

export interface ExperienceLineItem {
  text: string;
  refid: string;
  parent_ref_id: string;
  sort_order: string;
}

export type EducationRequest = {
  params: {
    id?: string | number;
    educationExclude?: string[];
    slug?: string[];
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
