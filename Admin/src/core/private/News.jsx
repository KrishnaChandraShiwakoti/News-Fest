import React, { useMemo, useState, useEffect } from "react";
import "../../Styles/News.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, news } from "../../Utils/axios";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

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

  const BEARER_TOKEN = localStorage.getItem("token");

  const data = useMemo(() => articles, [articles]);

  const onDelete = async (id) => {
    console.log(id);
    try {
      await news.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      toast.success("News Deleted Successfully");
    } catch (error) {
      toast.success(error);
    }
  };

  const columns = [
    { name: "Title", selector: (row) => row.title },
    { name: "Category", selector: (row) => row.category.category_name },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`edit/${row.newsId}`}>Edit</Link>|{"   "}
          <button onClick={() => onDelete(row.newsId)}>Delete</button>
        </>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} pagination></DataTable>;
};

export default News;
