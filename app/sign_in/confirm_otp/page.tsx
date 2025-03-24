"use client";

import { verifyForgotPasswordOtp } from "@/actions/action"; // ✅ Import function
import { useSearchParams, useRouter } from "next/navigation"; 
import React, { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";

function ConfirmOtpPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || localStorage.getItem("user_email") || ""; 

  // Input field references
  const inputRefs = Array(4).fill(null).map(() => useRef<HTMLInputElement>(null));

  useEffect(() => {
    if (!email) {
      router.push("/sign_up");
    }
  }, [email, router]);

  // ✅ Handle OTP Input Change
  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a digit is entered
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // ✅ Handle Backspace Key Navigation
  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // ✅ Handle OTP Submission
  const handleVerifyOtp = async () => {
    const otpCode = otp.join(""); // Convert array to string
    if (otpCode.length !== 4) {
      setMessage("Please enter the 4-digit OTP.");
      return;
    }
  
    const response = await verifyForgotPasswordOtp(otpCode); // ✅ Call API
  
    if (response.success && response.data.tempToken) {
      // ✅ Redirect to create new password page with token
      router.push(`/sign_in/createnew_password?token=${encodeURIComponent(response.data.tempToken)}`);
    } else {
      setMessage(response.message || "OTP verification failed.");
    }
  };
  

  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-white">
      <div className="w-full max-w-md mt-10 space-y-2">
        <h1 className="text-2xl font-bold text-black">Confirm OTP Code</h1>
        <h3 className="text-[#606060] text-sm bg-[#1FC16B1A] p-2 rounded-md">
          We’ve just sent a code to <span className="font-semibold">{email}</span>.
          <br /> Enter the 4-digit code below.
        </h3>
      </div>

      {/* ✅ OTP Input Fields */}
      <div className="mt-4 flex gap-3">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            maxLength={1}
            ref={inputRefs[index]} // ✅ Assign ref
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-md 
                       focus:outline-none focus:border-green-500 bg-white text-black"
          />
        ))}
      </div>

      {message && <p className={`mt-2 text-sm ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

      {/* ✅ Submit OTP */}
      <button onClick={handleVerifyOtp} className="mt-4 w-full max-w-xs bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600">
        Next
      </button>
    </div>
  );
}

export default ConfirmOtpPage;
