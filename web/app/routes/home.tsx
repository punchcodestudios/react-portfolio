import type { Route } from "./+types/home";

export async function loader() {
  // throw new Response("Error Message from API", { status: 405 });
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
  return (
    <>
      <p>welcome</p>
    </>
  );
}
