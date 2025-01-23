import { Outlet } from "react-router";

export default function NotesRoute() {
  return (
    <div className="flex h-full justify-between pb-12 border-8 border-blue-500 bg-siteWhite">
      <h1 className="text-h1">Notes</h1>
      <Outlet></Outlet>
    </div>
  );
}
