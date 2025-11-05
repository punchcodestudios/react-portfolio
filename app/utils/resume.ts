import type {
  Experience,
  ExperienceResponse,
  Skill,
  SkillResponse,
} from "~/entities/resume";
import resumeService from "~/service/resume-service";

const skillsCache = new Map<string, Promise<SkillList>>();
const experienceCache = new Map<string, Promise<ExperienceList>>();

export enum ExperienceOrganizations {
  EIMAGINE = "eImagine Technology Group",
  INTOUCH = "Eversana / Intouch",
  QUEST = "Quest Diagnostics",
  UNIFIED = "Unified Life Insurance Company",
}

export type SkillList = {
  [key: string]: SkillResponse;
};

export type ExperienceList = {
  [key: string]: ExperienceResponse;
};

// export const getSkillsByName = (name?: string): Promise<SkillList> => {
//   const cached =
//     skillsCache.get(name ?? "all") ??
//     getSkillsByNameImplementation(name ?? "all");
//   skillsCache.set(name ?? "all", cached);
//   return cached;
// };

export const getSkillsByKeyword = (slug: string): Promise<SkillList> => {
  const cached =
    skillsCache.get(slug) ?? getSkillsByKeywordImplementation(slug);
  if (!cached) {
    console.error(`No cached skills found for slug: ${slug}`);
  }
  skillsCache.set(slug, cached);
  return cached;
};

export const getAllSkills = (): Promise<SkillList> => {
  const cached = skillsCache.get("all") ?? getAllSkillsImplementation();
  skillsCache.set("all", cached);
  return cached;
};

export const getSkillsByOrganization = (
  org?: ExperienceOrganizations
): Promise<SkillList> => {
  const cached =
    skillsCache.get(org ?? "all_orgs") ??
    getSkillsByOrganizationImplementation(org);
  skillsCache.set(org ?? "all_orgs", cached);
  return cached;
};

// export const getSkillsByType = (type?: SkillTypes): Promise<SkillList> => {
//   const cached =
//     skillsCache.get(type ?? "all_types") ?? getSkillsByTypeImplementation(type);
//   skillsCache.set(type ?? "all_types", cached);
//   return cached;
// };

export const getSkillsBySlugList = (list: string[]): Promise<SkillList> => {
  const cached =
    skillsCache.get(list.join(",")) ?? getSkillsBySlugListImplementation(list);
  skillsCache.set(list.join(","), cached);
  return cached;
};

export const getExperienceByOrganization = (
  org?: ExperienceOrganizations
): Promise<ExperienceList> => {
  const cached =
    experienceCache.get(org ?? "all_orgs") ??
    getExperienceByOrganizationImplementation(org);
  experienceCache.set(org ?? "all_orgs", cached);
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

const getAllSkillsImplementation = async (): Promise<SkillList> => {
  console.log("getAllSkillsImplementation called");
  const response = await resumeService.getAllSkills({
    params: { skillsExclude: [], slug: "" },
  });
  const skillList: SkillList = {
    all: response,
  };
  if (!response.meta.success) {
    throw new Error("Failed to fetch all skills");
  }
  return skillList;
};

const getSkillsByKeywordImplementation = async (
  slug: string
): Promise<SkillList> => {
  let skillList = {} as SkillList;
  const allSkills = await getAllSkills();

  const filtered = allSkills["all"].target.filter((skill: Skill) => {
    return skill.slug.includes(slug.toLowerCase());
  });

  const filteredResponse: SkillResponse = {
    target: filtered,
    meta: {
      success: true,
      total: filtered.length,
    },
    error: { status: 200, message: "OK" },
  };

  if (filtered.length === 0) {
    filteredResponse.meta.success = false;
    filteredResponse.error.message = `No skills found for keyword: ${slug}`;
  }
  skillList[slug] = filteredResponse;
  return skillList;
};

// const getSkillsByTypeImplementation = async (
//   type?: SkillTypes
// ): Promise<SkillList> => {
//   //TODO: update the filter below to use slug value instead of skill_types[0].name.
//   //   console.log("getSkillsByTypeImplementation type: ", type);
//   const response = await resumeService.getAllSkills({
//     params: { skillsExclude: [], slug: "" },
//   });

//   if (!response.meta.success) {
//     throw new Error("Failed to fetch skills by type");
//   }

//   const skillList: SkillList = {};
//   let typeList: SkillTypes[] = [];

//   if (!type) {
//     Object.values(SkillTypes).forEach((skillType) => {
//       typeList.push(skillType);
//     });
//   } else {
//     typeList = [type];
//   }
//   //   console.log("getSkillsByTypeImplementation typeList: ", allSkills.target);
//   typeList.forEach((type) => {
//     const filtered = response.target.filter(
//       (skill: Skill) =>
//         skill.skill_types[0].name == type ||
//         skill.slug.includes(type.toLowerCase())
//     );
//     const record: SkillResponse = {
//       target: filtered,
//       meta: {
//         success: true,
//         total: filtered.length,
//       },
//       error: { status: 200, message: "OK" },
//     };
//     skillList[type] = record;
//   });

//   return skillList;
// };

const getSkillsByOrganizationImplementation = async (
  org?: ExperienceOrganizations
): Promise<SkillList> => {
  const response = await resumeService.getAllSkills({
    params: { skillsExclude: [], slug: "" },
  });

  if (!response.meta.success) {
    throw new Error("Failed to fetch skills by organization");
  }

  const skillList: SkillList = {};
  let orgList: ExperienceOrganizations[] = [];

  if (!org) {
    Object.values(ExperienceOrganizations).forEach((org) => {
      orgList.push(org);
    });
  } else {
    orgList = [org];
  }

  orgList.forEach((organization) => {
    const filtered = response.target.filter((skill: Skill) =>
      skill.slug.includes(organization.toLowerCase())
    );
    skillList[organization] = {
      target: filtered,
      meta: {
        success: true,
        total: filtered.length,
      },
      error: { status: 200, message: "OK" },
    };
  });

  return skillList;
};

const getExperienceByOrganizationImplementation = async (
  org?: ExperienceOrganizations
): Promise<ExperienceList> => {
  const response = await resumeService.getAllExperience({
    params: { organization: org ?? "all" },
  });
  const experienceList: ExperienceList = {} as ExperienceList;

  if (response.meta.success) {
    if (org) {
      experienceList[org] = response;
    } else {
      Object.values(ExperienceOrganizations).forEach((organization) => {
        const filtered = response.target.filter(
          (exp: Experience) => exp.company_name === organization
        );
        if (filtered.length > 0) {
          experienceList[organization] = {
            target: filtered,
            meta: {
              success: true,
              total: filtered.length,
            },
            error: { status: 200, message: "OK" },
          };
        }
      });
    }
  }
  console.log("getExperienceByOrganizationImplementation: ", experienceList);
  return experienceList;
};

const getSkillsBySlugListImplementation = async (
  list?: string[]
): Promise<SkillList> => {
  const response = await getAllSkills();

  const skillList: SkillList = {};
  list?.forEach((slug) => {
    const filtered = response["all"].target.filter((skill: Skill) => {
      if (skill.slug === undefined) {
        return false;
      }
      const slugString = skill.slug.toLowerCase();
      if (slugString.length === 0) {
        return false;
      }

      return slugString
        .split("|")
        .map((s) => s.trim())
        .includes(slug.toLowerCase());
    });
    const record: SkillResponse = {
      target: filtered,
      meta: {
        success: true,
        total: filtered.length,
      },
      error: { status: 200, message: "OK" },
    };
    skillList[slug] = record;
  });

  return skillList;
};
