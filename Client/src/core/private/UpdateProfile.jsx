import React from "react";
import { useForm } from "react-hook-form";
import "../../Styles/UpdateProfile.css";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  const onSubmit = async (data) => {
    setSuccess("");
    setError("");
    // TODO: Replace with actual API call
    setTimeout(() => {
      setSuccess("Profile updated successfully!");
      reset();
    }, 1200);
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form className="update-profile-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Full Name</label>
        <input
          type="text"
          {...register("fullname", { required: "Full name is required" })}
          placeholder="Enter your full name"
        />
        {errors.fullname && (
          <span className="error-msg">{errors.fullname.message}</span>
        )}
        <label>Username</label>
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className="error-msg">{errors.username.message}</span>
        )}
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="error-msg">{errors.email.message}</span>
        )}
        <label>Contact</label>
        <input
          type="text"
          {...register("contact", { required: "Contact is required" })}
          placeholder="Enter your contact number"
        />
        {errors.contact && (
          <span className="error-msg">{errors.contact.message}</span>
        )}
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          placeholder="Enter new password (optional)"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}
      </form>
    </div>
  );
};

export default UpdateProfile;
