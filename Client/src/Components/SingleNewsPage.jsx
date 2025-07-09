import React from "react";
import "../Styles/SingleNewsPage.css";

const SingleNewsPage = ({
  news,
  onClose,
  onBookmark,
  onShare,
  isBookmarked,
}) => {
  console.log(news);

  if (!news) return null;

  return (
    <div className="single-news-overlay">
      <div className="single-news-modal">
        <div className="single-news-topbar">
          <span className="news-category-badge">{news?.category}</span>
          <div className="news-topbar-actions">
            <button
              className={`bookmark-btn${isBookmarked ? " bookmarked" : ""}`}
              onClick={onBookmark}
              title={isBookmarked ? "Remove Bookmark" : "Bookmark"}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fe1b1b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="share-btn" onClick={onShare} title="Share">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#007bff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
            <button className="close-btn" onClick={onClose} title="Close">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2d3748"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="single-news-content">
          <h2 className="single-news-title">{news?.title}</h2>
          <img
            className="single-news-image"
            src={news?.imageUrl}
            alt={news?.title}
          />
          <div className="single-news-meta">
            <span>By {news?.reporter}</span>
          </div>
          <div className="single-news-body">{news?.content}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleNewsPage;
