import type { Skill, SkillResponse } from "~/entities/resume";
import resumeService from "~/service/resume-service";

const skillsCache = new Map<string, Promise<SkillList>>();

export enum SkillTypes {
  BACKEND = "Back End Development",
  FRONTEND = "Front End Development",
  DATABASE = "Database",
  DESIGN = "Design",
  INFRASTRUCTURE = "Infrastructure",
  SOFTSKILLS = "Soft Skills",
}

export type SkillList = {
  [key in SkillTypes]?: SkillResponse;
};

// export const getSkillsByName = (name?: string): Promise<SkillList> => {
//   const cached =
//     skillsCache.get(name ?? "all") ??
//     getSkillsByNameImplementation(name ?? "all");
//   skillsCache.set(name ?? "all", cached);
//   return cached;
// };

// export const getSkillsByKeyword = (slug: string): Promise<SkillList> => {
//   const cached = skillsCache.get(slug) ?? searchSkillsImplementation(slug);
//   skillsCache.set(slug, cached);
//   return cached;
// };

export const getSkillsByType = (type?: SkillTypes): Promise<SkillList> => {
  const cached =
    skillsCache.get(type ?? "all") ?? getSkillsByTypeImplementation(type);
  skillsCache.set(type ?? "all", cached);
  return cached;
};

// const getSkillsByNameImplementation = (name: string): Promise<SkillList> => {
//   const skills = resumeService
//     .getAllSkills({
//       params: { skillsExclude: [], slug: "" },
//     })
//     .then((response: SkillResponse) => response);
//   const skillList: SkillList = {};
//   skillList[name] = skills;
//   return skillList;
// };

// const searchSkillsImplementation = async (slug: string): Promise<SkillList> => {
//   const records = await resumeService.getSkillsBySlug({
//     params: { skillsExclude: [], slug },
//   });
// };

const getSkillsByTypeImplementation = async (
  type?: SkillTypes
): Promise<SkillList> => {
  //TODO: update the filter below to use slug value instead of skill_types[0].name.
  //   console.log("getSkillsByTypeImplementation type: ", type);
  const response = await resumeService.getAllSkills({
    params: { skillsExclude: [], slug: "" },
  });
  const skillList: SkillList = {};
  let typeList: SkillTypes[] = [];

  if (!type) {
    Object.values(SkillTypes).forEach((skillType) => {
      typeList.push(skillType);
    });
  } else {
    typeList = [type];
  }
  //   console.log("getSkillsByTypeImplementation typeList: ", response.target);
  typeList.forEach((type) => {
    const filtered = response.target.filter(
      (skill: Skill) => skill.skill_types[0].name == type
    );
    const record: SkillResponse = {
      target: filtered,
      meta: {
        success: true,
        total: filtered.length,
      },
      error: { status: 200, message: "OK" },
    };
    skillList[type] = record;
  });

  return skillList;
};
