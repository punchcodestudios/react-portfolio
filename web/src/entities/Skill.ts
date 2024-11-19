import { SkillType } from "./SkillType";

export interface Skill {
  name: string;
  description: string;
  refid: string;
  slug: string;
  skill_types: SkillType[];
}

export interface Skills {
  all: Skill[];
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  infrastructure: Skill[];
  design: Skill[];
  softskills: Skill[];
}
