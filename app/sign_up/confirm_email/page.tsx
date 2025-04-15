"use client";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ Import Next.js utilities
import React, { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react"

import AlertModal from "@/components/AlertModal";
import { verifyEmail,resendOtp } from "@/actions/action"; // ✅ Import OTP verification function


function ConfirmEmailPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false); // ✅ Track Resend button state
  const [countdown, setCountdown] = useState(0); // ✅ Timer countdown
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const searchParams = useSearchParams(); // ✅ Get query params
  const router = useRouter(); // ✅ Router for redirection
  const email = searchParams.get("email") || localStorage.getItem("user_email") || ""; // ✅ Retrieve email


  // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"success" | "error">("success");
    const [modalMessage, setModalMessage] = useState("");
  





  // Countdown timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!email) {
      router.push("/sign_up"); // ✅ Redirect back if no email
    }
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false); // Enable button after timer ends
    }
    return () => clearTimeout(timer);
  }, [countdown,email,router]);




  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    
    if (enteredOtp.length < 4) {
      setModalType("error");
      setModalMessage("Please enter the full 4-digit code.");
      setModalOpen(true);
      // setMessage("Please enter the full 4-digit code.");
      return;
    }
  
    setMessage("⏳ Verifying Email...");
    
    const response = await verifyEmail(email, enteredOtp);
  
    if (response.success) {
      setModalType("success");
      setModalMessage("✅ Verification successful! Redirecting...");
      setModalOpen(true);

      // setMessage("✅ Verification successful! Redirecting...");
      setTimeout(() => router.push("/sign_up/welcome"), 2000); // Redirect to dashboard
    } else {
      setModalType("error");
      setModalMessage(response.message );
      setModalOpen(true);
      // setMessage(`${response.message}`); 
    }
  };


  const handleResendOtp = async () => {
    if (!email) {
      setModalType("error");
      setModalMessage("Email is required to resend OTP." );
      setModalOpen(true);
      // setMessage("Email is required to resend OTP.");
      return;
    }
  
    setMessage("⏳ Sending new OTP...");
    setIsResendDisabled(true);
    setCountdown(120); // Start 2-minute countdown
  
    const response = await resendOtp(email);
  

    if (response.success) {
      setModalType("success");
      setModalMessage(response.message);
      setModalOpen(true);

      // setMessage("✅ Verification successful! Redirecting...");
      setTimeout(() => router.push("/sign_up/welcome"), 2000); // Redirect to dashboard
    } else {
      setModalType("error");
      setModalMessage(response.message );
      setModalOpen(true);
      // setMessage(`${response.message}`); 
    }



    // setMessage(response.message);
  };

  return (
    <div className="mx-auto md:p-10 bg-white rounded-lg w-full">
      {/* Header */}
      <div className="w-full">
        <h1 className="text-[32px] font-bold text-black">Confirm Email Address</h1>
        <p className="text-[16px] mt-3 text-[#606060]">Empower your experience, sign up for free today</p>

        <h3 className="text-[#606060] text-[16px] bg-[#1FC16B1A] p-2 rounded-md my-6">
          We&apos;ve just sent a code to <span className="font-semibold">{email}</span>.
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
            className="w-[121px] h-[65px] text-center text-xl font-semibold border-2 border-gray-300 rounded-md 
                       focus:outline-none focus:border-green-500 bg-white text-black"
          />
        ))}
      </div>
    {/* Error/Success Message */}
    {message && <p className={`mt-2 text-sm ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

      {/* Resend Code */}
      <p className="text-sm text-gray-600 mt-3">
        Didn&apos;t get a code?{" "}
        <button
          onClick={handleResendOtp}
          disabled={isResendDisabled}
          className={`font-semibold ${isResendDisabled ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:underline"}`}
        >
          {isResendDisabled ? `Resend in ${countdown}s` : "Resend"}
        </button>
      </p>


     {/* Create Account Button */}
<div className="w-full mt-5">  
  <button 
    onClick={handleVerifyOtp} 
    className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600"
  >
    Create Account
  </button>
</div>
    {/* ✅ Success & Error Modal */}
    <AlertModal 
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onAction={() => setModalOpen(false)}
              type={modalType}
              title={modalType === "success" ? "Email Confirmation Successful" : "Email Confirmation Failed"}
              description={modalMessage}
              buttonText={modalType === "success" ? "Proceed" : "OK"}
            />
    </div>
  );
}

export default ConfirmEmailPage;
