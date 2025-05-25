import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

//middleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.listen(3000, () => {
  console.log("server is listening in port 3000 ");
});

app.use("/api/news", userRoutes);
// Home route
app.get("/", (req, res) => {
  res.send("Hello from server side");
});
