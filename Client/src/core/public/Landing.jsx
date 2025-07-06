import React, { useEffect, useState } from "react";
import "../../Styles/Landing.css";
import { news } from "../../Utils/axios";
import { links as categories } from "../../Data/Categories";
import { Link, useLocation } from "react-router-dom";

const Landing = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(2);

  // const location = useLocation();
  // const currentPath = location.pathname;

  useEffect(() => {
    const fetchNews = async () => {
      const res = await news.get("/");
      setItems(res.data.data);
    };
    fetchNews();
  }, []);

  if (!items.length) return <div className="landing-main">Loading...</div>;

  return (
    <>
      <div className="landing-main landing-split-layout">
        <div className="landing-featured-col">
          {items[0] && (
            <div className="landing-featured">
              <div className="landing-img-wrap">
                <img
                  src={`http://localhost:3000${items[0].imageUrl}`}
                  alt={items[0].title}
                  className="landing-img"
                />
                <span className="landing-category-badge right">
                  {items[0].category?.category_name || "General"}
                </span>
              </div>
              <div className="landing-title">{items[0].title}</div>
              <div className="landing-meta">
                By {items[0].reporter?.reporter_fullname || "Unknown"}
              </div>
            </div>
          )}
        </div>
        <div className="landing-side-list-col">
          {items.slice(1, 4).map((item, idx) => (
            <div className="landing-side-item" key={item.newsId || idx}>
              <div className="landing-img-wrap">
                <img
                  src={`http://localhost:3000${item.imageUrl}`}
                  alt={item.title}
                  className="landing-img"
                />
                <span className="landing-category-badge right">
                  {item.category?.category_name || "General"}
                </span>
              </div>
              <div
                className="landing-title"
                style={{ fontSize: "1.1rem", marginBottom: 4 }}>
                {item.title}
              </div>
              <div className="landing-meta">
                By {item.reporter?.reporter_fullname || "Unknown"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="landing-categories-bar">
        {categories.slice(1, categories.length).map((cat) => (
          <button
            type="button"
            className={`landing-category-link-bar${
              selectedCategory === cat.id ? " selected" : ""
            }`}
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}>
            {cat.text}
          </button>
        ))}
      </div>
    </>
  );
};

export default Landing;
