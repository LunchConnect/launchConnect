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











// ✅ Verify OTP Function
export const verifyOtp = async (email: string, otp: string) => {
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



