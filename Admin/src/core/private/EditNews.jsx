import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../Styles/AddNews.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { news } from "../../Utils/axios";
import { useEffect } from "react";
const EditNews = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [articles, setArticles] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const BEARER_TOKEN = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const response = await news.get(`/${id}`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        const article = response.data.data;
        setArticles(article);

        const imageUrl = `http://localhost:3000${article.imageUrl}`;
        setImagePreview(imageUrl);

        // Fetch the image as a blob and convert it to a File object
        const imgResponse = await fetch(imageUrl);
        const blob = await imgResponse.blob();

        // Create a file name from the URL or use a default
        const fileName = imageUrl.split("/").pop() || "image.jpg";
        const file = new File([blob], fileName, { type: blob.type });

        setImage(file);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append("category", data.category); // assuming it's the ID
    formData.append("reporterId", user.id); // use whatever ID field matches
    formData.append("image", image);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      console.log(formData);
      const res = await news.put(`/edit/${id}`, formData, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        // "Content-Type": "multipart/form-data",
      });
      if (res.status == 200) {
        toast.success(res.data.message);
        navigate("/");
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title">
        <h1>Add new News</h1>
        <div className="flex">
          <Link to={"/news"} className="cancel">
            Cancel
          </Link>
          <button type="submit" className="publish" disabled={isLoading}>
            Publish
          </button>
        </div>
      </div>
      <div className="section-container">
        <div className="input-section">
          <input
            type="text"
            {...register("title", { required: "Email is required" })}
            placeholder="News Title"
            defaultValue={articles.title}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <textarea
            {...register("content", { required: "content is required" })}
            placeholder="Write your news content here"
            rows="10"
            cols="10"
            defaultValue={articles.content}></textarea>
        </div>
        <div className="details-section">
          <h3>News Details</h3>
          <hr />
          <label htmlFor="status" status>
            Status
          </label>
          <select {...register("status", { required: "Status is required" })}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
          <label htmlFor="category">Category</label>
          <select
            {...register("category", { required: "category is required" })}>
            <option value="world">world</option>
            <option value="news">news</option>
            <option value="world">Entertainment</option>
            <option value="news">Sports</option>
            <option value="world">Education</option>
            <option value="world">Finance</option>
          </select>
        </div>
      </div>
      <div className="featured-image-container">
        <h3>Featured Image</h3>
        <div className="image-preview">
          {imagePreview ? (
            <img
              src={`http://localhost:3000${articles.imageUrl}`}
              alt="Selected"
            />
          ) : (
            <div className="placeholder">
              <span role="img" aria-label="image icon">
                🖼️
              </span>
              <p>No image selected</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="fileUpload"
          className="file-input"
        />
      </div>
    </form>
  );
};

export default EditNews;
