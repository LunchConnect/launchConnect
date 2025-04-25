"use client";

import React,{ useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Trash2 } from "lucide-react";
import { TiPlus } from "react-icons/ti";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { updateStartupFounderProfile,updatePassword } from "@/actions/action";
import AlertModal from "@/components/AlertModal";

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  const [fullName, setFullName] = React.useState("");
const [companyName, setCompanyName] = React.useState("");
const [industry, setIndustry] = React.useState("");
const [website, setWebsite] = React.useState("");
const [roleInCompany, setroleInCompany] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
 const [Email, setEmail] = useState("");
const [companyLogo, setcompanyLogo] = useState<File | null>(null);
const [companyLogoUrl, setcompanyLogoUrl] =React.useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  // Modal State
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"success" | "error">("success");
 const [modalMessage, setModalMessage] = React.useState("");



  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setcompanyLogo(file);
    }
  };



  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false, // only allow one file
  });
  


   // Get user name from localStorage on mount
   useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    const storedUser = localStorage.getItem("user");
    if (storedProfile || storedUser) {
      const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null;
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setFullName(parsedProfile.fullName || "User");
      setroleInCompany(parsedProfile.roleInCompany)
      setIndustry(parsedProfile.industry)
      setCompanyName(parsedProfile.companyName)
      setWebsite(parsedProfile.website)
      setEmail(parsedUser.email)
      setcompanyLogoUrl(parsedProfile.companyLogo)

    }
  }, []);





  const [showPassword, setShowPassword] = useState<{
    old: boolean;
    new: boolean;
    confirm: boolean;
  }>({
    old: false,
    new: false,
    confirm: false,
  });

  // Explicitly define the type for 'field'
  const toggleVisibility = (field: "old" | "new" | "confirm") => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Start loading
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      setModalType("error");
      setModalMessage("Authentication token not found. Please log in again.");
     
      setIsLoading(false);
      return;
    }
  
    const result = await updateStartupFounderProfile(
      fullName,
      companyName,
      industry,
      website,
      roleInCompany,
      companyLogo,
      token
    );
  
    if (result.success) {
      
      setModalType("success");
      setModalMessage("You have successfully created a startup.");
      setModalOpen(true);
      console.log("Profile created successfully:", result);


        // ✅ Persist profile to localStorage
  const newProfile = {
    fullName:result.data.company.fullName,
    companyName,
    industry,
    roleInCompany,
    website,
    companyLogo: result.data.company.companyLogo // use the new logo URL
  };
  localStorage.setItem("profile", JSON.stringify(newProfile));



 // ✅ Refresh the page
 window.location.reload();

    } else {
      setModalType("error");
      setModalMessage(result.message || "Error creating profile.");
      setModalOpen(true);
      console.error("Error creating profile:", result);
    }
  
    setIsLoading(false); // ✅ Stop loading
  };









const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setModalType("error");
      setModalMessage("Please fill in all fields.");
      setModalOpen(true);
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setModalType("error");
      setModalMessage("New passwords do not match.");
      setModalOpen(true);
    
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setModalType("error");
      setModalMessage("Authentication token not found. Please log in again.");
      setModalOpen(true);
      setIsLoading(false);
      return;
    }
  
    setIsLoading(true);
    const { success, message } = await updatePassword(oldPassword, newPassword,   token);
    setIsLoading(false);
  
    if (success) {
      setModalType("success");
      setModalMessage(message);
      setModalOpen(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setModalType("error");
      setModalMessage(message);
      setModalOpen(true);
    }
  };




  return (
    <div className="p-6 bg-white border-2  rounded-xl mt-20 mb-6">
      <div className="p-2 rounded-xl ">
      <h1 className="text-xl mb-4 font-extrabold">Profile Management</h1>

      {/* Tabs */}
      <div className="border-b pb-3 flex space-x-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`font-semibold ${
            activeTab === "profile"
              ? "text-green-600 border-b-2 border-green-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Your Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-2 ${
            activeTab === "security"
              ? "text-green-600 border-b-2 border-green-500 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Password & Security
        </button>
      </div>

      {/* Tab Content */}
     
        {activeTab === "profile" && (
          <div className="">
          <form className="space-y-6 rounded-lg border-2 p-4 mt-6" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div>
            <h2 className="text-[16px] font-semibold text-gray-800">Personal Information</h2>
              <p className="text-[14px] mt-2 text-gray-500">
              Keep your details up to date to stay visible to the right opportunities.
              </p>

            </div>
         
            <div className="bg-[#F7FFF9] p-6 rounded-2xl border border-green-200">
             
              <div className="mt-2 space-y-4">
                {/* First Name */}
                <div className="grid lg:grid-cols-3 items-center gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label className="text-gray-700 font-medium">First Name</label>
                  <input
                    placeholder={fullName}
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

  
                {/* Email */}
                <div className="grid lg:grid-cols-3 items-center gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label className="text-gray-700 font-medium">Email</label>
                  <input
             placeholder={Email}
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled
                  />
                </div>

                  {/* Role */}
                  <div className="grid lg:grid-cols-3 items-center gap-4">
                  <label className="text-gray-700 font-medium">Role In Startup</label>
                  <input
                        placeholder={roleInCompany}
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onChange={(e) => setroleInCompany(e.target.value)}
                  />
                </div>

              </div>
            </div>

            {/* LOGO */}
            <div>
            <h2 className="text-lg font-semibold text-gray-800">Company Information</h2>
            <p className="text-[14px] text-gray-500">
            Manage key details about your startup.
              </p>
            </div>
         
            <div className="bg-[#F7FFF9] p-6 rounded-2xl border border-[#E1ECE3]">
              
              {/* LOgo Upload */}
           
              <div className="grid lg:grid-cols-3 lg:gap-4 items-center border-b-2 pb-3 border-[#ECF1ED mb-6"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">Company Name</h3>
              <input
                type="text"
                placeholder={companyName}
                className="border p-2 rounded-md w-full col-span-2 mt-2 min-w-[100px]"

                onChange={(e) => setCompanyName(e.target.value)}
              />
               </div>
               
                <div className="grid lg:grid-cols-3 gap-4 border-b-2 pb-3 border-[#ECF1ED]">

                  <div className="flex flex-col justify-between">
                  <label htmlFor="resumeUpload" className="text-[16px] font-semibold text-[#3B4D3F]">
                  Company logo
                  </label>

                    {/* Preview Image */}
    {companyLogoUrl && (
      <img
        src={companyLogoUrl}
        alt="Company Logo Preview"
        className="size-[100px] lg:size-[150px] object-contain border rounded-lg"
      />
    )}
                  </div>
                  <div  {...getRootProps()} className="col-span-2">
                    <label
                      htmlFor="resumeUpload"
                      className="flex flex-col items-center justify-center gap-5 h-[200px] p-4 border border-dashed rounded cursor-pointer bg-[#E6FFEB]"
                    >
                      <UploadCloud className="w-6 h-6 text-gray-500" />
                      






                      {companyLogo ? (
                <p className="text-green-600 text-lg">
                {companyLogo.name} ({(companyLogo.size / 1024 / 1024).toFixed(2)} MB)
              </p>
              ) : (
                <span className="text-sm text-center text-gray-500">
                Browse and chose the files you want to upload from your computer <br/>(JPG, PNG, Max 5MB)
                </span>
              )}









                      <input  {...getInputProps()}/>

                      <TiPlus size={40} className="text-white bg-green-500 p-2 rounded-lg" />
                    </label>

                  
                  </div>
                </div>
          

               {/* Industry */}

              <div className="grid lg:grid-cols-3 lg:gap-4 items-center border-b-2 pb-3 border-[#ECF1ED mb-5"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">Industry</h3>
              <input
                type="text"
                placeholder={industry}
                className="border p-2 rounded-md w-full col-span-2 mt-2 min-w-[100px]"
              onChange={(e) => setIndustry(e.target.value)}
              />
              </div>
             
              {/* <div className="grid lg:grid-cols-3 lg:gap-4 items-center border-b-2 pb-3 border-[#ECF1ED mb-5"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">About your company</h3>
                 <textarea
                     
                          placeholder='About Your Company'
                      
                    className="border p-2 rounded-md w-full col-span-2 mt-2 min-w-[100px]"
                    value={aboutCompany}
                    onChange={(e) => setaboutCompany(e.target.value)}
                  />
              </div> */}



              <div className="grid lg:grid-cols-3 lg:gap-4 items-center mb-5"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">Company Website </h3>
                 <div className="flex-1 flex items-center border rounded-md overflow-hidden col-span-2 mt-2 min-w-[100px]">
      <span className="px-3 border-r-2 bg-white text-gray-600">https://</span>
      <input 

  placeholder={website}
  onChange={(e) => setWebsite(e.target.value)}
        className="flex-1 p-2 focus:outline-none bg-white " 
      />
    </div>
              
              </div>
             
            </div>





             {/* Submit Button */}
             <div className="flex justify-end mb-6 mt-6">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"   disabled={isLoading}
            aria-busy={isLoading} >
                 {isLoading ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      Updating...
    </span>
  ) : (
    "Update"
  )}</button>
            </div>

          
          </form>
         


             {/* ✅ Success & Error Modal */}
                          <AlertModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onAction={() => {
                      setModalOpen(false);
                      
                    }}
                    type={modalType}
                    title={modalType === "success" ? "Account Updated Successful" : "Submission Failed"}
                    description={modalMessage}
                    buttonText={modalType === "success" ? "OK" : "Retry"}
                  />
          </div>

     
        )}




{activeTab === "security" && (
  <>
  <div className="space-y-6 rounded-lg border-2 p-4 mt-6">
    {/* Section Header */}
    <div className="rounded-lg p-4 shadow-sm">
    <div className="lg:flex justify-between items-center px-4 py-2 rounded-md border pb-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Password Management</h2>
        <p className="text-sm text-gray-500">
          Update your password regularly to keep your account secure. 
          Create a strong password with a mix of letters, <br/>numbers, and special characters.
        </p>
      </div>
      <button className="bg-green-100 text-green-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-200">
        Change Password
      </button>
    </div>

    {/* Password Form */}
    <div className="mt-4 p-6 bg-green-50 rounded-lg border border-green-200">
      <div className="space-y-4">
        {/* Old Password */}
        <div className="grid lg:grid-cols-3 items-center gap-4 border-b-2 pb-2">
          <label className="text-gray-700 font-medium">Old Password</label>
          <div className="col-span-2 relative">
            <Input
              type={showPassword.old ? "text" : "password"}
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="!bg-white !text-black !border-[#BED3C2] !rounded-md !p-2 pr-10 focus:!border-green-500 focus:!ring-2 focus:!ring-green-500"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("old")}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="grid lg:grid-cols-3 items-center gap-4 border-b-2 pb-2">
          <label className="text-gray-700 font-medium">New Password</label>
          <div className="col-span-2 relative">
            <Input
              type={showPassword.new ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="!bg-white !text-black !border-[#BED3C2] !rounded-md !p-2 pr-10 focus:!border-green-500 focus:!ring-2 focus:!ring-green-500"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="grid lg:grid-cols-3 items-center gap-4">
          <label className="text-gray-700 font-sm">Confirm Password</label>
          <div className="col-span-2 relative">
            <Input
              type={showPassword.confirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="!bg-white !text-black !border-[#BED3C2] !rounded-md !p-2 pr-10 focus:!border-green-500 focus:!ring-2 focus:!ring-green-500"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  
    </div>
    
  
  </div>
    {/* Update Button */}
    <div className="flex justify-end mt-6">
    <button
  onClick={handlePasswordUpdate}
  disabled={isLoading}
  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
>
  {isLoading ? "Updating..." : "Update"}
</button>
    </div>

    {/* ✅ Success & Error Modal */}
<AlertModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAction={() => {
          setModalOpen(false);
        }}
        type={modalType}
        title={modalType === "success" ? "Password Updated Successful" : "Password Update  Failed"}
        description={modalMessage}
        buttonText={modalType === "success" ? "OK" : "Retry"}
      />
  </>
)}









    
    </div>
    </div>
  );
};

export default ProfileManagement;



















