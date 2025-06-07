import React from "react";

const IconCard = ({ icon, growth, title, detail }) => {
  return (
    <div>
      <div>
        {icon}
        {growth}
      </div>
      <p>{detail}</p>
      <h4>{title}</h4>
    </div>
  );
};

export default IconCard;
