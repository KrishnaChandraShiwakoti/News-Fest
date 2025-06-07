import React from "react";
import { Form, Link } from "react-router-dom";
import "../../Styles/Login.css";
import { useState } from "react";
import { auth } from "../../Utils/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await auth.post("/login", { form });
      console.log(res);

      if (res.status == 201) {
        toast.success("Logged in successfully");
        setIsLoading(false);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.data.data.reporter_fullname,
            profilePicture: res.data.data.profile_picture,
            id: res.data.data.reporterId,
          })
        );
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="login-form">
      <div className="form-container">
        <h1>News Fest</h1>
        <h3 className="subtitle">Reporter Portal</h3>
        <p>Sign Into Your Account</p>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" onChange={handleChange} required />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link href="#">Forgot password?</Link>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in" : "SignIn"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
