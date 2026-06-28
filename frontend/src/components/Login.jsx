import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";

const Login = ({ setToggle }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", data);
      if (response) {
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.existedUser),
        );
        toast.success("Login Successful!");
        reset();
        navigate("/task");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    // Removed the min-h-screen div and the extra white card div
    <div className="animate-in fade-in duration-500 w-full rounded-2xl bg-white border border-gray-100 p-8 max-w-md shadow-lg">
      <div className="max-w-sm mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center tracking-tight">
          Log in
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm">
          Login to access your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 text-xs font-bold ml-1 uppercase">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-xs font-bold ml-1 uppercase">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1c92ff] hover:bg-[#007ceb] text-white font-bold py-4 rounded-2xl mt-2 shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <span
                onClick={() => setToggle((prev) => !prev)}
                className="text-blue-500 font-bold cursor-pointer hover:underline underline-offset-4"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
