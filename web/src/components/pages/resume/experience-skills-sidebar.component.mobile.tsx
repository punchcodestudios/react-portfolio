import { Skill } from "@/entities/Skill";
import SidebarMenu from "react-bootstrap-sidebar-menu";

interface Props {
  skills: Skill[] | [];
}

const ExperienceSkillsMobile = ({ skills }: Props) => {
  {
    if ((skills.length = 0)) {
      return (
        <SidebarMenu className="row">
          <SidebarMenu.Body className="d-flex flex-wrap justify-content-between">
            <div
              className="p-2"
              style={{
                fontSize: "small",
                border: "0",
              }}
            >
              No Skills available
            </div>
          </SidebarMenu.Body>
        </SidebarMenu>
      );
    }
  }
  return (
    <SidebarMenu className="row">
      <SidebarMenu.Body className="d-flex flex-wrap justify-content-between">
        {skills?.map((skill) => {
          return (
            <div
              className="p-2"
              key={skill.refid}
              style={{
                fontSize: "small",
                border: "0",
              }}
            >
              {skill.name}
            </div>
          );
        })}
      </SidebarMenu.Body>
    </SidebarMenu>
  );
};

export default ExperienceSkillsMobile;
