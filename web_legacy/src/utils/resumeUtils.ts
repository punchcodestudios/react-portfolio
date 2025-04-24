import { Skill } from "@/entities/Resume";

const getSkillTypesFromData = function (data: Skill[] | undefined) {
  //   console.log("getTypes");
  let arr: string[] = [];
  data?.forEach((item) => {
    if (arr.findIndex((x) => x == item.skill_types[0].name) < 0) {
      arr.push(item.skill_types[0].name);
    }
  });
  return arr;
};

const getGroupedSkills = function (
  data: Skill[] | undefined,
  typeArray: string[] | undefined
) {
  //   console.log("getGroupedData");
  let arr: Skill[][] = [];
  typeArray?.forEach((groupName) => {
    arr.push(data?.filter((x) => x.skill_types[0].name == groupName) || []);
  });
  return arr;
};

export { getSkillTypesFromData, getGroupedSkills };
