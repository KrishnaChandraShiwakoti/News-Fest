import React from "react";
import "../../Styles/Analytics.css";

const TopPerformingNews = ({ newsData, count = 5 }) => {
  // Sort news by views descending
  const sorted = [...newsData].sort((a, b) => (b.views || 0) - (a.views || 0));
  const topNews = sorted.slice(0, count);

  return (
    <div className="analytics-chart-box">
      <div className="analytics-chart-title">Top Performing News</div>
      <ol className="top-performing-list">
        {topNews.map((item, idx) => (
          <li key={item.id} className="top-performing-item">
            <span className="top-performing-rank">#{idx + 1}</span>
            <span className="top-performing-title">{item.title}</span>
            <span className="top-performing-views">
              {item.views || 0} views
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopPerformingNews;
