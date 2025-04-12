"use client";

import React,{ useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Trash2 } from "lucide-react";
import { TiPlus } from "react-icons/ti";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select, { MultiValue } from "react-select";
import { useDropzone } from "react-dropzone";
import { El_Messiri } from "next/font/google";
import AlertModal from "@/components/AlertModal";
import { createJobSeekerProfileManagement } from "@/actions/action";
const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
 const [fullName, setFullName] = useState<string>("");
 const [Email, setEmail] = useState("");
const [Shortbio,setShortbio] = useState<string>("")
 const [resume, setResume] = useState<File | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"success" | "error">("success");
 const [modalMessage, setModalMessage] = React.useState("");
 const [isLoading, setIsLoading] = React.useState(false);
   // Handle file drop
   const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setResume(file);
    }
  };


   // Get user name from localStorage on mount
   useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    const storedUser = localStorage.getItem("user");
    if (storedProfile || storedUser) {
      const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null;
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setFullName(parsedProfile.fullName || "User");
      setShortbio(parsedProfile.shortBio)
      setEmail(parsedUser.email)
    }
  }, []);






 const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false, // optional: only allow 1 file
  });






  // type FormData = {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   bio: string;
  //   skills: string[];
  //   interests:string[];
  //   portfolio: string;
  //   links: string;
  // };

  // const { register, handleSubmit, setValue, watch } = useForm<FormData>({
  //   defaultValues: {
  //     firstName: fullName,
  //     email: Email,
  //     bio: Shortbio,
  //     skills: [],
  //     interests:[],
  //     portfolio: "",
  //     links: "",
  //   },
  // });

  // const [uploadProgress, setUploadProgress] = useState(0);
  // const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
 const [bio, setBio] = useState("");
   const [inputValue, setInputValue] = useState("");
   const [skillInputValue, setSkillInputValue] = useState("");
 
   const maxSkills = 5;
   const maxInterests = 3;
    const maxWords = 200;

      const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
          if (words.length <= maxWords) {
            setBio(e.target.value);
          }
        };
    
  
  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //     setUploadProgress(40);
  //     setTimeout(() => setUploadProgress(100), 1500);
  //   }
  // };



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

   const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if (e.key === "Enter" && skillInputValue.trim() && skills.length < maxSkills) {
       e.preventDefault();
       setSkills([...skills, skillInputValue.trim()]);
       setSkillInputValue("");
     }
   };
 
   const handleRemoveSkill = (skillToRemove: string) => {
     setSkills(skills.filter((skill) => skill !== skillToRemove));
   };
 








   const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if (e.key === "Enter" && inputValue.trim() && interests.length < maxInterests) {
       e.preventDefault();
       setInterests([...interests, inputValue.trim()]);
       setInputValue("");
     }
   };
 
   const handleRemoveInterest = (interestToRemove: string) => {
     setInterests(interests.filter((interest) => interest !== interestToRemove));
   };
 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Start loading
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token not found. Please log in again.");
      setIsLoading(false);
      return;
    }



  // Validate fields
  if (!fullName || !bio || skills.length === 0 || interests.length === 0 || !resume)   {
    console.error("All fields must be filled out. Please check your input.");
    // Optionally, show a message to the user about the missing fields
    alert("Please fill out all required fields (Full Name, Bio, Skills, Interests, and Resume).");
    setIsLoading(false);
    return; // Prevent form submission if any field is empty
  }


    const { success, message, data } = await createJobSeekerProfileManagement(
      fullName,
      bio,
      skills,
      interests,
      resume,  
      token
    );

    if (success) {
      setModalType("success");
      setModalMessage("You have successfully created a startup.");
      setModalOpen(true);
      console.log("Profile created successfully:", data);
      setFullName("");
      setBio("");
      setResume(null);
      setSkills([]);
      setInterests([]);
      // setTimeout(() => router.push("/sign_in"), 2000);
      // // Redirect or show success message
    } else {
      setModalType("error");
      setModalMessage(message || "Error creating profile.");
      setModalOpen(true);
      console.error("Error creating profile:", message);
      // Show error message
    }
    setIsLoading(false); // ✅ Stop loading
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
                Keep your profile up to date. This helps you stay visible to the right opportunities.
              </p>

            </div>
         
            <div className="bg-[#F7FFF9] p-6 rounded-2xl border border-green-200">
             
              <div className="mt-2 space-y-4">
                {/* First Name */}
                <div className="grid lg:grid-cols-3 items-center gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label className="text-gray-700 font-medium">Full Name</label>
                  <input
              placeholder={fullName}
                    className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            
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

                 {/* Bio */}
                 <div className="grid lg:grid-cols-3 items-center gap-4 pb-3">
                  <label className="text-gray-700 font-medium">Short bio</label>
                  <div className="w-full col-span-2 ">
                  <textarea
                       value={bio}
                          placeholder={Shortbio}
                       onChange={handleBioChange}
                    className="border p-3 text-[20px] rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                 
                  />
                   {/* Word Count - Positioned Outside Bottom Right */}
      <div className="text-right mt-1 text-sm text-[#344054]">
        {bio.split(/\s+/).filter((word) => word.length > 0).length}/{maxWords} Words Max
      </div>
                  </div>
                
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
           
                <div className="grid lg:grid-cols-3 gap-4 border-b-2 pb-3 border-[#ECF1ED]">
                  <label htmlFor="resumeUpload" className="text-gray-700 font-medium">
                    Upload Resume
                  </label>

                  <div className="col-span-2" {...getRootProps()}>
                    <label
                      htmlFor="resumeUpload"
                      className="flex flex-col items-center justify-center gap-5 h-[200px] p-4 border border-dashed rounded cursor-pointer bg-[#E6FFEB]"
                    >
                      <UploadCloud className="w-6 h-6 text-gray-500" />



                      {resume ? (
                <p className="text-green-600 text-lg">
                {resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB)
              </p>
              ) : (
                <span className="text-sm text-center text-gray-500">
                        Browse and choose the file you want to upload <br/> (PDF, Max 5MB)
                      </span>
              )}




                     



                      <input type="file" id="resumeUpload" className="hidden" {...getInputProps()}/>
                      <TiPlus size={40} className="text-white bg-green-500 p-2 rounded-lg" />
                    </label>

                  
                  </div>
                </div>
          

              {/* Skills Input */}

              <div className="grid lg:grid-cols-3 lg:gap-4 items-center"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">Skills</h3>
              <input
                type="text"
                value={skillInputValue}
              onChange={(e) => setSkillInputValue(e.target.value)}
              onKeyDown={handleAddSkill}
                placeholder="Add up to 5 skills"
                className="border p-2 rounded-md w-full col-span-2 mt-2 min-w-[100px]"
                disabled={skills.length >= maxSkills}
              />
              
              
              
              </div>
             
              <div className="flex flex-wrap gap-2 mt-2 ">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-red-500">×</button>
                  </span>
                ))}
              </div>


               {/* interests Input */}

               <div className="grid lg:grid-cols-3 lg:gap-4 items-center"> 
                 <h3 className="text-[16px] font-semibold text-[#3B4D3F]">Interests</h3>
              <input
                type="text"
                placeholder="Add up to 5 interests"
                className="border p-2 rounded-md w-full col-span-2 mt-2 min-w-[100px]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddInterest}
                disabled={interests.length >= maxInterests}
              /></div>
             
              <div className="flex flex-wrap gap-2 mt-2 ">
                {interests.map((interest, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center">
                    {interest}
                    <button onClick={() => handleRemoveInterest(interest)} className="ml-2 text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>


 {/* Online Profiles */}
 <div>
 <h2 className="text-lg font-semibold text-gray-800">Online Profiles</h2>
  <p className="text-sm text-gray-500">Boost your credibility by linking your professional profiles.</p>

 </div>

<div className="bg-[#F7FFF9] p-6 rounded-2xl border border-green-200">

  {/* Portfolio Input */}
  <div className="lg:flex items-center mt-4">
    <label className="w-1/4 text-sm font-medium text-gray-700">Portfolio Website (If applicable)</label>
    <div className="flex-1 flex items-center border border-green-300 rounded-md overflow-hidden">
      <span className="px-3 border-r-2 bg-white text-gray-600">https://</span>
      <input 
      
        placeholder="yourwebsite.com"
        className="flex-1 p-2 focus:outline-none bg-white" 
      />
    </div>
  </div>

  {/* Other Links */}
  <div className="lg:flex items-center mt-4">
    <label className="w-1/4 text-sm font-medium text-gray-700">Other Relevant Links</label>
    <div className="flex-1 flex items-center border border-green-300 rounded-md overflow-hidden">
      <span className="px-3 border-r-2 bg-white text-gray-600">https://</span>
      <input 
      
        placeholder="GitHub, Behance, etc."
        className="flex-1 p-2 focus:outline-none bg-white" 
      />
    </div>
  </div>

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

          
              {/* Submit Button */}
              <div className="flex justify-end mb-6 mt-6">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition" disabled={isLoading}
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
  )}
              
              </button>
            </div>

          </form>
            {/* Submit Button */}
            {/* <div className="flex justify-end mb-6 mt-6">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Update</button>
            </div> */}
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



















