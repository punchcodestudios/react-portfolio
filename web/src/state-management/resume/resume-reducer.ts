import { ApiErrorResponse } from "@/api/apiResponses";
import {
  Experience,
  ExperienceMeta,
  ResumeMeta,
  ResumeResponse,
  Skill,
  SkillMeta,
  SkillResponse,
} from "@/entities/Resume";

const initialState: ResumeResponse = {
  target: [
    {
      skillResponse: {
        target: [] as Skill[],
        meta: {} as SkillMeta,
        error: {} as ApiErrorResponse,
      },
      experienceResponse: {
        target: [] as Experience[],
        meta: {} as ExperienceMeta,
        error: {} as ApiErrorResponse,
      },
    },
  ],
  meta: {} as ResumeMeta,
  error: {
    status: 0,
    message: "",
  },
};

interface GetSkillsAction {
  type: "GET_ALL_SKILLS";
  payload: SkillResponse;
}

interface GetExperienceAction {
  type: "GET_ALL_EXPERIENCE";
}

export type ResumeAction = GetSkillsAction | GetExperienceAction;

const resumeReducer = (
  state: ResumeResponse,
  action: ResumeAction
): ResumeResponse => {
  switch (action.type) {
    case "GET_ALL_SKILLS":
      // console.log("skills - action.payload: ", action.payload);
      // const currSkills = state.target ? { ...state } : { ...initialState };
      // currSkills.target[0].skillResponse = action.payload;
      return { ...state };
    case "GET_ALL_EXPERIENCE":
      // console.log("experience - action.payload: ", action.payload);
      // const currExperience = state.target ? { ...state } : { ...initialState };
      // currExperience.target[0].experienceResponse = action.payload;
      return { ...state };
    default:
      // console.log("INITIAL STATE");
      return initialState;
  }
};

export default resumeReducer;
