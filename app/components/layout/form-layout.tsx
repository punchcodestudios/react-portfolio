import React from "react";
import { Outlet } from "react-router";

const FormLayout = () => {
  return (
    <div className="form-wrapper">
      <Outlet></Outlet>
    </div>
  );
};

export default FormLayout;
