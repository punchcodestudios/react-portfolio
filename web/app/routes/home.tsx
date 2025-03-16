import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import heroImage from "/static/img_fullpng/home_page_hero.png";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toastSessionStorage } from "~/utils/toast.server";

export async function loader() {
  // throw new Response("Error Message from API", { status: 405 });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const toastCookieSession = await toastSessionStorage.getSession(
    request.headers.get("cookie")
  );
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
      <div className="flex flex-wrap h-[400px] items-center my-5 mx-5 bg-primary text-siteWhite">
        <div className="w-[100%] h-[100%] bg-primary p-5">
          <h2 className="text-siteWhite">a catchy slogan should go here</h2>
          <button onClick={handleToast}>Click for Toast</button>
        </div>
      </div>

      {/* <div className="w-[100%] h-[50%] xl:w-[50%] xl:p-1"> */}
      {/* <div className="w-[100%] h-[50%] xl:w-[50%] xl:h-[100%] bg-home-hero bg-cover bg-center"></div> */}
      {/* <p className="text-siteWhite flex flex-row text-center">
            Explore this site to learn the many ways punchcodestudios leverages
            the power and flexibility of react.js and many associated libraries
            to develop robust solutions that will meet your business needs
          </p> */}
      {/* </div> */}

      {/* <div className="text-siteWhite bg-primary my-5 p-4 justfy-center items-center">
        <h2>a catchy slogan should go here</h2>
        <p className="text-siteBlack m-0 text-center">
            <a
              className="text-siteWhite no-underline"
              target="_blank"
              href="https://avilpage.com/2014/12/14-great-quotes-about-python.html"
            >
              &quot;Everyone knows that any scripting language shootout that
              doesnt show python as the best language is faulty by design&quot;
              ~ Max M
            </a>
          </p>
      </div> */}
      <div className="flex flex-col mx-auto w-[90%] lg:flex-row lg:flex-wrap lg:justify-between">
        <div className="mb-5 w-[100%] lg:w-[32%]">
          <div className="flex flex-col p-5 lg:h-[300px] rounded-sm shadow-xl">
            <h2 className="">Resume</h2>
            <div className="grow">
              <p className="">
                Explore my interactive resume or download a print
              </p>
            </div>
            <div className="mt-5">
              <Button className="bg-secondary w-[100%]">More Info</Button>
            </div>
          </div>
        </div>
        <div className="mb-5 w-[100%] lg:w-[32%]">
          <div className="flex flex-col p-5 lg:h-[300px] rounded-sm shadow-xl">
            <h2 className="">About this site</h2>
            <p className="grow">
              Examine the technical details of this site to learn how the power
              of react.js can benefit your business
            </p>
            <div className="mt-5">
              <Button className="bg-secondary w-[100%]">More Info</Button>
            </div>
          </div>
        </div>
        <div className="mb-5 w-[100%] lg:w-[32%] ">
          <div className="flex flex-col p-5 lg:h-[300px] rounded-sm shadow-xl">
            <h2 className="">Contact</h2>
            <p className="grow">
              Send us a message - punchcodestudios is excited to hear from you!
            </p>
            <div className="mt-5">
              <Button className="bg-secondary w-[100%]">More Info</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
