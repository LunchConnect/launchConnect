"use client";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import PostModal from "./PostModal";
import { postJob } from "@/actions/action";

interface Job {
  title: string;
  description: string;
  responsibilities: string;
  skillsRequired: string;
  jobType: string;
  industry: string;
  paidRole: string;
  deadline: string;
  location: string;
  commitmenLevel: string;
}

const jobTypeOptions = ["FULL_TIME", "PART_TIME", "INTERNSHIP"];
const industryOptions = [
  "Technology",
  "Commerce",
  "Telecommunications",
  "Hotels & Tourism",
  "Education",
  "Financal Services",
  "Health",
];
const roleOptions = ["UNPAID", "PAID"];

const PostJobContent: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postedJob, setPostedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    responsibilities: "",
    skills: "",
    jobType: "",
    industry: [] as string[],
    paidRole:"",
    deadline: "",
    location: "",
    commitmenlevel: "",
  });

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState({
    industry: false,
    paidRole: false,
    jobType: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const wordLimitMap: Record<string, number> = {
      jobDescription: 600,
      responsibilities: 100,
      skills: 50,
    };

    if (wordLimitMap[name]) {
      const words = value.trim().split(/\s+/);
      if (words.length > wordLimitMap[name]) return; // Block input
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange =
    (field: "industry") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter((i) => i !== value)
          : [...prev[field], value],
      }));
    };

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, jobType: e.target.value }));
    setDropdownOpen((prev) => ({ ...prev, jobType: false }));
  };

   const handlePaidRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData((prev) => ({ ...prev, paidRole: e.target.value }));
     setDropdownOpen((prev) => ({ ...prev, paidRole: false }));
   };

  const toggleDropdown = (dropdown: keyof typeof dropdownOpen) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  const countWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const maxWords = {
    jobDescription: 600,
    responsibilities: 100,
    skills: 50,
  };

  const validateForm = () => {
    const requiredFields = [
      formData.jobTitle,
      formData.jobDescription,
      formData.responsibilities,
      formData.skills,
      formData.jobType,
      formData.industry.length > 0,
      formData.paidRole,
      formData.deadline,
      formData.location,
      formData.commitmenlevel,
    ];

    if (requiredFields.some((field) => !field)) {
      alert("Please fill all required fields.");
      return false;
    }

    if (countWords(formData.jobDescription) > 600) {
      alert("Job Description must be under 600 words.");
      return false;
    }

    if (countWords(formData.responsibilities) > 100) {
      alert("Responsibilities must be under 100 words.");
      return false;
    }

    if (countWords(formData.skills) > 50) {
      alert("Required Skills must be under 50 words.");
      return false;
    }
    return true;
  };


  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to post a job.");
      setIsLoading(false);
      return;
    }

    const newJob = {
      title: formData.jobTitle,
      description: formData.jobDescription,
      responsibilities: formData.responsibilities,
      skillsRequired: formData.skills,
      jobType: formData.jobType,
      industry: formData.industry.join(", "),
      paidRole: formData.paidRole,
      deadline: new Date(formData.deadline).toISOString(),
      location: formData.location,
      commitmenLevel: formData.commitmenlevel,
    };

    try {
      const response = await postJob(newJob, token);
      console.log("API Response:", response);

      const resetForm = () => {
        setFormData({
          jobTitle: "",
          jobDescription: "",
          responsibilities: "",
          skills: "",
          jobType: "",
          industry: [],
          paidRole: "",
          deadline: "",
          location: "",
          commitmenlevel: "",
        });

        setDropdownOpen({
          industry: false,
          paidRole: false,
          jobType: false,
        });
      };

      // Check for successful response (201 Created)
      if (response.status === 201) {
        setPostedJob(newJob);
        setIsModalOpen(true);
        resetForm();
      } else {
        alert(`Job posted but with unexpected status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Post job error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to post job. Please try again."
        );
      } else {
        alert("An error occurred. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  const renderDropdown = (
    name: keyof typeof dropdownOpen,
    label: string,
    options: string[],
    selected: string[],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required = true
  ) => (
    <div className="mb-4 relative">
      <label className="block text-sm font-semibold text-[#344054] DM_sans">
        {label} {required && <span className="text-red-600 text-lg">*</span>}
      </label>
      <button
        type="button"
        onClick={() => toggleDropdown(name)}
        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-left relative"
      >
        <span className={selected.length > 0 ? "text-black" : "text-[#A3A3A5]"}>
          {selected.length > 0 ? selected.join(", ") : `Select ${label}`}
        </span>
        <IoIosArrowDown size={20} className="absolute right-3 top-4" />
      </button>
      {dropdownOpen[name] && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="flex flex-col p-3">
            {options.map((option) => (
              <label key={option} className="flex items-center mb-2 relative">
                <input
                  type="checkbox"
                  value={option}
                  checked={selected.includes(option)}
                  onChange={onChange}
                  className="custom-checkbox mr-2"
                />
                <Check className="absolute top-1 text-white w-4 h-4" />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="my-20">
        <button
          onClick={() => router.push("/startup_founder_dashboard/PostJob")}
          className="flex items-center gap-2 text-black text-xl cal_sans"
        >
          <IoIosArrowBack size={20} />
          <span className="mt-1">Back</span>
        </button>
      </div>
      <div className="px-[4%] md:px-5 py-5 -my-5 bg-white border border-[#EDEFF2] rounded-2xl mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-[#1F2937] DM_sans">
          Post a Job Now
        </h2>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Job Title <span className="text-red-600 text-lg">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            placeholder="Software Engineer"
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Job Description <span className="text-red-600 text-lg">*</span>
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            rows={5}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="Provide a brief overview of the role, its purpose, and how it contributes to the company."
          />
          <p className="text-sm text-[#344054] cal_sans flex justify-end">
            {countWords(formData.jobDescription) === 0
              ? "600 Words max"
              : `${maxWords.jobDescription - countWords(formData.jobDescription)} words remaining`}
          </p>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Key Responsibilities <span className="text-red-600 text-lg">*</span>
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            rows={5}
            onChange={handleInputChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            placeholder="List the main duties and tasks expected in this role."
          />
          <p className="text-sm text-[#344054] cal_sans flex justify-end">
            {countWords(formData.responsibilities) === 0
              ? "100 Words max"
              : `${maxWords.responsibilities - countWords(formData.responsibilities)} words remaining`}
          </p>
        </div>

        {/* Required Skills */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Required Skills <span className="text-red-600 text-lg">*</span>
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            rows={5}
            onChange={handleInputChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            placeholder="Mention any additional skills or experiences that would be beneficial."
          />
          <p className="text-sm text-[#344054] cal_sans flex justify-end">
            {countWords(formData.skills) === 0
              ? "50 Words max"
              : `${maxWords.skills - countWords(formData.skills)} words remaining`}
          </p>
        </div>

        {/* Job Type Dropdown */}
        {renderDropdown(
          "jobType",
          "Job Type",
          jobTypeOptions,
          formData.jobType ? [formData.jobType] : [],
          handleJobTypeChange
        )}

        {/* Industry Dropdown */}
        {renderDropdown(
          "industry",
          "Industry",
          industryOptions,
          formData.industry,
          handleMultiSelectChange("industry")
        )}

        {/* Paid Role Dropdown */}
        {renderDropdown(
          "paidRole",
          "Is This A Paid Role?",
          roleOptions,
          formData.paidRole ? [formData.paidRole] : [],
          handlePaidRoleChange
        )}

        {/* Application Deadline */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Application Deadline <span className="text-red-600 text-lg">*</span>
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Commitment Level */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Commitment Level
          </label>
          <input
            type="text"
            name="commitmenlevel"
            value={formData.commitmenlevel}
            onChange={handleInputChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            placeholder="e.g Part-time (10-15 hours per week) for 3 months"
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm text-[#344054] DM_sans font-semibold">
            Location Of Role
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            placeholder="Remote"
          />
        </div>

        {/* Submit Button */}
        <div className="flex">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-5 py-3 rounded-md cal_sans transition ml-auto disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post Job Now"}
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && postedJob && (
          <PostModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            job={postedJob}
          />
        )}
      </div>
    </>
  );
};

export default PostJobContent;
