import type {
  ResumeRequest,
  Resume,
  SkillRequest,
  Skill,
  ExperienceRequest,
  Experience,
} from "~/entities/resume";

import ApiClient from "./apiClient";
import type { ApiResponse } from "~/entities/api";

export const getResume = async (
  request: ResumeRequest
): Promise<ApiResponse<Resume>> => {
  const client = new ApiClient<Resume>("resume/", {
    params: request.params,
  });
  try {
    return client.post(request).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};

export const getAllSkills = async (
  request: SkillRequest
): Promise<ApiResponse<Skill>> => {
  // console.log("request.params: ", request);
  const client = new ApiClient<Skill>("resume/get-all-skills", request);
  try {
    return client.getAll().then((response) => {
      // console.log("resumeApi.getAllSkills response: ", response);
      return Promise.resolve(response);
    });
  } catch (error: any) {
    // console.log("error response: ", error);
    return Promise.reject(error);
  }
};

export const getSkillsBySlug = async (
  request: SkillRequest
): Promise<ApiResponse<Skill>> => {
  const client = new ApiClient<Skill>(
    `resume/get-skills-by-slug/${request.params.slug}`
  );
  // console.log("getSkillsBySlug ResumeApi: ", request.params.slug);
  try {
    return client.getAll().then((response) => {
      // console.log("resumeApi.getSkillsBySlug response: ", response);
      return Promise.resolve(response);
    });
  } catch (error: any) {
    //console.log("error response: ", error);
    return Promise.reject(error);
  }
};

export const getAllExperience = async (
  request: ExperienceRequest
): Promise<ApiResponse<Experience>> => {
  const client = new ApiClient<Experience>("resume/get-all-experience", {
    params: request.params,
  });
  try {
    return client.getAll().then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    return Promise.resolve(error);
  }
};
