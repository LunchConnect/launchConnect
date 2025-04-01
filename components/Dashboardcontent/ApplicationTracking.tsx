"use client"; // Required for Next.js App Router

import React, { useState } from "react";
import { Search } from "lucide-react";
import {
  IoFilterSharp
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Application {
  id: number;
  company: string;
  logo: string;
  jobRole: string;
  applicationDate: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
}

const applications: Application[] = [
  {
    id: 1,
    company: "Google",
    logo: "/logos/google.png",
    jobRole: "UI/UX Designer",
    applicationDate: "2024-05-20",
    status: "Pending",
  },
  {
    id: 2,
    company: "Microsoft",
    logo: "/logos/microsoft.png",
    jobRole: "Frontend Developer",
    applicationDate: "2024-05-18",
    status: "Reviewed",
  },
  {
    id: 3,
    company: "Amazon",
    logo: "/logos/amazon.png",
    jobRole: "Product Designer",
    applicationDate: "2024-05-18",
    status: "Accepted",
  },
  {
    id: 4,
    company: "Meta",
    logo: "/logos/meta.png",
    jobRole: "UX Researcher",
    applicationDate: "2024-05-15",
    status: "Rejected",
  },
  {
    id: 5,
    company: "Meta",
    logo: "/logos/meta.png",
    jobRole: "Graphic Designer",
    applicationDate: "2024-05-12",
    status: "Accepted",
  },
];

const statusColors = {
  Pending: "text-gray-500",
  Reviewed: "text-orange-500",
  Accepted: "text-green-500",
  Rejected: "text-red-500",
};

const ApplicationTracking: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const router = useRouter();

  // Filter applications based on search query
  const filteredApplications = applications.filter((app) =>
    app.company.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
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

  return (
    <div className="px-[4%] md:px-6 py-10 my-20 bg-white rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 text-[#2A2A2A] cal_sans">
        My Applications ({filteredApplications.length})
      </h2>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Search Applications"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-md py-2 indent-5 outline-none"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
        <div className="w-1/4 flex border border-gray-200 py-2 text-[#1F2937] items-center justify-center gap-2 rounded-md">
          <IoFilterSharp />
          <span>Filter by</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
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
                <td className="p-3 flex items-center text-[#1F2937]">
                  <img
                    src={app.logo}
                    alt={app.company}
                    className="w-6 h-6 mr-2"
                  />
                  {app.company}
                </td>
                <td className="p-3 text-[#1F2937]">{app.jobRole}</td>
                <td className="p-3 text-[#1F2937]">{app.applicationDate}</td>
                <td className={`p-3 font-medium ${statusColors[app.status]}`}>
                  {app.status}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      router.push(`/dashboard/ViewJobdetails/${app.id}`);
                      scrollToTop();
                    }}
                    className="text-[#526F58] border border-[#9CB8A2] hover:bg-green-500 hover:text-white cal_sans px-5 py-2 rounded-md text-sm text-center"
                  >
                    View Job
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

          {/* Page Numbers */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 border border-[#E9E9E9] rounded-sm ${
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
            className="px-2 md:px-4 py-2 border text-[#313131] border-[#E9E9E9] rounded-sm text-[12px] md:text-[15px] disabled:opacity-50 flex items-center gap-2"
          >
            Next <IoIosArrowForward size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracking;
