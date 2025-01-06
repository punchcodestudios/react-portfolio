import type { Route } from "./+types/home";

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
