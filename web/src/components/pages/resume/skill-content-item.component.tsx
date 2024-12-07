import { Skill } from "@/entities/Skill";

export interface Props {
  item: Skill;
}

const SkillContentItem = ({ item }: Props) => {
  return <div>{item?.name || "no content"}</div>;
};

export default SkillContentItem;
