import { Outlet } from "react-router";

const ContentPageLayout = () => {
  return (
    <div className="content-page-wrapper">
      <p>content page wrapper</p>
      <Outlet></Outlet>
    </div>
  );
};

export default ContentPageLayout;
