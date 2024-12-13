import { ApiResponse } from "@/api/apiResponses";
import {
  Experience,
  ExperienceRequest,
  ExperienceResponse,
  Skill,
  SkillRequest,
  SkillResponse,
} from "@/entities/Resume";
import { getAllExperience, getAllSkills } from "../api/resumeApi";

const resumeService = {
  getAllSkills: async (request: SkillRequest) => {
    try {
      const response = await getAllSkills(request);
      return Promise.resolve(mapSkills(response));
    } catch (error) {
      // console.error("Error logging out: ", error);
      throw error;
    }
  },
  getAllExperience: async (request: ExperienceRequest) => {
    try {
      const response = await getAllExperience(request);
      return Promise.resolve(mapExperience(response));
    } catch (error) {
      // console.error("Error logging out: ", error);
      throw error;
    }
  },
};

export default resumeService;

const mapSkills = (item: ApiResponse<Skill>): SkillResponse => {
  console.log("mapSkills: ", item);
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.error,
  } as SkillResponse;

  return res;
};

const mapExperience = (item: ApiResponse<Experience>): ExperienceResponse => {
  console.log("mapExperience: ", item);
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.error,
  } as ExperienceResponse;

  return res;
};
