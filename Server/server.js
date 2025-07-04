import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import newsRouter from "./routes/newsRoutes.js";
import db from "./config/db.js";
import "./model/index.js";
import News from "./model/news.js";
import adminAuthRouter from "./routes/adminAuthRoutes.js";
import path from "path";
import authRouter from "./routes/authRoutes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// if ((process.env.NODE_ENV = "development")) {
//   db.sync({ alter: true }).then(async () => {
//     // await News.create({
//     //   title: "New AI Breakthrough",
//     //   content: "Scientists have made a major AI discovery.",
//     //   image_url: "ai-news.jpg",
//     //   status: "published",
//     //   reporterId: 1,
//     //   categoryId: 1,
//     // });
//   });
// }

//middleWare

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.listen(3000, () => {
  console.log("server is listening in port 3000 ");
});

app.use("/api/news", newsRouter);
app.use("/admin", adminAuthRouter);
app.use("/auth", authRouter);
// Home route
app.get("/", (req, res) => {
  res.send("Hello from server side");
});
