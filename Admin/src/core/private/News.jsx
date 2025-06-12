import React, { useMemo, useState } from "react";
import "../../Styles/News.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../Utils/axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
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
  const columns = React.useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        cell: ({ row }) => (
          <div data-label="Title">
            <img
              src={`http://localhost:3000${row.original.imageUrl}`}
              alt="News"
              style={{ width: "50px", height: "auto", marginRight: "10px" }}
            />
            {`${row.original.title.substring(0, 80)}...`}
          </div>
        ),
      },
      {
        header: "Category",
        accessorKey: "category.category_name",
        cell: ({ row }) => <span>{row.original.category.category_name}</span>,
      },
      {
        header: "Date",
        accessorKey: "updatedAt",
      },
      {
        header: "Views",
        accessorKey: "views",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span
            className={`status ${
              row.original.status === "published"
                ? "status-featured"
                : "status-regular"
            }`}>
            {row.original.status}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="actions" data-label="Actions">
            <button className="edit">Edit</button>
            <button
              className="delete"
              // onClick={() => handleDelete(row.original.newsId)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ]
    // [handleDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="title-container">
        <h1>News</h1>
        <Link to={"/news/add"}>New Article</Link>
      </div>

      {/* Table */}
      <div>
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default News;
