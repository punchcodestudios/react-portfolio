import React, { useState, type ReactNode } from "react";
import { NavLink } from "react-router";

interface Props {
  navItems: ReactNode[];
}
const Navbar = ({ navItems }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <nav id="navbarWrapper">
      <div className="bg-primary w-full text-siteWhite flex flex-row">
        <div className="flex items-center justify-between h-14 w-full px-4 sm:px-6 lg:px-8">
          <div className="text-xl font-bold">Punchcode Studios</div>
          <div className="hidden md:block">
            <div id="navItems" className="flex items-center ">
              {navItems.map((item, index) => {
                return <div key={index}>{item}</div>;
              })}
            </div>
          </div>

          <div className="md:hidden">
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
      </div>
      {expanded && (
        <div className="bg-primary text-siteWhite flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2 justify-center">
          {navItems.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
