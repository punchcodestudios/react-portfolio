import LoginControl from "@/components/auth/login-control.component";
import { useAuth } from "@/contexts/auth-context";
import { NavItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function MainNavComponent() {
  const { isAuthenticated } = useAuth();
  return (
    <Navbar expand="lg" className="nav main-nav" collapseOnSelect>
      <Container>
        <Navbar.Brand>
          <Nav.Link eventKey="0" as={Link} to="/">
            Punchcode Studio
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={{ alignItems: "center" }} id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavItem>
              <Nav.Link eventKey="1" as={Link} to="/resume">
                Resume
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link eventKey="2" as={Link} to="/about">
                About
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link eventKey="3" as={Link} to="/galleries">
                Galleries
              </Nav.Link>
            </NavItem>
            <NavItem>
              <LoginControl></LoginControl>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavComponent;
