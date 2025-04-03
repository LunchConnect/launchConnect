"use client";
import React, { useState } from "react";
import withHeaderAndFooter from "@/Hoc/withHeaderAndFooter";
import { CiLocationOn } from "react-icons/ci";
import { LuWallet } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { scrollToTop } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Search } from "lucide-react";

// Define types
interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  city: string;
}

interface Filters {
  Industry: string;
  jobType: string;
}

const FindJobs: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    Industry: "",
    jobType: "",
  });

  const router = useRouter();

  const handleSelect = (filterType: keyof Filters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value, // Toggle selection
    }));
  };

  // Mock job data
  const jobs = Array.from({ length: 350 }, (_, i) => ({
    id: i + 1,
    title: "Software Engineer",
    company: "Company Name",
    salary: Math.random() > 0.5 ? "Paid" : "Not Paid",
    city: "Name of City",
  }));

  const jobsPerPage: number = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs: Job[] = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  interface FilterOptions {
    Industry: string[];
    jobTypes: string[];
  }

  const filters: FilterOptions = {
    Industry: [
      "All",
      "Commerce",
      "Telecommunications",
      "Hospitality & Tourism",
      "Education",
      "Financial Service",
      "Health",
      "Technology",
    ],
    jobTypes: ["All", "Volunteer", "Internship"],
  };

  return (
    <section className="">
      {/* Header */}
      <div className="bg-[#08230E] mini-header mini-header-p mini-header-smallscreen py-10 md:py-15 text-center text-4xl font-bold text-white cal_sans">
        <h2>Find Jobs</h2>
      </div>

      {/* Body */}
      <div className="px-[4%] md:px-[10%] py-10 md:py-20 bg-white">
        <div className="flex gap-6 flex-col md:flex-row">
          {/* Sidebar Filters */}
          <div className="md:w-1/4 border border-[#E7EFE8] p-5 rounded-lg shadow md:self-start">
            {/* Categories */}
            <h3 className="text-lg text-[#495C4E] cal_sans">Industry</h3>
            <ul className="space-y-2 mt-3 border-b border-[#E7EFE8] pb-3">
              {filters.Industry.map((Industry) => (
                <li
                  key={Industry}
                  className="flex items-center gap-2 relative DM_sans text-[#000000]"
                >
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={selectedFilters.Industry === Industry}
                    onChange={() => handleSelect("Industry", Industry)}
                  />
                  {selectedFilters.Industry === Industry && (
                    <Check className="absolute top-1 text-white w-4 h-4" />
                  )}
                  {Industry}
                </li>
              ))}
            </ul>

            {/* Job Type */}
            <h3 className="text-lg mt-5 cal_sans text-[#495C4E]">Job Type</h3>
            <ul className="space-y-2 mt-3">
              {filters.jobTypes.map((jobType) => (
                <li
                  key={jobType}
                  className="flex items-center gap-2 relative text-color DM_sans"
                >
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 border checked:border-[#E7EFE8] rounded-sm custom-checkbox relative"
                    checked={selectedFilters.jobType === jobType}
                    onChange={() => handleSelect("jobType", jobType)}
                  />
                  {selectedFilters.jobType === jobType && (
                    <Check className="absolute top-1 text-white w-4 h-4" />
                  )}
                  {jobType}
                </li>
              ))}
            </ul>
          </div>

          {/* Job Listings -------------------------------------------------------------------------*/}
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
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#F5FFF7] border border-[#E7EFE8] p-4 rounded-lg shadow"
                >
                  <div className="flex items-center gap-2">
                    <img src="img/logo.png" alt="" className="w-8 h-8" />
                    <h4 className="cal_sans text-lg text-[#3B4D3F]">
                      {job.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 mt-3 DM_sans">{job.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <LuWallet className="text-[#6F8674]" />
                    <p
                      className={`text-sm flex items-center gap-2 DM_sans"
                       ${job.salary === "Paid" ? "text-green-600 bg-[#1FC16B1A] px-2 py-1" : "text-red-500 bg-[#FFEEEE] px-2 py-1"}`}
                    >
                      {job.salary}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <CiLocationOn size={17} /> {job.city}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      router.push(`/job_details/${job.id}`);
                      scrollToTop();
                    }}
                    className="mt-3 px-4 py-2 rounded-lg border border-[#9CB8A2] text-[#526F58] cal_sans"
                  >
                    Job Details
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination --------------------------------------------------*/}
            {totalPages > 1 && (
              <>
                <div className="mt-8 flex justify-between items-center">
                  {/* Back Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 md:px-4 py-2 border text-[#313131] border-[#E9E9E9] flex items-center text-[12px] md:text-[15px] gap-2 rounded-sm disabled:opacity-15"
                  >
                    <IoIosArrowBack size={15} /> Back
                  </button>

                  {/* Large Screen Pagination (Default) */}
                  <div className="hidden md:flex gap-2 text-[#313131]">
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNumber = i + 1;
                      const showEllipsis =
                        (pageNumber === 2 && currentPage > 4) ||
                        (pageNumber === totalPages - 1 &&
                          currentPage < totalPages - 2);

                      if (showEllipsis) {
                        return (
                          <span
                            key={`ellipsis-${pageNumber}`}
                            className="px-4 py-1 border border-[#E9E9E9] rounded-sm"
                          >
                            ...
                          </span>
                        );
                      }

                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 &&
                          pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            className={`px-4 py-2 border border-[#E9E9E9] rounded-sm ${
                              currentPage === pageNumber
                                ? "bg-green-600 text-white"
                                : ""
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }

                      return null;
                    })}
                  </div>

                  {/* Small Screen Pagination (Only 4 Elements) */}
                  <div className="flex items-center md:hidden gap-2 text-[#313131]">
                    {/* Always show Page 1 */}
                    <button
                      key={1}
                      onClick={() => goToPage(1)}
                      className={`px-3 py-1 flex items-center border border-[#E9E9E9] rounded-sm ${
                        currentPage === 1 ? "bg-green-600 text-white" : ""
                      }`}
                    >
                      1
                    </button>

                    {/* Show Current Page (if not 1) */}
                    {currentPage > 1 && currentPage < totalPages && (
                      <button
                        key={currentPage}
                        onClick={() => goToPage(currentPage)}
                        className="px-3 py-1 border rounded-sm bg-green-600 text-white"
                      >
                        {currentPage}
                      </button>
                    )}

                    {/* Ellipsis (if needed) */}
                    {currentPage < totalPages - 1 && totalPages > 3 && (
                      <span className="px-3 py-1 border rounded-sm border-[#E9E9E9]">
                        ...
                      </span>
                    )}

                    {/* Always show Last Page */}
                    <button
                      key={totalPages}
                      onClick={() => goToPage(totalPages)}
                      className={`px-3 py-1 border border-[#E9E9E9] rounded-sm ${
                        currentPage === totalPages
                          ? "bg-green-600 text-white"
                          : ""
                      }`}
                    >
                      {totalPages}
                    </button>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 md:px-4 py-2 border text-[#313131] border-[#E9E9E9] rounded-sm text-[12px] md:text-[15px] disabled:opacity-15 flex items-center gap-2"
                  >
                    Next <IoIosArrowForward size={15} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default withHeaderAndFooter(FindJobs);
