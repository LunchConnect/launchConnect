"use client";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import PostModal from "./PostModal";
import { postJob } from "@/actions/action";

interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  skills: string;
  jobType: string;
  industry: string[];
  paidroll: string[];
  deadline: string;
  location: string;
  commitmentlevel: string;
}

const PostJobContent: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postedJob, setPostedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState<string>("");
  const [industry, setIndustry] = useState<string[]>([]);
  const [paidroll, setPaidroll] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [commitmentlevel, setCommitmentlevel] = useState("");

  // Dropdown toggles
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isPaidrollOpen, setIsPaidrollOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);

  // Options
  const jobTypeOptions = ["Entry-Roll", "Volunteer", "Internship"];
  const industryOptions = [
    "Technology",
    "Commerce",
    "Telecommunication",
    "Hotel & Tourism",
    "Education",
    "Financal Services",
    "Health",
  ];
  const roleOptions = ["Not Paid", "Paid"];

  const handleIndustryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIndustry((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handlePaidrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPaidroll((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleJobtypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobType(e.target.value); // only allow one
    setIsJobTypeOpen(false); // auto-close dropdown
  };

  const handleSubmit = async () => {
    if (
      !jobTitle ||
      !jobDescription ||
      !jobType ||
      industry.length === 0 ||
      paidroll.length === 0 ||
      !deadline
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token"); // ✅ Add this line

    if (!token) {
      alert("You must be logged in to post a job.");
      setIsLoading(false);
      return;
    }

    const newJob = {
      id: crypto.randomUUID(),
      title: jobTitle,
      description: jobDescription,
      responsibilities,
      skills,
      jobType,
      industry,
      paidroll,
      deadline,
      location,
      commitmentlevel,
    };

    try {
      const response = await postJob(newJob, token);
      if (response?.success) {
        setPostedJob(newJob);
        setIsModalOpen(true);
      } else {
        alert("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const countWords = (text: string) => text.trim().split(/\s+/).length;
  const maxResponsibilitiesWords = 100;

  if (countWords(responsibilities) > maxResponsibilitiesWords) {
    alert("Responsibilities must be under 100 words.");
    return;
  }

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
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
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
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={5}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="Provide a brief overview of the role, its purpose, and how it contributes to the company."
          />
          <p className="text-sm text-[#344054] cal_sans flex justify-end">
            600 Words Max
          </p>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Key Responsibilities <span className="text-red-600 text-lg">*</span>
          </label>
          <textarea
            value={responsibilities}
            rows={5}
            onChange={(e) => setResponsibilities(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            placeholder="List the main duties and tasks expected in this role. Be specific about daily and long-term responsibilities"
          />
          <p className="text-sm text-[#344054] cal_sans flex justify-end">
            100 Words Max
          </p>
        </div>

        {/* Required Skills */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Required Skills <span className="text-red-600 text-lg">*</span>
          </label>
          <textarea
            value={skills}
            rows={5}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            placeholder="Mention any additional skills or experiences that would be beneficial but are not required."
          />
          <p className="text-sm text-[#344054] cal_sans flex justify-end">
            50 Words Max
          </p>
        </div>

        {/* Job Type Dropdown ------------------------------------------------------------*/}
        <div className="mb-4 relative">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Job Type <span className="text-red-600 text-lg">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsJobTypeOpen((prev) => !prev)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-left relative"
          >
            <span
              className={jobType.length > 0 ? "text-black" : "text-[#A3A3A5]"}
            >
              {jobType ? jobType : "Select Job Type"}
            </span>
            <IoIosArrowDown size={20} className="absolute right-3 top-4" />
          </button>
          {isJobTypeOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div className="flex flex-col p-3">
                {jobTypeOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center mb-2 relative"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={jobType.includes(option)}
                      onChange={handleJobtypeChange}
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

        {/* Industry Dropdown with Click-to-Toggle--------------------------------------------------- */}
        <div className="mb-4 relative">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Industry <span className="text-red-600 text-lg">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsIndustryOpen((prev) => !prev)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-left relative"
          >
            <span
              className={industry.length > 0 ? "text-black" : "text-[#A3A3A5]"}
            >
              {industry.length > 0 ? industry.join(", ") : "Select Industry"}
            </span>
            <IoIosArrowDown size={20} className="absolute right-3 top-4" />
          </button>
          {isIndustryOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div className="flex flex-col p-3">
                {industryOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center mb-2 relative"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={industry.includes(option)}
                      onChange={handleIndustryChange}
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

        {/* Paid Roll Dropdown with Click-to-Toggle ---------------------------------------------------*/}
        <div className="mb-4 relative">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Is This A Paid Role? <span className="text-red-600 text-lg">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsPaidrollOpen((prev) => !prev)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-left relative"
          >
            <span
              className={paidroll.length > 0 ? "text-black" : "text-[#A3A3A5]"}
            >
              {paidroll.length > 0
                ? paidroll.join(", ")
                : "Select Paid Roll Level"}
            </span>
            <IoIosArrowDown size={20} className="absolute right-4 top-4" />
          </button>
          {isPaidrollOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div className="flex flex-col p-3">
                {roleOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center mb-2 relative"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={paidroll.includes(option)}
                      onChange={handlePaidrollChange}
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

        {/* Application Deadline */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#344054] DM_sans">
            Application Deadline <span className="text-red-600 text-lg">*</span>
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
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
            value={commitmentlevel}
            onChange={(e) => setCommitmentlevel(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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

        {/* Render modal */}
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
