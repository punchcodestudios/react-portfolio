import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../../state-management/auth/auth-context";
import MainNavComponent from "../navigation/main-nav/main-nav.component";
import SubNavComponent from "../navigation/sub-nav/sub-nav.component";
import { Box } from "@chakra-ui/react";

function LayoutComponent() {
  const { user } = useContext(AuthContext);
  return (
    <div className="container site-container">
      <Box>
        <MainNavComponent />
        {user && <SubNavComponent></SubNavComponent>}
      </Box>
      <Box>
        <main className="main-content d-flex flex-column">
          <Outlet></Outlet>
        </main>
      </Box>
      <Box>
        <footer>(C) punchcodestudios.com</footer>
      </Box>
    </div>
  );
}
export default LayoutComponent;
