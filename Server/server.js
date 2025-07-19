import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import "./model/index.js";
import path from "path";
import { fileURLToPath } from "url";
import db from "./config/db.js";
import {
  adminAuthRoutes,
  authRoutes,
  bookmarkRoutes,
  newsRoutes,
  userRoutes,
} from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
app.listen(3000, () => {
  console.log("server is listening in port 3000 ");
});

app.use("/api/news", newsRoutes);
app.use("/admin", adminAuthRoutes);
app.use("/auth", authRoutes);
app.use("/bookmark", bookmarkRoutes);
app.use("/api/user", userRoutes);
// Home route
app.get("/", (req, res) => {
  res.send("Hello from server side");
});
