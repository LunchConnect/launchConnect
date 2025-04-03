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
    role: string;
    email: string;
    bio: string;
    skills: string[];
    portfolio: string;
    links: string;
  };

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      firstName: "Ikenna Okafor",
      email: "kenawilson99@gmail.com",
      role: "Co Founder",
      skills: [],
      portfolio: "",
      links: "",
    },
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
 const [bio, setBio] = useState("");
    const maxWords = 200;

      const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
          if (words.length <= maxWords) {
            setBio(e.target.value);
          }
        };
    
  
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
          <form className="space-y-6 rounded-lg border-2 p-4 mt-6">
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
              placeholder='Ikenna'
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled
                  />
                </div>

  
                {/* Email */}
                <div className="grid lg:grid-cols-3 items-center gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label className="text-gray-700 font-medium">Email</label>
                  <input
            placeholder='kenawilson99@gmail.com'
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled
                  />
                </div>

                  {/* Role */}
                  <div className="grid lg:grid-cols-3 items-center gap-4">
                  <label className="text-gray-700 font-medium">Role In Startup</label>
                  <input
                     placeholder='Co Founder'
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled
                  />
                </div>

              </div>
            </div>

            {/* Resume & Skills */}
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
                placeholder="TechForge"
                className="border p-2 rounded-md w-full col-span-2 mt-2 min-w-[100px]"
                onKeyDown={handleSkillAdd}
              />
               </div>
                <div className="grid lg:grid-cols-3 gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label htmlFor="resumeUpload" className="text-gray-700 font-medium">
                  Company logo
                  </label>

                  <div className="col-span-2">
                    <label
                      htmlFor="resumeUpload"
                      className="flex flex-col items-center justify-center gap-5 h-[200px] p-4 border border-dashed rounded cursor-pointer bg-[#E6FFEB]"
                    >
                      <UploadCloud className="w-6 h-6 text-gray-500" />
                      <span className="text-sm text-center text-gray-500">
                      Browse and chose the files you want to upload from your computer <br/>(JPG, PNG, Max 5MB)
                      </span>
                      <input type="file" id="resumeUpload" className="hidden" onChange={handleFileUpload} />
                      <TiPlus size={40} className="text-white bg-green-500 p-2 rounded-lg" />
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

              <div className="grid lg:grid-cols-3 lg:gap-4 items-center border-b-2 pb-3 border-[#ECF1ED mb-5"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">Industry</h3>
              <input
                type="text"
                placeholder="AI-Powered SaaS"
                className="border p-2 rounded-md w-full col-span-2 mt-2 min-w-[100px]"
              />
              </div>
             
              <div className="grid lg:grid-cols-3 lg:gap-4 items-center border-b-2 pb-3 border-[#ECF1ED mb-5"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">About your company</h3>
                 <textarea
                     
                          placeholder='TechForge Solutions is an AI-driven platform that helps businesses automate customer interactions and optimize workflows. Our mission is to make AI accessible to all businesses, regardless of size.'
                      
                    className="border p-2 rounded-md w-full col-span-2 mt-2 min-w-[100px]"
                    disabled
                  />
              </div>



              <div className="grid lg:grid-cols-3 lg:gap-4 items-center mb-5"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">Company Website </h3>
                 <div className="flex-1 flex items-center border rounded-md overflow-hidden col-span-2 mt-2 min-w-[100px]">
      <span className="px-3 border-r-2 bg-white text-gray-600">https://</span>
      <input 
  
      
        className="flex-1 p-2 focus:outline-none bg-white " 
      />
    </div>
              
              </div>
             
            </div>





          
          
          </form>
            {/* Submit Button */}
            <div className="flex justify-end mb-6 mt-6">
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Update</button>
            </div>
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
      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        Update
      </button>
    </div>
  </>
)}









    
    </div>
    </div>
  );
};

export default ProfileManagement;



















