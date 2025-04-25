"use client";

import { verifyForgotPasswordOtp, resendOtpforpassword } from "@/actions/action";
import { useSearchParams, useRouter } from "next/navigation"; 
import React, { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import AlertModal from "@/components/AlertModal";

function ConfirmOtpPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || localStorage.getItem("user_email") || ""; 

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  const inputRefs = Array(4).fill(null).map(() => useRef<HTMLInputElement>(null));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!email) {
      router.push("/sign_up");
    }
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, email, router]);

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setModalType("error");
      setModalMessage("Please enter the full 4-digit code.");
      setModalOpen(true);
      return;
    }
    const response = await verifyForgotPasswordOtp(otpCode);
    if (response.success && response.data.tempToken) {
      setModalType("success");
      setModalMessage("✅ Verification successful! Redirecting...");
      setModalOpen(true);
      router.push(`/sign_in/createnew_password?token=${encodeURIComponent(response.data.tempToken)}`);
    } else {
      setModalType("error");
      setModalMessage(response.message || "OTP verification failed.");
      setModalOpen(true);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setModalType("error");
      setModalMessage("Email is required to resend OTP.");
      setModalOpen(true);
      return;
    }
    setMessage("⏳ Sending new OTP...");
    setIsResendDisabled(true);
    setCountdown(120);
    const response = await resendOtpforpassword(email);
    setMessage(response.message);
  };

  return (
    <div className="max-w-xl w-full mx-auto px-4 py-10 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Confirm OTP Code</h1>
        <p className="text-sm sm:text-base mt-2 text-gray-600">Enter the OTP to verify your identity.</p>
        <h3 className="text-sm sm:text-base text-gray-600 bg-green-100 p-3 rounded-md my-6">
          We've just sent a code to <span className="font-semibold">{email}</span>.
          <br /> Enter the 4-digit code below.
        </h3>
      </div>

      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            maxLength={1}
            ref={inputRefs[index]}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-16 sm:w-24 sm:h-20 text-center text-xl sm:text-2xl font-semibold border-2 border-gray-300 rounded-md 
                      focus:outline-none focus:border-green-500 bg-white text-black"
          />
        ))}
      </div>

      {message && (
        <p className={`mt-2 text-sm text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <p className="text-center text-sm text-gray-600 mt-4">
        Didn&apos;t get a code?{" "}
        <button
          onClick={handleResendOtp}
          disabled={isResendDisabled}
          className={`font-semibold ${isResendDisabled ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:underline"}`}
        >
          {isResendDisabled ? `Resend in ${countdown}s` : "Resend"}
        </button>
      </p>

      <div className="w-full mt-6">
        <button
          onClick={handleVerifyOtp}
          className="w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition"
        >
          Next
        </button>
      </div>

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
