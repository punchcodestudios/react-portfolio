import type { ApiErrorResponse } from "~/entities/api";
import type { MetaResponse } from "./api";

export interface Resume {
  skillResponse: SkillResponse;
  experienceResponse: ExperienceResponse;
}

export interface Skill {
  name: string;
  description: string;
  refid: string;
  slug: string;
  skill_types: SkillType[];
}

export interface SkillType {
  name: string;
  description: string;
  refid: string;
}

export interface Skills {
  all: Skill[];
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  infrastructure: Skill[];
  design: Skill[];
  softskills: Skill[];
}

export interface Experience {
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
}

export interface ExperienceLineItem {
  text: string;
  refid: string;
  parent_ref_id: string;
  sort_order: string;
}

export interface ResumeRequest {
  params: {
    skillsExclude: SkillType[];
  };
}
export interface SkillRequest {
  params: {
    skillsExclude: SkillType[];
    slug?: string;
  };
}
export interface ExperienceRequest {
  params: {};
}

export interface ResumeMeta extends MetaResponse {}
export interface ExperienceMeta extends MetaResponse {}
export interface SkillMeta extends MetaResponse {}

export interface ResumeResponse {
  target: Resume[];
  meta: ResumeMeta;
  error: ApiErrorResponse;
}

export interface ExperienceResponse {
  target: Experience[];
  meta: ExperienceMeta;
  error: ApiErrorResponse;
}

export interface SkillResponse {
  target: Skill[];
  meta: SkillMeta;
  error: ApiErrorResponse;
}
