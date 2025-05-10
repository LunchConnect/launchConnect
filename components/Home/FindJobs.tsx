"use client";
import React, { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import withHeaderAndFooter from "@/Hoc/withHeaderAndFooter";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuWallet } from "react-icons/lu";
import { scrollToTop } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Check, Search } from "lucide-react";
import { getFindJobs } from "@/actions/action";
import Image from "next/image";

interface Job {
  id: string;
  title: string;
  company: {
    companyName: string;
    companyLogo: string | null;
  };
  paidRole: string;
  location: string;
  jobType: string;
  industry: string;
  createdAt: string;
}

interface Filters {
  industries: string[];
  jobType: string;
}

const FindJobs: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    industries: [],
    jobType: "",
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const jobsPerPage = 12;
  useEffect(() => {
    console.log("Component mounted - Initializing job fetch");
    const fetchJobs = async () => {
      setIsLoading(true);
      // const token = localStorage.getItem("token");
      // if (!token) throw new Error("No authentication token");
      try {
        console.log(
          `Fetching jobs - Page ${currentPage}, ${jobsPerPage} items`
        );
        const data = await getFindJobs(currentPage, jobsPerPage);

        console.group("API Response");
        console.log("Raw Response:", data);
        console.log("Jobs Received:", data.jobs?.length || 0);
        console.log("Total Pages:", data.totalPages);
        console.log("API Message:", data.message);
        console.groupEnd();

        setJobs(data.jobs || []);
        setTotalPages(data.totalPages || 1);

        if (data.jobs?.length === 0) {
          console.warn("No jobs returned from API");
        }
      } catch (error) {
        console.error("Job Fetch Error:", error);
      } finally {
        setIsLoading(false);
        console.log("Job fetch completed");
      }
    };

    fetchJobs();
  }, [currentPage]);

  useEffect(() => {
    console.group("Filter State Update");
    console.log("Current Filters:", selectedFilters);
    console.log("Search Query:", searchQuery);
    console.log("Total Jobs:", jobs.length);
    console.groupEnd();
  }, [selectedFilters, searchQuery, jobs]);

const handleIndustrySelect = (industry: string) => {
  setSelectedFilters((prev) => {
    if (industry === "All") {
      // "All" means clear all selected industries
      return { ...prev, industries: [] };
    }

    const newIndustries = prev.industries.includes(industry)
      ? prev.industries.filter((i) => i !== industry)
      : [...prev.industries, industry];

    return { ...prev, industries: newIndustries };
  });
};


  const handleJobTypeSelect = (jobType: string) => {
    console.log("Job type selection changed:", jobType);
    setSelectedFilters((prev) => {
      const newJobType = prev.jobType === jobType ? "" : jobType;
      console.log("New job type selection:", newJobType);
      return { ...prev, jobType: newJobType };
    });
  };

  const filteredJobs = jobs.filter((job) => {
    console.groupCollapsed(`Filtering Job: ${job.title} (${job.id})`);

    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase());
    console.log("Matches search:", matchesSearch);

    // Industry filter
    const matchesIndustry =
      selectedFilters.industries.length === 0 ||
      selectedFilters.industries.some((industry) =>
        job.industry
          .split(", ")
          .some(
            (jobIndustry) =>
              jobIndustry.toLowerCase() === industry.toLowerCase()
          )
      );
    console.log(
      "Matches industry:",
      matchesIndustry,
      "Selected:",
      selectedFilters.industries,
      "Job Industries:",
      job.industry.split(", ")
    );

    // Job type filter
    const matchesJobType =
      selectedFilters.jobType === "" ||
      job.jobType.toLowerCase() === selectedFilters.jobType.toLowerCase();
    console.log(
      "Matches job type:",
      matchesJobType,
      "Selected:",
      selectedFilters.jobType,
      "Job Type:",
      job.jobType
    );

    const isIncluded = matchesSearch && matchesIndustry && matchesJobType;
    console.log("Final inclusion:", isIncluded);
    console.groupEnd();

    return isIncluded;
  });

  console.log("Filter Results:", {
    totalJobs: jobs.length,
    filteredCount: filteredJobs.length,
    filtersApplied: {
      search: searchQuery !== "",
      industries: selectedFilters.industries.length > 0,
      jobType: selectedFilters.jobType !== "",
    },
  });

  const filterOptions = {
    Industry: [
      "All",
      "Commerce",
      "Telecommunications",
      "Hotels & Tourism",
      "Education",
      "Financial Services",
      "Health",
      "Technology",
    ],
    jobTypes: ["All", "Volunteer", "Internship", "Contract", "Entry-Role",],
  };

  const clearFilters = () => {
    console.log("Clearing all filters");
    setSelectedFilters({ industries: [], jobType: "" });
    setSearchQuery("");
  };

  const goToPage = (page: number) => {
    console.log("Navigating to page:", page);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      scrollToTop();
    }
  };

  return (
    <section>
      {/* Header */}
      <div className="bg-[#08230E] mini-header mini-header-p mini-header-smallscreen py-10 md:py-15 text-center text-4xl font-bold text-white cal_sans">
        <h2>Find Jobs</h2>
      </div>

      <div className="px-[4%] md:px-[10%] py-10 md:py-20 bg-white">
        <div className="flex gap-6 flex-col md:flex-row">
          {/* Sidebar Filters */}
          <div className="md:w-1/4 border border-[#E7EFE8] p-5 rounded-lg shadow md:self-start">
            <h3 className="text-lg cal_sans text-[#495C4E]">Industry</h3>
            <ul className="space-y-2 mt-3 border-b border-[#E7EFE8] pb-3">
              {filterOptions.Industry.map((industry) => {
                const isSelected =
                  industry === "All"
                    ? selectedFilters.industries.length === 0 // All = nothing selected
                    : selectedFilters.industries.includes(industry);

                return (
                  <li
                    key={industry}
                    className="flex items-center gap-2 relative DM_sans text-[#000000]"
                  >
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={isSelected}
                      onChange={() => handleIndustrySelect(industry)}
                    />
                    {isSelected && (
                      <Check className="absolute top-1 text-white w-4 h-4" />
                    )}
                    {industry}
                  </li>
                );
              })}
            </ul>

            <h3 className="text-lg mt-5 cal_sans text-[#495C4E]">Job Type</h3>
            <ul className="space-y-2 mt-3">
              {filterOptions.jobTypes.map((jobType) => (
                <li
                  key={jobType}
                  className="flex items-center gap-2 relative DM_sans text-[#000000]"
                >
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={
                      selectedFilters.jobType === jobType ||
                      (jobType === "All" && selectedFilters.jobType === "")
                    }
                    onChange={() => handleJobTypeSelect(jobType)}
                  />
                  {(selectedFilters.jobType === jobType ||
                    (jobType === "All" && selectedFilters.jobType === "")) && (
                    <Check className="absolute top-1 text-white w-4 h-4" />
                  )}
                  {jobType}
                </li>
              ))}
            </ul>
          </div>

          {/* Job Listings */}
          <div className="md:w-3/4">
            <div className="relative mb-5">
              <Search
                className="absolute left-3 top-3.5 text-[#bbbbbb]"
                size={20}
              />
              <input
                type="text"
                placeholder="Search Job Titles"
                className="w-full p-3 border rounded-lg indent-7 outline-none border-[#BED3C2]"
                value={searchQuery}
                onChange={(e) => {
                  console.log("Search query updated:", e.target.value);
                  setSearchQuery(e.target.value);
                }}
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-10">
                <p>No jobs found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="mt-2 text-green-600 underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-[#F5FFF7] border border-[#E7EFE8] p-4 rounded-lg shadow"
                    >
                      <div className="flex items-center gap-2">
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
                      <h1 className="text-2xl text-[#243428] cal_sans">
                        {job.title}
                      </h1>
                    </div>
                      </div>
                      <p className="text-[#6F8674] mt-3 DM_sans">
                        {job.industry}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <LuWallet className="text-[#6F8674]" />
                        <p
                          className={`text-sm flex items-center gap-2 DM_sans ${
                            job.paidRole === "PAID"
                              ? "text-green-600 bg-[#1FC16B1A] px-2 py-1"
                              : "text-red-500 bg-[#FFEEEE] px-2 py-1"
                          }`}
                        >
                          {job.paidRole === "PAID" ? "Paid" : "Not Paid"}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <CiLocationOn size={17} /> {job.location || "Remote"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          router.push(`/job_details/${job.id}`);
                          scrollToTop();
                        }}
                        className="mt-3 px-4 py-2 rounded-lg border border-[#9CB8A2] text-[#526F58] cal_sans cursor-pointer"
                      >
                        Job Details
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-between items-center">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2 md:px-4 py-2 border text-[#313131] border-[#E9E9E9] flex items-center text-[12px] md:text-[15px] gap-2 rounded-sm disabled:opacity-15"
                    >
                      <IoIosArrowBack size={15} /> Back
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`px-3 py-1 border rounded-sm ${
                                currentPage === pageNum
                                  ? "bg-green-600 text-white"
                                  : "border-[#E9E9E9]"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                      {totalPages > 5 && <span className="px-2">...</span>}
                    </div>

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-2 md:px-4 py-2 border text-[#313131] border-[#E9E9E9] rounded-sm text-[12px] md:text-[15px] disabled:opacity-15 flex items-center gap-2"
                    >
                      Next <IoIosArrowForward size={15} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default withHeaderAndFooter(FindJobs);