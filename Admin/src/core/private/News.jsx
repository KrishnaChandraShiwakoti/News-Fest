import React, { useMemo, useState, useEffect } from "react";
import "../../Styles/News.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Utils/axios";
import DataTable from "react-data-table-component";

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

  const data = useMemo(() => articles, [articles]);

  const columns = [
    { name: "Title", selector: (row) => row.title },
    { name: "Category", selector: (row) => row.category.category_name },
    // { name: "Role", selector: (row) => row.role },
    // { name: "Status", selector: (row) => row.status },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`/news/${row.newsId}`}>View</Link>
          <Link to={`edit/${row.newsId}`}>Edit</Link>|{""}
          <button onClick={() => onDelete(row.newsId)}>Delete</button>
        </>
      ),
    },
  ];
  const onDelete = () => {};

  return <DataTable columns={columns} data={data} pagination></DataTable>;
};

export default News;
