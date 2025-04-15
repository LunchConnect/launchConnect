"use client";
import { CloudUpload } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { GrLinkedin } from "react-icons/gr";
import { TiPlus } from "react-icons/ti";
import Select, { MultiValue } from "react-select";
import { createJobSeekerProfile } from "@/actions/action";  // Assuming createJobSeekerProfile is imported
import AlertModal from "@/components/AlertModal";
import { useRouter } from "next/navigation"; // ✅ To 
// Define types for options
interface Option {
  value: string;
  label: string;
}

const JobSeeker = () => {
  const [resume, setResume] = useState<File | null>(null);

  const [skills, setSkills] = useState<string[]>([]);  // Handling skills as an array of strings
  const [interests, setInterests] = useState<string[]>([]);  // Handling interests as an array of strings
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [skillInputValue, setSkillInputValue] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"success" | "error">("success");
 const [modalMessage, setModalMessage] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter(); // ✅ Router for redirection


  const maxWords = 200;
  const maxSkills = 5;
  const maxInterests = 3;

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false, // optional: only allow 1 file
  });

  
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
    if (words.length <= maxWords) {
      setBio(e.target.value);
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Go") {
      e.preventDefault(); // Prevent form submission or field jump
      if (skillInputValue.trim() && skills.length < maxSkills) {
        setSkills([...skills, skillInputValue.trim()]);
        setSkillInputValue("");
      }
    }
  };
  

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };


  const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Go") {
      e.preventDefault(); // Prevent form submission or field jump
      if (inputValue.trim() && interests.length < maxInterests) {
        setInterests([...interests, inputValue.trim()]);
        setInputValue("");
      }
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
      setModalType("error");
      setModalMessage("Authentication token not found. Please log in again." );
      setModalOpen(true);

      // alert("Authentication token not found. Please log in again.");
      setIsLoading(false);
      return;
    }

  // Hardcoded role
  const role = "job_seeker"; // or any role you want to hardcode




  // Validate fields
  if (!fullName || !bio || skills.length === 0 || interests.length === 0 || !resume)   {


    setModalType("error");
    setModalMessage("Please fill out all required fields (Full Name, Bio, Skills, Interests, and Resume)." );
    setModalOpen(true);

    // console.error("Please fill out all required fields (Full Name, Bio, Skills, Interests, and Resume).");
    // Optionally, show a message to the user about the missing fields
    // alert("Please fill out all required fields (Full Name, Bio, Skills, Interests, and Resume).");
    setIsLoading(false);
    return; // Prevent form submission if any field is empty
  }


    const { success, message, data } = await createJobSeekerProfile(
      fullName,
      bio,
      skills,
      interests,
      resume,  
      role,
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
      setTimeout(() => router.push("/sign_in"), 2000);
      // Redirect or show success message
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
    <div className="flex flex-col items-center min-h-[120vh] overflow-y-auto">
      <div className="w-full max-w-lg">
        <h1 className="text-[32px] font-bold text-black">Build Your Job Seeker Profile</h1>
        <p className="text-[16px] text-gray-600 mt-3">
          Showcase your skills, experience, and interests to connect with top startups and unlock new opportunities.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-5">
            <label className="text-[16px] font-medium text-[#4A4A4A] mb-2 block">Full Name</label>
            <input
              type="text"
              required
              placeholder="eg. Ikenna Okafor"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border bg-white rounded-md text-[14px]"
            />
          </div>

          {/* Short Bio */}
          <div className="mb-5">
            <label className="text-[16px] font-medium text-[#4A4A4A] mb-2 block">Short Bio</label>
            <textarea
              value={bio}
              required
              onChange={handleBioChange}
              placeholder='e.g. "Passionate UI/UX Designer looking for an internship at a startup."'
              className="w-full p-2 border rounded-md bg-white text-[14px]"
            ></textarea>
            <div className="text-right mt-1 text-sm text-[#344054]">
              {bio.split(/\s+/).filter((word) => word.length > 0).length}/{maxWords} Words Max
            </div>
          </div>

          {/* Resume Upload */}
          <div className="mb-5">
            <label className="text-[16px] font-medium text-[#4A4A4A] mb-2 block">Upload Resume</label>
            <div
              {...getRootProps()}
              className="bg-[#F7F7F8] border border-[#E9EAEB] border-solid p-8 text-center rounded-md cursor-pointer relative flex flex-col items-center justify-center gap-4"
            >
              <input {...getInputProps()}    required />
              
              {resume ? (
                <p className="text-green-600 text-lg">
                {resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB)
              </p>
              ) : (
                <p className="text-[#DFE0E2] text-lg">
                  Choose a file Or Drag and drop <br />PDF Formats up to 5 MB
                </p>
              )}
            </div>
          </div>

          {/* Skills Selection */}
          <div className="mb-5">
            <label className="text-[16px] font-medium mb-2 block">
              Skills <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
          
              value={skillInputValue}
              onChange={(e) => setSkillInputValue(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type a skill and press Enter"
              className="w-full p-2 border rounded-md bg-white text-[14px]"
              disabled={skills.length >= maxSkills}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end w-full mt-3">
              <p className="text-sm text-gray-500">Max: {maxSkills} Skills</p>
            </div>
          </div>

          {/* Interests Selection */}
          <div className="mb-5">
            <label className="text-[16px] font-medium mb-2 block">
              Interests <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
             enterKeyHint="done"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddInterest}
              placeholder="Type an interest and press Enter"
              className="w-full p-2 border rounded-md bg-white text-[14px]"
              disabled={interests.length >= maxInterests}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                >
                  {interest}
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end w-full mt-3">
              <p className="text-sm text-gray-500">Max: {maxInterests} Interests</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1AC23F] text-white p-4 rounded-md text-[16px] font-semibold"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      Saving...
    </span>
  ) : (
    "Save & Continue"
  )}
          </button>
        </form>
      </div>
        {/* ✅ Success & Error Modal */}
              <AlertModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAction={() => {
          setModalOpen(false);
          if (modalType === "success") {
            router.push("/sign_in");
          }
        }}
        type={modalType}
        title={modalType === "success" ? "Account Creation Successful" : "Submission Failed"}
        description={modalMessage}
        buttonText={modalType === "success" ? "Proceed to Sign In" : "OK"}
      />
    </div>
  );
};

export default JobSeeker;
