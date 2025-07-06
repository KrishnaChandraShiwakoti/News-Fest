import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Bookmark.css";
import { bookmark, news } from "../../Utils/axios";
import { toast } from "react-toastify";

const Bookmark = () => {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const BEARER_TOKEN = localStorage.getItem("token");
  console.log(BEARER_TOKEN);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchBookmarks = async () => {
      try {
        const res = await bookmark.get(`/${user.id}`, {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        });
        console.log(res);

        setItems(res.data);
      } catch (err) {
        console.log(err);
        setItems([]);
      }
    };
    fetchBookmarks();
  }, []);
  console.log(items);

  const handleRemove = async (bookmarkId) => {
    try {
      await bookmark.delete(`/${bookmarkId}`, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });
      setItems((prev) => prev.filter((item) => item.bookmarkId !== bookmarkId));
    } catch (err) {
      // Optionally show error
      console.log(err);

      toast.error("unable to remove");
    }
  };

  if (!user)
    return <div className="bookmark-main">Please login to view bookmarks.</div>;

  return (
    <div className="bookmark-main">
      <h2>Your Bookmarked News</h2>
      {items.length === 0 ? (
        <div className="bookmark-empty">No bookmarks found.</div>
      ) : (
        <div className="bookmark-list">
          {items.map((item) => (
            <div className="bookmark-item" key={item.id}>
              <div className="bookmark-img-wrap">
                <img
                  src={`http://localhost:3000${item.imageUrl}`}
                  alt={item.title}
                />
              </div>
              <div className="bookmark-content">
                <h3>
                  <a href={`/news/${item.id}`} className="bookmark-title-link">
                    {item.title}
                  </a>
                </h3>
                <div className="bookmark-meta">By {item.reporter}</div>
                <div className="bookmark-snippet">
                  {item.content.slice(0, 200)}
                  {item.content.length > 200 ? "..." : ""}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.bookmarkId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
