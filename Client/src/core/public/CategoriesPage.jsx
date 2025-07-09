import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookmark, news } from "../../Utils/axios";
import "../../Styles/CategoriesPage.css";
import { toast } from "react-toastify";
import SingleNewsPage from "../../Components/SingleNewsPage";

function CategoriesPage() {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const BEARER_TOKEN = localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);
    setItems([]);
    const fetchNews = async () => {
      try {
        const res = await news.get(`/category/${name}`);
        setItems(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);

        setIsLoading(false);
      }
    };
    fetchNews();
  }, [name]);
  const addToBookmark = async (newsId) => {
    const data = {
      userId: user.id,
      newsId,
    };
    try {
      await bookmark.post("/", data, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });
      toast.success("added successfully");
      setBookmarkedIds((prev) => [...prev, newsId]);
    } catch (error) {
      toast.error("unable to add to bookmark");
      console.log(error);
    }
  };
  const handleShare = (news) => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.content.slice(0, 100),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Link copied to clipboard");
    }
  };
  if (isLoading) return <div className="landing-main">Loading...</div>;
  return (
    <div>
      <h1 className="title capitalize">{name}</h1>
      {selectedNews && (
        <SingleNewsPage
          news={{
            ...selectedNews,
            imageUrl: `http://localhost:3000${selectedNews.imageUrl}`,
            category: name,
          }}
          onClose={() => setSelectedNews(null)}
          onBookmark={() => addToBookmark(selectedNews.id)}
          onShare={() => handleShare(selectedNews)}
          isBookmarked={bookmarkedIds.includes(selectedNews.id)}
        />
      )}
      {items.length != 0 ? (
        items.map((item) => {
          return (
            <div
              className={`news-container${
                bookmarkedIds.includes(item.id) ? " bookmarked" : ""
              }`}
              key={item.id}
              onClick={() => setSelectedNews(item)}
              style={{ cursor: "pointer" }}>
              <div className="news-content">
                <h2>{item.title}</h2>
                <p className="news-reporter">{item.reporter}</p>
                <p className="news-snippet">
                  {item.content.slice(0, 400)}
                  {item.content.length > 400 ? "..." : ""}
                </p>
                <div
                  className="news-actions"
                  onClick={(e) => e.stopPropagation()}>
                  <button
                    className="bookmark-btn"
                    title="Bookmark"
                    onClick={() => {
                      addToBookmark(item.id);
                    }}>
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
                  <button
                    className="share-btn"
                    title="Share"
                    onClick={() => handleShare(item)}>
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
