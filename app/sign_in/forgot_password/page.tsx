"use client";

import Link from "next/link";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="max-w-md mx-auto space-y-6 p-10 bg-white rounded-lg ">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black">Forgot Password</h1>
        <p className="text-gray-600 text-sm">
          Reset your password and regain access to your account.
        </p>
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-black">Email Address</Label>
        <Input 
          type="email" 
          id="email" 
          placeholder="eg. email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="!bg-white !text-black !border-gray-300 !rounded-md !p-2 
                     focus:!border-green-500 focus:!ring-2 focus:!ring-green-500"
        />
      </div>

      {/* Submit Button */}
      <button className="w-full bg-green-500 text-white p-2 rounded-md">Next</button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/sign_up" className="text-green-500 font-medium">Sign Up</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
