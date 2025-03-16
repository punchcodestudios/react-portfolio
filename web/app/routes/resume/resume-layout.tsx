import React from "react";
import { NavLink, Outlet, type MetaFunction } from "react-router";
import PageNav from "~/components/layout/page-nav.component";
import HeaderImage from "~/components/layout/header-image.component";
import useImage from "~/hooks/useImage";

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
  // console.log("matches: ", matches);
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
    <NavLink
      to="resume"
      className={({ isActive, isPending }) =>
        `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
      }
    >
      Summary
    </NavLink>,
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
    </NavLink>,
    <NavLink
      to="/resume/experience"
      className={({ isActive, isPending }) =>
        `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
      }
    >
      Experience
    </NavLink>,
    <NavLink
      to="resume/education"
      className={({ isActive, isPending }) =>
        `flex flex-row w-full p-2 h-14 md:w-1/4 md:p-0 justify-center items-center hover:bg-secondaryLight
        ${isActive ? "bg-secondary" : "bg-primary"} 
        ${isPending ? "bg-secondaryLight" : "bg-primary"}`
      }
    >
      Education
    </NavLink>,
  ];

  return (
    <>
      {headerImage && <HeaderImage headerImage={headerImage}></HeaderImage>}
      <PageNav navItems={items}></PageNav>
      <div className="flex flex-col w-[90%] mx-auto mt-3">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ResumeLayout;
