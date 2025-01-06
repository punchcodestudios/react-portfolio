import React from "react";
import { NavLink } from "react-router";

const MainNav = () => {
  return (
    <div className="nav">
      <NavLink to="resume">Resume</NavLink>
      <NavLink to="about">About</NavLink>
      <NavLink to="products">Products</NavLink>
    </div>
  );
};

export default MainNav;
