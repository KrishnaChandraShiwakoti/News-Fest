import React, { useState } from "react";
import { AiOutlineLogout, AiOutlineMenu, AiFillProfile } from "react-icons/ai";
import { LuLayoutDashboard, LuNewspaper, LuSettings } from "react-icons/lu";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

import "../Styles/Menus.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Menus = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user != null) {
      setUserData(JSON.parse(user));
    } else {
      setUserData({});
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
    <>
      {/* Mobile Toggle Button */}
      <div className="navbar">
        <button
          className="menu-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <AiOutlineMenu />
        </button>
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div>
          <div className="logo">
            <div className="logo-icon">N</div>
            <div className="logo-text">News Fest</div>
            {isSidebarOpen ? (
              <button
                className="menu-cancel"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <RxCross1 />
              </button>
            ) : (
              ""
            )}
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
            {userData?.profilePicture ? (
              <img src={user.profilePicture} alt="Admin User" />
            ) : (
              <BsPersonCircle />
            )}
            <div className="user-info">
              <span className="name">{userData?.name}</span>
            </div>
          </div>

          <a href="#" className="logout" onClick={logout}>
            <AiOutlineLogout /> Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Menus;
