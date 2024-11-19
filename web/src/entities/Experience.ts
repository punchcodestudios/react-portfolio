import { Skill } from "./Skill";

export interface ExperienceLineItem {
  text: string;
  refid: string;
  parent_ref_id: string;
  sort_order: string;
}
export interface Experience {
  company_name: String;
  refid: string;
  start_date: String;
  end_date: String;
  position: String;
  location: String;
  skills: Skill[];
  sort_order: String;
  experience_line_items: ExperienceLineItem[];
  slug: String;
}
