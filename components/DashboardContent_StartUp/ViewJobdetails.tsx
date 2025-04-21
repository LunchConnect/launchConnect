"use client";
import React, { useState, useEffect } from "react";
import { LuWallet } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbCopy } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";
import { getSingleJob, SingleJobData, deleteJob } from "@/actions/action";
import RecentApplication from "./RecentApplication";

interface JobDetailsProps {
  jobId: string;
}

const ViewJobDetails: React.FC<JobDetailsProps> = ({ jobId }) => {
  const router = useRouter();
  const [isDeleteJob, setIsdeleteJob] = useState(false);
  const [job, setJob] = useState<SingleJobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCopiedBanner, setShowCopiedBanner] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");
      try {
        console.log("Fetching job with ID:", jobId);
        const { job } = await getSingleJob(token, jobId);
        setJob(job);
      } catch (err) {
        setError("Failed to load job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleCopyJobDetails = () => {
    if (!job) return;
    const text = `
      Job Title: ${job.title}
      Company ID: ${job.companyId}
      Salary: ${job.paidRole}
      Location: ${job.location}
      Job Type: ${job.jobType}
      Deadline: ${new Date(job.deadline).toLocaleDateString()}

      Description: ${job.description}
      Responsibilities: ${job.responsibilities}
      Required Skills: ${job.skillsRequired}
    `;

    navigator.clipboard.writeText(text);
    setShowCopiedBanner(true);
    setTimeout(() => setShowCopiedBanner(false), 2000);
  };

  const handleDeleteJob = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a job.");
      return;
    }
    try {
      await deleteJob(token,jobId);
      router.push("/startup_founder_dashboard/PostJob");
    } catch (error) {
      console.error("Failed to delete job:", error);
      setError("Failed to delete job. Please try again.");
    } finally {
      setIsdeleteJob(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!job) return <div className="p-8">Job not found</div>;

  return (
    <section className="">
      <div className="my-10">
        <button
          onClick={() => router.push("/startup_founder_dashboard/PostJob")}
          className="flex items-center gap-2 text-black text-xl cal_sans"
        >
          <IoIosArrowBack size={20} className="" />
          <span className="mt-1">Back</span>
        </button>
      </div>
      <div className="px-[4%] md:px-6 py-3 bg-white border border-[#EDEFF2] rounded-2xl">
        <div key={job.id}>
          {/* Job Header */}
          <div className="flex flex-row justify-between items-center space-y-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl text-[#243428] cal_sans">{job.title}</h1>
            </div>
            <div className="relative flex items-center">
              <button
                onClick={() => setIsdeleteJob(!isDeleteJob)}
                className="text-[#4A4A4A] border border-[#D0D5DD] px-4 py-1 rounded-md cursor-pointer cal_sans"
              >
                <HiDotsHorizontal />
              </button>

              {isDeleteJob && (
                <div className="absolute right-full mr-2 -bottom-7 flex items-center gap-2 px-8 py-2 bg-white border border-[#EDEFF2] rounded shadow-md transition-opacity">
                  <FiTrash2 size={20} className="text-[#FC0202]" />
                  <button
                    onClick={handleDeleteJob}
                    className="text-[#FC0202] whitespace-nowrap"
                  >
                    Delete Job
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 space-y-2 md:space-y-0 DM_sans">
            <Image
              src="/assets/images/location.png"
              alt=""
              width={16}
              height={19.76}
            />
            {/* Changed from company to industry since company isn't in SingleJobData */}
            <p className="text-[#777777]">{job.industry}</p>
          </div>

          <div className="flex items-center gap-2 DM_sans">
            <div className="flex items-center gap-2 mt-2">
              <LuWallet color="#777777" />
              <p className="flex items-center gap-1 text-[14px]">
                {job.paidRole === "UNPAID" ? (
                  <span className="text-red-500 bg-[#FFEEEE] px-2 py-1 text-sm font-medium DM_sans">
                    Not Paid
                  </span>
                ) : (
                  <span className="text-green-600 bg-[#1FC16B1A] px-2 py-1 text-sm font-medium DM_sans">
                    Paid
                  </span>
                )}
              </p>
            </div>
            <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
              <CiLocationOn size={17} />
              {job.location}
            </p>
          </div>

          {/* Job Details */}
          <div className="flex flex-col gap-6 md:mt-5 mt-8">
            <div className="border bg-[#ffffff] rounded-2xl shadow-sm px-5 py-5 border-[#E7EFE8]">
              {/* Job Description */}
              <section className="pb-7 relative border-b border-[#E7EFE8] md:border-b-0">
                <span className="absolute bottom-0 -left-5 w-[100.5%] border-b border-[#E7EFE8] hidden md:block"></span>
                <h2 className="text-xl cal_sans text-[#3D4C41]">
                  Job Description
                </h2>
                <p className="text-[#606060] mt-2 DM_sans">{job.description}</p>
              </section>

              {/* Key Responsibilities */}
              <section className="mt-6 pb-7 relative border-b border-[#E7EFE8] md:border-b-0">
                <span className="absolute bottom-0 -left-5 w-[100%] border-b border-[#E7EFE8] hidden md:block"></span>
                <h2 className="text-xl cal_sans text-[#3D4C41]">
                  Key Responsibilities
                </h2>
                <ul className="list-disc ml-5 mt-2 text-gray-700 DM_sans">
                  {job.responsibilities
                    .split("\n")
                    .map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                </ul>
              </section>

              {/* Required Skills */}
              <section className="mt-6">
                <h2 className="text-xl cal_sans text-[#3D4C41]">
                  Required Skills
                </h2>
                <ul className="list-disc ml-5 mt-2 text-[#606060] DM_sans">
                  {job.skillsRequired.split("\n").map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Share Job */}
            <div className="mt-6 flex items-start gap-2">
              <span className="text-[#606060] font-semibold text-[20px] md:text-[19px] cal_sans">
                Share Job:
              </span>
              <TbCopy
                size={25}
                className="text-black cursor-pointer"
                onClick={handleCopyJobDetails}
              />
            </div>

            {/* Copied Banner */}
            {showCopiedBanner && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded shadow-md transition-all duration-300 z-50">
                Link copied to clipboard!
              </div>
            )}
          </div>
        </div>

        {/* Applications Section */}
        <div className="mt-8">
          <RecentApplication applications={job.applications} />
        </div>
      </div>
    </section>
  );
};

export default ViewJobDetails;