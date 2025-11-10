import { useMemo, use } from "react";
import type {
  EducationResponse,
  ExperienceResponse,
  SkillResponse,
} from "~/entities/resume";
import resumeService from "~/service/resume-service";

export const useSkills = () => {
  const dataPromise: Promise<SkillResponse> = useMemo(() => {
    return resumeService.getSkills({
      params: { id: "", slug: [], skillsExclude: [] },
    });
  }, []);
  return use(dataPromise) as SkillResponse;
};

export const useExperience = () => {
  const promise: Promise<ExperienceResponse> = useMemo(() => {
    return resumeService.getExperience({
      params: { id: "", slug: [], experienceExclude: [] },
    });
  }, []);
  return use(promise) as ExperienceResponse;
};

export const useEducation = () => {
  const promise: Promise<EducationResponse> = useMemo(() => {
    return resumeService.getEducation({
      params: { id: "", slug: [], educationExclude: [] },
    });
  }, []);
  return use(promise) as EducationResponse;
};
