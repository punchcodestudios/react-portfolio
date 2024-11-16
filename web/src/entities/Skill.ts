import { SkillType } from "./SkillType";

export interface Skill {
  name: string;
  description: string;
  refid: string;
  slug: string;
  skill_types: SkillType[];
}
