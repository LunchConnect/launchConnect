"use client";
import { scrollToTop } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { BsDot } from "react-icons/bs";

// Job Data
const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Company A",
    applicants: 0,
    datePosted: "12th of Mar 2025",
    status: "Open",
    statusColor: "bg-green-200 text-green-700",
    logo: "/assets/company-a.png", // Replace with actual image paths
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Company B",
    applicants: 12,
    datePosted: "12th of Mar 2025",
    status: "Closing Soon",
    statusColor: "bg-red-200 text-red-700",
    logo: "/assets/company-b.png",
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Company C",
    applicants: 12,
    datePosted: "12th of Mar 2025",
    status: "Open",
    statusColor: "bg-green-200 text-green-700",
    logo: "/assets/company-c.png",
  },
];

const PostJob: React.FC = () => {
  const router = useRouter();

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

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`p-4 border rounded-md flex justify-between flex-col md:flex-row md:items-center ${
              job.status === "Open"
                ? "bg-[#F5FFF7] border-[#EDEFF2]"
                : "bg-[#FFF4F4] border-[#EDEFF2]"
            }`}
          >
            {/* Left Side: Job Info */}
            <div className="flex items-start gap-3 flex-1">
              <Image
                src={job.logo}
                alt={""}
                width={40}
                height={40}
                className="pt-1"
              />
              <div>
                <h3 className="cal_sans text-[#333333]">{job.title}</h3>
                <p className="text-sm DM_sans text-[#515B6F] flex items-center gap-1">
                  Application Count <BsDot /> {job.applicants} applicants
                </p>
                <p className="text-sm text-[#515B6F] DM_sans flex items-center gap-1 pt-2 pb-1">
                  Date Posted <BsDot /> {job.datePosted}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    job.status === "Open"
                      ? "bg-green-200 text-[#56CDAD]"
                      : "bg-red-200 text-[#FB3748]"
                  }`}
                >
                  {job.status}
                </span>
                <div className="mt-5 cal_sans text-[#526F58] md:hidden">
                  <button
                    onClick={() =>
                      router.push(
                        `/startup_founder_dashboard/ViewJobdetails_StartUp/${job.id}`
                      )
                    }
                    className={`border border-[#9CB8A2] px-4 py-2 rounded-md  ${
                      job.status === "Open"
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
                  job.status === "Open"
                    ? "hover:bg-green-100 hover:text-green-500 hover:border-green-100"
                    : "hover:bg-red-100 hover:text-red-500 hover:border-red-100"
                }`}
              >
                Manage Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostJob;
