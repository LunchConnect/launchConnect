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

    // ✅ Save response data to localStorage
    localStorage.setItem("token", data.token); // Save token
    localStorage.setItem("user", JSON.stringify(data.user)); // Save user info

    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Registration error:", error.response?.data || error.message);

    // Extract error message from API response
    const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         "Registration failed. Please try again.";

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
export const resetPassword = async (tempToken: string, newPassword: string) => {
  try {
    const { data } = await publicRequest.post("/password/reset-password", {
      newPassword, // ✅ Send token instead of email
      tempToken,
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



// ✅ Resend OTP For Email API
export const resendOtp = async (email: string) => {
  try {
    console.log("🔄 Resending OTP for:", email);

    const response = await publicRequest.post("/auth/resend-otp", { email });

    console.log("✅ OTP Resent Successfully:", response.data);
    return { success: true, message: "A new OTP has been sent to your email." };
  } catch (error: any) {
    console.error("❌ Resend OTP Error:", error.response?.data || error.message);

    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to resend OTP. Try again."
    };
  }
};




// ✅ Resend OTP For Password API
export const resendOtpforpassword = async (email: string) => {
  try {
    console.log("🔄 Resending OTP for:", email);

    const response = await publicRequest.post("/password/resend-otp", { email });

    console.log("✅ OTP Resent Successfully:", response.data);
    return { success: true, message: "A new OTP has been sent to your email." };
  } catch (error: any) {
    console.error("❌ Resend OTP Error:", error.response?.data || error.message);

    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to resend OTP. Try again."
    };
  }
};




// ✅ Update User Role API (with Authorization Token)
export const updateUserRole = async (role: "founder" | "job_seeker", token: string) => {
  try {
    const { data } = await publicRequest.put(
      "/users/update-role",
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Include Bearer Token
        },
      }
    );

    console.log("✅ Role Updated Successfully:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Role Update Error:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to update role. Try again.",
    };
  }
};






// ✅ User Job seeker form Role API (with Authorization Token)
export const createJobSeekerProfile = async (
  fullName: string,
  bio: string,
  skills: string[],
  interests: string[],
  resume: File,
  role: string,
  token: string
) => {
  try {
    console.log("🔄 Submitting job seeker profile...");

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("shortBio", bio);
    formData.append("resume", resume);
    formData.append("role", role);

     // Important: use the same key `skills[]` for each item
     skills.forEach((skill) => formData.append("skills[]", skill));
     interests.forEach((interest) => formData.append("interests[]", interest));
 
    // Log formData entries to the console
    formData.forEach((value, key) => {
      console.log(`${key}:`, value); // Logs each field and its value
    });

    const { data } = await publicRequest.post("/profile/setup-profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Profile submitted successfully:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Profile submission error:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit profile. Try again.",
    };
  }
};











// ✅ User Start up form Role API (with Authorization Token)
export const createStartupFounderProfile = async (
  fullName: string,
  companyName: string,
  industry: string,
  website: string,
  roleInCompany:string,
  role: string,
  token: string
) => {
  try {
    console.log("🔄 Submitting start up profile...");
    const { data } = await publicRequest.post("/profile/setup-profile", {
      fullName,
      companyName,
      industry,
      website,
      roleInCompany,
      role,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("Error submitting founder profile:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit founder profile.",
    };
  }
};




// ✅ User getJobSeekerSummary API (with Authorization Token)
export const getJobSeekerSummary = async (token: string) => {
  try {
    const { data } = await publicRequest.get("/job/get-job-seeker-summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Failed to fetch job seeker summary:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch summary.",
    };
  }
};




// ✅ User startupSummary API (with Authorization Token)
export const getStartupSummary = async (token: string) => {
  try {
    const { data } = await publicRequest.get("/job/get-startup-dashboard-summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Failed to fetch job seeker summary:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch summary.",
    };
  }
};




// ✅ Fetch Jobs For You
export const getJobsForYou = async (token: string) => {
  try {
    // Send a GET request to the "/job/job-for-you" endpoint
    const { data } = await publicRequest.get("/job/job-for-you", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Jobs fetched successfully:", data);
    return { success: true, data: data.jobs }; // Assuming the API returns a 'jobs' array
  } catch (error: any) {
    console.error("❌ Failed to fetch jobs:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch jobs. Try again.",
    };
  }
};






// ✅ User Job seeker form Role API (with Authorization Token)
export const createJobSeekerProfileManagement = async (
  fullName: string,
  bio: string,
  skills: string[],
  interests: string[],
  resume: File,
  token: string
) => {
  try {
    console.log("🔄 Submitting job seeker profile...");

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("shortBio", bio);
    formData.append("resume", resume);

     // Important: use the same key `skills[]` for each item
     skills.forEach((skill) => formData.append("skills[]", skill));

     interests.forEach((interest) => formData.append("interests[]", interest));
 
    // Log formData entries to the console
    formData.forEach((value, key) => {
      console.log(`${key}:`, value); // Logs each field and its value
    });

    const { data } = await publicRequest.patch("/profile/update-profile-jobseeker", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Profile updated successfully:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Profile updated error:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to updated profile. Try again.",
    };
  }
};
