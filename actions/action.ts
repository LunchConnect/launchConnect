import publicRequest from "@/utils/axiosInstance";

export const signUp = async (email: string, password: string) => {
  try {
    const { data } = await publicRequest.post("/auth/signup", { email, password });

    console.log("User signed up:", data);
    return data;
  } catch (error: any) {
    console.error("Error signing up:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Sign up failed." };
  }
};


// Verify OTP Function
export const verifyOtp = async (email: string, otp: string) => {
  try {
    const { data } = await publicRequest.post("/auth/email-verify", { email, otp });

    console.log("OTP Verified:", data);
    return data;
  } catch (error: any) {
    console.error("OTP verification error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "OTP verification failed." };
  }
};