"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/actions/action"; // ✅ Import API function

function CreateNewPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || ""; // ✅ Get token from query params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Password Reset Submission
  const handleSubmit = async () => {
    if (!token) {
      setMessage("Invalid or expired link. Please request a new password reset.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    // ✅ Call API function with token
    const response = await resetPassword(token, password);

    if (response.success) {
      setMessage("✅ Password reset successful! Redirecting...");
      setTimeout(() => router.push("/sign_in"), 2000); // ✅ Redirect to login page
    } else {
      setMessage(response.message || "Password reset failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto md:p-10 bg-white rounded-lg w-full">
      {/* Header */}
      <div className="">
        <h1 className="text-[32px] font-bold text-black">Create New Password</h1>
        <p className="text-gray-600 text-[16px]">Secure your account with a new password.</p>
      </div>

      {/* Password Input */}
      <div className="mt-10">
        <Label htmlFor="password" className="text-black">Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white !text-black mt-5"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="mt-7">
        <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Enter password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="!bg-white !text-black mt-5"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && <p className={`text-sm ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

      {/* Submit Button */}
      <div className="w-full mt-5"> 
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded-md"
      >
        {loading ? "Processing..." : "Create Password"}
      </button>
      </div>
    </div>
  );
}

export default CreateNewPassword;
