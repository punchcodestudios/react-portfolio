import { useState, useCallback, useEffect } from "react";
import { Link, NavLink, useMatches, useLocation } from "react-router";
import { useOptionalUser } from "~/utils/user";
import { useNavigation } from "react-router";
import { Loader } from "../ui/loader";
import { useSpinDelay } from "spin-delay";
import loggerService from "~/service/logging";

// This function can be used to show a loading spinner when navigating
// to a new route. It can be called in the `useNavigation` hook or in
// the `onClick` handler of a link.

const Navbar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const user = useOptionalUser();
  const navigation = useNavigation();
  const location = useLocation();

  // ✅ Enhanced navigation tracking with telemetry
  const handleNavClick = useCallback(
    (targetPath: string, label: string) => {
      loggerService.debug("Navbar: Navigation clicked", undefined, {
        component: "Navbar",
        fromPath: location.pathname,
        toPath: targetPath,
        navigationLabel: label,
        navigationMethod: "navbar-click",
        isExpanded: expanded.toString(),
        timestamp: new Date().toISOString(),
      });

      // ✅ Track navigation usage for UX insights
      loggerService
        .trackFeatureUsage("Navigation", "navbar-link-clicked", {
          targetPath,
          navigationLabel: label,
          fromPath: location.pathname,
          deviceType: expanded ? "mobile" : "desktop", // expanded indicates mobile view
        })
        .catch((error) => {
          console.warn("Failed to track navbar navigation:", error);
        });

      setExpanded(false);
    },
    [location.pathname, expanded]
  );

  // ✅ Track navbar initialization and mobile menu usage
  useEffect(() => {
    loggerService.debug("Navbar: Component mounted", undefined, {
      component: "Navbar",
      currentPath: location.pathname,
      hasUser: (!!user).toString(),
      timestamp: new Date().toISOString(),
    });
  }, [location.pathname, user]);

  // ✅ Enhanced mobile menu toggle with interaction tracking
  const handleMobileToggle = useCallback(() => {
    const newExpandedState = !expanded;

    loggerService.debug("Navbar: Mobile menu toggled", undefined, {
      component: "Navbar",
      action: newExpandedState ? "expanded" : "collapsed",
      currentPath: location.pathname,
      timestamp: new Date().toISOString(),
    });

    // ✅ Track mobile menu usage
    loggerService
      .trackFeatureUsage(
        "Navigation",
        newExpandedState ? "mobile-menu-opened" : "mobile-menu-closed",
        {
          currentPath: location.pathname,
          action: newExpandedState ? "expand" : "collapse",
        }
      )
      .catch((error) => {
        console.warn("Failed to track mobile menu toggle:", error);
      });

    setExpanded(newExpandedState);
  }, [expanded, location.pathname]);

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

  // ✅ Enhanced logo click tracking
  const handleLogoClick = useCallback(() => {
    loggerService.debug("Navbar: Logo clicked", undefined, {
      component: "Navbar",
      fromPath: location.pathname,
      toPath: "/",
      navigationMethod: "logo-click",
      timestamp: new Date().toISOString(),
    });

    // ✅ Track logo navigation
    loggerService
      .trackFeatureUsage("Navigation", "logo-clicked", {
        fromPath: location.pathname,
        navigationMethod: "logo-click",
      })
      .catch((error) => {
        console.warn("Failed to track logo click:", error);
      });

    setExpanded(false);
  }, [location.pathname]);

  return (
    <nav id="navbarWrapper" className="font-nav">
      <div className="bg-primary w-full flex flex-row">
        <div className="flex items-center justify-between h-[60px] w-full px-4 py-2 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex flex-row w-1/5 h-full items-center"
          >
            <img
              className="h-full"
              src="/images/logo.png"
              alt="Punchcode Studios Logo"
            />
            <span className="font-brand text-secondary uppercase ms-3">
              Punchcode Studios
            </span>
          </Link>

          <div className="hidden md:flex md:flex-row md:grow">
            <div
              id="navItems"
              className="flex items-center grow md:justify-around"
            >
              <NavLink
                to="/resume"
                onClick={() => handleNavClick("/resume", "Resume")}
                className={({ isActive, isPending }) =>
                  `flex flex-row w-full p-2 h-14 font-nav md:w-1/4 md:p-0 justify-center items-center
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
                    <Loader />
                  </span>
                )}
                Resume
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => handleNavClick("/about", "About")}
                className={({ isActive, isPending }) =>
                  `flex flex-row w-full p-2 h-14 font-nav md:w-1/4 md:p-0 justify-center items-center
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    } ${isPending ? "opacity-60 pointer-events-none" : ""}`
                }
              >
                {loadingAbout && (
                  <span className="me-5">
                    <Loader />
                  </span>
                )}
                About
              </NavLink>

              <NavLink
                to="/contact"
                state={{
                  from: location.pathname + location.search + location.hash,
                }}
                onClick={() => handleNavClick("/contact", "Contact")}
                className={({ isActive, isPending }) =>
                  `flex flex-row w-full p-2 h-14 font-nav md:w-1/4 md:p-0 justify-center items-center
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    } ${isPending ? "opacity-60 pointer-events-none" : ""}`
                }
              >
                {loadingContact && (
                  <span className="me-5">
                    <Loader />
                  </span>
                )}
                Contact
              </NavLink>

              {/* {user && (
                <Link to="/logout" className="me-3 font-nav">
                  <span className="font-nav">
                    Logout {`${user.username}`}
                  </span>
                </Link>
              )}
              {!user && (
                <Link to="/login" className="me-3 ffont-nav">
                  <span className="font-nav">Login</span>
                </Link>
              )} */}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={handleMobileToggle}
              type="button"
              aria-label={expanded ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={expanded}
            >
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
            onClick={() => handleNavClick("/resume", "Resume")}
            className={({ isActive, isPending }) =>
              `me-3 p-2
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    }  ${isPending ? "opacity-60 pointer-events-none" : ""}`
            }
          >
            <div className="font-nav text-siteWhite flex flex-row justify-between h-8 items-center">
              <div className="flex items-center">Resume</div>
              {loadingResume ? (
                <div className="flex items-center">
                  <Loader />
                </div>
              ) : (
                ""
              )}
            </div>
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => handleNavClick("/about", "About")}
            className={({ isActive, isPending }) =>
              `me-3 p-2
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    }  ${isPending ? "opacity-60 pointer-events-none" : ""}`
            }
          >
            <div className="font-nav text-siteWhite flex flex-row justify-between h-8 items-center">
              <div className="flex items-center">About</div>
              {loadingAbout ? (
                <div className="flex items-center">
                  <Loader />
                </div>
              ) : (
                ""
              )}
            </div>
          </NavLink>

          <NavLink
            to="/contact"
            state={{
              from: location.pathname + location.search + location.hash,
            }}
            onClick={() => handleNavClick("/contact", "Contact")}
            className={({ isActive, isPending }) =>
              `me-3 p-2
                    ${
                      isActive
                        ? "bg-secondary text-siteWhite"
                        : "bg-primary text-secondary"
                    } ${isPending ? "opacity-60 pointer-events-none" : ""}`
            }
          >
            <div className="font-nav text-siteWhite flex flex-row justify-between h-8 items-center">
              <div className="flex items-center">Contact</div>
              {loadingContact ? (
                <div className="flex items-center">
                  <Loader />
                </div>
              ) : (
                ""
              )}
            </div>
          </NavLink>

          {/* {!user && (
            <Link to="/login" className="me-3">
              <span className="font-nav text-siteWhite">Login</span>
            </Link>
          )}
          {user && (
            <Link to="/logout" className="me-3">
              <span className="font-nav text-siteWhite">Logout</span>
            </Link>
          )} */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
