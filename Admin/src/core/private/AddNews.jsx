import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/AddNews.css";
const AddNews = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState(null);
  const [category, setCategory] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const data = {
      title,
      content,
      status,
      category,
      image,
    };
  };
  return (
    <form>
      <div className="title">
        <h1>Add new News</h1>
        <div className="flex">
          <Link to={"/news"} className="cancel">
            Cancel
          </Link>
          <Link
            to={"/news/add"}
            type="submit"
            onClick={handleSubmit}
            className="publish">
            Publish
          </Link>
        </div>
      </div>
      <div className="section-container">
        <div className="input-section">
          <input
            type="text"
            placeholder="News Title"
            onChange={handleTitleChange}
            name="title"
            required
          />
          <textarea
            name="content"
            id=""
            placeholder="Write your news content here"
            rows="10"
            cols="10"
            onChange={handleContentChange}
            required></textarea>
        </div>
        <div className="details-section">
          <h3>News Details</h3>
          <hr />
          <label htmlFor="status" status>
            Status
          </label>
          <select name="status" id="" onChange={handleStatusChange}>
            <option value="draft">Draft</option>
            <option value="published">published</option>
          </select>
          <label htmlFor="category">Category</label>
          <select name="category" id="" onChange={handleCategoryChange}>
            <option value="world">World</option>
            <option value="news">News</option>
          </select>
        </div>
      </div>
      <div className="featured-image-container">
        <h3>Featured Image</h3>
        <div className="image-preview">
          {image ? (
            <img src={image} alt="Selected" />
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
