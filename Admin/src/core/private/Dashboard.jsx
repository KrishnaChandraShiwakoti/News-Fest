import "../../Styles/Dashboard.css";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { MdOutlineShowChart, MdShowChart } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import IconCard from "../../Components/IconCard";
import { NavLink, useNavigate } from "react-router-dom";
import "../../Styles/Dashboard.css";
import { auth } from "../../Utils/axios";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: "Total News",
      icon: <LuNewspaper />,
      detail: 5,
    },
    {
      id: 2,
      title: "Total Views",
      icon: <FaEye />,
      detail: 5100,
    },
    {
      id: 3,
      title: "Featured News",
      icon: <MdShowChart />,
      path: "/analytics",
      detail: 1,
    },
  ];
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
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div>
      <div className="title-container">
        <h1>DashBoard</h1>
        <p>
          <span>
            <FiRefreshCcw />
          </span>
          Refresh
        </p>
      </div>
      <div className="categories-container">
        {categories.map(({ id, title, icon, detail }) => {
          return (
            <IconCard key={id} title={title} icon={icon} detail={detail} />
          );
        })}
      </div>

      <div className="dashboard-feature-container">
        <div className="new-container">
          <div className="title-container">
            <h1>Popular News</h1>
            <button
              onClick={() => {
                navigate("/news");
              }}>
              View All
            </button>
          </div>
          <div className="categories-container">
            {articles?.slice(0, 4).map((news) => {
              return (
                <div key={news.newsId} className="news-container">
                  <img
                    src={`http://localhost:3000${news.imageUrl}`}
                    alt="News"
                    className="news-img"
                  />
                  <div className="news-header">
                    <h1>{`${news.title.substring(0, 50)}...`}</h1>
                    <p>{`${news.content.substring(0, 150)}...`}</p>
                  </div>
                  <div className="news-footer">
                    <p>{news.category.category_name}</p>
                    <button>edit</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="quick-actions-container">
          <h1>Quick Actions</h1>
          <button onClick={() => navigate("/news/add")}>Create New News</button>
          <button>Manage News </button>
          <button>View Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
