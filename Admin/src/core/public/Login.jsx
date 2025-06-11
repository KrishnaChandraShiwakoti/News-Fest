import { Link } from "react-router-dom";
import "../../Styles/Login.css";
import { useState } from "react";
import { auth } from "../../Utils/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const res = await auth.post("/login", { form: data });
      console.log(res);

      if (res.status == 201) {
        toast.success("Logged in successfully");
        setIsLoading(false);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.data.data.reporter.reporter_fullname,
            profilePicture: res.data.data.reporter.profile_picture,
            id: res.data.data.reporter.reporterId,
          })
        );
        localStorage.setItem("token", res.data.data.token);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              // validate: {
              //   hasUpper: (val) =>
              //     /[A-Z]/.test(val) || "Must include an uppercase letter",
              //   hasLower: (val) =>
              //     /[a-z]/.test(val) || "Must include a lowercase letter",
              //   hasNumber: (val) =>
              //     /[0-9]/.test(val) || "Must include a number",
              // },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link href="#">Forgot password?</Link>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in" : "SignIn"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
