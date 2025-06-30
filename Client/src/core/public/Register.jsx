import React from "react";
import "../../Styles/Register.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const onSubmit = (data) => {
    // handle registration logic here
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1>Create Account</h1>
        <p>Sign up to join News Fest</p>
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            {...register("fullname", { required: "Full Name is required" })}
            placeholder="Enter your full name"
          />
          {errors.fullname && <p>{errors.fullname.message}</p>}

          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Choose a username"
          />
          {errors.username && <p>{errors.username.message}</p>}

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
          />
          {errors.email && <p>{errors.email.message}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Create a password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p>{errors.phone.message}</p>}

          <button type="submit">Register</button>
          <p style={{ textAlign: "center", marginTop: 8 }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <div className="register-image-container">
        <img src={image} alt="Register visual" />
        <div className="info">
          <h1>Join the News Revolution</h1>
          <p>
            Create your account to access exclusive content, personalized news
            feeds, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
