import React from "react";
import { Link, Outlet } from "react-router";
import PageNav from "~/components/layout/page-nav.component";
import HeaderImage from "~/components/layout/header-image.component";
import useImage from "~/hooks/useImage";

const ResumeLayout = () => {
  const headerImage = useImage({ path: "/resume" });
  const items = [
    <Link to="resume" className={`w-full p-2 h-14 md:w-1/4 md:p-0 `}>
      Summary
    </Link>,
    <Link to="resume/skills" className={`w-full p-2 h-14 md:w-1/4 md:p-0 `}>
      Skills
    </Link>,
    <Link
      to="/resume/experience"
      className={`w-full p-2 h-14 md:w-1/4 md:p-0 `}
    >
      Experience
    </Link>,
    <Link to="resume/education" className={`w-full p-2 h-14 md:w-1/4 md:p-0 `}>
      Education
    </Link>,
  ];

  return (
    <>
      {headerImage && <HeaderImage headerImage={headerImage}></HeaderImage>}
      <PageNav navItems={items}></PageNav>
      <Outlet></Outlet>
    </>
  );
};

export default ResumeLayout;
