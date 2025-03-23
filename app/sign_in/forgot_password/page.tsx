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
    <div className="max-w-md mx-auto space-y-6 p-10 bg-white rounded-lg">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black">Forgot Password</h1>
        <p className="text-gray-600 text-sm">
          Enter your email to receive a password reset link.
        </p>
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-black">Email Address</Label>
        <Input 
          type="email" 
          id="email" 
          placeholder="eg.email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="!bg-white !text-black !border-gray-300 !rounded-md !p-2 
                     focus:!border-green-500 focus:!ring-2 focus:!ring-green-500"
        />
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleForgotPassword} 
        className="w-full bg-green-500 text-white p-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Sending..." : "Next"}
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600">
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
