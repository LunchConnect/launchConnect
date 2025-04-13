"use client";
import { scrollToTop } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { getJobs } from "@/actions/action"; // Adjust path if needed

// Define the job interface matching the backend response
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
    pageSize: 5,
    total: 0,
    totalPages: 1,
  });

  // Function to check if job is closed based on deadline
  const isJobClosed = (deadline: string): boolean => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < currentDate;
  };

  const fetchJobs = async (page: number = 1) => {
    setIsLoading(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRmYjI0NTAzLTJlYTItNDlhNi1hMDI2LWFlYjQ3YmRkOGNmOCIsImVtYWlsIjoiY2hhbWJlcmV6aWdib0BnbWFpbC5jb20iLCJpYXQiOjE3NDQwNDA3MTAsImV4cCI6MTc0NDY0NTUxMH0.AiDggagVUdFojZRnjvhDDg0r8epBIihSwnikJwqukwU";
    try {
      const data = await getJobs(token, page, pagination.pageSize);
      console.log("✅ Fetched Jobs:", data);
      setJobs(data.jobs);
      setPagination({
        page: data.page,
        pageSize: data.pageSize,
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      alert("Failed to load jobs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchJobs(newPage);
      scrollToTop();
    }
  };

  return (
    <div className="px-[4%] md:px-5 py-5 my-10 bg-white rounded-lg border border-[#EDEFF2]">
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

      {/* {isLoading && (
        <div className="flex items-center justify-center py-6">
          <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-green-600 font-medium">
            Loading jobs...
          </span>
        </div>
      )} */}

      {/* Job Listings */}
      <div className="space-y-4">
        {/* Loading State - Shows first */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : (
          /* Content appears after loading completes */
          <>
            {/* Empty State */}
            {jobs.length < 0 ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Image
                  src="/assets/empty-state.svg"
                  alt="No jobs found"
                  width={150}
                  height={150}
                />
                <p className="text-gray-500 text-lg font-medium">
                  No jobs found
                </p>
                <p className="text-gray-400 text-sm max-w-md text-center">
                  You haven't posted any jobs yet. Click "Post A Job" to get
                  started.
                </p>
              </div>
            ) : (
              /* Job Listings */
              jobs.map((job) => {
                const isClosed = isJobClosed(job.deadline);
                const statusText = isClosed ? "Closed" : "Open";
                const statusClass = isClosed
                  ? "bg-red-200 text-[#FB3748]"
                  : "bg-green-200 text-[#56CDAD]";
                const bgClass = isClosed
                  ? "bg-[#FFF4F4] border-[#EDEFF2]"
                  : "bg-[#F5FFF7] border-[#EDEFF2]";

                return (
                  <div
                    key={job.id}
                    className={`p-4 border rounded-md flex justify-between flex-col md:flex-row md:items-center ${bgClass}`}
                  >
                    {/* Left Side: Job Info */}
                    <div className="flex items-start gap-3 flex-1">
                      <Image
                        src="/assets/default-logo.png"
                        alt="Company Logo"
                        width={40}
                        height={40}
                        className="pt-1"
                      />
                      <div>
                        <h3 className="cal_sans text-[#333333]">{job.title}</h3>
                        <p className="text-sm DM_sans text-[#515B6F] flex items-center gap-1">
                          Application Count <BsDot /> {"N/A"} applicants
                        </p>
                        <p className="text-sm text-[#515B6F] DM_sans flex items-center gap-1 pt-2 pb-1">
                          Date Posted <BsDot />{" "}
                          {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${statusClass}`}
                        >
                          {statusText}
                        </span>
                        <div className="mt-5 cal_sans text-[#526F58] md:hidden">
                          <button
                            onClick={() =>
                              router.push(
                                `/startup_founder_dashboard/ViewJobdetails_StartUp/${job.id}`
                              )
                            }
                            className={`border border-[#9CB8A2] px-4 py-2 rounded-md  ${
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

                    {/* Right Side: Button */}
                    <div className="mt-11 cal_sans text-[#526F58] hidden md:block">
                      <button
                        onClick={() =>
                          router.push(
                            `/startup_founder_dashboard/ViewJobdetails_StartUp/${job.id}`
                          )
                        }
                        className={`border border-[#9CB8A2] px-4 py-2 rounded-md  ${
                          !isClosed
                            ? "hover:bg-green-100 hover:text-green-500 hover:border-green-100"
                            : "hover:bg-red-100 hover:text-red-500 hover:border-red-100"
                        }`}
                      >
                        Manage Job
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-8 gap-2">
        {" "}
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Back
        </button>
        <div className="flex justify-center gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 border rounded-md ${
                  pagination.page === pageNum ? "bg-green-500 text-white" : ""
                }`}
              >
                {pageNum}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostJob;
