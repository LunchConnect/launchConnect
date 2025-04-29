"use client";
import { scrollToTop } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { BsDot } from "react-icons/bs";
import { Card } from "./ui/card";
import { getJobs, getAllJobApplications } from "@/actions/action";

interface AllJob {
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

const PostJob: React.FC = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<AllJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 3,
    total: 0,
    totalPages: 1,
  });

  const isJobClosed = useCallback((deadline: string): boolean => {
    return new Date(deadline) < new Date();
  }, []);

  const fetchJobsAndApplications = async (page: number = 1) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No authentication token found.");
      setIsLoading(false);
      return;
    }

    try {
      const [jobData, applicationData] = await Promise.all([
        getJobs(token, page, pagination.pageSize),
        getAllJobApplications(token, page, pagination.pageSize),
      ]);

      setJobs(jobData.jobs);
      setPagination({
        page: jobData.page,
        pageSize: jobData.pageSize,
        total: jobData.total,
        totalPages: jobData.totalPages,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load job posts or application counts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsAndApplications();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-gray-100 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full">
      {jobs.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-4 cal_sans">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Active Job Postings
          </h2>

          <div className="flex flex-col items-center justify-center text-center bg-gray-100 border border-gray-200 rounded-lg py-10">
            <Image
              src="/assets/images/bear2.png"
              alt="No Jobs"
              width={124}
              height={132}
            />
            <h2 className="text-2xl font-semibold text-gray-900 mt-6">
              No Jobs For You
            </h2>
            <p className="text-gray-600 mt-2 DM_sans">
              You haven't made a post yet. <br /> Click the button below to get
              started.
            </p>
            <button
              className="mt-6 bg-[#1AC23F] text-white px-6 py-2 rounded-lg transition"
              onClick={() => {
                router.push("/startup_founder_dashboard/PostJobContent");
                scrollToTop();
              }}
            >
              Post A Job
            </button>
          </div>
        </div>
      ) : (
        <Card className="px-[4%] md:px-5 py-5 bg-white rounded-lg border border-[#EDEFF2]">
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-4 cal_sans">
              <h2 className="md:text-xl font-semibold">Job Posts Management</h2>
              <button
                onClick={() => {
                  router.push("/startup_founder_dashboard/PostJobContent");
                  scrollToTop();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Post A Job
              </button>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobs.map((job) => {
                const isClosed = isJobClosed(job.deadline);
                const statusText = isClosed ? "Closed" : "Open";
                const statusClass = isClosed
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800";

                return (
                  <div
                    key={job.id}
                    className={`p-4 border rounded-md flex justify-between flex-col md:flex-row md:items-center ${
                      !isClosed
                        ? "bg-[#F5FFF7] border-[#EDEFF2]"
                        : "bg-[#FFF4F4] border-[#EDEFF2]"
                    }`}
                  >
                    {/* Left Side: Job Info */}
                    <div className="flex items-start gap-3 flex-1">
                      {/* <Image
                          src={job.logo || "/assets/images/default-company.png"}
                          alt="Company logo"
                          width={40}
                          height={40}
                          className="pt-1"
                        /> */}
                      <div>
                        <h3 className="cal_sans text-[#333333]">{job.title}</h3>
                        <p className="text-[12px] md:text-[15px] DM_sans text-[#515B6F] flex items-center gap-1">
                          {job.industry} <BsDot /> {job.location}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${statusClass}`}
                          >
                            {statusText}
                          </span>
                        </div>
                        <div className="mt-5 cal_sans text-[#526F58] md:hidden">
                          <button
                            onClick={() =>
                              router.push(
                                `/startup_founder_dashboard/ViewJobdetails_StartUp/${job.id}`
                              )
                            }
                            className={`border border-[#9CB8A2] px-4 py-2 rounded-md ${
                              !isClosed
                                ? "hover:bg-green-100 hover:text-green-500 hover:border-green-100"
                                : "hover:bg-red-100 hover:text-red-500 hover:border-red-100"
                            }`}
                          >
                            Manage Job
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Button and Applicant Count */}
                    <div className="flex items-center gap-4">
                      <div className="mt-11 cal_sans text-[#526F58] hidden md:block">
                        <button
                          onClick={() =>
                            router.push(
                              `/startup_founder_dashboard/ViewJobdetails_StartUp/${job.id}`
                            )
                          }
                          className={`border border-[#9CB8A2] px-4 py-2 rounded-md ${
                            !isClosed
                              ? "hover:bg-green-100 hover:text-green-500 hover:border-green-100"
                              : "hover:bg-red-100 hover:text-red-500 hover:border-red-100"
                          }`}
                        >
                          Manage Job
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </Card>
      )}
    </div>
  );
};

export default PostJob;
