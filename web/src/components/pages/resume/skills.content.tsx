import NoContent from "@/components/common/no-content/no-content.component";
import { SkillResponse } from "@/entities/Resume";
import { getGroupedSkills, getSkillTypesFromData } from "@/utils/resumeUtils";
import { useMemo } from "react";
import { Row } from "react-bootstrap";
import SkillGroup from "./skill-group.component";

interface Props {
  data: SkillResponse | undefined;
}

const ResumeSkillsComponent = ({ data }: Props) => {
  // const [target, setTarget] = useState<Skill[] | undefined>(undefined);
  const typeArray = useMemo(
    () => getSkillTypesFromData(data?.target),
    [data?.target]
  );
  const groupedSkills = useMemo(
    () => getGroupedSkills(data?.target, typeArray),
    [data?.target, typeArray]
  );

  // console.log("Skill Data: ", data?.target);
  // console.log("Type Array: ", typeArray);
  // console.log("Grouped Array: ", groupedSkills);

  if (!data?.meta.success) {
    return <NoContent />;
  } else {
    return (
      <Row xs={1} md={2} lg={2} xl={3} className="">
        {groupedSkills.map((skill, index) => {
          return <SkillGroup key={index} data={skill} />;
        })}
      </Row>
    );
  }
};

export default ResumeSkillsComponent;
