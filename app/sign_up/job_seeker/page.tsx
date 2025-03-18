"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";

import { CloudUpload } from "lucide-react";
import { GrLinkedin } from "react-icons/gr";
import { TiPlus } from "react-icons/ti";

const JobSeeker = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

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

  const skillOptions = [
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Frontend Development", label: "Frontend Development" },
    { value: "Backend Development", label: "Backend Development" },
    { value: "Project Management", label: "Project Management" },
  ];

  const interestOptions = [
    { value: "Gaming", label: "Gaming" },
    { value: "Esports", label: "Esports" },
    { value: "AI", label: "AI" },
    { value: "Fintech", label: "Fintech" },
  ];

  return (
    <div className="flex flex-col items-center min-h-[120vh] overflow-y-auto p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-black">Build Your Job Seeker Profile</h1>
        <p className="text-lg text-gray-600 mt-3">
          Showcase your skills, experience, and interests to connect with top
          startups and unlock new opportunities.
        </p>

        {/* Form */}
        <form className="mt-8 space-y-6">
          {/* Full Name */}
          <div className="mb-5">
            <label className="text-lg font-medium text-[#4A4A4A] mb-2 block">Full Name</label>
            <input
              type="text"
              placeholder="eg. Ikenna Okafor"
              className="w-full p-4 border bg-white rounded-md text-lg"
            />
          </div>

          {/* Short Bio */}
          <div className="mb-5">
            <label className="text-lg font-medium text-[#4A4A4A] mb-2 block">Short Bio</label>
            <textarea
              placeholder='eg. "Passionate UI/UX Designer looking for an internship at a startup."'
              className="w-full p-4 border rounded-md bg-white text-lg"
            ></textarea>
          </div>

          {/* Resume Upload */}
          <div className="mb-5">
            <label className="text-lg font-medium text-[#4A4A4A] mb-2 block">Upload Resume</label>
            <div
              {...getRootProps()}
              className="border border-[#BED3C2] border-dashed p-8 text-center rounded-md cursor-pointer relative flex flex-col items-center justify-center gap-4"
            >
              <CloudUpload size={32} className="text-gray-500" />
              <input {...getInputProps()} />
              {resume ? (
                <p className="text-green-600 text-lg">{resume.name}</p>
              ) : (
                <p className="text-gray-500 text-lg">
                  Browse and choose the files you want to upload from your computer
                </p>
              )}
              <TiPlus size={40} className="text-white bg-green-500 p-2 rounded-full" />
            </div>
          </div>

          {/* LinkedIn Profile */}
          <div className="mb-5 relative">
            <label className="text-lg font-medium mb-2 block">LinkedIn Profile</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your LinkedIn URL"
                className="w-full p-4 border rounded-md bg-white text-lg pr-12"
              />
              <GrLinkedin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600" size={28} />
            </div>
          </div>
{/* Skills Selection */}
<div className="mb-5">
  <label className="text-lg font-medium mb-2 block">Skills*</label>
  <Select
    options={skillOptions}
    isMulti
    value={selectedSkills}
    onChange={(selected) => setSelectedSkills(selected as any)}
    className="w-full text-lg text-black"
    placeholder="Select up to 5 skills"
    maxMenuHeight={150}
  />
  <div className="flex justify-end w-full mt-3">
    <p className="text-sm text-gray-500 mt-1">Max: 5 Skills</p>
  </div>
</div>


          {/* Interests Selection */}
          <div className="mb-5">
            <label className="text-lg font-medium mb-2 block">Interests*</label>
            <Select
              options={interestOptions}
              isMulti
              value={selectedInterests}
              onChange={(selected) => setSelectedInterests(selected as any)}
              className="w-full text-lg text-black"
              placeholder="Select up to 3 interests"
              maxMenuHeight={150}
            />
 <div className="flex justify-end w-full mt-3">
            <p className="text-sm text-gray-500">Max: 3 Interests</p>
            </div>
           
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-4 rounded-md text-lg font-semibold"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeeker;
