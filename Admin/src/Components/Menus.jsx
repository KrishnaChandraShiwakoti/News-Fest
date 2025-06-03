import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { LuLayoutDashboard, LuNewspaper, LuSettings } from "react-icons/lu";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

import "../Styles/Menus.css";
import { Link, NavLink } from "react-router-dom";

const Menus = () => {
  const categories = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LuLayoutDashboard />,
      path: "/",
    },
    {
      id: 2,
      name: "News",
      icon: <LuNewspaper />,
      path: "/news",
    },
    {
      id: 3,
      name: "Analytics",
      icon: <TbBrandGoogleAnalytics />,
      path: "/analytics",
    },
    {
      id: 4,
      name: "Settings",
      icon: <LuSettings />,
      path: "/settings",
    },
  ];
  return (
    <div className="sidebar">
      <div>
        <div className="logo">
          <div className="logo-icon">N</div>
          <div className="logo-text">News Fest</div>
        </div>

        <div className="nav">
          {categories.map(({ id, name, icon, path }) => {
            return (
              <NavLink
                key={id}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}>
                {icon}
                {name}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="profile">
        <div className="user">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Admin User"
          />
          <div className="user-info">
            <span className="name">Admin User</span>
            <span className="role">admin</span>
          </div>
        </div>

        <a href="#" className="logout">
          <AiOutlineLogout /> Logout
        </a>
      </div>
    </div>
  );
};

export default Menus;
