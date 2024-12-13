import useResume from "@/state-management/resume/use-resume";
import { useEffect } from "react";
import { Row } from "react-bootstrap";

const ResumeSkillsComponent = () => {
  // const { data, isLoading, error } = useSkills();
  const { resumeResponse, isLoading, error } = useResume();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <div>an error has occurred:</div>
      </>
    );
  }

  useEffect(() => {
    console.log("Resume Response: XXX", resumeResponse);
  }, []);

  return (
    <>
      <Row xs={1} md={2} lg={2} xl={3} className="">
        {/* <SkillGroup data={data.results[0].frontend || []} />
        <SkillGroup data={data.results[0].backend || []} />
        <SkillGroup data={data.results[0].database || []} />
        <SkillGroup data={data.results[0].infrastructure || []} />
        <SkillGroup data={data.results[0].softskills || []} />
        <SkillGroup data={data.results[0].design || []} /> */}
      </Row>
    </>
  );
};

export default ResumeSkillsComponent;
