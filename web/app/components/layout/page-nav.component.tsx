import React, { useState, type ReactNode } from "react";
import { NavLink, useMatches } from "react-router";

interface Props {
  navItems: ReactNode[];
  isExpanded?: boolean;
}
const Navbar = () => {
  const matches = useMatches();
  console.log("matches: from pageNav: ", matches);

  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <nav id="navbarWrapper">
      <div className="bg-primary text-siteWhite font-navItem h-[60px] flex items-center">
        <div className="hidden md:inline-flex w-full justify-center items-center">
          <NavLink
            to="resume"
            className={({ isPending }) =>
              `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${
          matches.find((m: any) => m.id === "routes/resume/summary")
            ? "bg-secondary"
            : "bg-primary"
        } 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
            }
          >
            Summary
          </NavLink>
          <NavLink
            to="resume/skills"
            className={({ isActive, isPending }) =>
              `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
            }
            prefetch="intent"
          >
            Skills
          </NavLink>
          <NavLink
            to="/resume/experience"
            className={({ isActive, isPending }) =>
              `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
            }
          >
            Experience
          </NavLink>
          <NavLink
            to="resume/education"
            className={({ isActive, isPending }) =>
              `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
            }
          >
            Education
          </NavLink>
        </div>

        <div className="inline-flex md:hidden justify-end me-6 w-full">
          <button onClick={() => setExpanded(!expanded)} type="button">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18L20 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {expanded && (
        <div className="bg-primary text-siteWhite font-navItem flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2 w-full justify-center">
          <NavLink
            to="resume"
            className={({ isPending }) =>
              `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${
          matches.find((m: any) => m.id === "routes/resume/summary")
            ? "bg-secondary"
            : "bg-primary"
        } 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
            }
          >
            Summary
          </NavLink>
          <NavLink
            to="resume/skills"
            className={({ isActive, isPending }) =>
              `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
            }
            prefetch="intent"
          >
            Skills
          </NavLink>
          <NavLink
            to="/resume/experience"
            className={({ isActive, isPending }) =>
              `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
            }
          >
            Experience
          </NavLink>
          <NavLink
            to="resume/education"
            className={({ isActive, isPending }) =>
              `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
            }
          >
            Education
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
