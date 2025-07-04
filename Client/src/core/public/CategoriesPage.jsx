import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { news } from "../../Utils/axios";
import "../../Styles/CategoriesPage.css";

function CategoriesPage() {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([]);
    const fetchNews = async () => {
      const res = await news.get(`/category/${name}`);
      setItems(res.data.data);
    };
    fetchNews();
  }, [name]);
  return (
    <div>
      <h1 className="title">{name}</h1>
      {/* Fetch and display category data based on 'name' */}
      {items.length != 0 ? (
        items.map((item) => {
          return (
            <div className="news-container" key={item.newsId}>
              <div className="news-content">
                <h2>{item.title}</h2>
                <p className="news-reporter">
                  {item.reporter.reporter_fullname}
                </p>
                <p className="news-snippet">
                  {item.content.slice(0, 400)}
                  {item.content.length > 400 ? "..." : ""}
                </p>
                <div className="news-actions">
                  <button className="bookmark-btn" title="Bookmark">
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
                  <button className="share-btn" title="Share">
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
                </div>
              </div>
              <img
                src={`http://localhost:3000${item.imageUrl}`}
                alt={item.title}
                className="news-img"
              />
            </div>
          );
        })
      ) : (
        <div className="news-container">
          <p>No news in this Category</p>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
