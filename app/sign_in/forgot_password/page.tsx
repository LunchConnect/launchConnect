"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AlertModal from "@/components/AlertModal";
import { forgotPassword } from "@/actions/action";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Initialize router

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  // ✅ Handle Password Reset Request
  const handleForgotPassword = async () => {
    if (!email) {
      setModalType("error");
      setModalMessage("Please enter a valid email.");
      setModalOpen(true);
      return;
    }
  
    setLoading(true);
    const response = await forgotPassword(email);
    setLoading(false);
  
    if (response.success) {
      router.push(`/sign_in/confirm_otp?email=${encodeURIComponent(email)}`); // ✅ Redirect with email
    } else {
      setModalType("error");
      setModalMessage(response.message);
      setModalOpen(true);
    }
  };

  return (
    <div className="md:p-10 bg-white rounded-lg w-full">
      {/* Header */}
      <div className="">
        <h1 className="text-[32px] font-bold text-black">Forgot Password</h1>
        <p className="text-gray-600 text-[16px]">
        Reset your password and regain access to your account.
        </p>
      </div>

      {/* Email Input */}
      <div className="mt-10">
        <Label htmlFor="email" className="text-black text-[16px]">Email Address</Label>
        <Input 
          type="email" 
          id="email" 
          placeholder="eg.email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white text-black mt-2 rounded-md p-2 
                      "
        />
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleForgotPassword} 
        className="w-full bg-green-500 text-white p-2 mt-5 rounded-md"
        disabled={loading}
      >
        {loading ? "Sending..." : "Next"}
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-[16px] text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link href="/sign_up" className="text-green-500 font-medium">Sign Up</Link>
      </p>

      {/* ✅ Success & Error Modal */}
      <AlertModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAction={() => setModalOpen(false)}
        type={modalType}
        title={modalType === "success" ? "Email Sent" : "Error"}
        description={modalMessage}
        buttonText="OK"
      />
    </div>
  );
}

export default ForgotPassword;
