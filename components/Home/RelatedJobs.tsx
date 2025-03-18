import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { LuWallet } from "react-icons/lu";
import { useRouter } from 'next/navigation'

// Dummy Job Data
const jobData = [
  {
    title: "Software Engineer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "$40,000-$42,000",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/software-engineer.png",
  },
  {
    title: "Market Intern",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Not Paid",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/market-intern.png",
  },
  {
    title: "Product Designer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "$40,000-$42,000",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/product-designer.png",
  },
  {
    title: "Frontend Developer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Not Paid",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/frontend-developer.png",
  },
];

const RelatedJobs: React.FC = () => {
  const router = useRouter()

  const handlefindJob = () => {
    router.push("/findjobs");
    window.scrollTo(0, 0); // Scroll to the top
  };
  return (
    <section className="bg-[#E1FDE7] px-[10%] py-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-[#000000]">Related Jobs</h2>
        <button
          onClick={handlefindJob}
          className="text-green-600 flex gap-3 items-center font-semibold cursor-pointer"
        >
          Show all jobs <FaArrowRight size={20} />
        </button>
      </div> 

    

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobData.map((job, index) => (
          <>
            <div
              onClick={() =>{navigate(`/joddetails`); window.scrollTo(0, 0);}}
              key={index}
              className="bg-[#ffffff] space-y-4 p-6 rounded-xl shadow-sm border border-[#E7EFE8] cursor-pointer w-63"
            >
              <div className="flex justify-between items-center">
                <img src={job.imageUrl} alt="" className="w-8 h-8" />
                <span className="text-[#56CDAD] text-sm font-medium rounded-2xl p-1.5 bg-[#A1E2AF1A]">
                  {job.role}
                </span>
              </div>
              <h3 className="font-semibold text-lg mt-3">{job.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{job.company}</p>
              <p className="text-gray-700 font-medium flex items-center gap-2 mt-2">
                <LuWallet />
                {job.salary === "Not Paid" ? (
                  <span className="text-[#F13C3C] text-[12px] font-medium border border-red-400 bg-[#FFEEEE] rounded-sm p-0.5 ">
                    Not Paid
                  </span>
                ) : (
                  <span className="text-green-600 text-sm font-medium">
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
    </section>
  );
};

export default RelatedJobs;
