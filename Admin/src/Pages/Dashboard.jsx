import React from "react";
import "../Styles/Dashboard.css";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  );
};

export default Dashboard;
