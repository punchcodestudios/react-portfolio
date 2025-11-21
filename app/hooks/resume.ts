import { useMemo, use } from "react";
import type {
  EducationResponse,
  ExperienceResponse,
  SkillResponse,
} from "~/entities/resume";
import resumeService from "~/service/resume/resume-service";

const skillsPromise = resumeService.getSkills({
  params: { id: "", slug: [], skillsExclude: [] },
});

const experiencePromise = resumeService.getExperience({
  params: { id: "", slug: [], experienceExclude: [] },
});

const educationPromise = resumeService.getEducation({
  params: { id: "", slug: [], educationExclude: [] },
});

export const useSkills = () => {
  // const dataPromise: Promise<SkillResponse> = useMemo(() => {
  //   return resumeService.getSkills({
  //     params: { id: "", slug: [], skillsExclude: [] },
  //   });
  // }, []);
  // console.log("useSkills called");
  try {
    return use(skillsPromise) as SkillResponse;
  } catch (error) {
    console.error("Error in useSkills:", error);
    throw error;
  }
};

export const useExperience = () => {
  // const promise: Promise<ExperienceResponse> = useMemo(() => {
  //   return resumeService.getExperience({
  //     params: { id: "", slug: [], experienceExclude: [] },
  //   });
  // }, []);
  return use(experiencePromise) as ExperienceResponse;
};

export const useEducation = () => {
  // const promise: Promise<EducationResponse> = useMemo(() => {
  //   return resumeService.getEducation({
  //     params: { id: "", slug: [], educationExclude: [] },
  //   });
  // }, []);
  return use(educationPromise) as EducationResponse;
};
