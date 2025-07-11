import React from "react";
import { NavLink } from "react-router-dom";
import { links } from "../Data/Categories";

const Navlinks = () => {
  return (
    <>
      {links.map(({ id, url, text }) => (
        <li key={id} className="landing-navbar-link-item">
          <NavLink
            to={url}
            className={({ isActive }) =>
              `landing-navbar-link capitalize${isActive ? " active" : ""}`
            }>
            {text}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default Navlinks;
