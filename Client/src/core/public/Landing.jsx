import React, { useEffect, useState } from "react";
import "../../Styles/Landing.css";
import { news } from "../../Utils/axios";
import { links as categories } from "../../Data/Categories";
import SingleNewsPage from "../../Components/SingleNewsPage";
import { Link } from "react-router-dom";

const Landing = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("News");
  const [selectedNews, setSelectedNews] = useState(null);
  const [itemsByCategory, setItemsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      const res = await news.get("/");
      setItems(res.data.data);
    };
    fetchNews();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchNews = async () => {
      try {
        const res = await news.get(`/category/${selectedCategory}`);
        setIsLoading(false);
        setItemsByCategory(res.data.data);
      } catch (error) {
        setItemsByCategory([]);
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [selectedCategory]);
  console.log(itemsByCategory);

  if (!items.length) return <div className="landing-main">Loading...</div>;

  const handleShare = (news) => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.content?.slice(0, 100),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  return (
    <>
      {selectedNews && (
        <SingleNewsPage
          news={{
            ...selectedNews,
            imageUrl: `http://localhost:3000${selectedNews.imageUrl}`,
            category: selectedNews.category?.category_name || "General",
          }}
          onClose={() => setSelectedNews(null)}
          onBookmark={() => {}}
          onShare={() => handleShare(selectedNews)}
          isBookmarked={false}
        />
      )}

      <div className="landing-main landing-split-layout">
        <div className="landing-featured-col">
          {items[0] && (
            <div
              className="landing-featured"
              onClick={() => setSelectedNews(items[0])}
              style={{ cursor: "pointer" }}>
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
            <div
              className="landing-side-item"
              key={item.newsId || idx}
              onClick={() => setSelectedNews(item)}
              style={{ cursor: "pointer" }}>
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
              selectedCategory === cat.text ? " selected" : ""
            }`}
            key={cat.id}
            onClick={() => setSelectedCategory(cat.text)}>
            {cat.text}
          </button>
        ))}
      </div>
      {/* View All link above */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "0.5rem 0 0.2rem 0",
        }}>
        <Link to={`/category/${selectedCategory}`} className="view-all-link">
          View All
        </Link>
      </div>
      {/* Mapped items by category (cards) */}
      {isLoading ? (
        <div>Loading</div>
      ) : itemsByCategory.length !== 0 ? (
        <div className="landing-category-items-list">
          {(itemsByCategory || []).slice(0, 4).map((item, idx) => (
            <div
              className="landing-category-item-card"
              key={item.newsId || idx}
              onClick={() => setSelectedNews(item)}>
              <img
                src={`http://localhost:3000${item.imageUrl}`}
                alt={item.title}
                className="landing-category-item-img"
              />
              <div className="landing-category-item-title">{item.title}</div>
              <div className="landing-category-item-snippet">
                {item.content?.slice(0, 40)}
                {item.content?.length > 40 ? "..." : ""}
              </div>
              <div className="landing-category-item-reporter">
                By {item.reporter?.reporter_fullname || "Unknown"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="news-container">
          <p>No news in this Category</p>
        </div>
      )}
    </>
  );
};

export default Landing;
