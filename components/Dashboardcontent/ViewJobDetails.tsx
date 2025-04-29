"use client";
import React, { useState, useEffect } from "react";
import { LuWallet } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbCopy } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { getFindJob, FindJobsData, trackJob } from "@/actions/action";
import { Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";


interface JobDetailsProps {
  jobId: string;
}

interface Company {
  companyName: string;
  industry: string;
  website: string;
  // companyLogo: string | null;
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

const Jobdetails: React.FC<JobDetailsProps> = ({ jobId }) => {
  const [showCopiedBanner, setShowCopiedBanner] = useState(false);
  const [job, setJob] = useState<FindJobsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationJobseeker | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await getFindJob(token, jobId);
        if (response.success && response.job) {
          setJob(response.job);

          const trackedData = await trackJob({ token });

          const matchedApplication = trackedData.applications?.find(
            (app: ApplicationJobseeker) => app.jobId === jobId
          );

          if (matchedApplication) {
            setApplicationStatus(matchedApplication);
          }
        } else {
          setError(response.message || "Failed to load job details");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleCopyJobDetails = () => {
    const jobUrl = `${window.location.origin}/job_details/${jobId}`;
    const clickableUrl = `${job?.title}\nLink: ${jobUrl}`; 
    if (!job) return;

    const jobText = `
      Job Title: ${job.title}
      Company: ${job.company.companyName}
      Salary: ${job.paidRole}
      Location: ${job.location}
      Job Type: ${job.jobType}

      Job Description:
      ${job.description}

      Responsibilities:
      ${job.responsibilities}

      Required Skills:
      ${job.skillsRequired}

      Application Deadline: ${new Date(job.deadline).toLocaleDateString()}
    `;

    navigator.clipboard.writeText(clickableUrl);
    setShowCopiedBanner(true);
    setTimeout(() => setShowCopiedBanner(false), 2000);
  };

  if (loading) {
    return (
      <div className="px-[4%] py-5 my-10 flex justify-center items-center h-64 text-black">
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-[4%] py-5 my-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => router.push("/dashboard/findjobs")}
          className="mt-4 text-blue-500"
        >
          Back to jobs
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="px-[4%] py-5 my-10">
        <p>Job not found</p>
        <button
          onClick={() => router.push("/dashboard/findjobs")}
          className="mt-4 text-blue-500"
        >
          Back to jobs
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="">
        <div className="px-[4%] md:px-6 py-5 my-10 bg-white border border-[#EDEFF2] rounded-xl">
          <button
            onClick={() => router.push("/dashboard/Application_Tracking")}
            className="flex items-center gap-2 text-black text-xl cal_sans pb-5"
          >
            <IoIosArrowBack size={20} />
            <span className="mt-1">Back</span>
          </button>

          {/* Job Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4">
            <div className="flex items-center gap-2">
            {job.company.companyLogo ? (
              <Image
                src={job.company.companyLogo}
                alt={`${job.company.companyName} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                {job.title.charAt(0).toUpperCase()}
              </div>
            )}
              <h1 className="text-2xl text-[#243428] cal_sans">{job.title}</h1>
            </div>
            {applicationStatus?.status && (
              <button
                className={`px-4 py-2 rounded-3xl cal_sans hidden md:block ${
                  applicationStatus.status === "PENDING"
                    ? "bg-[#E8E8E8] text-[#4A4A4A]"
                    : applicationStatus.status === "ACCEPTED"
                      ? "bg-[#E8F5EE] text-[#1FC16B]"
                      : "bg-[#FFEEEE] text-[#FF4D4D]"
                }`}
              >
                {applicationStatus.status}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2 space-y-2 md:space-y-0 DM_sans">
            <Image
              src="/assets/images/location.png"
              alt=""
              width={16}
              height={19.76}
            />
            <p className="text-[#777777]">{job.company.companyName}</p>
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

          <div className="flex items-center gap-3 text-[#1AC23F] mt-2 cal_sans">
            <div className="relative flex items-center">
              {/* Styled checkbox with Tailwind for consistent UI */}
              <input
                type="checkbox"
                className="custom-checkbox-modal peer"
                checked
                disabled
              />
              {/* Check icon overlay (only visible if checked) */}
              <Check className="absolute inset-0 m-auto w-4 h-4 text-white peer-checked:block hidden pointer-events-none" />
            </div>
            {applicationStatus?.appliedAt && (
              <p className="md:text-xl mt-1">
                You applied{" "}
                {formatDistanceToNow(new Date(applicationStatus.appliedAt), {
                  addSuffix: true,
                })}
              </p>
            )}
          </div>
          {applicationStatus?.status && (
            <button
              className={`px-4 py-2 rounded-3xl cal_sans md:hidden mt-3 ${
                applicationStatus.status === "PENDING"
                  ? "bg-[#E8E8E8] text-[#4A4A4A]"
                  : applicationStatus.status === "ACCEPTED"
                    ? "bg-[#E8F5EE] text-[#1FC16B]"
                    : "bg-[#FFEEEE] text-[#FF4D4D]"
              }`}
            >
              {applicationStatus.status}
            </button>
          )}

          {/* Job Details */}
          <div className="flex flex-col gap-6 md:mt-5 mt-8">
            <div className="border bg-[#ffffff] rounded-2xl shadow-sm px-5 py-5 border-[#E7EFE8]">
              {/* Job Description */}
              <section className="pb-7 relative border-b border-[#E7EFE8] md:border-b-0">
                <span className="absolute bottom-0 -left-5 w-[100.5%] border-b border-[#E7EFE8] hidden md:block"></span>
                <h2 className="text-xl cal_sans text-[#3D4C41]">
                  Job Description
                </h2>
                <p className="text-[#606060] mt-2 DM_sans whitespace-pre-line">
                  {job.description}
                </p>
              </section>

              {/* Key Responsibilities */}
              <section className="mt-6 pb-7 relative border-b border-[#E7EFE8] md:border-b-0">
                <span className="absolute bottom-0 -left-5 w-[100%] border-b border-[#E7EFE8] hidden md:block"></span>
                <h2 className="text-xl cal_sans text-[#3D4C41]">
                  Key Responsibilities
                </h2>
                <ul className="list-disc ml-5 mt-2 text-gray-700 DM_sans whitespace-pre-line">
                  {job.responsibilities
                    .split("\n")
                    .map(
                      (responsibility, index) =>
                        responsibility.trim() && (
                          <li key={index}>{responsibility}</li>
                        )
                    )}
                </ul>
              </section>

              {/* Required Skills */}
              <section className="mt-6">
                <h2 className="text-xl cal_sans text-[#3D4C41]">
                  Required Skills
                </h2>
                <ul className="list-disc ml-5 mt-2 text-[#606060] DM_sans whitespace-pre-line">
                  {job.skillsRequired
                    .split("\n")
                    .map(
                      (skill, index) =>
                        skill.trim() && <li key={index}>{skill}</li>
                    )}
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

            {/* Company Insights */}
            <div className="bg-[#F5FFF7] p-4 rounded-2xl shadow">
              <h2 className="text-[17px] mb-4 text-[#01011A] cal_sans">
                Explore company insights
              </h2>
              <ul className="grid grid-rows-1 md:grid-cols-3 gap-x-10 gap-y-4 text-xl">
                <li className="text-gray-700">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/assets/images/img1.png"
                      alt="Company"
                      width={20}
                      height={20}
                    />
                    <div>
                      <strong className="block cal_sans text-[#3B4D3F]">
                        Company Name
                      </strong>
                      <div className="text-[15px] DM_sans">
                        {job.company.companyName}
                      </div>
                    </div>
                  </div>
                </li>

                <li className="text-gray-700">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/assets/images/img2.png"
                      alt="Industry"
                      width={20}
                      height={20}
                    />
                    <div>
                      <strong className="block cal_sans text-[#3B4D3F]">
                        Industry
                      </strong>
                      <div className="text-[15px] DM_sans">
                        {job.company.industry}
                      </div>
                    </div>
                  </div>
                </li>

                <li className="text-gray-700">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/assets/images/img3.png"
                      alt="Website"
                      width={20}
                      height={20}
                    />
                    <div>
                      <strong className="block cal_sans text-[#3B4D3F]">
                        Website
                      </strong>
                      <div className="text-[15px] DM_sans">
                        <a
                          href={job.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline break-words max-w-[200px] block"
                        >
                          {job.company.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="text-gray-700">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/assets/images/img5.png"
                      alt="Deadline"
                      width={20}
                      height={20}
                    />
                    <div>
                      <strong className="block cal_sans text-[#3B4D3F]">
                        Application Deadline
                      </strong>
                      <div className="text-[15px] DM_sans">
                        {new Date(job.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </li>

                <li className="text-gray-700">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/assets/images/img6.png"
                      alt="Commitment"
                      width={20}
                      height={20}
                    />
                    <div>
                      <strong className="block cal_sans text-[#3B4D3F]">
                        Commitment Level
                      </strong>
                      <div className="text-[15px] DM_sans">
                        {job.commitmenLevel}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* <RelatedJobs /> */}
          {/* Apply Job Modal */}
        </div>
      </section>
    </>
  );
};

export default Jobdetails;
