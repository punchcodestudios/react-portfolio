import { Skill } from "@/entities/Skill";
import useSkills from "../../../hooks/useSkills";
import {
  SKILL_TYPE_BACKEND_DEVELOPMENT,
  SKILL_TYPE_DATABASE,
  SKILL_TYPE_DESIGN,
  SKILL_TYPE_FRONTEND_DEVELOPMENT,
  SKILL_TYPE_INFRASTRUCTURE,
  SKILL_TYPE_SOFT_SKILLS,
} from "@/constants";
import SkillGroup from "./skill-group-component";
import { Row } from "react-bootstrap";

const ResumeSkillsComponent = () => {
  const { data, isLoading, error } = useSkills();

  const backendSkills = data?.results.filter((item: Skill) => {
    return item.skill_types[0].name === SKILL_TYPE_BACKEND_DEVELOPMENT;
  });

  const frontEndSkills = data?.results.filter((item: Skill) => {
    return item.skill_types[0].name === SKILL_TYPE_FRONTEND_DEVELOPMENT;
  });

  const databaseSkills = data?.results.filter((item: Skill) => {
    return item.skill_types[0].name === SKILL_TYPE_DATABASE;
  });

  const infrastructureSkills = data?.results.filter((item: Skill) => {
    return item.skill_types[0].name === SKILL_TYPE_INFRASTRUCTURE;
  });

  const designSkills = data?.results.filter((item: Skill) => {
    return item.skill_types[0].name === SKILL_TYPE_DESIGN;
  });

  const softSkills = data?.results.filter((item: Skill) => {
    return item.skill_types[0].name === SKILL_TYPE_SOFT_SKILLS;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error)
    return (
      <>
        <div>an error has occurred: {error.message}</div>
      </>
    );

  return (
    <>
      <Row xs={1} md={2} lg={2} xl={3} className="">
        <SkillGroup data={frontEndSkills || []}></SkillGroup>
        <SkillGroup data={backendSkills || []}></SkillGroup>
        <SkillGroup data={databaseSkills || []}></SkillGroup>
        <SkillGroup data={infrastructureSkills || []}></SkillGroup>
        <SkillGroup data={softSkills || []}></SkillGroup>
        <SkillGroup data={designSkills || []}></SkillGroup>
      </Row>
    </>
  );
};
export default ResumeSkillsComponent;
