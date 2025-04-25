"use client";
import { scrollToTop } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { BsDot } from "react-icons/bs";
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

interface ApplicantCountPerJob {
  jobId: string;
  title: string;
  applicantCount: number;
}

const PostJob: React.FC = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<AllJob[]>([]);
  const [applicantCounts, setApplicantCounts] = useState<
    ApplicantCountPerJob[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
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
      setApplicantCounts(applicationData.applicantCountPerJob || []);
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchJobsAndApplications(newPage);
      scrollToTop();
    }
  };

  const getApplicantCount = useCallback(
    (jobId: string) => {
      const countData = applicantCounts.find((item) => item.jobId === jobId);
      return countData?.applicantCount || 0;
    },
    [applicantCounts]
  );

  return (
    <div className="px-[4%] md:px-5 py-5 my-10 bg-white rounded-lg border border-[#EDEFF2]">
      <div className="flex justify-between items-center mb-4 cal_sans">
        <h2 className="md:text-xl font-semibold">Job Posts Management</h2>
        <button
          onClick={() => {
            router.push("/startup_founder_dashboard/PostJobContent");
            scrollToTop();
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Post A Job
        </button>
      </div>

      {jobs.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center text-center bg-[#FAFAFA] border border-[#EDEFF2] rounded-lg py-10">
          <Image
            src="/assets/images/bear.png"
            alt="No Jobs"
            width={124.46}
            height={132.03}
            priority
          />
          <h2 className="text-2xl font-semibold text-[#101828] mt-6 cal_sans">
            No Posted Jobs
          </h2>
          <p className="text-[#667085] mt-2 DM_sans">
            You haven't made a post yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : (
            jobs.map((job) => {
              const isClosed = isJobClosed(job.deadline);
              const statusText = isClosed ? "Closed" : "Open";
              const statusClass = isClosed
                ? "bg-red-200 text-[#FB3748]"
                : "bg-green-200 text-[#56CDAD]";
              const bgClass = isClosed
                ? "bg-[#FFF4F4] border-[#EDEFF2]"
                : "bg-[#F5FFF7] border-[#EDEFF2]";
              const applicantCount = getApplicantCount(job.id);

              return (
                <div
                  key={job.id}
                  className={`p-4 border rounded-md flex justify-between flex-col md:flex-row md:items-center ${bgClass}`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div>
                      {/* {job.company.companyLogo ? (
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
                      )} */}
                      <h3 className="cal_sans text-[#333333]">{job.title}</h3>
                      <p className="text-sm DM_sans text-[#515B6F] flex items-center gap-1">
                        Application Count <BsDot /> {applicantCount} applicants
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
                          className={`border border-[#9CB8A2] px-4 py-2 rounded-md ${
                            !isClosed
                              ? "hover:bg-green-100 hover:text-green-500 hover:border-green-100"
                              : "hover:bg-red-100 hover:text-red-500 hover:border-red-100"
                          } transition-colors`}
                        >
                          Manage Job
                        </button>
                      </div>
                    </div>
                  </div>
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
                      } transition-colors`}
                    >
                      Manage Job
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Pagination */}
      {jobs.length > 0 && (
        <div className="flex justify-between mt-8 gap-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
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
                    pagination.page === pageNum
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostJob;