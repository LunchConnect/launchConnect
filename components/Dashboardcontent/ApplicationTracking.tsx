"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { IoFilterSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import { trackJob } from "@/actions/action";

interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: string;
  job: {
    title: string;
    company: {
      companyName: string;
      website: string;
      companyLogo: string | null;
    };
  };
}

const ApplicationTracking: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true); // Set loading to true when starting to fetch
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await trackJob({
          token,
          page: 1,
          limit: 50,
        });

        setApplications(data.applications);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setIsLoading(false); // Set loading to false when done (success or error)
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) =>
    app.job.company.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const displayedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewJob = (id: string) => {
    router.push(`/dashboard/ViewJobdetails/${id}`);
    scrollToTop();
  };

  const formatStatus = (status: string) =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <div className="px-[4%] md:px-6 py-10 my-10 bg-white border border-[#EDEFF2] rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#2A2A2A] cal_sans">
        My Applications ({filteredApplications.length})
      </h2>

      {/* Search + Filter */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search Applications"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-md py-2 indent-5 outline-none"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
        <div className="w-1/3 flex border border-gray-200 py-2 text-[#1F2937] items-center justify-center gap-2 rounded-md">
          <IoFilterSharp />
          <span>Filter by</span>
        </div>
      </div>

      {isLoading ? (
        // Loading state
        <div className="flex flex-col items-center justify-center text-center bg-[#FAFAFA] border border-[#EDEFF2] rounded-lg py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-[#667085] DM_sans">Loading your applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center bg-[#FAFAFA] border border-[#EDEFF2] rounded-lg py-10">
          <Image
            src="/assets/images/bear.png"
            alt="No Jobs"
            width={124.46}
            height={132.03}
          />
          <h2 className="text-2xl font-semibold text-[#101828] mt-6 cal_sans">
            No application to Show yet
          </h2>
          <p className="text-[#667085] mt-2 DM_sans">
            You haven't applied for any job yet. <br /> Click the button below
            to get started
          </p>
          <button
            className="mt-6 bg-[#1AC23F] text-white px-8 py-2 rounded-lg transition cal_sans"
            onClick={() => {
              router.push("/dashboard/findjobs");
              scrollToTop();
            }}
          >
            Finda Job
          </button>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-[#4D5461]">
                    <th className="p-3 text-left">COMPANY</th>
                    <th className="p-3 text-left">JOB ROLE</th>
                    <th className="p-3 text-left">APPLICATION DATE</th>
                    <th className="p-3 text-left">STATUS</th>
                    <th className="p-3 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedApplications.map((app) => (
                    <tr key={app.id} className="border-b">
                      <td className="p-3 flex items-center gap-2 text-[#1F2937]">
                        {app.job.company.companyLogo ? (
                          <Image
                            src={app.job.company.companyLogo}
                            alt={`${app.job.company.companyName} logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                            {app.job.company.companyName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {app.job.company.companyName}
                      </td>
                      <td className="p-3 text-[#1F2937]">{app.job.title}</td>
                      <td className="p-3 text-[#1F2937]">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </td>
                      <td
                        className={`p-3 font-medium flex items-center ${
                          app.status === "ACCEPTED"
                            ? "text-[#1AC23F]"
                            : app.status === "REJECTED"
                              ? "text-[#F9150B]"
                              : "text-[#777777]"
                        }`}
                      >
                        <LuDot size={30} />
                        {formatStatus(app.status)}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleViewJob(app.jobId)}
                          className="text-[#526F58] border border-[#9CB8A2] hover:bg-green-500 hover:text-white cal_sans px-5 py-2 rounded-md text-sm"
                        >
                          View Job
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 md:px-4 py-2 border text-[#313131] border-[#E9E9E9] flex items-center text-[12px] md:text-[15px] gap-2 rounded-sm disabled:opacity-50"
              >
                <IoIosArrowBack size={15} /> Back
              </button>

              <div className="flex gap-2">
                {currentPage > 2 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="px-4 py-2 border border-[#E9E9E9] rounded-sm"
                    >
                      1
                    </button>
                    {currentPage > 3 && <span className="px-2">...</span>}
                  </>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(currentPage - page) <= 1
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 border border-[#E9E9E9] rounded-sm ${
                        currentPage === page ? "bg-green-600 text-white" : ""
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && (
                      <span className="px-2">...</span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="px-4 py-2 border border-[#E9E9E9] rounded-sm"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 md:px-4 py-2 border text-[#313131] border-[#E9E9E9] rounded-sm text-[12px] md:text-[15px] disabled:opacity-50 flex items-center gap-2"
              >
                Next <IoIosArrowForward size={15} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApplicationTracking;