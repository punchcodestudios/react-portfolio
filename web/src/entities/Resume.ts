import { ApiErrorResponse } from "@/api/apiResponses";

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
  company_name: String;
  refid: string;
  start_date: String;
  end_date: String;
  position: String;
  location: String;
  skills: Skill[];
  sort_order: String;
  experience_line_items: ExperienceLineItem[];
  slug: String;
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
  };
}
export interface ExperienceRequest {
  params: {};
}

export interface ResumeMeta {}
export interface ExperienceMeta {}
export interface SkillMeta {}

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
