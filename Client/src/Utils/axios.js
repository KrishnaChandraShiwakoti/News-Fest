import axios from "axios";
export const auth = axios.create({
  baseURL: "http://localhost:3000/auth",
});

export const news = axios.create({
  baseURL: "http://localhost:3000/api/news",
});
export const bookmark = axios.create({
  baseURL: "http://localhost:3000/bookmark",
});

export const user = axios.create({
  baseURL: "http://localhost:3000/api/user",
});
