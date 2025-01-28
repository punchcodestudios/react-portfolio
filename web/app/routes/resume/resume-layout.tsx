import React from "react";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  useRouteError,
  type MetaFunction,
} from "react-router";
import PageNav from "~/components/layout/page-nav.component";
import HeaderImage from "~/components/layout/header-image.component";
import useImage from "~/hooks/useImage";
import type { Route } from "../+types/home";

export async function loader() {
  // throw new Response("made up this error", { status: 500 });
  const data = { displayName: "display name" };
  return data;
}

export const meta: MetaFunction<typeof loader> = ({
  data,
  params,
  matches,
}) => {
  const title = data?.displayName ?? params.displayName;
  console.log("matches: ", matches);
  return [
    {
      title: `${title}`,
    },
    { name: "description", content: "view and download resume" },
  ];
};

const ResumeLayout = () => {
  const headerImage = useImage({ path: "/resume" });
  const items = [
    <Link to="resume" className={`w-full p-2 h-14 md:w-1/4 md:p-0 `}>
      Summary
    </Link>,
    <Link
      to="resume/skills"
      className={`w-full p-2 h-14 md:w-1/4 md:p-0 `}
      prefetch="intent"
    >
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
