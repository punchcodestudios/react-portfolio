import SearchInput from "@/components/common/search-input/search-input";
import SortSelector from "@/components/common/sort-selector/sort-selector";
import DisciplineSelector from "@/components/gallery/discipline-selector";
import { Container, Navbar, NavItem } from "react-bootstrap";

const GalleryNav = () => {
  return (
    <Navbar expand="md" className="nav main-nav" collapseOnSelect>
      <Container className="">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="flex justify-content-between"
        >
          <NavItem className="col-md-4">
            <SearchInput />
          </NavItem>
          <NavItem>
            <DisciplineSelector />
            <SortSelector />
          </NavItem>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GalleryNav;
