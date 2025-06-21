import {
  isRouteErrorResponse,
  Outlet,
  useMatches,
  useRouteError,
  type MetaFunction,
} from "react-router";
import HeaderImage from "~/components/layout/header-image";
import PageNav from "~/components/layout/page-nav";
import GenericErrorBoundary from "~/components/ui/error-boundary";
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

export default function ResumeLayout() {
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
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          Route Error: {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return <GenericErrorBoundary></GenericErrorBoundary>;
  } else {
    return <h1>Unknown Error</h1>;
  }
}
