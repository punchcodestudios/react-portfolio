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
} from "~/entities/resume";
import type { ApiResponse } from "~/entities/api";
import ApiClient from "~/api/apiClient";
import { delayRequest } from "~/utils/site";

const resumeService = {
  skillsCache: new Map<string, Promise<SkillResponse>>(),
  experienceCache: new Map<string, Promise<ExperienceResponse>>(),
  educationCache: new Map<string, Promise<EducationResponse>>(),

  getSkills: async (request: SkillRequest): Promise<SkillResponse> => {
    const cached = resumeService.skillsCache.get(JSON.stringify(request));
    if (cached) return cached;

    const promise = getSkillsImplementation(request);
    resumeService.skillsCache.set(JSON.stringify(request), promise);
    return promise;
  },
  getExperience: async (
    request: ExperienceRequest
  ): Promise<ExperienceResponse> => {
    const cached = resumeService.experienceCache.get(JSON.stringify(request));
    if (cached) return cached;

    const promise = getExperienceImplementation(request);
    resumeService.experienceCache.set(JSON.stringify(request), promise);
    return promise;
  },
  getEducation: async (
    request: EducationRequest
  ): Promise<EducationResponse> => {
    const cached = resumeService.educationCache.get(JSON.stringify(request));
    if (cached) return cached;

    const promise = getEducationImplementation(request);
    resumeService.educationCache.set(JSON.stringify(request), promise);
    return promise;
  },
};

export default resumeService;

const getSkillsImplementation = async (request: SkillRequest) => {
  try {
    const client = new ApiClient<Skill>("resume/get-all-skills", request);
    // delay request to simultate suspense boundary
    // await delayRequest(2000);
    const response = await client.getAll();
    return Promise.resolve(mapSkills(response));
  } catch (error) {
    // console.error("Error in getAllSkills: ", error);
    throw error;
  }
};

const getExperienceImplementation = async (
  request: ExperienceRequest
): Promise<ExperienceResponse> => {
  try {
    const client = new ApiClient<Experience>(
      "resume/get-all-experience",
      request
    );
    // delay request to simultate suspense boundary
    // await delayRequest(2000);
    const response = await client.getAll();
    return Promise.resolve(mapExperience(response));
  } catch (error) {
    // console.error("Error in getAllExperience: ", error);
    throw error;
  }
};

const getEducationImplementation = async (request: EducationRequest) => {
  try {
    const client = new ApiClient<Education>(
      "resume/get-all-education",
      request
    );
    // delay request to simultate suspense boundary
    // await delayRequest(2000);
    const response = await client.getAll();
    return Promise.resolve(mapEducation(response));
  } catch (error) {
    // console.error("Error in getAllEducation: ", error);
    throw error;
  }
};

const mapSkills = (item: ApiResponse<Skill>): SkillResponse => {
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as SkillResponse;

  return res;
};

const mapExperience = (item: ApiResponse<Experience>): ExperienceResponse => {
  console.log("mapExperience: ", item);
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as ExperienceResponse;

  return res;
};

const mapEducation = (item: ApiResponse<Education>): EducationResponse => {
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as EducationResponse;

  return res;
};
