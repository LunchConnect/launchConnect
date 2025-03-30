"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Trash2 } from "lucide-react";
import { TiPlus } from "react-icons/ti";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    skills: string[];
    portfolio: string;
    links: string;
  };

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      firstName: "Ikenna",
      lastName: "Okafor",
      email: "kenawilson99@gmail.com",
      bio: "e.g., “Passionate UI/UX Designer looking for an internship at a startup.”",
      skills: [],
      portfolio: "",
      links: "",
    },
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadProgress(40);
      setTimeout(() => setUploadProgress(100), 1500);
    }
  };



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

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skills.length < 5) {
      e.preventDefault();
      const newSkill = e.currentTarget.value.trim();
      if (newSkill && !skills.includes(newSkill)) {
        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        setValue("skills", updatedSkills);
        e.currentTarget.value = "";
      }
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills);
  };

  return (
    <div className="p-6 bg-white rounded-xl min-h-screen mt-20">
      <h1 className="text-xl mb-4 font-extrabold">Profile Management</h1>

      {/* Tabs */}
      <div className="border-b pb-3 flex space-x-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-2 font-semibold ${
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
      <div className="mt-6">
        {activeTab === "profile" && (
          <form className="space-y-6">
            {/* Personal Info */}
            <div>
            <h2 className="text-[16px] font-semibold text-gray-800">Personal Information</h2>
              <p className="text-[14px] mt-2 text-gray-500">
                Keep your profile up to date. This helps you stay visible to the right opportunities.
              </p>

            </div>
         
            <div className="bg-[#F7FFF9] p-6 rounded-2xl border border-green-200">
             
              <div className="mt-2 space-y-4">
                {/* First Name */}
                <div className="grid grid-cols-3 items-center gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label className="text-gray-700 font-medium">First Name</label>
                  <input
                    {...register("firstName")}
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled
                  />
                </div>

                {/* Last Name */}
                <div className="grid grid-cols-3 items-center gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label className="text-gray-700 font-medium">Last Name</label>
                  <input
                    {...register("lastName")}
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled
                  />
                </div>

                {/* Email */}
                <div className="grid grid-cols-3 items-center gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label className="text-gray-700 font-medium">Email</label>
                  <input
                    {...register("email")}
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled
                  />
                </div>

                 {/* Bio */}
                 <div className="grid grid-cols-3 items-center gap-4 pb-3">
                  <label className="text-gray-700 font-medium">Short bio</label>
                  <textarea
                    {...register("bio")}
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Resume & Skills */}
            <div>
            <h2 className="text-lg font-semibold text-gray-800">Resume & Skills</h2>
            <p className="text-[14px] text-gray-500">
            Showcase your experience and expertise.
              </p>
            </div>
         
            <div className="bg-[#F7FFF9] p-6 rounded-2xl border border-[#E1ECE3]">
              
              {/* Resume Upload */}
           
                <div className="grid grid-cols-2 gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label htmlFor="resumeUpload" className="text-gray-700 font-medium">
                    Upload Resume
                  </label>

                  <div>
                    <label
                      htmlFor="resumeUpload"
                      className="flex flex-col items-center justify-center gap-5 h-[200px] p-4 border border-dashed rounded cursor-pointer bg-[#E6FFEB]"
                    >
                      <UploadCloud className="w-6 h-6 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        Browse and choose the file you want to upload (PDF, DOCX, Max 5MB)
                      </span>
                      <input type="file" id="resumeUpload" className="hidden" onChange={handleFileUpload} />
                      <TiPlus size={40} className="text-white bg-green-500 p-2 rounded-full" />
                    </label>

                    {/* Upload Progress Bar */}
                    {file && (
                      <div className="mt-3 p-2 border h-11 rounded bg-gray-100 flex justify-between items-center">
                        <span className="text-sm">{file.name} - {uploadProgress}%</span>
                        <div className="w-24 bg-gray-200 h-1 rounded">
                          <div className="bg-green-500 h-1 rounded" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
          

              {/* Skills Input */}

              <div className="flex justify-between gap-6 items-center">  <h3 className="text-[16px] font-semibold text-[#3B4D3F]">Skills</h3>
              <input
                type="text"
                placeholder="Add up to 5 skills"
                className="border p-2 rounded-md w-[49%] mt-2 min-w-[300px]"
                onKeyDown={handleSkillAdd}
              /></div>
             
              <div className="flex flex-wrap gap-2 mt-2 ">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>


 {/* Online Profiles */}
<div className="bg-green-50 p-6 rounded-2xl border border-green-200">
  <h2 className="text-lg font-semibold text-gray-800">Online Profiles</h2>
  <p className="text-sm text-gray-500">Boost your credibility by linking your professional profiles.</p>

  {/* Portfolio Input */}
  <div className="flex items-center mt-4">
    <label className="w-1/4 text-sm font-medium text-gray-700">Portfolio Website</label>
    <div className="flex-1 flex items-center border border-green-300 rounded-md overflow-hidden">
      <span className="px-3 bg-green-100 text-gray-600">https://</span>
      <input 
        {...register("portfolio")} 
        placeholder="yourwebsite.com"
        className="flex-1 p-2 focus:outline-none bg-white" 
      />
    </div>
  </div>

  {/* Other Links */}
  <div className="flex items-center mt-4">
    <label className="w-1/4 text-sm font-medium text-gray-700">Other Relevant Links</label>
    <div className="flex-1 flex items-center border border-green-300 rounded-md overflow-hidden">
      <span className="px-3 bg-green-100 text-gray-600">https://</span>
      <input 
        {...register("links")} 
        placeholder="GitHub, Behance, etc."
        className="flex-1 p-2 focus:outline-none bg-white" 
      />
    </div>
  </div>
</div>

            {/* Submit Button */}
            <div className="flex justify-end mb-6 mt-6">
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Update</button>
            </div>
          </form>
        )}




{activeTab === "security" && (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    {/* Section Header */}
    <div className="flex justify-between items-center px-4 py-2 rounded-md border pb-3">
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
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-gray-700 font-medium">Old Password</label>
          <div className="col-span-2 relative">
            <Input
              type={showPassword.old ? "text" : "password"}
              placeholder="Enter old password"
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
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-gray-700 font-medium">New Password</label>
          <div className="col-span-2 relative">
            <Input
              type={showPassword.new ? "text" : "password"}
              placeholder="Enter new password"
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
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-gray-700 font-medium">Confirm Password</label>
          <div className="col-span-2 relative">
            <Input
              type={showPassword.confirm ? "text" : "password"}
              placeholder="Confirm new password"
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
    {/* Update Button */}
    <div className="flex justify-end mt-6">
      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        Update
      </button>
    </div>
  </div>
)}









      </div>
    </div>
  );
};

export default ProfileManagement;



















