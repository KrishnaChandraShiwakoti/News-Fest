import React from "react";
import "../../Styles/Dashboard.css";
import { useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { MdOutlineShowChart, MdShowChart } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import IconCard from "../../Components/IconCard";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  const categories = [
    {
      id: 1,
      title: "News",
      icon: <LuNewspaper />,
      detail: 5,
    },
    {
      id: 2,
      title: "Views",
      icon: <FaEye />,
      detail: 5100,
    },
    {
      id: 3,
      title: "Featured News",
      icon: <MdShowChart />,
      path: "/analytics",
      detail: 1,
    },
  ];
  return (
    <div>
      <div>
        <h1>DashBoard</h1>
        <p>
          <span>
            <FiRefreshCcw />
          </span>
          Refresh
        </p>
      </div>
      <div>
        {categories.map(({ id, title, icon, detail }) => {
          return (
            <IconCard key={id} title={title} icon={icon} detail={detail} />
          );
        })}
        <IconCard />
      </div>
    </div>
  );
};

export default Dashboard;
