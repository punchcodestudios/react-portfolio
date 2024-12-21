import { Skill } from "@/entities/Resume";
import { ListGroup } from "react-bootstrap";
import SidebarMenu from "react-bootstrap-sidebar-menu";

interface Props {
  skills: Skill[] | [];
}
const ExperienceSkills = ({ skills }: Props) => {
  {
    if (skills.length == 0) {
      return (
        <SidebarMenu expand="xl" hide="lg" className="row ms-2">
          <SidebarMenu.Body style={{ width: "300px" }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ fontSize: "medium", border: "0" }}>
                no skill items
              </ListGroup.Item>
            </ListGroup>
          </SidebarMenu.Body>
        </SidebarMenu>
      );
    }
  }
  return (
    <SidebarMenu expand="xl" hide="lg" className="row ms-2">
      <SidebarMenu.Body style={{ width: "300px" }}>
        <ListGroup variant="flush">
          {skills?.map((skill) => {
            return (
              <ListGroup.Item
                key={skill.refid}
                style={{ fontSize: "medium", border: "0" }}
              >
                {skill.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
};

export default ExperienceSkills;
