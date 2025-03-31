"use client";
import { CloudUpload } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { GrLinkedin } from "react-icons/gr";
import { TiPlus } from "react-icons/ti";
import Select, { MultiValue } from "react-select";

// Define types for options
interface Option {
  value: string;
  label: string;
}

const JobSeeker = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Option[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillinputValue, setskillInputValue] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Handle file drop
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

    const [bio, setBio] = useState("");
    const maxWords = 200;
  
    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
      if (words.length <= maxWords) {
        setBio(e.target.value);
      }
    };

    const maxSkills = 5;

    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && skillinputValue.trim() && skills.length < maxSkills) {
        e.preventDefault(); // Prevent form submission
        setSkills([...skills, skillinputValue.trim()]);
        setskillInputValue("");
      }
    };
  
    const handleRemoveSkill = (skillToRemove: string) => {
      setSkills(skills.filter((skill) => skill !== skillToRemove));
    };


    const maxInterests = 3;

    const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim() && interests.length < maxInterests) {
        e.preventDefault(); // Prevent form submission
        setInterests([...interests, inputValue.trim()]);
        setInputValue("");
      }
    };
  
    const handleRemoveInterest = (interestToRemove: string) => {
      setInterests(interests.filter((interest) => interest !== interestToRemove));
    };
  

  // Skills options
  // const skillOptions: Option[] = [
  //   { value: "UI/UX Design", label: "UI/UX Design" },
  //   { value: "Frontend Development", label: "Frontend Development" },
  //   { value: "Backend Development", label: "Backend Development" },
  //   { value: "Project Management", label: "Project Management" },
  // ];

  // Interests options
  const interestOptions: Option[] = [
    { value: "Gaming", label: "Gaming" },
    { value: "Esports", label: "Esports" },
    { value: "AI", label: "AI" },
    { value: "Fintech", label: "Fintech" },
  ];

  return (
    <div className="flex flex-col items-center min-h-[120vh] overflow-y-auto">
      <div className="w-full max-w-lg">
        {/* Header */}
        <h1 className="text-[32px] font-bold text-black">Build Your Job Seeker Profile</h1>
        <p className="text-[16px] text-gray-600 mt-3">
          Showcase your skills, experience, and interests to connect with top startups and unlock new opportunities.
        </p>

        {/* Form */}
        <form className="mt-8 space-y-6">
          {/* Full Name */}
          <div className="mb-5">
            <label className="text-[16px] font-medium text-[#4A4A4A] mb-2 block">Full Name</label>
            <input
              type="text"
              placeholder="eg. Ikenna Okafor"
              className="w-full p-2 border bg-white rounded-md text-[14px]"
            />
          </div>

          {/* Short Bio */}
          <div className="mb-5">
      {/* Label */}
      <label className="text-[16px] font-medium text-[#4A4A4A] mb-2 block">
        Short Bio
      </label>

      {/* Textarea */}
      <textarea
        value={bio}
        onChange={handleBioChange}
        placeholder='e.g. "Passionate UI/UX Designer looking for an internship at a startup."'
        className="w-full p-2 border rounded-md bg-white text-[14px]"
      ></textarea>

      {/* Word Count - Positioned Outside Bottom Right */}
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
                Choose a file Or Drag and drop <br/>PDF Formats up to 5 MB
                </p>
              )}
            </div>
          </div>

        
          {/* Skills Selection */}
          <div className="mb-5">
      {/* Label */}
      <label className="text-[16px] font-medium mb-2 block">
        Skills <span className="text-red-600">*</span>
      </label>

      {/* Input Field */}
      <input
        type="text"
        value={skillinputValue}
        onChange={(e) => setskillInputValue(e.target.value)}
        onKeyDown={handleAddSkill}
        placeholder="Type a skill and press Enter"
        className="w-full p-2 border rounded-md bg-white text-[14px]"
        disabled={skills.length >= maxSkills}
      />

      {/* Display Added Skills */}
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

      {/* Skill Limit Notice */}
      <div className="flex justify-end w-full mt-3">
        <p className="text-sm text-gray-500 ">Max: {maxSkills} Skills</p>
      </div>
    </div>
          {/* <div className="mb-5">
            <label className="text-[16px] font-medium mb-2 block">Skills <span className="text-red-600">*</span></label>
            <Select
              options={skillOptions}
              isMulti
              value={selectedSkills}
              onChange={(selected: MultiValue<Option>) => setSelectedSkills(selected as Option[])}
              className="w-full text-lg text-black"
              placeholder="Select up to 5 skills"
              maxMenuHeight={150}
            />
            <div className="flex justify-end w-full mt-3">
              <p className="text-sm text-gray-500 mt-1">Max: 5 Skills</p>
            </div>
          </div> */}

          {/* Interests Selection */}
          <div className="mb-5">
      {/* Label */}
      <label className="text-[16px] font-medium mb-2 block">
        Interests <span className="text-red-600">*</span>
      </label>

      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddInterest}
        placeholder="Type an interest and press Enter"
        className="w-full p-2 border rounded-md bg-white text-[14px]"
        disabled={interests.length >= maxInterests}
      />

      {/* Display Added Interests */}
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

      {/* Interest Limit Notice */}
      <div className="flex justify-end w-full mt-3">
        <p className="text-sm text-gray-500">Max: {maxInterests} Interests</p>
      </div>
    </div>
          {/* <div className="mb-5">
            <label className="text-[16px] font-medium mb-2 block">Interests*</label>
            <Select
              options={interestOptions}
              isMulti
              value={selectedInterests}
              onChange={(selected: MultiValue<Option>) => setSelectedInterests(selected as Option[])}
              className="w-full text-lg text-black"
              placeholder="Select up to 3 interests"
              maxMenuHeight={150}
            />
            <div className="flex justify-end w-full mt-3">
              <p className="text-sm text-gray-500">Max: 3 Interests</p>
            </div>
          </div> */}

          {/* Submit Button */}
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
