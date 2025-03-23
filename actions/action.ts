import {publicRequest} from "@/utils/axiosInstance";



// ✅ Register (Sign Up)

export const register = async (email: string, password: string) => {
  try {
    console.log("🔄 Attempting to register user with email:", email);
    
    if (!publicRequest) {
      throw new Error("❌ publicRequest is undefined!");
    }

    const { data } = await publicRequest.post("/auth/signup", { email, password });

    console.log("✅ Registration successful:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Registration error:", error.response?.data || error.message);

    // Extract error message from API response
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "Registration failed. Please try again.";

    return { 
      success: false, 
      message: errorMessage
    };
  }
};



export const login = async (email: string, password: string) => {
  try {
    console.log("🔄 Attempting to log in with email:", email);

    if (!publicRequest) {
      throw new Error("❌ publicRequest is undefined!");
    }

    const { data } = await publicRequest.post("/auth/login", { email, password });

    console.log("✅ Login successful:", data);

    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Login error:", error.response?.data || error.message);

    // Extract error message from API response
    const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         "Login failed. Please check your credentials.";

    return { 
      success: false, 
      message: errorMessage
    };
  }
};





// ✅ Forgot Password (Request Reset Link)
export const forgotPassword = async (email: string) => {
  try {
    const { data } = await publicRequest.post("/password/forget-password", { email });

    console.log("✅ Password Reset Email Sent:", data);
    return { success: true, message: "A password reset link has been sent to your email." };
  } catch (error: any) {
    console.error("❌ Forgot Password Error:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to send reset email. Try again."
    };
  }
};





// ✅ Verify Email Function
export const verifyEmail = async (email: string, otp: string) => {
  try {
    const response = await publicRequest.post("/auth/email-verify", {
      email,
      otp,
    });

    console.log("✅ OTP Verification Success:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("❌ OTP Verification Error:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.error || "OTP verification failed. Please try again." 
    };
  }
};


// ✅ Verify OTP for Forgot Password
export const verifyForgotPasswordOtp = async (otp: string) => {
  try {
    const response = await publicRequest.post("/password/verify-otp", {otp });

    console.log("✅ Forgot Password OTP Verification Success:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("❌ Forgot Password OTP Verification Error:", error.response?.data || error.message);
    
    return { 
      success: false, 
      message: error.response?.data?.error || "OTP verification failed. Please try again." 
    };
  }
};



// ✅ Reset Password API
export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const { data } = await publicRequest.post("/password/reset-password", {
      email,
      newPassword
    });

    console.log("✅ Password Reset Success:", data);
    return { success: true, message: "Password reset successful!" };
  } catch (error: any) {
    console.error("❌ Password Reset Error:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || "Password reset failed. Try again."
    };
  }
};