import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../../state-management/auth/auth-context";
import MainNavComponent from "../navigation/main-nav/main-nav.component";
import SubNavComponent from "../navigation/sub-nav/sub-nav.component";

function LayoutComponent() {
  const { user } = useContext(AuthContext);
  return (
    <div className="container site-container">
      <MainNavComponent />
      {user && <SubNavComponent></SubNavComponent>}
      <main className="main-content d-flex flex-column">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
export default LayoutComponent;
