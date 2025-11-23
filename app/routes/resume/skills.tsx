import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { use, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router";
import { CallToActionLeft, CallToActionRight } from "~/components/cards/cta";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { GenericErrorBoundary } from "~/components/error/generic-error-boundary";
import { Loader } from "~/components/ui/loader";
// import type { Skill, SkillResponse } from "~/entities/resume";
import { IconService } from "~/service/icon-service";
import { SolidIcon } from "~/utils/enums";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import resumeService from "~/service/resume/resume-service";
import { filterBySlug } from "~/utils/site";
import { useSkills } from "~/hooks/resume";
import type { Skill } from "~/service/resume/types";
gsap.registerPlugin(ScrollTrigger);

export enum SkillTypes {
  BACKEND = "backend",
  FRONTEND = "frontend",
  DATABASE = "database",
  DESIGN = "design",
  INFRASTRUCTURE = "infrastructure",
  SOFTSKILLS = "softskills",
}

type SkillHeaderProps = {
  icon: SolidIcon;
  title: string;
};

const SkillHeader: React.FC<SkillHeaderProps> = ({ icon, title }) => {
  return (
    <div className="px-6 xl:shrink-0 bg-resume-skills flex flex-row">
      <FontAwesomeIcon
        icon={IconService.getSolid(icon)}
        fontSize={30}
        className="w-8 h-8 text-siteWhite my-auto text-md"
      ></FontAwesomeIcon>
      <h3 className="mb-0 text-md font-semibold tracking-wide text-siteWhite font-header uppercase p-3">
        {title}
      </h3>
    </div>
  );
};

export type SkillsAccordionProps = {
  skills: Skill[] | undefined;
  wrapperName?: string;
};

export const SkillsAccordion: React.FC<SkillsAccordionProps> = ({
  skills,
  wrapperName = "default",
}) => {
  const summaryRef = useRef<HTMLElement>(null);
  const [closed, setClosed] = useState<boolean>(true);
  const toggleSkillSet = (event: React.MouseEvent<HTMLElement>) => {
    setClosed(!closed);
  };

  // TODO: Add to future sprint: UI - use a more generic class name for the gsap target
  const gsapTargetClassName = `${wrapperName}-container-skills-wrapper`;

  return (
    <div className={`${gsapTargetClassName} px-4 xl:p-0`}>
      <details
        {...(closed && { ...(closed ? undefined : { open: true }) })}
        className="p-2 border border-transparent open:border-black/10"
      >
        <summary
          id="5"
          ref={summaryRef}
          className="font-header text-md leading-6 font-semibold select-none mb-4"
          onClick={(event) => toggleSkillSet(event)}
        >
          {`${closed ? "show" : "hide"} relevant skills`}
        </summary>
        <div className="flex flex-wrap">
          {skills &&
            skills.length > 0 &&
            skills.map((skill: Skill) => {
              return (
                <Badge
                  key={skill.refid}
                  variant="primary"
                  size={"xs"}
                  columns="fit"
                >
                  {skill.name}
                </Badge>
              );
            })}
        </div>
      </details>
    </div>
  );
};

const SkillContent = () => {
  // console.log("skills content rendering");
  const data = useSkills();
  // console.log("skill data: ", data);
  const contentRef = useRef<HTMLDivElement>(null);

  const containers = Object.values(SkillTypes).map((type) => `${type}`);

  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0.25,
        },
        {
          opacity: 1,
          duration: 0.25,
          ease: "power1.inOut",
        }
      );
    }
    containers.forEach((selector) => {
      gsap.to(`.${selector}`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.in",
      });
    });

    containers.forEach((selector) => {
      gsap.set(`.${selector}`, { scale: 1 });
      gsap.set(`.${selector}-container-skills-wrapper`, {
        opacity: 0,
        scale: 1.25,
      });
      gsap.to(`.${selector}`, {
        scale: 1.05,
        y: 0,
        duration: 0.7,
        ease: "power2.inOut",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        scrollTrigger: {
          trigger: `.${selector}`,
          start: "center 70%",
          end: "center 50%",
          markers: false, // set to true for debugging
          scrub: true,
        },
        onComplete: () => {
          gsap.to(`.${selector}`, {
            scale: 1,
            ease: "power2.inOut",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.0)",
            duration: 0.7,
          });
          gsap.to(`.${selector}-container-skills-wrapper`, {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power2.inOut",
          });
        },
      });
    });
  });

  // useEffect(() => {
  //   if (document.readyState === "complete") {
  //     console.log("Document is already loaded, running animation");
  //     animate();
  //   } else {
  //     window.addEventListener("load", animate);
  //   }
  //   return () => window.removeEventListener("load", animate);
  // }, []);

  return (
    <div ref={contentRef} className="opacity-25">
      <div className="flex flex-col mx-auto max-w-[90%] lg:max-w-[70%]">
        <section className="my-10">
          <p className="text-center md:text-start">
            Navigating today's complex technology ecosystem requires expert
            guidance and strategic planning. Punchcode Studios maintains deep
            expertise across both emerging technologies and established
            platforms, enabling us to recommend the optimal stack for your
            specific requirements. We deliver innovation without sacrificing
            reliability or performance.
          </p>
        </section>
      </div>

      <div className="flex flex-col mx-auto xl:max-w-[90%]">
        <div className="flex flex-col mx-auto overflow:hidden xl:flex-row xl:flex-wrap xl:justify-between">
          {/* Backend */}
          <section className="backend py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionLeft
              title={<SkillHeader icon={SolidIcon.BACKEND} title="Back-end" />}
              imageUrl="/images/skills_backend.png"
              imageAlt="an image indicating backend development"
              tagLine="Back-end development is the server-side of an application and everything that communicates between the database and the browser."
              text="Punchcode Studios has a strong foundation in back-end development, with experience in a variety of languages and frameworks. We are committed to building robust, scalable, and secure back-end systems that power modern applications."
            >
              {
                <SkillsAccordion
                  skills={filterBySlug<Skill>(
                    [SkillTypes.BACKEND],
                    data.target
                  )}
                  wrapperName={containers[0]}
                />
              }
            </CallToActionLeft>
          </section>

          {/* Frontend */}
          <div className="frontend py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionRight
              title={
                <SkillHeader icon={SolidIcon.FRONTEND} title="Front-end" />
              }
              imageUrl="/images/skills_frontend.png"
              imageAlt="an image indicating front-end development"
              tagLine="Front-end development is the client-side of an application and everything that communicates between the user and the server."
              text="Punchcode Studios has a strong foundation in front-end development, with experience in a variety of languages and frameworks. We are committed to building responsive, user-friendly interfaces that enhance the user experience."
            >
              {
                <SkillsAccordion
                  skills={filterBySlug<Skill>(
                    [SkillTypes.FRONTEND],
                    data.target
                  )}
                  wrapperName={containers[1]}
                />
              }
            </CallToActionRight>
          </div>

          {/* Database */}
          <div className="database py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionLeft
              title={<SkillHeader icon={SolidIcon.DATABASE} title="Database" />}
              imageUrl="/images/skills_database.png"
              imageAlt="an image indicating database development"
              tagLine="Database development is the server-side of an application and everything that communicates between the database and the browser."
              text="Punchcode Studios has a strong foundation in database development, with experience in a variety of languages and frameworks. We are committed to building robust, scalable, and secure database systems that power modern applications."
            >
              {
                <SkillsAccordion
                  skills={filterBySlug<Skill>(
                    [SkillTypes.DATABASE],
                    data.target
                  )}
                  wrapperName={containers[2]}
                />
              }
            </CallToActionLeft>
          </div>

          {/* Design */}
          <div className="design py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionRight
              title={<SkillHeader icon={SolidIcon.DESIGN} title="Design" />}
              imageUrl="/images/skills_design.png"
              imageAlt="an image indicating front-end development"
              tagLine="Design is the client-side of an application and everything that communicates between the user and the server."
              text="Punchcode Studios has a strong foundation in design, with experience in a variety of languages and frameworks. We are committed to building responsive, user-friendly interfaces that enhance the user experience."
            >
              {
                <SkillsAccordion
                  skills={filterBySlug<Skill>([SkillTypes.DESIGN], data.target)}
                  wrapperName={containers[3]}
                />
              }
            </CallToActionRight>
          </div>

          {/* Infrastructure */}
          <div className="infrastructure py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionLeft
              title={
                <SkillHeader
                  icon={SolidIcon.INFRASTRUCTURE}
                  title="Infrastructure"
                />
              }
              imageUrl="/images/skills_infrastructure.png"
              imageAlt="an image indicating infrastructure development"
              tagLine="Infrastructure development is the backbone of an application and everything that communicates between the servers and the database."
              text="Punchcode Studios has a strong foundation in infrastructure development, with experience in a variety of languages and frameworks. We are committed to building robust, scalable, and secure infrastructure systems that power modern applications."
            >
              {
                <SkillsAccordion
                  skills={filterBySlug<Skill>(
                    [SkillTypes.INFRASTRUCTURE],
                    data.target
                  )}
                  wrapperName={containers[4]}
                />
              }
            </CallToActionLeft>
          </div>

          {/* Soft Skills */}
          <div className="softskills py-10 lg:px-10 mb-5 xl:w-full">
            <CallToActionRight
              title={
                <SkillHeader icon={SolidIcon.SOFTSKILLS} title="Soft Skills" />
              }
              imageUrl="/images/skills_soft.png"
              imageAlt="an image indicating soft skills"
              tagLine="Soft skills are the interpersonal skills that help you communicate and collaborate effectively with others."
              text="Punchcode Studios values soft skills as much as technical skills. We believe that strong communication, teamwork, and problem-solving abilities are essential for success in any project."
            >
              {
                <SkillsAccordion
                  skills={filterBySlug<Skill>(
                    [SkillTypes.SOFTSKILLS],
                    data.target
                  )}
                  wrapperName={containers[5]}
                />
              }
            </CallToActionRight>
          </div>
        </div>

        <div id="skillsFooter" className="py-10 m-2 lg:px-10 lg:m-10 xl:my-20">
          <Link to="/resume/experience" className="text-center">
            <Button
              variant="primary"
              size="wide"
              className="mx-auto block"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Whats next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SkillsContainer = () => {
  return (
    <ErrorBoundary fallback={<GenericErrorBoundary />}>
      <React.Suspense fallback={<Loader />}>
        <SkillContent />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default SkillsContainer;

export function meta() {
  return [
    { title: "Punchcode Studios | Skills" },
    {
      name: "Skills",
      content:
        "Skills page showcasing the skills of Punchcode Studios design company",
    },
  ];
}
