import React from "react";
import "../../Styles/News.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const News = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  const articles = [
    {
      title: "Financial Markets Respond to Central Bank Announcement",
      category: "Finance",
      author: "Jennifer Wu",
      date: "6/3/2025",
      views: 764,
      status: "Regular",
      image: "https://source.unsplash.com/random/50x50?finance",
    },
    {
      title: "Global Health Organization Declares End to Viral Outbreak",
      category: "Health",
      author: "Robert Chen",
      date: "6/2/2025",
      views: 723,
      status: "Regular",
      image: "https://source.unsplash.com/random/50x50?health",
    },
    {
      title: "Global Tech Summit Announces Revolutionary AI Platform",
      category: "Technology",
      author: "Sarah Johnson",
      date: "6/2/2025",
      views: 1245,
      status: "Featured",
      image: "https://source.unsplash.com/random/50x50?technology",
    },
  ];
  return (
    <div>
      <div className="title-container">
        <h1>News</h1>
        <Link to={"/news/add"}>New Article</Link>
      </div>

      {/* Search */}

      {/* News */}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={index}>
                <td data-label="Title">
                  <img src={article.image} alt="Article" /> {article.title}
                </td>
                <td data-label="Category">{article.category}</td>
                <td data-label="Author">{article.author}</td>
                <td data-label="Date">{article.date}</td>
                <td data-label="Views">{article.views}</td>
                <td data-label="Status">
                  <span
                    className={`status ${
                      article.status === "Featured"
                        ? "status-featured"
                        : "status-regular"
                    }`}>
                    {article.status}
                  </span>
                </td>
                <td data-label="Actions" className="actions">
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default News;
