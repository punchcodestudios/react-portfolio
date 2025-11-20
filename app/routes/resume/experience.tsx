import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ExperienceCard from "~/components/cards/experience-card";
import { GenericErrorBoundary } from "~/components/error/generic-error-boundary";
import { Loader } from "~/components/ui/loader";
import { SkillsAccordion } from "./skills";

// i like this idea = for later
// const ExperienceContent = React.lazy(() => import('./experience-content'));

export type ExperienceContentProps = {};

export const ExperienceContent: React.FC = () => {
  const eImagineTitle = () => {
    return (
      <span>
        <span className="lowercase">e</span>Imagine Technology Group
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col mx-auto xl:max-w-[90%]">
      <div className="flex flex-col w-full mx-auto overflow:hidden xl:flex-row xl:flex-wrap xl:justify-between">
        <div className="eimagine px-6 py-10 md:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
          <ExperienceCard
            title={eImagineTitle()}
            imageUrl="/images/self_portrait.png"
            imageAlt="eImagine logo"
            tagLine="Software Engineer"
            text="January 2022 - Present"
          >
            <div className="mx-0 lg:mx-6">
              <SkillsAccordion skills={undefined}></SkillsAccordion>
            </div>
            <EImagineDetails />
          </ExperienceCard>
        </div>
        <div className="eimagine px-6 py-10 md:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
          <ExperienceCard
            title={eImagineTitle()}
            imageUrl="/images/self_portrait.png"
            imageAlt="an image indicating backend development"
            tagLine="Software Engineer"
            text="January 2022 - Present"
          >
            {/* <SkillsAccordion skills={undefined}></SkillsAccordion> */}
          </ExperienceCard>
        </div>
      </div>
    </div>
  );
};

const EImagineDetails: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-[95%] xl:w-[80%]">
          <p className="font-semibold my-3">
            Modernizing Legacy Systems & Driving Architectural Innovation
          </p>
          <div className="md:ms-10 mb-10 lg:w-[90%]">
            <ul className="list-none md:list-disc md:list-outside">
              <li className="mb-3 me-4 md:me-0">
                Serve as the primary developer refactoring a legacy .NET4-based
                Application Management System into a modern React/TypeScript
                front-end and .NET 8 WebAPI back-end using Entity Framework.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Define and implement the standard architecture for future
                applications within the organization, enabling scalable,
                maintainable development.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Utilize React-Bootstrap, Mobx, and Axios to enhance user
                experience, streamline performance, and simplify API
                communication.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Facilitate secure data transfers and integrate global OIDC
                authentication workflows through collaboration with external
                vendors.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Deliver milestone projects ahead of schedule with zero sprint
                defects and maintain near-perfect quality post-release;
                consistently earn 100% satisfaction ratings from both internal
                stakeholders and external clients for usability, performance,
                and timeliness.
              </li>
            </ul>
          </div>

          <p className="font-semibold my-3 md:my-5">
            Agile Development & Continuous Improvement
          </p>
          <div className="md:ms-10 mb-10 lg:w-[90%]">
            <ul className="list-none md:list-disc md:list-outside w-[95%]">
              <li className="mb-3 me-4 md:me-0">
                Participate actively in an Agile team supporting a large-scale
                .NET4/C# Case Management System with JavaScript/jQuery, Kendo
                UI, and MVC Razor.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Resolve JIRA-reported issues and enhancement requests from
                stakeholders and end users, focusing on quality and timeliness.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Lead efforts to standardize Git usage across Azure DevOps
                repositories, improving naming conventions, branching policies,
                and pull request workflows.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Design and validate CI/CD pipelines via Azure DevOps, driving
                deployment consistency and operational efficiency.
              </li>
            </ul>
          </div>
          <p className="font-semibold my-3 md:my-5">
            Organizational Leadership & Technical Advocacy
          </p>
          <div className="md:ms-10 mb-10 lg:w-[90%]">
            <ul className="list-none md:list-disc md:list-outside w-[95%]">
              <li className="mb-3 me-4 md:me-0">
                Promote continuous improvement through technical leadership,
                personal development goals, and organization-wide knowledge
                sharing.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Conduct "lunch-and-learn" sessions on React ecosystem
                architecture, educating company-wide audiences and showcasing
                technical contributions.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Research, develop, and implement a reusable PDF generation
                utility adopted across multiple applications, enhancing
                processes and driving revenue growth.
              </li>
              <li className="mb-3 me-4 md:me-0">
                Achieve and maintain 100% compliance with regulatory training
                and professional certifications required by eImagine and the
                state of Indiana.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const ExperienceContainer = () => {
  return (
    <ErrorBoundary fallback={<GenericErrorBoundary />}>
      <React.Suspense fallback={<Loader />}>
        <ExperienceContent />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ExperienceContainer;

export function meta() {
  return [
    { title: "Punchcode Studios | Experience" },
    {
      name: "Experience",
      content:
        "Experience page showcasing the background and experience of Punchcode Studios design company",
    },
  ];
}
