import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageFooter = () => {
  return (
    <div className="page-footer">
      <div className="col-4 d-flex middle">
        <div>
          copyright: 2023 - {new Date().getFullYear()} all rights reserved
        </div>
      </div>
      <div className="d-flex center col-4">
        <div className="text-center nav">
          <Nav.Link eventKey="1" as={Link} to="/privacy-policy">
            Privacy Policy
          </Nav.Link>
          <Nav.Link eventKey="2" as={Link} to="/terms-of-use">
            Terms of Use
          </Nav.Link>
        </div>
      </div>
      <div className="d-flex col-4 right middle">
        <div className="text-right">
          copyright: 2023 - {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
