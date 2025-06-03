import React from "react";
import { Form, Link } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  return (
    <div className="login-form">
      <h1>News Fest</h1>
      <h3 className="subtitle">Reporter Portal</h3>
      <div className="form-container">
        <p>Sign Into Your Account</p>
        <Form>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <div class="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link href="#">Forgot password?</Link>
          </div>
          <button type="button">Sign In</button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
