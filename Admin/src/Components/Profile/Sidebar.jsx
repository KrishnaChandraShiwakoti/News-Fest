import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar-profile">
      <button className="sidebar-btn" onClick={() => navigate("/settings")}>
        📄 Profile
      </button>
      <button
        className="sidebar-btn"
        onClick={() => navigate("/settings/accountsetting")}>
        ⚙️ Account Settings
      </button>
    </div>
  );
};

export default Sidebar;
