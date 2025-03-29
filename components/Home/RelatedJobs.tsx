
import { useRouter } from 'next/navigation'
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";

import { scrollToTop } from "@/lib/utils";
// Dummy Job Data
const jobData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "$40,000-$42,000",
    imageUrl: "https://your-backend.com/images/software-engineer.png",
    location: "New York, USA", // Add this
    role: "Engineering",
  },
  {
    id: 2,
    title: "Market Intern",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Not Paid",
    imageUrl: "https://your-backend.com/images/market-intern.png",
    location: "London, UK", // Add this
    role: "Marketing", // Add this line
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "$40,000-$42,000",
    imageUrl: "https://your-backend.com/images/product-designer.png",
    location: "Berlin, Germany", // Add this
    role: "Development", // Add this line
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Not Paid",
    location: "Lagos, Nigeria", // Add this
    role: "Development", // Add this line
  }
];


const RelatedJobs: React.FC = () => {
  const router = useRouter();

  const handlefindJob = () => {
    router.push("/findjobs");
    scrollToTop(); // Scroll to the top
  };
  return (
    <section className="bg-[#E1FDE7] px-[4%] md:px-[10%] py-10 md:py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h2 className="text-4xl font-bold text-[#000000] cal_sans">
          Related Jobs
        </h2>
        <button
          onClick={handlefindJob}
 className="text-green-600 flex gap-3 items-center font-semibold cursor-pointer Epilogue mt-5 md:mt-0"
        >
          Show all jobs <FaArrowRight size={20} />
        </button>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobData.map((job, index) => (
          <>
            <div
            onClick={() => {
              router.push(`/job_details/${job.id}`);
              scrollToTop();
            }}
              key={index}
               className="bg-[#ffffff] space-y-4 p-6 rounded-xl shadow-sm border border-[#E7EFE8] cursor-pointer md:w-63"
            >
              <div className="flex justify-between items-center">
                <img src={job.imageUrl} alt="" className="w-8 h-8" />
                <span className="text-[#56CDAD] text-sm font-medium rounded-2xl p-1.5 bg-[#A1E2AF1A] DM_sans">
                  {job.role}
                </span>
              </div>
              <h3 className="font-semibold text-lg mt-3 cal_sans text-[#3B4D3F]">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 DM_sans">
                {job.company}
              </p>

              <p className="text-gray-700 font-medium flex items-center gap-2 mt-2">
                <LuWallet />
                {job.salary === "Not Paid" ? (
                  <span className="text-[#F13C3C] text-[12px] font-medium border border-red-400 bg-[#FFEEEE] rounded-sm p-0.5 ">
                    Not Paid
                  </span>
                ) : (
                 <span className="text-green-600 text-sm font-medium cal_sans">
                    {job.salary}
                  </span>
                )}
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-2 DM_sans">
                <CiLocationOn size={17} />
                {job.location}
              </p>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default RelatedJobs;
