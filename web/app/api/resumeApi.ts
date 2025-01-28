import type {
  ResumeRequest,
  Resume,
  SkillRequest,
  Skill,
  ExperienceRequest,
  Experience,
} from "~/entities/resume";
import type { ApiResponse } from "./apiResponses";
import ApiClient from "./apiClient";

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
      console.log("response: ", response);
      return Promise.resolve(response);
    });
  } catch (error: any) {
    console.log("error response: ", error);
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
