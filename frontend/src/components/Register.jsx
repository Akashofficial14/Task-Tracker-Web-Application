import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";

const Register = ({ setToggle }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", data);
      reset();
      setToggle(false);
      toast.success("Registration Successful!.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    // Removed min-h-screen and background because AuthLayout handles the centering
    <div className="animate-in fade-in duration-500 w-full rounded-2xl bg-white border border-gray-100 p-8 max-w-md shadow-lg">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center tracking-tight">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6 text-xs">
          Join us and start your journey
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1 text-xs font-bold ml-1">
              FULL NAME
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
              })}
              className={`w-full bg-gray-50 border ${
                errors.name ? "border-red-400" : "border-gray-200"
              } text-sm rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Row: Mobile & City (Saves vertical space) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 mb-1 text-xs font-bold ml-1">
                MOBILE
              </label>
              <input
                type="tel"
                {...register("mobileNumber", {
                  required: "Required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                className={`w-full bg-gray-50 border ${
                  errors.mobileNumber ? "border-red-400" : "border-gray-200"
                } text-sm rounded-xl p-3 focus:border-blue-500 outline-none`}
                placeholder="Enter your mobile number"
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-xs font-bold ml-1">
                CITY
              </label>
              <input
                {...register("city", {
                  required: "Required",
                  minLength: {
                    value: 2,
                    message: "Too short",
                  },
                })}
                className={`w-full bg-gray-50 border ${
                  errors.city ? "border-red-400" : "border-gray-200"
                } text-sm rounded-xl p-3 focus:border-blue-500 outline-none`}
                placeholder="Enter your city"
              />
              {errors.city && (
                <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 text-xs font-bold ml-1">
              EMAIL ADDRESS
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full bg-gray-50 border ${
                errors.email ? "border-red-400" : "border-gray-200"
              } text-sm rounded-xl p-3 focus:border-blue-500 outline-none`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 text-xs font-bold ml-1">
              PASSWORD
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full bg-gray-50 border ${
                errors.password ? "border-red-400" : "border-gray-200"
              } text-sm rounded-xl p-3 focus:border-blue-500 outline-none`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1c92ff] hover:bg-[#007ceb] text-white font-bold py-3.5 rounded-xl mt-4 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Sign Up"}
          </button>

          <p
            onClick={() => setToggle((prev) => !prev)}
            className="text-xs text-center text-gray-500 mt-4 cursor-pointer hover:text-blue-500 transition-colors"
          >
            Already have an account?{" "}
            <span className="text-blue-500 font-bold">Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
