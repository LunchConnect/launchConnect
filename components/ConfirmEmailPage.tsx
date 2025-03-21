"use client";
import React, { useState, useRef } from "react";

function ConfirmEmailPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-white">
      {/* Header */}
      <div className="w-full max-w-md mt-10 space-y-2"> {/* Adjusted margin-top */}
        <h1 className="text-2xl font-bold text-black">Confirm Email Address</h1>
        <h3 className="text-[#606060] text-sm bg-[#1FC16B1A] p-2 rounded-md">
  We’ve just sent a code to <span className="font-semibold">example@gmail.com</span>.
  <br /> Enter the 4-digit code below.
</h3>
      </div>

      {/* OTP Input Fields */}
      <div className="mt-4 flex gap-3">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            maxLength={1}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={inputRefs[index]}
            className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-md 
                       focus:outline-none focus:border-green-500 bg-white text-black"
          />
        ))}
      </div>

      {/* Resend Code */}
      <p className="mt-2 text-sm text-gray-600">
        Didn&apos;t get a code? <span className="text-green-600 font-semibold cursor-pointer">Resend</span>
      </p>

      {/* Create Account Button */}
      <button className="mt-4 w-full max-w-xs bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600">
        Create Account
      </button>
    </div>
  );
}

export default ConfirmEmailPage;
