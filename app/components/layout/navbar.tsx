import { useState } from "react";
import { Link, NavLink, useMatches } from "react-router";
import { useOptionalUser } from "~/utils/user";
import logo from "/images/logo.png";
import { useNavigation } from "react-router";
import Loader, { NavLoader } from "../ui/loader";
import { useSpinDelay } from "spin-delay";
// This function can be used to show a loading spinner when navigating
// to a new route. It can be called in the `useNavigation` hook or in
// the `onClick` handler of a link.
export const Spinner = () => <NavLoader />;

const Navbar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const user = useOptionalUser();
  const navigation = useNavigation();

  // Helper to check if a route is loading
  const isLoading = (to: string) =>
    navigation.state === "loading" && navigation.location?.pathname === to;

  const showLoading = (to: string) =>
    useSpinDelay(isLoading(to), {
      delay: 500,
      minDuration: 500,
    });

  const loadingResume = showLoading("/resume");
  const loadingAbout = showLoading("/about");
  const loadingContact = showLoading("/contact");

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
                className={({ isActive, isPending }) =>
                  `flex flex-row w-full p-2 h-14 font-navItem md:w-1/4 md:p-0 justify-center items-center
                      ${
                        isActive
                          ? "bg-secondary text-siteWhite"
                          : "bg-primary text-secondary"
                      } ${isPending ? "opacity-60 pointer-events-none" : ""}
                      `
                }
              >
                {loadingResume && (
                  <span className="me-5">
                    <NavLoader />
                  </span>
                )}
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
                    } ${isPending ? "opacity-60 pointer-events-none" : ""}`
                }
              >
                {loadingAbout && (
                  <span className="me-5">
                    <NavLoader />
                  </span>
                )}
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
                    } ${isPending ? "opacity-60 pointer-events-none" : ""}`
                }
              >
                {loadingContact && (
                  <span className="me-5">
                    <NavLoader />
                  </span>
                )}
                Contact
              </NavLink>
              {/* {user && (
                <Link to="/logout" className="me-3 font-navItem">
                  <span className="font-navItem">
                    Logout {`${user.username}`}
                  </span>
                </Link>
              )}
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
                fill="ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18L20 18"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="#FFF"
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
          <NavLink
            to="/resume"
            className={({ isActive, isPending }) =>
              `me-3 p-2
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    }  ${isPending ? "opacity-60 pointer-events-none" : ""}`
            }
          >
            <div className="font-navItem text-siteWhite flex flex-row justify-between h-8 items-center">
              <div className="flex items-center">Resume</div>
              {loadingResume ? (
                <div className="flex items-center">
                  <NavLoader />
                </div>
              ) : (
                ""
              )}
            </div>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive, isPending }) =>
              `me-3 p-2
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    }  ${isPending ? "opacity-60 pointer-events-none" : ""}`
            }
          >
            <div className="font-navItem text-siteWhite flex flex-row justify-between h-8 items-center">
              <div className="flex items-center">About</div>
              {loadingAbout ? (
                <div className="flex items-center">
                  <NavLoader />
                </div>
              ) : (
                ""
              )}
            </div>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive, isPending }) =>
              `me-3 p-2
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    } ${isPending ? "opacity-60 pointer-events-none" : ""}`
            }
          >
            <div className="font-navItem text-siteWhite flex flex-row justify-between h-8 items-center">
              <div className="flex items-center">Contact</div>
              {loadingContact ? (
                <div className="flex items-center">
                  <NavLoader />
                </div>
              ) : (
                ""
              )}
            </div>
          </NavLink>
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
