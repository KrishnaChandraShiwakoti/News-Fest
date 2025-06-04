import React from "react";
import "../Styles/Dashboard.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  );
};

export default Dashboard;
