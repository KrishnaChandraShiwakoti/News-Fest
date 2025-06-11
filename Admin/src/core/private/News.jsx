import React, { useState } from "react";
import "../../Styles/News.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../Utils/axios";

const News = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
    const BEARER_TOKEN = localStorage.getItem("token");

    const fetchArticles = async () => {
      try {
        const response = await auth.get(`/api/news/${user.id}`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        console.log(response);

        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);
  const handleDelete = async (id) => {
    console.log(id);
  };
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
              <th>Date</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => {
              console.log(article);
              return (
                <tr key={article.newsId}>
                  <td data-label="Title">
                    <img
                      src={`http://localhost:3000${article.imageUrl}`}
                      alt="News"
                    />{" "}
                    {article.title}
                  </td>
                  <td data-label="Category">
                    {article.category.category_name}
                  </td>

                  <td data-label="Date">{article.updatedAt}</td>
                  <td data-label="Views">{article.views}</td>
                  <td data-label="Status">
                    <span
                      className={`status ${
                        article.status === "published"
                          ? "status-featured"
                          : "status-regular"
                      }`}>
                      {article.status}
                    </span>
                  </td>
                  <td data-label="Actions" className="actions">
                    <button className="edit">Edit</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(article.newsId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default News;
