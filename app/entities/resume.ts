// import type { ApiErrorResponse } from "~/entities/api";
// import type { MetaResponse } from "./api";

// export type Resume = {
//   skillResponse: SkillResponse;
//   experienceResponse: ExperienceResponse;
// }

// export type Skill = {
//   name: string;
//   description: string;
//   refid: string;
//   slug: string;
//   skill_types: SkillType[];
// }

// export type Experience = {
//   company_name: string;
//   refid: string;
//   start_date: string;
//   end_date: string;
//   position: string;
//   location: string;
//   skills: Skill[];
//   sort_order: string;
//   experience_line_items: ExperienceLineItem[];
//   slug: string;
// }

// export type Education = {
//   institution_name: string;
//   refid: string;
//   start_date: string;
//   end_date: string;
//   degree: string;
//   field_of_study: string;
//   location: string;
//   slug: string;
// }

// export type SkillType = {
//   name: string;
//   description: string;
//   refid: string;
// }

// // export interface ExperienceLineItem {
// //   text: string;
// //   refid: string;
// //   parent_ref_id: string;
// //   sort_order: string;
// // }

// export type ResumeRequest = {
//   params: {
//     id?: string | number;
//     skillsExclude: SkillType[];
//     slug?: string[];
//   };
// }

// export type SkillRequest = {
//   params: {
//     id?: string | number;
//     skillsExclude: SkillType[];
//     slug?: string[];
//   };
// }

// export type ExperienceRequest = {
//   params: {
//     id?: string | number;
//     experienceExclude?: string[];
//     slug?: string[];
//   };
// }

// export interface EducationRequest {
//   params: {
//     id?: string | number;
//     educationExclude?: string[];
//     slug?: string[];
//   };
// }

// export interface ResumeMeta extends MetaResponse {}
// export interface ExperienceMeta extends MetaResponse {}
// export interface SkillMeta extends MetaResponse {}
// export interface EducationMeta extends MetaResponse {}

// export interface ResumeResponse {
//   target: Resume[];
//   meta: ResumeMeta;
//   error: ApiErrorResponse;
// }

// export interface ExperienceResponse {
//   target: Experience[];
//   meta: ExperienceMeta;
//   error: ApiErrorResponse;
// }

// export interface SkillResponse {
//   target: Skill[];
//   meta: SkillMeta;
//   error: ApiErrorResponse;
// }

// export interface EducationResponse {
//   target: Education[];
//   meta: EducationMeta;
//   error: ApiErrorResponse;
// }
