import { getAllSkills, getAllExperience } from "~/api/resumeApi";
import { useQuery } from "@tanstack/react-query";
import type {
  SkillRequest,
  ExperienceRequest,
  Skill,
  SkillResponse,
  Experience,
  ExperienceResponse,
} from "~/entities/resume";
import type { ApiResponse } from "~/entities/api";

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
  // console.log("mapSkills: ", item);
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as SkillResponse;

  return res;
};

const mapExperience = (item: ApiResponse<Experience>): ExperienceResponse => {
  // console.log("mapExperience: ", item);
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as ExperienceResponse;

  return res;
};
