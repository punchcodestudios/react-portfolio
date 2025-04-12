import React, { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useRouteLoaderData } from "react-router";
import logo from "/static/img_fullpng/logo.png";
import { useOptionalUser } from "~/utils/user";

const Navbar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const user = useOptionalUser();

  return (
    <nav id="navbarWrapper">
      <div className="bg-primary w-full text-siteWhite flex flex-row">
        <div className="flex items-center justify-between h-[60px] w-full px-4 py-2 sm:px-6 lg:px-8">
          <Link to="/" className="flex flex-row w-[1/5] h-[100%] items-center">
            <img className="h-[100%]" src={logo} />
          </Link>
          <div className="hidden md:flex md:flex-row md:flex-grow">
            <div
              id="navItems"
              className="flex items-center flex-grow md:justify-around"
            >
              <Link to="/resume" className="me-3 ">
                <span className="font-navItem">Resume</span>
              </Link>
              <Link to="/about" className="me-3">
                <span className="font-navItem">About</span>
              </Link>
              <Link to="/contact" className="me-3 font-greycliff">
                <span className="font-navItem">Contact</span>
              </Link>
              {user && (
                <Link to="/logout" className="me-3 font-greycliff">
                  <span className="font-navItem">Logout</span>
                </Link>
              )}
              {!user && (
                <Link to="/login" className="me-3 font-greycliff">
                  <span className="font-navItem">Login</span>
                </Link>
              )}
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
          <Link to="/resume" className="me-3 font-greycliff">
            <span className="font-navItem">Resume</span>
          </Link>
          <Link to="/about" className="me-3 font-greycliff">
            <span className="font-navItem">About</span>
          </Link>
          <Link to="/contact" className="me-3 font-greycliff">
            <span className="font-navItem">Contact</span>
          </Link>
          {!user && (
            <Link to="/login" className="me-3 font-greycliff">
              <span className="font-navItem">Login</span>
            </Link>
          )}
          {user && (
            <Link to="/logout" className="me-3 font-greycliff">
              <span className="font-navItem">Logout</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
