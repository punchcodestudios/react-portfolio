import { Discipline } from "./Discipline";
import { Skill } from "./Skill";

export interface Gallery {
  id: string;
  name: string;
  background_image: string;
  description: string;
  description_raw: string;
  slug: string;
  genres: Skill[];
  parent_platforms: { platform: Discipline }[];
}
