import {
  ExperienceRequest,
  ExperienceResponse,
  SkillRequest,
  SkillResponse,
} from "@/entities/Resume";
import resumeService from "@/services/resume-service";
import React, { useEffect, useState } from "react";
import ResumeContext from "./resume-context";

interface Props {
  children: React.ReactNode;
}

const ResumeProvider = ({ children }: Props) => {
  // const [resumeResponse, dispatch] = useReducer(
  //   resumeReducer,
  //   {} as ResumeResponse
  // );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [skills, setSkills] = useState<SkillResponse>();
  const [experience, setExperience] = useState<ExperienceResponse>();

  const getAllSkills = React.useCallback((request: SkillRequest): void => {
    // console.log("getAllSkills");
    setIsLoading(true);
    setError("");
    resumeService
      .getAllSkills(request)
      .then((response) => {
        // console.log("skill response: ", response);
        if (response.target.length > 0) {
          setSkills(response);
        }
        if (response.error) {
          setError(response.error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getAllExperience = React.useCallback(
    (request: ExperienceRequest): void => {
      // console.log("getAllExperience");
      setIsLoading(true);
      setError("");
      resumeService
        .getAllExperience(request)
        .then((response) => {
          // console.log("experience response: ", response);
          if (response.target.length > 0) {
            setExperience({ ...response });
          }
          if (response.error) {
            setError(response.error.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    getAllSkills({ params: { skillsExclude: [] } });
    getAllExperience({ params: {} });
  }, []);

  const value = React.useMemo(
    () => ({
      skills,
      experience,
      isLoading,
      error,
    }),
    [isLoading, error, experience, skills]
  );

  // const value = {
  //   skills,
  //   experience,
  //   isLoading,
  //   error,
  // };
  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

export default ResumeProvider;
