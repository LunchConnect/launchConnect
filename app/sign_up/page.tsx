"use client";
import React, { useState } from "react";
import { CheckCircle, Circle, Eye, EyeOff } from "lucide-react"; 
import { FcGoogle } from "react-icons/fc"; 

import { signUp } from "@/actions/action"; // Import signup function
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Password Validation Rules
  const validations = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    minLength: password.length >= 8,
  };

  // Handle Signup Submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email || !password) {
      setMessage("Email and password are required.");
      setLoading(false);
      return;
    }

    const response = await signUp(email, password);

    if (response.success) {
      setMessage("Account created successfully! Redirecting...");
      localStorage.setItem("token", response.token); // Store token
      setTimeout(() => {
        window.location.href = "/dashboard"; // Redirect user
      }, 2000);
    } else {
      setMessage(response.message || "Sign up failed.");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto space-y-6 p-6 md:p-10 bg-white rounded-lg w-full">
      {/* Signup Header */}
      <div>
        <h1 className="text-2xl font-bold text-black text-center md:text-left">
          Sign up with LaunchConnect
        </h1>
        <h3 className="text-[#606060] text-sm text-center md:text-left">
          Empower your experience, sign up for free today
        </h3>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSignUp} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-black">Email Address</Label>
          <Input 
            type="email" 
            id="email" 
            placeholder="eg. email@gmail.com"  
            className="!bg-white !text-black !border-[#BED3C2] !rounded-md !p-2 focus:!outline-none focus:border-green-500" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2 relative">
          <Label htmlFor="password" className="text-black">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              className="!bg-white !text-black !border-[#BED3C2] !rounded-md !p-2 !focus:outline-none !focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Eye Icon Button */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          {Object.entries(validations).map(([key, isValid]) => (
            <div key={key} className="flex items-center gap-1 text-xs text-gray-500">
              {isValid ? (
                <CheckCircle className="text-green-500" size={12} />
              ) : (
                <Circle className="text-gray-400" size={12} />
              )}
              <span className="leading-tight">
                {key === "lowercase" && "Lowercase"}
                {key === "uppercase" && "Uppercase"}
                {key === "number" && "Number"}
                {key === "specialChar" && "Special character"}
                {key === "minLength" && "8+ chars"}
              </span>
            </div>
          ))}
        </div>

        {/* Signup Button */}
        <div className="flex flex-col items-center justify-center space-y-3">
          {/* Next Button */}
          <button 
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Next"}
          </button>

          {/* Error/Success Message */}
          {message && <p className={`text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

          {/* OR Divider */}
          <div className="flex items-center w-full">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Signup Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 p-2 rounded-md">
            <FcGoogle size={20} /> {/* Google Icon */}
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
