"use client";

import { verifyForgotPasswordOtp } from "@/actions/action"; // ✅ Import function
import { useSearchParams, useRouter } from "next/navigation"; 
import React, { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { resendOtpforpassword } from "@/actions/action"; // ✅ Import Resend OTP function
import AlertModal from "@/components/AlertModal";
function ConfirmOtpPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
    const [isResendDisabled, setIsResendDisabled] = useState(false); // ✅ Track Resend button state
    const [countdown, setCountdown] = useState(0); // ✅ Timer countdown
  const router = useRouter();
  const email = searchParams.get("email") || localStorage.getItem("user_email") || ""; 


    // Modal State
      const [modalOpen, setModalOpen] = useState(false);
      const [modalType, setModalType] = useState<"success" | "error">("success");
      const [modalMessage, setModalMessage] = useState("");
    
  
  
  
  // Input field references
  const inputRefs = Array(4).fill(null).map(() => useRef<HTMLInputElement>(null));

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
      setModalType("error");
      setModalMessage("Please enter the full 4-digit code.");
      setModalOpen(true);
      // setMessage("Please enter the 4-digit OTP.");
      return;
    }
  
    const response = await verifyForgotPasswordOtp(otpCode); // ✅ Call API
  
    if (response.success && response.data.tempToken) {

      setModalType("success");
      setModalMessage("✅ Verification successful! Redirecting...");
      setModalOpen(true);
      // ✅ Redirect to create new password page with token
      router.push(`/sign_in/createnew_password?token=${encodeURIComponent(response.data.tempToken)}`);
    } else {
      setModalType("error");
      setModalMessage(response.message || "OTP verification failed." );
      setModalOpen(true);
      // setMessage(response.message || "OTP verification failed.");
    }
  };
  

  
    const handleResendOtp = async () => {
      if (!email) {
        setModalType("error");
        setModalMessage("Email is required to resend OTP." );
        setModalOpen(true);
        setMessage("Email is required to resend OTP.");
        return;
      }
    
      setMessage("⏳ Sending new OTP...");
      setIsResendDisabled(true);
      setCountdown(120); // Start 2-minute countdown
    
      const response = await resendOtpforpassword(email);
    
      setMessage(response.message);
    };
  return (
    <div className="mx-auto md:p-10 bg-white rounded-lg w-full">
      <div className="w-full">
        <h1 className="text-[32px] font-bold text-black">Confirm OTP Code</h1>
        <p className="text-[16px] mt-3 text-[#606060]">Enter the OTP to verify your identity.</p>
        <h3 className="text-[#606060] text-[16px] bg-[#1FC16B1A] p-2 rounded-md my-6">
        We&apos;ve just sent a code to <span className="font-semibold">{email}</span>.
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
            className="w-[121px] h-[65px] text-center text-xl font-semibold border-2 border-gray-300 rounded-md 
                       focus:outline-none focus:border-green-500 bg-white text-black"
          />
        ))}
      </div>

      {message && <p className={`mt-2 text-sm ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>{message}</p>}


      {/* Resend Code */}
      <p className="text-[16px] text-gray-600 mt-3">
        Didn&apos;t get a code?{" "}
        <button
          onClick={handleResendOtp}
          disabled={isResendDisabled}
          className={`font-semibold ${isResendDisabled ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:underline"}`}
        >
          {isResendDisabled ? `Resend in ${countdown}s` : "Resend"}
        </button>
      </p>
      {/* ✅ Submit OTP */}
      <div className="w-full mt-5">  
      <button onClick={handleVerifyOtp} className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600">
        Next
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

export default ConfirmOtpPage;
