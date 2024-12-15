import { Skill } from "@/entities/Resume";

export interface Props {
  item: Skill;
}

const SkillContentItem = ({ item }: Props) => {
  return <div>{item?.name || "no content"}</div>;
};

export default SkillContentItem;
