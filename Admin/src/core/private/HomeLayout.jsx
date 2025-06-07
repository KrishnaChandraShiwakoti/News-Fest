import React from "react";
import Menus from "../../Components/Menus";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <Menus />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

export default HomeLayout;
