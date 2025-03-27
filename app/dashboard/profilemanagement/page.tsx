"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Trash2 } from "lucide-react";
import { TiPlus } from "react-icons/ti";
const ProfileManagement = () => {

    type FormData = {
        firstName: string;
        lastName: string;
        email: string;
        bio: string;
        skills: string[];  // ✅ Explicitly define `skills` as an array of strings
        portfolio: string;
        links: string;
      };

      
      const { register, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
          firstName: "Ikenna",
          lastName: "Okafor",
          email: "kenawilson99@gmail.com",
          bio: "",
          skills: [],  // ✅ Now TypeScript knows `skills` should be a string array
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
      setUploadProgress(40); // Simulate progress
      setTimeout(() => setUploadProgress(100), 1500); // Simulate completion
    }
  };

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skills.length < 5) {
      e.preventDefault();
      const newSkill = e.currentTarget.value.trim();
      if (newSkill && !skills.includes(newSkill)) {
        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        setValue("skills", updatedSkills); // ✅ No more Type error
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
    <div className="p-6 bg-gray-50 min-h-screen mt-20">
        <h1 className="text-xl mb-4 font-extrabold">Profile Management</h1>
      {/* Tabs */}
      <div className="border-b pb-3 flex space-x-6">
        <button className="text-green-600 font-semibold border-b-2 border-green-500 pb-2">
          Your Profile
        </button>
        <button className="text-gray-500 hover:text-gray-700">Password & Security</button>
      </div>

      {/* Form */}
      <form className="mt-6 space-y-6">
      {/* Personal Info */}
{/* Personal Info */}
<div className="bg-green-50 p-6 rounded-lg border border-green-200">
  <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
  <p className="text-sm text-gray-500">
    Keep your profile up to date. This helps you stay visible to the right opportunities.
  </p>

  <div className="mt-4 space-y-4">
    {/* First Name */}
    <div className="grid grid-cols-3 items-center gap-4">
      <label className="text-gray-700 font-medium">First Name</label>
      <input
        {...register("firstName")}
        placeholder="First Name"
        className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>

    {/* Last Name */}
    <div className="grid grid-cols-3 items-center gap-4">
      <label className="text-gray-700 font-medium">Last Name</label>
      <input
        {...register("lastName")}
        placeholder="Last Name"
        className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>

    {/* Email */}
    <div className="grid grid-cols-3 items-center gap-4">
      <label className="text-gray-700 font-medium">Email</label>
      <input
        {...register("email")}
        placeholder="Email"
        className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        disabled
      />
    </div>

    {/* Short Bio */}
    <div className="grid grid-cols-3 items-start gap-4">
      <label className="text-gray-700 font-medium mt-1">Short Bio</label>
      <textarea
        {...register("bio")}
        placeholder="e.g., 'Passionate UI/UX Designer looking for an internship at a startup.'"
        className="col-span-2 border p-3 rounded-lg w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        maxLength={200}
      ></textarea>
    </div>
  </div>

  <p className="text-right text-sm text-gray-500 mt-1">200 Words Max</p>
</div>


 {/* Resume & Skills Section */}
<div>
  <h2 className="text-lg font-semibold text-gray-800">Resume & Skills</h2>
  <p className="text-sm text-gray-500">Showcase your experience and expertise.</p>

  {/* Resume Upload */}
  <div className="p-4 border border-green-200 bg-green-50 rounded">
    <div className="grid grid-cols-2 gap-4">
      <label htmlFor="resumeUpload" className="text-gray-700 font-medium">Upload Resume</label>

      <div>
        <label htmlFor="resumeUpload" className="flex flex-col items-center justify-center gap-5 h-[300px] p-4 border border-dashed rounded cursor-pointer bg-[#BED3C2]">
          <UploadCloud className="w-6 h-6 text-gray-500" />
          <span className="text-sm text-gray-500">Browse and choose the file you want to upload (PDF, DOCX, Max 5MB)</span>
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


  {/* Skills Section */}
 
    <h3 className="text-sm font-semibold text-gray-800">Skills & Expertise</h3>
    <input
      type="text"
      placeholder="Add up to 5 skills"
      className="border p-2 rounded w-full mt-2 min-w-[300px]"
      onKeyDown={handleSkillAdd}
    />

    {/* Skills List */}
    <div className="flex flex-wrap gap-2 mt-2">
      {skills.map((skill, index) => (
        <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center">
          {skill}
          <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-red-500">×</button>
        </span>
      ))}
    </div>

  </div>
  </div>
</div>

        {/* Online Profiles */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Online Profiles</h2>
          <p className="text-sm text-gray-500">Boost your credibility by linking your professional profiles.</p>

          <input {...register("portfolio")} placeholder="Portfolio Website (If applicable)" className="border p-2 rounded w-full mt-3" />
          <input {...register("links")} placeholder="Other Relevant Links (GitHub, Behance, etc.)" className="border p-2 rounded w-full mt-3" />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Update</button>
      </form>
    </div>
  );
};

export default ProfileManagement;
