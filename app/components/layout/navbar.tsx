import { useState } from "react";
import { Link, NavLink, useMatches } from "react-router";
import { useOptionalUser } from "~/utils/user";
import logo from "/images/logo.png";

const Navbar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const user = useOptionalUser();

  return (
    <nav id="navbarWrapper">
      <div className="bg-primary w-full flex flex-row">
        <div className="flex items-center justify-between h-[60px] w-full px-4 py-2 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={() => setExpanded(false)}
            className="flex flex-row w-[1/5] h-[100%] items-center"
          >
            <img className="h-[100%]" src={logo} />{" "}
            <span className="font-brand text-secondary uppercase ms-3">
              Punchcode Studios
            </span>
          </Link>
          <div className="hidden md:flex md:flex-row md:flex-grow">
            <div
              id="navItems"
              className="flex items-center flex-grow md:justify-around"
            >
              <NavLink
                to="/resume"
                onClick={() => setExpanded(false)}
                className={({ isActive }) =>
                  `flex flex-row w-full p-2 h-14 font-navItem md:w-1/4 md:p-0 justify-center items-center
                      ${
                        isActive
                          ? "bg-secondary text-siteWhite"
                          : "bg-primary text-secondary"
                      } 
                      `
                }
              >
                Resume
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setExpanded(false)}
                className={({ isActive, isPending }) =>
                  `flex flex-row w-full p-2 h-14 font-navItem md:w-1/4 md:p-0 justify-center items-center
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setExpanded(false)}
                className={({ isActive, isPending }) =>
                  `flex flex-row w-full p-2 h-14 font-navItem md:w-1/4 md:p-0 justify-center items-center
                                        ${
                                          isActive
                                            ? "bg-secondary text-siteWhite"
                                            : "bg-primary text-secondary"
                                        } `
                }
              >
                Contact
              </NavLink>
              {/* {user && (
                <Link to="/logout" className="me-3 font-navItem">
                  <span className="font-navItem">
                    Logout {`${user.username}`}
                  </span>
                </Link>
              )}
              {!user && (
                <Link to="/login" className="me-3 ffont-navItem">
                  <span className="font-navItem">Login</span>
                </Link>
              )} */}
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
        <div className="bg-primary flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2 justify-center">
          <Link
            to="/resume"
            className="me-3"
            onClick={() => setExpanded(false)}
          >
            <span className="font-navItem text-siteWhite">Resume</span>
          </Link>
          <Link to="/about" className="me-3" onClick={() => setExpanded(false)}>
            <span className="font-navItem text-siteWhite">About</span>
          </Link>
          <Link
            to="/contact"
            className="me-3"
            onClick={() => setExpanded(false)}
          >
            <span className="font-navItem text-siteWhite">Contact</span>
          </Link>
          {/* {!user && (
            <Link to="/login" className="me-3">
              <span className="font-navItem text-siteWhite">Login</span>
            </Link>
          )}
          {user && (
            <Link to="/logout" className="me-3">
              <span className="font-navItem text-siteWhite">Logout</span>
            </Link>
          )} */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
