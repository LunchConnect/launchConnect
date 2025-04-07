"use client";
import React from "react";
import { FiLink } from "react-icons/fi";
import { createStartupFounderProfile } from "@/actions/action";  // 
import { useRouter } from "next/navigation"; // ✅ To 
import AlertModal from "@/components/AlertModal";
const Startup = () => {

  const [fullName, setFullName] = React.useState("");
const [companyName, setCompanyName] = React.useState("");
const [industry, setIndustry] = React.useState("");
const [website, setWebsite] = React.useState("");
const [roleInCompany, setroleInCompany] = React.useState("");

  // Modal State
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"success" | "error">("success");
 const [modalMessage, setModalMessage] = React.useState("");

  const router = useRouter(); // ✅ Router for redirection


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Authentication token not found. Please log in again.");
    return;
  }

  // Check if all required fields are filled
  if (!fullName || !companyName || !industry || !website || !roleInCompany) {
    alert("Please fill in all the required fields.");
    return;
  }

  const role = "company"; 

  const result = await createStartupFounderProfile(
    fullName,
    companyName,
    industry,
    website,
    roleInCompany,
    role,
    token
  );

  if (result.success) {
    setModalType("success");
    setModalMessage("You have successfully created a start up");
    console.log("Profile created successfully:", result);
    setTimeout(() => router.push("/sign_in"), 2000); // ✅ 
  } else {
    setModalType("error");
    setModalMessage(result.message || "Error creating profile:");
    console.error("Error creating profile:", result);
  }
};
  return (
    <div className="flex flex-col items-center min-h-screen ">
      <div className="w-full max-w-lg">
        {/* Header */}
        <h1 className="text-[32px] font-bold text-black">
          Set Up Your Startup Founder Profile
        </h1>
        <p className="text-[#606060] text-[16px] mt-1">
          Help potential team members and investors learn about your startup, showcase your vision, mission, and opportunities.
        </p>

        {/* Form */}
        <form className="mt-4 space-y-3"  onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="text-[16px] text-[#4A4A4A] font-medium block mb-1">Full Name</label>
            <input
              type="text"
              placeholder="eg. Ikenna Okafor"
              className="w-full p-2 border bg-[#777777] text-[14px] rounded-md"
              value={fullName}
  onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="text-[16px] text-[#4A4A4A]  font-medium block mb-1">Company Name</label>
            <input
              type="text"
              placeholder="eg. LaunchConnect Limited"
              className="w-full p-2 border bg-[#777777] text-[14px]  rounded-md"
              value={companyName}
  onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Industry */}
          <div>
            <label className="text-[16px] text-[#4A4A4A]  font-medium block mb-1">Industry</label>
            <input
              type="text"
              placeholder="eg. AI-Powered SaaS"
              className="w-full p-2 border bg-[#777777] text-[14px]  rounded-md"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          {/* Website */}
          <div className="relative">
            <label className="text-[16px] text-[#4A4A4A]  font-medium block mb-1">Website</label>
            <div className="relative">
              <input
                type="text"
                placeholder="eg. enter your website URL"
                className="w-full p-2 border rounded-md bg-[#777777] text-[14px]  pr-8"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              {/* Website Icon */}
              <FiLink className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>

          {/* Role in Startup */}
          <div>
            <label className="text-[16px] text-[#4A4A4A]  font-medium block mb-1">Role in Startup</label>
            <input
              type="text"
              placeholder="eg. Co-Founder"
              className="w-full p-2 border bg-[#777777] text-[14px]  rounded-md"
              value={roleInCompany}
              onChange={(e) => setroleInCompany(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md mt-3"
          >
            Save & Continue
          </button>
        </form>
      </div>

        {/* ✅ Success & Error Modal */}
        <AlertModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAction={() => setModalOpen(false)}
        type={modalType}
        title={modalType === "success" ? "Account Creation Successful" : "Incorrect Login Details"}
        description={modalMessage}
        buttonText={modalType === "success" ? "Proceed to Dashboard" : "Retry"}
      />
    </div>
  );
};

export default Startup;
