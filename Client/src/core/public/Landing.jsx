import React, { useEffect, useState } from "react";
import "../../Styles/Landing.css";
import { news } from "../../Utils/axios";
import { links as categories } from "../../Data/Categories";
import SingleNewsPage from "../../Components/SingleNewsPage";
import { Link } from "react-router-dom";

const Landing = () => {
  const [items, setItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [topStories, setTopStories] = useState([]);
  const [latest, setLatest] = useState([]);
  const [editorsPick, setEditorsPick] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const res = await news.get("/");
        setItems(res.data.data);
        setTopStories(res.data.data.slice(0, 4));
        setLatest(res.data.data.slice(4, 10));
        setEditorsPick(res.data.data.slice(10, 14));
      } catch (e) {
        setItems([]);
      }
      setIsLoading(false);
    };
    fetchNews();
  }, []);
  console.log(items);

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

  if (isLoading) return <div className="landing-main">Loading...</div>;

  return (
    <div className="landing-bbc-cnn-style">
      {selectedNews && (
        <SingleNewsPage
          news={{
            ...selectedNews,
            imageUrl: `http://localhost:3000${selectedNews.imageUrl}`,
            category: selectedNews?.category || "General",
          }}
          onClose={() => setSelectedNews(null)}
          onBookmark={() => {}}
          onShare={() => handleShare(selectedNews)}
          isBookmarked={false}
        />
      )}
      {/* Top Stories Section */}
      <section className="landing-top-stories">
        <h2 className="landing-section-title">Top Stories</h2>
        <div className="landing-top-stories-grid">
          {topStories.map((item, idx) => (
            <div
              className={`landing-top-story-card${
                idx === 0 ? " featured" : ""
              }`}
              key={item.newsId || idx}
              onClick={() => setSelectedNews(item)}>
              <img
                src={`http://localhost:3000${item.imageUrl}`}
                alt={item.title}
                className="landing-top-story-img"
              />
              <div className="landing-top-story-content">
                <span className="landing-category-badge">
                  {item.category?.category_name || "General"}
                </span>
                <h3 className="landing-top-story-title">{item.title}</h3>
                <div className="landing-top-story-meta">
                  By {item.reporter?.reporter_fullname || "Unknown"}
                </div>
                <div className="landing-top-story-snippet">
                  {item.content?.slice(0, 90)}
                  {item.content?.length > 90 ? "..." : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Latest News Section */}
      <section className="landing-latest-section">
        <div className="landing-section-header">
          <h2 className="landing-section-title">Latest News</h2>
          <Link to="/category/News" className="view-all-link">
            View All
          </Link>
        </div>
        <div className="landing-latest-list">
          {latest.map((item, idx) => (
            <div
              className="landing-latest-card"
              key={item.newsId || idx}
              onClick={() => setSelectedNews(item)}>
              <img
                src={`http://localhost:3000${item.imageUrl}`}
                alt={item.title}
                className="landing-latest-img"
              />
              <div className="landing-latest-content">
                <h4 className="landing-latest-title">{item.title}</h4>
                <div className="landing-latest-meta">
                  By {item.reporter?.reporter_fullname || "Unknown"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Editors' Picks Section */}
      <section className="landing-editors-pick-section">
        <div className="landing-section-header">
          <h2 className="landing-section-title">Editors' Picks</h2>
          <Link to="/category/EditorsPick" className="view-all-link">
            View All
          </Link>
        </div>
        <div className="landing-editors-pick-list">
          {editorsPick.map((item, idx) => (
            <div
              className="landing-editors-pick-card"
              key={item.newsId || idx}
              onClick={() => setSelectedNews(item)}>
              <img
                src={`http://localhost:3000${item.imageUrl}`}
                alt={item.title}
                className="landing-editors-pick-img"
              />
              <div className="landing-editors-pick-content">
                <h4 className="landing-editors-pick-title">{item.title}</h4>
                <div className="landing-editors-pick-meta">
                  By {item.reporter?.reporter_fullname || "Unknown"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
