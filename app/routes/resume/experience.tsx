import type { Route } from "./+types/experience";
import { useEffect, useState } from "react";
import Scrollable from "~/components/ui/scrollable";
import { TechBadge } from "~/components/ui/tech-badge";
// import ApiError from "~/components/errors/api-error";
import type {
  Experience,
  ExperienceRequest,
  ExperienceResponse,
} from "~/entities/resume";
import resumeService from "~/service/resume-service";
import { formatDate } from "~/utils/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconService from "~/service/icon-service";
import { SolidIcon } from "~/utils/enums";
import ApiError from "~/components/errors/api-error";

export async function loader({ params }: Route.LoaderArgs) {
  //   // const request: ExperienceRequest = { params: {} };
  //   // const experienceData: ExperienceResponse =
  //   //   await resumeService.getAllExperience(request);
  //   // return { ...experienceData };
}

const Accordion = ({
  id,
  header,
  content,
  isExpanded,
  onToggle,
}: {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      id={id}
      className={`bg-primary mb-5 transition-all duration-100 ${
        isExpanded ? "" : "min-h-20"
      }`}
    >
      <div
        className="flex justify-between items-start cursor-pointer"
        onClick={onToggle}
      >
        <div>{header}</div>
        <div className="p-8 text-siteWhite">
          <FontAwesomeIcon
            icon={
              isExpanded
                ? IconService.getSolid(SolidIcon.SUBTRACT)
                : IconService.getSolid(SolidIcon.ADD)
            }
            className={`bx bx-chevron-right text-4xl transition-all duration-300`}
          ></FontAwesomeIcon>
        </div>
      </div>
      {isExpanded && (
        <div
          className={`px-5 pb-5 transiton-all duration-100 ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>{content}</div>
        </div>
      )}
    </div>
  );
};

// const Experience = ({ loaderData }: Route.ComponentProps) => {
const Experience = () => {
  const [expandedId, setExpandedId] = useState<string>("");
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
    if (id == "") {
      console.log("ExpandedID: ", expandedId);
      window.scrollTo(0, 0);
    }
    if (expandedId === id) {
      console.log("ExpandedID: ", expandedId);
      window.scrollTo(100, 0);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  // if (!loaderData.meta.success) {
  //   return <ApiError error={loaderData.error}></ApiError>;
  // }

  // if (!loaderData.target) {
  //   return null;
  // }

  const data: Experience[] = []; //loaderData.target;

  const accordionData = [
    {
      id: data[0].refid,
      header: <ResumeHeader data={data[0]} />,
      content: <ResumeContent data={data[0]}></ResumeContent>,
    },
    {
      id: data[1].refid,
      header: <ResumeHeader data={data[1]} />,
      content: <ResumeContent data={data[1]}></ResumeContent>,
    },
    {
      id: data[2].refid,
      header: <ResumeHeader data={data[2]} />,
      content: <ResumeContent data={data[2]}></ResumeContent>,
    },
    {
      id: data[3].refid,
      header: <ResumeHeader data={data[3]} />,
      content: <ResumeContent data={data[3]}></ResumeContent>,
    },
  ];

  return accordionData.map((item) => {
    return (
      <Scrollable id={item.id} timeout={1000}>
        <Accordion
          {...item}
          key={item.id}
          isExpanded={expandedId === item.id}
          onToggle={() => toggleExpand(item.id)}
        ></Accordion>
      </Scrollable>
    );
  });
};

const ResumeContent = ({ data }: { data: Experience }) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    window.addEventListener("resize", handleResize);

    console.log("isMobile: ", isMobile);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return !isMobile ? (
    <ExperienceContent data={data} />
  ) : (
    <ExperienceContentMobile data={data} />
  );
};

const ResumeHeader = ({ data }: { data: Experience }) => {
  return (
    <div className="p-6 flex flex-col">
      <h2 className="text-siteWhite font-header">{data.company_name}</h2>
      <p className="text-siteWhite font-header font-bold">{data.position}</p>
      <p className="text-siteWhite font-text">
        {formatDate(data.start_date)} -{" "}
        {data.end_date == "" ? "present" : formatDate(data.end_date)}
      </p>
      <p className="text-siteWhite">{data.location.replaceAll("|", " ")}</p>
    </div>
  );
};

const ExperienceContent = ({ data }: { data: Experience }) => {
  return (
    <div className="flex flex-row bg-siteWhite flex-wrap p-5">
      <div className="lg:w-[30%] flex flex-wrap lg:flex-col">
        {data.skills.map((skill) => {
          return <TechBadge key={skill.refid} text={skill.name}></TechBadge>;
        })}
      </div>
      <div className="lg:w-[70%] flex flex-col ps-3">
        {data.experience_line_items.map((item) => {
          return (
            <div
              className="mb-3 p-6 border-b-2 border-primary"
              key={item.refid}
            >
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExperienceContentMobile = ({ data }: { data: Experience }) => {
  const [expandedId, setExpandedId] = useState<string>("");
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };
  return (
    <div className="" onClick={() => toggleExpand(data.refid)}>
      <div id={data.refid} className="flex flex-row flex-wrap bg-siteWhite">
        <div className="flex flex-row bg-primary p-2 w-[100%] m-3 justify-center">
          <p className="text-siteWhite">{`${
            expandedId == data.refid ? "Hide" : "Show"
          } Relevant Skills`}</p>
        </div>
        {expandedId == data.refid && (
          <div className="flex flex-wrap m-5">
            {data.skills.map((skill) => {
              return (
                <TechBadge key={skill.refid} text={skill.name}></TechBadge>
              );
            })}
          </div>
        )}
        <div className="flex flex-col p-3">
          {data.experience_line_items.map((item) => {
            return (
              <div
                className="mb-3 p-3 border-b-2 border-primary"
                key={item.refid}
              >
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
