import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
};

export default HomeLayout;
