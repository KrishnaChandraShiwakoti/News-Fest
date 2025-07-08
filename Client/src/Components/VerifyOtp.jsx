import React, { useEffect } from "react";
import "../Styles/VerifyOtp.css";
import { useForm } from "react-hook-form";
import { auth } from "../Utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePasswordReset } from "./PasswordResetContext";

const VerifyOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { email, setOtpVerified } = usePasswordReset();

  useEffect(() => {
    if (!email) {
      navigate("/forgetPassword");
    }
  }, [email, navigate]);

  const submitHandler = async (data) => {
    try {
      const res = await auth.post("/verify-otp", { email, otp: data.otp });
      if (res.status == 200) {
        toast.success(res.data.message);
        setOtpVerified(true);
        navigate("/forgetPassword/reset-password");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="verify-otp-container">
      <h2 className="verify-otp-title">Verify OTP</h2>
      <form className="verify-otp-form" onSubmit={handleSubmit(submitHandler)}>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter your OTP"
          {...register("otp", { required: "OTP is required" })}
          className="verify-otp-input"
        />
        {errors.otp && <p className="verify-otp-error">{errors.otp.message}</p>}
        <button
          type="submit"
          className="verify-otp-btn"
          disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
