"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ To redirect after login
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AlertModal from "@/components/AlertModal";
import { login } from "@/actions/action"; // ✅ Import real login function

function SignIn() {
  const router = useRouter(); // ✅ Router for redirection

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  //  useEffect(() => {

  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     router.back()
  //   }

  //   }, [router]);

  // ✅ Handle Login
  const handleLogin = async () => {
    setLoading(true);

    const response = await login(email, password);
    setLoading(false);

    if (response.success) {
      const userData = response.data;
      const { token, user, profile } = userData;
      const role = user?.role;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("profile", JSON.stringify(profile));
      localStorage.setItem("fullData", JSON.stringify(userData));
      localStorage.setItem("fullName", profile?.fullName || "");

      if (!profile) {
        setModalType("error");
        setModalMessage("Your profile setup is not completed yet.");
        setModalOpen(true);

        setTimeout(() => {
          if (role === "job_seeker") {
            router.push("/sign_up/job_seeker");
          } else {
            router.push("/sign_up/startup_form");
          }
        }, 5500);
        return;
      }

      // ✅ Profile exists
      setModalType("success");
      setModalMessage("Welcome back! You’ve logged in successfully.");
      setModalOpen(true);

      setTimeout(() => {
        if (role === "job_seeker") {
          router.replace("/dashboard");
        } else {
          router.replace("/startup_founder_dashboard");
        }
      }, 2000);
    } else {
      const msg =
        response.message ||
        "Login failed. Check your credentials and try again.";

      if (
        msg === "Email not verified. A new verification code has been sent."
      ) {
        setModalType("error");
        setModalMessage(msg);
        setModalOpen(true);

        setTimeout(() => {
          router.push(
            `/sign_up/confirm_email?email=${encodeURIComponent(email)}`
          );
        }, 2500);
      } else if (msg === "Role not set. Please select a role to continue.") {
        // ✅ Store token if present
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        setModalType("error");
        setModalMessage(msg);
        setModalOpen(true);

        setTimeout(() => {
          router.push("/sign_up/welcome");
        }, 2500);
      } else {
        setModalType("error");
        setModalMessage(msg);
        setModalOpen(true);
      }
    }
  };

  return (
    <div className=" bg-white rounded-lg w-full">
      {/* Sign In Header */}
      <div>
        <h1 className="text-[32px] font-bold text-black">Welcome back!</h1>
        <h3 className="text-[#606060] text-[16px] mt-4">
          Welcome back, enter your credentials to access your account.
        </h3>
      </div>

      {/* Email Input */}
      <div className="space-y-2 mt-8">
        <Label htmlFor="email" className="text-black text-[16px]">
          Email Address
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="eg. email@gmail.com"
          className="bg-white text-black border-[#BED3C2] rounded-md p-2 mt-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password Input */}
      <div className="space-y-2 relative mt-4">
        <Label htmlFor="password" className="text-black text-[16px]">
          Password
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter password"
            className="!bg-white !text-black !border-[#BED3C2] !rounded-md !p-2 pr-10 focus:!border-green-500 focus:!ring-2 focus:!ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end mt-8">
          <Link
            href="sign_in/forgot_password"
            className="text-green-500 text-sm"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Sign In Button */}
      <div className="flex flex-col items-center justify-center space-y-3 mt-4">
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Next"}
        </button>

        {/* OR Divider */}
        <div className="flex items-center w-full">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign In Button */}
        {/* <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 p-2 rounded-md" disabled>
          <FcGoogle size={20} />
          Continue with Google
        </button> */}
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Don&#39;t have an account?{" "}
        <Link href="/sign_up" className="text-green-500 font-medium">
          Sign Up
        </Link>
      </p>

      {/* ✅ Success & Error Modal */}
      <AlertModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAction={() => setModalOpen(false)}
        type={modalType}
        title={modalType === "success" ? "Login Successful" : "Login Failed"}
        description={modalMessage}
        buttonText={modalType === "success" ? "Proceed to Dashboard" : "OK"}
      />
    </div>
  );
}

export default SignIn;
