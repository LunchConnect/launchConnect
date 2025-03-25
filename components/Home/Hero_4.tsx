
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation'
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";

import { scrollToTop } from "@/lib/utils";


// Dummy Job Data
const jobData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Paid",
    location: "New York, USA",
    role: "Internship",
    imageUrl: "https://your-backend.com/images/software-engineer.png",
  },
  {
    id:2,
    title: "Market Intern",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Not Paid",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/market-intern.png",
  },
  {
    id:3,
    title: "Product Designer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Paid",
    location: "New York, USA",
    role: "Entry-Level",
    imageUrl: "https://your-backend.com/images/product-designer.png",
  },
  {
    id:4,
    title: "Frontend Developer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Not Paid",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/frontend-developer.png",
  },
];



const Hero4: React.FC = () => {
  const router = useRouter()

     const handlefindJob = () => {
      router.push("/findjobs");
      scrollToTop(); // Scroll to the top
     };
     return (
      <section className="bg-white section md:px-[10%] py-10 md:py-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-[#08230E]">Featured jobs</h2>
        <button
          onClick={handlefindJob}
          className="text-green-600 gap-3 items-center font-semibold cursor-pointer hidden md:flex"
        >
          Show all jobs <FaArrowRight size={20} />
        </button>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {jobData.map((job, index) => (
          <>
            <div
              onClick={() => {
                router.push(`/job_details/${job.id}`);
                scrollToTop();
              }}
              key={index}
              className="bg-[#F5FFF7] p-6 rounded-xl shadow-sm border border-[#E7EFE8] cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <img src={job.imageUrl} alt="" className="w-8 h-8" />
                <span className="DM_sans">
                  {job.role === "Volunteer Role" ? (
                    <span className="text-[#56CDAD] text-sm DM_sans font-medium rounded-2xl p-1.5 bg-[#A1E2AF1A]">
                      Volunteer Role
                    </span>
                  ) : (
                    <span className="text-[#56CDAD] text-sm DM_sans font-medium rounded-2xl p-1.5 bg-[#A1E2AF1A]">
                      {job.role}
                    </span>
                  )}
                </span>
              </div>
              <h3 className="text-lg mt-3 cal_sans text-[#3B4D3F]">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 DM_sans">
                {job.company}
              </p>
              <p className="text-gray-700 font-medium flex items-center gap-2 mt-2">
                <LuWallet />
                {job.salary === "Not Paid" ? (
                  <span className="text-red-500 bg-[#FFEEEE] px-2 py-1 text-sm font-medium DM_sans">
                    Not Paid
                  </span>
                ) : (
                  <span className="text-green-600 bg-[#1FC16B1A] px-2 py-1 text-sm font-medium DM_sans">
                    {job.salary}
                  </span>
                )}
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                <CiLocationOn size={17} />
                {job.location}
              </p>
            </div>
          </>
        ))}
      </div>
      <button
        onClick={handlefindJob}
        className="text-green-600 flex gap-3 items-center mt-5 font-semibold cursor-pointer md:hidden"
      >
        Show all jobs <FaArrowRight size={20} />
      </button>
    </section>
  );

};

export default Hero4;