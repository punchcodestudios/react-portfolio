import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <div className="flex flex-row flex-wrap items-center bg-primary text-siteWhite p-2 min-h-[50px] w-full md:justify-between">
      <div className="w-full flex justify-center ps-2 mb-2 lg:justify-start lg:w-1/4 lg:mb-0">
        <div className="flex flex-wrap">
          <span className="whitespace-nowrap me-2">
            &copy; punchcode studios{" "}
          </span>
          <span className="whitespace-nowrap">
            2023 - {new Date().getFullYear()}
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center mb-2 lg:w-1/2 lg:mb-0">
        <NavLink
          to="privacy-policy"
          className="mx-3 font-control text-secondary hover:text-secondary-accented hover:underline"
        >
          Privacy Policy
        </NavLink>
        |
        <NavLink
          to="terms-of-use"
          className="mx-3 font-control text-secondary hover:text-secondary-accented hover:underline"
        >
          Terms of Use
        </NavLink>
        |
        <NavLink
          to="contact"
          className="mx-3 font-control text-secondary hover:text-secondary-accented hover:underline"
        >
          Contact
        </NavLink>
      </div>
      <div className="w-full flex justify-center pe-2 mb-2 lg:justify-end lg:w-1/4 lg:mb-0"></div>
    </div>
  );
};

export default Footer;
