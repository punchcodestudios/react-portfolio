import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
//@ts-ignore
import innovationImage from "/images/home_innovation.png";
//@ts-ignore
import informationImage from "/images/home_information.png";
//@ts-ignore
import communicationImage from "/images/home_communication.png";
import {
  isRouteErrorResponse,
  redirect,
  useRouteError,
  type ActionFunctionArgs,
} from "react-router";
import { toastSessionStorage } from "~/utils/toast.server";

export async function action({ request, params }: ActionFunctionArgs) {
  console.log("action: ");
  const toastCookieSession = await toastSessionStorage.getSession(
    request.headers.get("cookie")
  );
  console.log("toast cookie session: ", toastCookieSession);
  toastCookieSession.set("toast", {
    type: "success",
    title: "Toast Updated",
    description: "This is the description for the toast",
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await toastSessionStorage.commitSession(toastCookieSession),
    },
  });
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Punchcode Studios | Portfolio" },
    {
      name: "description",
      content:
        "Porfolio project showcasing React Development for PunchcodeStudios design company",
    },
  ];
}

export default function Home() {
  function handleToast() {
    console.log("handle toast");
  }

  return (
    <div className="flex-flex-col">
      <div className="justify-center mx-auto mb-2 p-2 bg-home-hero bg-no-repeat bg-cover bg-opacity-40 xl:flex-row xl:flex-wrap xl:justify-between xl:p-5 ">
        <div className="p-2 xl:p-0 mt-5 xl:px-5 h-[125px] xl:mt-0 text-center">
          <div className="mb-3 xl:w-120">
            <h1 className="font-brand uppercase text-secondary mt-3 xl:mt-7">
              punchcode studios
            </h1>
            <h2 className="text-sm text-siteWhite font-light tracking-wide font-header">
              design | develop | test | deploy | maintain
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto p-6 pb-0">
        <div className="mx-auto min-h-[50px] max-w-[90%] lg:max-w-[70%]">
          <div className="xl:flex">
            <p className="text-siteBlack text-center md:text-start">
              Punchcode Studios is a full service software development company.
              We offer robust solutions tailored to your individual needs with
              development packages that will fit any budget.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto my-5 p-6 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20 ">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="xl:flex">
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={innovationImage}
                alt="Modern building architecture"
              />
            </div>
            <div className="p-6 xl:p-0 mt-2 xl:px-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Inspiration
                </h2>
                <p className="mt-1 block text-xl leading-tight font-medium text-black">
                  Adding value to your team
                </p>
                <p className="my-4 text-gray-500">
                  As a fully dedicated member of your team, or as an independant
                  contractor solving a specific problem, Punchcode Studios
                  brings more than fifteen years of expertice and passion for
                  web development to your organization or personal project.
                </p>
              </div>

              <div className="md:flex md:flex-row">
                <Button
                  variant={"secondary"}
                  className="my-2 w-full md:mb-0 md:me-2"
                >
                  Download Resume
                </Button>
                <Button
                  variant={"secondary"}
                  className="my-2 w-full md:mb-0 md:ms-2"
                >
                  Learn More {">>"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto my-5 p-6 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20 ">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="flex flex-col-reverse xl:flex-row">
            <div className="p-6 xl:p-0 mt-3 xl:pe-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Innovation
                </h2>
                <a
                  href="#"
                  className="mt-1 block text-xl leading-tight font-medium text-black hover:underline"
                >
                  Keeping up with the latest technology
                </a>
                <p className="my-4 text-gray-500">
                  In this constantly changing landscape, my passion for
                  innovation is just simply the best. There is no other person
                  like me and the technology stack used in this website sets me
                  apart from all of the other idiots.
                </p>
              </div>
              <div className="md:flex md:flex-row">
                <Button
                  variant={"secondary"}
                  className="my-2 w-full md:mb-0 md:me-2"
                >
                  Download Technical Specs
                </Button>
                <Button
                  variant={"secondary"}
                  className="my-2 w-full md:mb-0 md:ms-2"
                >
                  Learn More {">>"}
                </Button>
              </div>
            </div>
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={informationImage}
                alt="Modern building architecture"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto my-5 p-6 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20 ">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="xl:flex">
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={communicationImage}
                alt="Modern building architecture"
              />
            </div>
            <div className="p-6 xl:p-0 mt-3 xl:px-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Collaboration
                </h2>
                <a
                  href="#"
                  className="mt-1 block text-xl leading-tight font-medium text-black hover:underline"
                >
                  Communication is key to success
                </a>
                <p className="my-4 text-gray-500">
                  As either a fully dedicated member of your team, or as an
                  independant contractor for a specific project, I can bring my
                  expertice and passion for state of the art development to your
                  organiztion.
                </p>
              </div>
              <div className="md:flex md:flex-row">
                <Button
                  variant={"secondary"}
                  className="my-2 w-full md:mb-0 md:me-2"
                >
                  Schedule a live demo
                </Button>
                <Button
                  variant={"secondary"}
                  className="my-2 w-full md:mb-0 md:ms-2"
                >
                  Send a note
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    return (
      <div>
        <h1>{`Error: ${typeof error}`}</h1>
        {`${error.toString()}`}
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
