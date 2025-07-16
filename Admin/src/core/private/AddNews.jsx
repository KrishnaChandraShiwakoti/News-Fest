import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/AddNews.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { news } from "../../Utils/axios";
import { useEffect } from "react";
const AddNews = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = JSON.parse(localStorage.getItem("user"));
  const BEARER_TOKEN = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const onSubmit = async (data) => {
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

      const res = await news.post("", formData, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        // "Content-Type": "multipart/form-data",
      });
      if (res.status == 201) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
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
          <button type="submit" className="publish">
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
          />
          {errors.email && <p>{errors.email.message}</p>}
          <textarea
            {...register("content", { required: "content is required" })}
            placeholder="Write your news content here"
            rows="10"
            cols="10"></textarea>
        </div>
        <div className="details-section">
          <h3>News Details</h3>
          <hr />
          <label htmlFor="status" status>
            Status
          </label>
          <select
            defaultValue={"draft"}
            {...register("status", { required: "Status is required" })}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
          <label htmlFor="category">Category</label>
          <select
            defaultValue={"world"}
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
            <img src={imagePreview} alt="Selected" />
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

export default AddNews;
