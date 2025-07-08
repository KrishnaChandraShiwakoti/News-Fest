import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../Styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/axios";
import { toast } from "react-toastify";
import { usePasswordReset } from "./PasswordResetContext";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { email, otpVerified, setEmail, setOtpVerified } = usePasswordReset();

  useEffect(() => {
    if (!email || !otpVerified) {
      setEmail("");
      setOtpVerified(false);
      navigate("/forgetPassword");
    }
  }, [email, otpVerified, navigate, setEmail, setOtpVerified]);

  const onSubmit = async (data) => {
    try {
      const res = await auth.post("/reset-password", {
        email,
        password: data.password,
      });
      if (res.status === 200) {
        toast.success("Password reset successfully!");
        setEmail("");
        setOtpVerified(false);
        navigate("/login");
      } else {
        toast.error(res.data.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
