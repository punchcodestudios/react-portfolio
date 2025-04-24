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
  const headerImage = useImage({ path: "/error" });
  return (
    <>
      {/* {headerImage && <HeaderImage headerImage={headerImage}></HeaderImage>} */}
      <div className="flex flex-col w-[90%] mx-auto mt-3">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ResumeLayout;
