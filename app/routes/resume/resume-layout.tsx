import { Outlet, useMatches, type MetaFunction } from "react-router";
import HeaderImage from "~/components/layout/header-image";
import PageNav from "~/components/layout/page-nav";
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
  return [
    {
      title: `${title}`,
    },
    { name: "description", content: "view and download resume" },
  ];
};

const ResumeLayout = () => {
  const headerImage = useImage({ path: "/resume" });
  const matches = useMatches();
  // console.log("matches from resume layout: ", matches);

  return (
    <>
      {headerImage && <HeaderImage headerImage={headerImage}></HeaderImage>}
      <PageNav></PageNav>
      <div className="flex flex-col w-[90%] mx-auto mt-3">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ResumeLayout;
