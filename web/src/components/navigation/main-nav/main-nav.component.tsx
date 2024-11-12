import { NavItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import LoginComponent from "../../../state-management/auth/login.component";

function MainNavComponent() {
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
            {/* <NavDropdown title="Resume" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/resume">
                  Overview
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/resume-skills">
                  Skills
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/resume-experience">
                  Experience
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/resume-education">
                  Education
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/home">
                  Download
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown> */}
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
              <LoginComponent></LoginComponent>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavComponent;
