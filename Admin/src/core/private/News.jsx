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
  console.log(articles);

  const data = useMemo(() => articles, [articles]);
  console.log(data);

  const columns = [
    { name: "Title", selector: (row) => row.Title },
    { name: "Category", selector: (row) => row.Category },
    // { name: "Role", selector: (row) => row.role },
    // { name: "Status", selector: (row) => row.status },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`/users/${row.id}`}>View</Link>
          <Link to={`/users/${row.id}/edit`}>Edit</Link>|{""}
          <button onClick={() => onDelete(row.id)}>Delete</button>
        </>
      ),
    },
  ];
  const onDelete = () => {};

  return <DataTable columns={columns} data={data} pagination></DataTable>;
};

export default News;
