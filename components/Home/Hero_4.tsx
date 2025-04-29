"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { getFindJobs } from "@/actions/action";
import { LuWallet } from "react-icons/lu";
import { scrollToTop } from "@/lib/utils";
import Image from "next/image";

interface Job {
  id: string;
  title: string;
  paidRole: string;
  location: string;
  jobType: string;
  industry: string;
  createdAt: string;
  imageUrl: string;
  company: {
    companyName: string;
    companyLogo: string | null;
  };
}

const Hero4: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Fetching jobs...");
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Remove pagination parameters if not needed
        const data = await getFindJobs(1, 8);

        // Transform the data to match your component's expectations
        const formattedJobs =
          data.jobs?.map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.company.name || "Unknown Company",
            paidRole: job.paidRole === "PAID" ? "Paid" : "Not Paid",
            location: job.location,
            jobType: job.jobType,
            industry: job.industry,
            createdAt: job.createdAt,
            imageUrl: "https://via.placeholder.com/40",
          })) || [];

        setJobs(formattedJobs);
      } catch (error) {
        console.error("Job Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handlefindJob = () => {
    router.push("/findjobs");
    scrollToTop();
  };

  if (isLoading) {
    return (
      <section className="bg-white section md:px-[10%] py-10 md:py-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-[#08230E] cal_sans">
            Featured jobs
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-[#F5FFF7] p-6 rounded-xl shadow-sm border border-[#E7EFE8] animate-pulse"
            >
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-4 mt-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 mt-2 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 mt-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white section md:px-[10%] py-10 md:py-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-[#08230E] cal_sans">
          Featured jobs
        </h2>
        <button
          onClick={handlefindJob}
          className="text-green-600 gap-3 items-center font-semibold cursor-pointer hidden md:flex"
        >
          Show all jobs <FaArrowRight size={20} />
        </button>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <div
            onClick={() => {
              router.push(`/job_details/${job.id}`);
              scrollToTop();
            }}
            key={job.id}
            className="bg-[#F5FFF7] p-6 rounded-xl shadow-sm border border-[#E7EFE8] cursor-pointer"
          >
            <div className="flex justify-between items-center">
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
              <span className="DM_sans">
                {job.jobType === "VOLUNTEER" ? (
                  <span className="text-[#56CDAD] text-sm DM_sans font-medium rounded-2xl p-1.5 bg-[#A1E2AF1A]">
                    Volunteer Role
                  </span>
                ) : (
                  <span className="text-[#56CDAD] text-sm DM_sans font-medium rounded-2xl p-1.5 bg-[#A1E2AF1A]">
                    {job.jobType
                      .toLowerCase()
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </span>
                )}
              </span>
            </div>
            <h3 className="text-lg mt-3 cal_sans text-[#3B4D3F]">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2 DM_sans">{job.industry}</p>
            <p className="text-gray-700 font-medium flex items-center gap-2 mt-2">
              <LuWallet />
              {job.paidRole === "Not Paid" ? (
                <span className="text-red-500 bg-[#FFEEEE] px-2 py-1 text-sm font-medium DM_sans">
                  Not Paid
                </span>
              ) : (
                <span className="text-green-600 bg-[#1FC16B1A] px-2 py-1 text-sm font-medium DM_sans">
                  Paid
                </span>
              )}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2 mt-2 DM_sans">
              <CiLocationOn size={17} />
              {job.location}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={handlefindJob}
        className="text-green-600 flex gap-3 items-center mt-5 font-semibold cursor-pointer md:hidden"
      >
        Show all jobs <FaArrowRight size={20} />
      </button>
    </section>
  );
};

export default Hero4;