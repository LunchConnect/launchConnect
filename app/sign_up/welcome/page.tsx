"use client";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

const WelcomePage = () => {
  const [selectedOption, setSelectedOption] = useState("founder");
  const router = useRouter(); // ✅ Initialize router

  const handleContinue = () => {
    if (selectedOption === "founder") {
      router.push("/sign_up/startup_form"); // ✅ Redirect to startup form
    } else {
      router.push("/sign_up/job_seeker"); // ✅ Redirect to job seeker form
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center p-6 mt-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-black">Welcome to LaunchConnect</h1>
        <p className="text-gray-600 text-sm mt-2">
          To get started, choose if you’d like to join LaunchConnect as a startup founder or a job seeker.
        </p>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {/* Startup Founder Option */}
          <div
            onClick={() => setSelectedOption("founder")}
            className={`p-4 border rounded-md cursor-pointer ${
              selectedOption === "founder" ? "bg-[#1FC16B1A] border-[#1FC16B] text-black" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-black">I&apos;m a Startup Founder</h3>
              {selectedOption === "founder" && <CheckCircle size={20} className="text-green-500" />}
            </div>
            <p className="text-sm text-gray-600">
              Use LaunchConnect to find top talent, build your team, and grow your business.
            </p>
          </div>

          {/* Job Seeker Option */}
          <div
            onClick={() => setSelectedOption("seeker")}
            className={`p-4 border rounded-md cursor-pointer ${
              selectedOption === "seeker" ? "bg-[#1FC16B1A] border-[#1FC16B] text-black" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-black">I&apos;m a Job Seeker</h3>
              {selectedOption === "seeker" && <CheckCircle size={20} className="text-green-500" />}
            </div>
            <p className="text-sm text-gray-600">
              Use LaunchConnect to discover startup roles, gain hands-on experience, and kickstart your career.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <button 
          onClick={handleContinue} 
          className="mt-6 w-full bg-green-500 text-white p-3 rounded-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
