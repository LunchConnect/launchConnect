"use client"; // Required if using Next.js App Router
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Icons
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import Link from "next/link";

function SignIn() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto space-y-6 p-10 bg-white rounded-lg">
      {/* Sign In Header */}
      <div>
        <h1 className="text-2xl font-bold text-black">Welcome back !</h1>
        <h3 className="text-[#606060] text-sm">
          Welcome back, enter your credentials to access your account
        </h3>
      </div>

      {/* Email Input */}
      <div className="space-y-2">
  <Label htmlFor="email" className="text-black">Email Address</Label>
  <Input 
    type="email" 
    id="email" 
    placeholder="eg. email@gmail.com"  
    className="!bg-white !text-black !border-[#BED3C2] !rounded-md !p-2 
               focus:!border-green-500 focus:!ring-2 focus:!ring-green-500" 
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
      className="!bg-white !text-black !border-[#BED3C2] !rounded-md !p-2 pr-10 
                 focus:!border-green-500 focus:!ring-2 focus:!ring-green-500"
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


        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link href="sign_in/forgot_password" className="text-green-500 text-sm">
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Sign In Button */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <button className="w-full bg-green-500 text-white p-2 rounded-md">Next</button>

        {/* OR Divider */}
        <div className="flex items-center w-full">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign In Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 p-2 rounded-md">
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/sign_up" className="text-green-500 font-medium">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
