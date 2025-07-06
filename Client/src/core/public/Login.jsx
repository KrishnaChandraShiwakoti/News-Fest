import React, { useState } from "react";
import "../../Styles/login.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/login.jpg";
import { auth } from "../../Utils/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await auth.post("/login", data);
      console.log(res);

      if (res.status == 200) {
        toast.success("logged in successfully");
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.data.fullname,
            email: res.data.email,
            id: res.data.user_id,
          })
        );
        localStorage.setItem("token", res.data.token);

        navigate("/");
      } else {
        toast.error(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }

    // Login logic will be handled here
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1>Welcome Back</h1>
        <p>Sign in to continue to News Fest</p>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Enter your password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="#">Forgot password?</Link>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p style={{ textAlign: "center", marginTop: 8 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
      <div className="info-container">
        <img src={image} alt="Login visual" />
        <div className="info">
          <h1>Stay Informed, Stay Ahead</h1>
          <p>
            Access exclusive content, personalized news feeds, and join a
            community of informed readers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
