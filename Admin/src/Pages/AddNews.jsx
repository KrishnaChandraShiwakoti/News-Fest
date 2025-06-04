import React from "react";
import { Link } from "react-router-dom";

const AddNews = () => {
  return (
    <div>
      <div className="title-container">
        <h1>News</h1>
        <div>
          <Link to={"/news"} className="cancel">
            Cancel
          </Link>
          <Link to={"/news/add"}>New Article</Link>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
