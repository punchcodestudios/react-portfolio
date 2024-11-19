import { Row } from "react-bootstrap";
import useSkills from "../../../hooks/useSkills";
import SkillGroup from "./skill-group-component";

const ResumeSkillsComponent = () => {
  const { data, isLoading, error } = useSkills();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return (
      <>
        <div>an error has occurred: {error.message}</div>
      </>
    );
  }

  return (
    <>
      <Row xs={1} md={2} lg={2} xl={3} className="">
        <SkillGroup data={data.results[0].frontend || []} />
        <SkillGroup data={data.results[0].backend || []} />
        <SkillGroup data={data.results[0].database || []} />
        <SkillGroup data={data.results[0].infrastructure || []} />
        <SkillGroup data={data.results[0].softskills || []} />
        <SkillGroup data={data.results[0].design || []} />
      </Row>
    </>
  );
};

export default ResumeSkillsComponent;
