import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../Styles/UpdateProfile.css";
import { user } from "../../Utils/axios";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [userData, setUserData] = useState(null);
  const { email } = JSON.parse(localStorage.getItem("user"));
  const BEARER_TOKEN = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const res = await user.get(`/${email}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      if (res.status == 200) {
        setUserData(res.data);
        // Set form values so required validation works correctly
        setValue("fullname", res.data.fullname || "");
        setValue("username", res.data.username || "");
        setValue("email", res.data.email || "");
        setValue("contact", res.data.contact || "");
      }
    };
    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await user.put(`/${email}`, data, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
      toast.error(`Error accrued:${error} `);
    }
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
      </form>
    </div>
  );
};

export default UpdateProfile;
