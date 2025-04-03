"use client";
import { CloudUpload } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { GrLinkedin } from "react-icons/gr";
import { TiPlus } from "react-icons/ti";
import Select, { MultiValue } from "react-select";
import { createJobSeekerProfile } from "@/actions/action";  // Assuming createJobSeekerProfile is imported

// Define types for options
interface Option {
  value: string;
  label: string;
}

const JobSeeker = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Option[]>([]);
  const [skills, setSkills] = useState<string[]>([]);  // Handling skills as an array of strings
  const [interests, setInterests] = useState<string[]>([]);  // Handling interests as an array of strings
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [skillInputValue, setSkillInputValue] = useState("");

  const maxWords = 200;
  const maxSkills = 5;
  const maxInterests = 3;

  // Handle file drop for resume
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setResume(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
  });

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
    if (words.length <= maxWords) {
      setBio(e.target.value);
    }
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

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token not found. Please log in again.");
      return;
    }

  // Hardcoded role
  const role = "Job_Seeker"; // or any role you want to hardcode




  // Validate fields
  if (!fullName || !bio || skills.length === 0 || interests.length === 0 || !resume) {
    console.error("All fields must be filled out. Please check your input.");
    // Optionally, show a message to the user about the missing fields
    alert("Please fill out all required fields (Full Name, Bio, Skills, Interests, and Resume).");
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
      console.log("Profile created successfully:", data);
      // Redirect or show success message
    } else {
      console.error("Error creating profile:", message);
      // Show error message
    }
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
              <input {...getInputProps()} />
              {resume ? (
                <p className="text-green-600 text-lg">{resume.name}</p>
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
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeeker;
