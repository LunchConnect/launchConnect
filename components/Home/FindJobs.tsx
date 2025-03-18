"use client"
import { Check, Search } from "lucide-react";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuWallet } from "react-icons/lu";

import withHeaderAndFooter from "@/Hoc/withHeaderAndFooter";







const FindJobs: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    jobType: "",
    experienceLevel: "",
    datePosted: "",
  });

  const router = useRouter()

  const handleSelect = (
    filterType: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value, // Toggle selection
    }));
  };

  // Mock job data
  const jobs = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    title: "Software Engineer",
    company: "Company Name",
    salary: "$40000 - $42000",
    city: "Name of City",
  }));

  const jobsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filters = {
    categories: [
      "All",
      "Commerce",
      "Telecommunications",
      "Hospitality & Tourism",
      "Education",
      "Financial Service",
    ],
    jobTypes: ["All", "Volunteer", "Internship"],
    experienceLevels: ["No-Experience", "Fresher", "Intermediate", "Expert"],
    datePosted: [
      "All",
      "Last Hour",
      "Last 24 Hours",
      "Last 7 Days",
      "Last 30 Days",
    ],
  };

  return (
    <section className="overflow-hidden">
      {/* Header */}
      <div className="bg-[#08230E] px-[10%] py-15 text-center text-4xl font-bold text-white">
        <h2>Find Jobs</h2>
      </div>

      {/* Body */}
      <div className="px-[10%] py-10">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-1/4 border border-[#E7EFE8] p-5 rounded-lg shadow self-start">
            {/* Categories */}
            <h3 className="font-semibold text-lg">Categories</h3>
            <ul className="space-y-2 mt-3 border-b border-[#17eb30] pb-3">
              {filters.categories.map((category) => (
                <li key={category} className="flex items-center gap-2 relative">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 border checked:border-[#E7EFE8] rounded-sm checked:bg-green-500 relative"
                    checked={selectedFilters.category === category}
                    onChange={() => handleSelect("category", category)}
                  />
                  {selectedFilters.category === category && (
                    <Check className="absolute top-1 text-white w-4 h-4" />
                  )}
                  {category}
                </li>
              ))}
              <button className="primary w-full py-2 rounded-md text-white mt-2 cursor-pointer">
                View All
              </button>
            </ul>

            {/* Job Type */}
            <h3 className="font-semibold text-lg mt-5">Job Type</h3>
            <ul className="space-y-2 mt-3">
              {filters.jobTypes.map((jobType) => (
                <li key={jobType} className="flex items-center gap-2 relative">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 border checked:border-[#E7EFE8] rounded-sm checked:bg-green-500 relative"
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

            {/* Experience Level */}
            <h3 className="font-semibold text-lg mt-5">Experience Level</h3>
            <ul className="space-y-2 mt-3">
              {filters.experienceLevels.map((level) => (
                <li key={level} className="flex items-center gap-2 relative">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 border checked:border-[#E7EFE8] rounded-sm checked:bg-green-500 relative"
                    checked={selectedFilters.experienceLevel === level}
                    onChange={() => handleSelect("experienceLevel", level)}
                  />
                  {selectedFilters.experienceLevel === level && (
                    <Check className="absolute top-1 text-white w-4 h-4" />
                  )}
                  {level}
                </li>
              ))}
            </ul>

            {/* Date Posted */}
            <h3 className="font-semibold text-lg mt-5">Date Posted</h3>
            <ul className="space-y-2 mt-3">
              {filters.datePosted.map((date) => (
                <li key={date} className="flex items-center gap-2 relative">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 border rounded-sm checked:border-[#ffffff] checked:bg-green-500 relative"
                    checked={selectedFilters.datePosted === date}
                    onChange={() => handleSelect("datePosted", date)}
                  />
                  {selectedFilters.datePosted === date && (
                    <Check className="absolute top-1  text-white w-4 h-4" />
                  )}
                  {date}
                </li>
              ))}
            </ul>
          </div>

          {/* Job Listings */}
          <div className="w-3/4">
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

            <div className="grid grid-cols-2 gap-6">
              {currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#E7EFE8] p-4 rounded-lg shadow"
                >
                  <div className="flex items-center gap-2">
                    <img src="img/logo.png" alt="" className="w-8 h-8" />
                    <h4 className="font-semibold text-lg">{job.title}</h4>
                  </div>
                  <p className="text-gray-600 mt-3">{job.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <LuWallet /> {job.salary}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <CiLocationOn size={17} /> {job.city}
                    </p>
                  </div>
                  <button
                    onClick={() =>{router.push(`/jod_details/${job.id}`); window.scrollTo(0, 0);}}
                    className="mt-3 px-4 py-2 rounded-lg border border-[#9CB8A2]"
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
                  className="px-4 py-2 border flex items-center gap-2 rounded-lg disabled:opacity-50"
                >
                  <IoIosArrowBack size={15} /> Back
                </button>

                <div className="flex gap-2 overflow-auto">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === i + 1 ? "bg-green-600 text-white" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  Next <IoIosArrowForward size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default withHeaderAndFooter(FindJobs);
