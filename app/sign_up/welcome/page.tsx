"use client";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { updateUserRole } from "@/actions/action"; // ✅ Import API action

const WelcomePage = () => {
  const [selectedOption, setSelectedOption] = useState<"founder" | "job_seeker">("founder");
  const router = useRouter(); // ✅ Initialize router
  const [loading, setLoading] = useState(false);

 const handleContinue = async () => {
  setLoading(true);

  try {
    // ✅ Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    // ✅ Update role in backend with token
    const response = await updateUserRole(selectedOption, token);

    if (response.success) {
      // ✅ Redirect based on role
      if (selectedOption === "founder") {
        router.push("/sign_up/startup_form");
      } else {
        router.push("/sign_up/job_seeker");
      }
    } else {
      alert(response.message || "Failed to update role. Try again.");
    }
  } catch (error) {
    console.error("Error updating role:", error);
    alert("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mx-auto md:p-10 bg-white rounded-lg w-full max-w-md">
      <h1 className="text-[32px] font-bold text-black">Welcome to LaunchConnect</h1>
      <p className="text-gray-600 text-[16px] mt-2">
        To get started, choose if you’d like to join LaunchConnect as a startup founder or a job seeker.
      </p>

      {/* Role Selection Options */}
      <div className="mt-6 space-y-3">
        {/* Startup Founder Option */}
        <div
          onClick={() => setSelectedOption("founder")}
          className={`p-4 border rounded-md cursor-pointer transition ${
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
          onClick={() => setSelectedOption("job_seeker")}
          className={`p-4 border rounded-md cursor-pointer transition ${
            selectedOption === "job_seeker" ? "bg-[#1FC16B1A] border-[#1FC16B] text-black" : "border-gray-300"
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-black">I&apos;m a Job Seeker</h3>
            {selectedOption === "job_seeker" && <CheckCircle size={20} className="text-green-500" />}
          </div>
          <p className="text-sm text-gray-600">
            Use LaunchConnect to discover startup roles, gain hands-on experience, and kickstart your career.
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="mt-6 w-full bg-green-500 text-white p-3 rounded-md transition hover:bg-green-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : "Continue"}
      </button>
    </div>
  );
};

export default WelcomePage;
