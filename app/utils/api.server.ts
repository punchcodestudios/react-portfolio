import { invariantResponse } from "./site";

export function getDelay(request: Request): number {
  const url = new URL(request.url);
  const delay = url.searchParams.get("delay");
  if (delay) {
    const parsedDelay = parseInt(delay, 10);
    if (!isNaN(parsedDelay) && parsedDelay >= 0) {
      return parsedDelay;
    }
  }
  return 0; // Default delay of 0 milliseconds
}

const formatDate = (date: Date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} ${String(
    date.getSeconds()
  ).padStart(2, "0")}.${String(date.getMilliseconds()).padStart(3, "0")}`;

const skillData = [
  {
    name: "JavaScript",
    refid: "js",
    description: "A versatile programming language.",
  },
  {
    name: "Python",
    refid: "py",
    description: "A powerful language for data science.",
  },
  {
    name: "React",
    refid: "react",
    description: "A library for building user interfaces.",
  },
  {
    name: "Node.js",
    refid: "node",
    description: "JavaScript runtime for server-side development.",
  },
];

export async function getSkill(name: string, delay?: number) {
  const endTime = Date.now() + (delay || 0);
  invariantResponse(name, "No name provided", { status: 400 });
  const skill = skillData.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
  if (!skill) {
    invariantResponse(name, `Skill not found: ${name}`, { status: 404 });
  }
  return { ...skill, fetchedAt: formatDate(new Date()) };
}
