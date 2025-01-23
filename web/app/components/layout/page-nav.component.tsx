import React, { useState, type ReactNode } from "react";
import { NavLink } from "react-router";

interface Props {
  navItems: ReactNode[];
  isExpanded?: boolean;
}
const Navbar = ({ navItems, isExpanded }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <nav id="navbarWrapper">
      <div className="bg-primary text-siteWhite h-14 flex items-center">
        <div className="hidden md:inline-flex w-full justify-center items-center">
          {navItems.map((item, index) => {
            return item;
          })}
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
        <div className="bg-primary text-siteWhite flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2 w-full justify-center">
          {navItems.map((item, index) => {
            return item;
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
