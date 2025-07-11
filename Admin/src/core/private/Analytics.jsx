import React, { useEffect, useState } from "react";
import { news } from "../../Utils/axios";
import "../../Styles/Analytics.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import TopPerformingNews from "./TopPerformingNews";

const COLORS = [
  "#3182ce",
  "#fe1b1b",
  "#2ecc40",
  "#ffb300",
  "#6f42c1",
  "#00bcd4",
  "#e91e63",
  "#ff9800",
];

const Analytics = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await news.get("/");
        // Expecting: { id, title, views, category: { category_name } }
        setNewsData(res.data.data);
      } catch (e) {
        setNewsData([]);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  // Prepare data for charts
  const barData = newsData.map((item) => ({
    name: item.title.length > 18 ? item.title.slice(0, 18) + "..." : item.title,
    views: item.views || 0,
  }));

  // Pie chart: views by category
  const categoryViews = {};
  newsData.forEach((item) => {
    const cat = item.category?.category_name || "Other";
    categoryViews[cat] = (categoryViews[cat] || 0) + (item.views || 0);
  });
  const pieData = Object.entries(categoryViews).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">News Analytics</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="analytics-charts">
          <div className="analytics-chart-box">
            <div className="analytics-chart-title">Views per News Article</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barData}
                margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={60}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="views" fill="#3182ce" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="analytics-chart-box">
            <div className="analytics-chart-title">Views by Category</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label>
                  {pieData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <TopPerformingNews newsData={newsData} count={5} />
        </div>
      )}
    </div>
  );
};

export default Analytics;
