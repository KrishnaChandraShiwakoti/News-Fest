import React from "react";
import { useForm } from "react-hook-form";
import "../Styles/EmailChecker.css";
import { auth } from "../Utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePasswordReset } from "./PasswordResetContext";

const EmailChecker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { setEmail, setOtpVerified } = usePasswordReset();
  const submitHandler = async (data) => {
    try {
      const res = await auth.post("/send-otp", data);
      if (res.status == 200) {
        toast.success(res.data.message);
        setEmail(data.email);
        setOtpVerified(false);
        navigate("/forgetPassword/verify-otp");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="email-checker-container">
      <h2 className="email-checker-title">Reset Password</h2>
      <form
        className="email-checker-form"
        onSubmit={handleSubmit(submitHandler)}>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          className="email-checker-input"
        />
        {errors.email && (
          <p className="email-checker-error">{errors.email.message}</p>
        )}
        <button
          type="submit"
          className="email-checker-btn"
          disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmailChecker;
