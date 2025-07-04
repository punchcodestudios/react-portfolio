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

const delayRequest = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getAllSkills = async (
  request: SkillRequest
): Promise<ApiResponse<Skill>> => {
  const client = new ApiClient<Skill>("resume/get-all-skills", request);
  await delayRequest(3000);
  try {
    //throw new Error("Simulated error for testing purposes");
    return await client.getAll();
  } catch (error: any) {
    console.error("Error in getAllSkills:", error);
    return Promise.reject({ ...error, message: "Failed to fetch skills" });
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
