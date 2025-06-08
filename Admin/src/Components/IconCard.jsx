import React from "react";

const IconCard = ({ icon, growth, title, detail }) => {
  return (
    <div className="icon-container">
      <div className="flex">
        <div className="icon">{icon}</div>
        {growth}
      </div>
      <p className="details">{detail}</p>
      <p className="title">{title}</p>
    </div>
  );
};

export default IconCard;
