import {publicRequest} from "@/utils/axiosInstance";



type LoginResponse = 
  | { success: true; data: any }
  | { success: false; message: string; token?: string; redirectTo?: string };

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




export const login = async (email: string, password: string): Promise<LoginResponse> => {
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

    const fallbackMessage = "Login failed. Please check your credentials.";
    const res = error.response?.data || {};

    return { 
      success: false, 
      message: res.error || res.message || fallbackMessage,
      token: res.token,
      redirectTo: res.redirectTo,
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
export const updateUserRole = async (role: "startupFounder" | "job_seeker", token: string) => {
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










// updatePassword
export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
  token: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await publicRequest.post(
      "/password/dash-reset-password",
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, message: data?.message || "Password updated successfully" };
  } catch (error: any) {
    console.error("❌ Password update error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Password update failed",
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


// ✅ User Start up update  API (with Authorization Token)
  export const updateStartupFounderProfile = async (
    fullName: string,
    companyName: string,
    industry: string,
    website: string,
    roleInCompany: string,
    companyLogo: File,
    token: string
  ) => {
    try {
      console.log("🔄 Submitting start up profile...");
      const { data } = await publicRequest.patch("/profile//update-profile-startupfounders", {
        fullName,
        companyName,
        industry,
        website,
        companyLogo,
        roleInCompany,
        token
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { success: true, data };
    } catch (error: any) {
      console.error("Error updating founder profile:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update founder profile.",
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
    console.error("Failed to fetch job seeker summary:", error.response?.data || error.message);
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
























//--------------------------------------------Jude's Code------------------------------------------------->

//For Job Posting For Startup Founder ---------------------------------------------------->
interface JobData {
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  industry: string;
  paidRole: string;
  commitmenLevel: string;
  deadline: string;
  location: string;
  jobType: string;
}


export const postJob = async (jobData: JobData, token: string) => {
  try {
    const response = await publicRequest.post("/job/post-job", jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return response.data;
    return {
      status: response.status,
      data: response.data,
      fullResponse: response,
    };
  } catch (error: any) {
    console.error("Error posting job:", error.response?.data || error.message);
    throw error;
  }
};


//For Job Post Management Startup-founder---------------------------------------------------->
interface AllJobData {
  id: string;
  companyId: string;
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  industry: string;
  paidRole: string;
  deadline: string;
  commitmenLevel: string;
  location: string;
  jobType: string;
  createdAt: string;
}

interface JobsResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  jobs: AllJobData[];
}

export const getJobs = async (
  token: string,
  page: number = 1,
  pageSize: number = 5
): Promise<JobsResponse> => {
  try {
    const response = await publicRequest.get(
      `/job/jobs?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching jobs:",
      error.response?.data || error.message
    );
    throw error;
  }
};


//For Manage Jobs by ID Startup Founder--------------------------------------------------------->
export interface JobSeeker {
  id: string;
  resumeUrl: string;
  skills: string[];
  interests: string[];
  fullName: string;
  shortBio: string;
  user: { email: string };
}

export interface JobApplication {
  jobRole: string;
  applicationDate: string;
  id: string;
  jobId: string;
  jobSeekerId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: string;
  jobSeeker: JobSeeker;
}

export interface SingleJobData {
  id: string;
  companyId: string;
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  industry: string;
  paidRole: string;
  deadline: string;
  commitmenLevel: string;
  location: string;
  jobType: string;
  createdAt: string;
  applications: JobApplication[];
}

export interface SingleJobResponse {
  success: boolean;
  job: SingleJobData;
}

export const getSingleJob = async (
  token: string,
  jobId: string
): Promise<SingleJobResponse> => {
  try {
    const response = await publicRequest.get(`/job/single-job/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Use dynamic token
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw error; // Re-throw for component-level handling
  }
};


//For Job Delete ------------------------------------------------------------------------------------->
export const deleteJob = async (token: string, jobId: string) => {
  try {
    const response = await publicRequest.delete(`/job/delete-job/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error; // Re-throw the error for handling in the component
  }
};


// For Get All Job Application For (Startup founder)--------------------------------------------------->
interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  industry: string;
  paidRole: string;
  deadline: string;
  commitmenLevel: string;
  location: string;
  jobType: string;
  createdAt: string;
}

interface JobSeekers {
  portfolioLink: any;
  user: {
    email: string;
  };
  id: string;
  fullName: string;
  shortBio: string;
  resumeUrl: string;
  skills: string[];
  interests: string[];
}

interface Application {
  shortBio: any;
  resumeSize: any;
  resumeFileName: any;
  resumeUrl: any;
  id: string;
  jobId: string;
  jobSeekerId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: string;
  job: Job;
  jobSeeker: JobSeekers;
}

interface ApplicantCountPerJob {
  jobId: string;
  title: string;
  applicantCount: number;
}

interface AllJobApplicationsResponse {
  totalApplications: number;
  page: number;
  pageSize: number;
  totalPages: number;
  applications: Application[];
  applicantCountPerJob: ApplicantCountPerJob[];
}

export const getAllJobApplications = async (
  token: string,
  page: number = 1,
  limit: number = 5
): Promise<AllJobApplicationsResponse> => {
  try {
    const response = await publicRequest.get(
      `/job/applications/all-application-startupfounders?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching job applications:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// For Findjobs (JobSeeker & Random Jobs) ---------------------------------------------------------------->
interface AllJobData {
  id: string;
  companyId: string;
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  industry: string;
  paidRole: string;
  deadline: string;
  commitmenLevel: string;
  location: string;
  jobType: string;
  createdAt: string;
  company: {
    companyName: string;
    companyLogo: string | null;
  };
}

interface JobsResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  jobs: AllJobData[];
  message?: string; // Added optional message field
}

export const getFindJobs = async (
  // token: string,
  page: number,
  pageSize: number,
  filters?: {
    title?: string;
    industry?: string;
    jobType?: string;
  }
): Promise<JobsResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters?.title) queryParams.append("title", filters.title);
    if (filters?.industry) queryParams.append("industry", filters.industry);
    if (filters?.jobType) queryParams.append("jobType", filters.jobType);

   const response = await publicRequest.get(
     `/job/get-random-jobs?${queryParams.toString()}`,
   );


    return {
      jobs: response.data?.jobs || [],
      total: response.data?.total || 0,
      page: response.data?.page || page,
      pageSize: response.data?.pageSize || pageSize,
      totalPages: response.data?.totalPages || 0,
      message: response.data?.message,
    };
  } catch (error: any) {
    console.error("Job Fetch Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      responseData: error.response?.data,
    });

    return {
      jobs: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
      message:
        error.response?.data?.message ||
        "Failed to fetch jobs. Please try again.",
    };
  }
};

//For Findjobs By ID (JobSeeker) ---------------------------------------------------------------->
export interface FindJobsData {
  id: string;
  companyId: string;
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  industry: string;
  paidRole: string;
  deadline: string;
  commitmenLevel: string;
  location: string;
  jobType: string;
  createdAt: string;
  applicationStatus: "PENDING" | "ACCEPTED" | "REJECTED";
  company: {
    companyName: string;
    industry: string;
    website: string;
    companyLogo: string | null;
  };
}

export interface FindJobsResponse {
  success: boolean;
  message?: string;
  job?: FindJobsData; 
  error?: string;
}

export const getFindJob = async (
  token: string,
  jobId: string
): Promise<FindJobsResponse> => {
  try {
    const res = await publicRequest.get<{ job: FindJobsData }>( 
      `/job/singlejob/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response:", res.data);
    if (!res.data?.job) {
      return {
        success: false,
        message: "Job data not found in response",
        error: "invalid_response_structure",
      };
    }

    return {
      success: true,
      job: res.data.job,
    };
  } catch (err: any) {
    console.error("API Error:", err);

    const errorResponse = {
      success: false,
      message: err.response?.data?.message || "Failed to fetch job details",
      error: err.response?.data?.error || "network_error",
    };
    return errorResponse;
  }
};


//For getting jobid in Landing Page --------------------------------------------------------------------------->
export interface JobCompany {
  companyName: string;
  industry: string;
  website: string;
  companyLogo: string | null;
}

export interface FindJobsData {
  id: string;
  companyId: string;
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  industry: string;
  paidRole: string;
  deadline: string;
  commitmenLevel: string;
  location: string;
  jobType: string;
  createdAt: string;
  company: JobCompany;
}

export interface FindJobsResponse {
  success: boolean;
  message?: string;
  job?: FindJobsData;
  error?: string;
}

export const getJobById = async (jobId: string): Promise<FindJobsResponse> => {
  try {
    const { data } = await publicRequest.get<{ job?: FindJobsData }>( // Made optional here too
      `/job/single-job-for-landing/${jobId}`
    );

    return {
      success: true,
      job: data.job, // Will be undefined if not present
    };
  } catch (err: unknown) {
    return {
      success: false,
      // job will be undefined by default (matching the interface)
      message: err instanceof Error ? err.message : "Unknown error",
      error: "api_error",
    };
  }
};


// For Apply Job API (JobSeeker) ----------------------------------------------------------------------->
export interface ApplyJobResponse {
  success: boolean;
  message: string;
  applicationId?: string; 
  application?: {        
    id: string;
    status: string;
    jobId: string;
    jobSeekerId: string;
    appliedAt: string;
  };
}

  export const applyForJob = async (
    token: string, 
    jobId: string,
    applicationData?: {
      name: string;
      email: string;
      coverLetter: string;
      resumeUrl?: string;
    }
  ): Promise<ApplyJobResponse> => {
    try {
      const response = await publicRequest.post(
        `/job/apply/${jobId}`,
        applicationData || {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { application } = response.data;
      return {
        success: true,
        message: response.data.message || "Application submitted successfully",
        applicationId: application.id,
        application,
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit application";

      console.error("Job application failed:", {
        status: error.response?.status,
        data: error.response?.data,
        error: errorMessage,
      });

      return {
        success: false,
        message: errorMessage,
      };
    };
  };


// For Job Tracking in (JobSeeker) -------------------------------------------------------------------->
interface Company {
  companyName: string;
  industry: string;
  website: string;
  companyLogo: string | null;
}

interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  industry: string;
  paidRole: string;
  deadline: string;
  commitmenLevel: string;
  location: string;
  jobType: string;
  createdAt: string;
  company: Company;
}

interface ApplicationJobseeker {
  id: string;
  jobId: string;
  jobSeekerId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: string;
  job: Job;
}

interface TrackJobResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  applications: ApplicationJobseeker[];
}

interface TrackJobParams {
  token: string;
  status?: string;
  page?: number;
  limit?: number;
  industry?: string;
  jobType?: string;
  title?: string;
}

export const trackJob = async (
  params: TrackJobParams
): Promise<TrackJobResponse> => {
  const { token, ...queryParams } = params;

  try {
    const res = await publicRequest.get("/job/applications/my-applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams,
    });

    return res.data;
  } catch (error: any) {
    console.error("Error fetching tracked jobs:", error.response?.data || error.message);
    throw error;
  }
};


//For Updatiing status of the job ------------------------------------------------------
interface UpdateStatusResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const updateJobStatus = async (
  applicationId: string,
  status: string,
  token: string, 
): Promise<UpdateStatusResponse> => {
  try {
    const response = await publicRequest.put(
      `/job/applications/${applicationId}/status`,
      { status }, // Request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to update status";

    console.error("Status update error:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
};




