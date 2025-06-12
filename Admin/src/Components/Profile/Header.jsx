import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="profile-banner">
        <div className="profile-avatar"></div>
        <button className="edit-banner-btn">✏️</button>
      </div>
      <button className="logout-btn">logout ⟳</button>
    </div>
  );
};

export default Header;
