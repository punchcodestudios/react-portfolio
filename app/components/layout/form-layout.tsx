import React from "react";
import { Outlet } from "react-router";

const FormLayout = () => {
  return (
    <div className="w-[90%]">
      <Outlet></Outlet>
    </div>
  );
};

export default FormLayout;
