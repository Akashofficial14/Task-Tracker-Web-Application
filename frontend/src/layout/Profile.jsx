import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  getProfileData,
  updateProfileData,
  updatePassword,
} from "../apis/ProfileData"; // Ensure these are imported
import { toast } from "react-toastify";
import Display from "../components/home/Display";
import EditProfile from "../components/home/EditProfile";
import UpdatePass from "../components/home/UpdatePass";

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [view, setView] = useState("display");
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 1. Fetch Profile Data
  const { data, isPending, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileData,
    staleTime: 0,
  });

  // 2. Profile Update Mutation
  const profileMutation = useMutation({
    mutationFn: (formData) => updateProfileData(formData),
    onSuccess: () => {
      toast.success(data?.message || "Profile updated!");
      queryClient.invalidateQueries(["profile"]);
      setView("display");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });

  // 3. Password Update Mutation
  const passwordMutation = useMutation({
    mutationFn: (formData) => updatePassword(formData),
    onSuccess: (data) => {
      toast.success(data?.message || "Password updated!");
      resetPass();
      queryClient.invalidateQueries(["profile"]);
      setView("display");
    },
    onError: (error) => {
      const errorMsg =
        error?.response?.data?.message || "Error changing password";
      toast.error(errorMsg);
    },
  });

  // Form Handling
  const { register: registerEdit, handleSubmit: handleSubmitEdit } = useForm({
    values: {
      name: data?.name,
      city: data?.city,
      mobileNumber: data?.mobileNumber,
      email: data?.email,
    },
  });

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPass,
  } = useForm();

  // Handlers
  const handleEditProfile = (formData) => {
    profileMutation.mutate(formData);
  };

  const handleChangePassword = (formData) => {
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    passwordMutation.mutate(formData);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (isPending)
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center ">
        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );

  return (
    /* Added Gradient Background here */
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1c92ff] via-[#929FBF] to-white p-4 font-sans">
      
      {/* Container Card with slight glass effect */}
      <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-[3rem] w-full max-w-lg shadow-[0_30px_80px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500">
        
        {/* PROFILE DISPLAY VIEW */}
        <Display view={view} data={data} setView={setView} handleLogout={handleLogout} />
        
        <EditProfile
          view={view}
          setView={setView}
          handleSubmitEdit={handleSubmitEdit}
          handleEditProfile={handleEditProfile}
          registerEdit={registerEdit}
          profileMutation={profileMutation}
        />
        
        <UpdatePass
          view={view}
          setView={setView}
          handleSubmitPass={handleSubmitPass}
          handleChangePassword={handleChangePassword}
          registerPass={registerPass}
          showPass={showPass}
          toggleVisibility={toggleVisibility}
          passwordMutation={passwordMutation}
        />
      </div>
    </div>
  );
};

export default Profile;
