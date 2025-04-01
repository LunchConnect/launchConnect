import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import { scrollToTop } from "@/lib/utils";

// Dummy Job Data
const jobData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Netlify, Inc.",
    location: "Paris, France",
    role: "Volunteer Role",
    image: "",
  },
  {
    id: 2,
    title: "Brand Manager",
    company: "Bauch, Schuppe",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Bauch, Schuppe & Schulist Co",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    id: 4,
    title: "HR Manager",
    company: "Bauch, Schuppe & Schulist Co",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    id: 5,
    title: "Software Engineer",
    company: "Netlify, Inc.",
    location: "Paris, France",
    role: "Volunteer Role",
    image: "",
  },
  {
    id: 6,
    title: "Brand Manager",
    company: "Dropbox",
    location: "San Francisco, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    id: 7,
    title: "Product Designer",
    company: "Bauch, Schuppe & Schulist Co",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    id: 8,
    title: "HR Manager",
    company: "Terraform",
    location: "Hamburg, Germany",
    role: "Volunteer Role",
    image: "",
  },
];

const RelatedJobs: React.FC = () => {
  const router = useRouter();

  const handlefindJob = () => {
    router.push("/findjobs");
    scrollToTop(); // Scroll to the top
  };

  const [maxJobs, setMaxJobs] = useState<number>(4); // Default: 4 jobs

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMaxJobs(window.innerWidth >= 768 ? 8 : 4); // 8 jobs if large screen, else 4

      const handleResize = () => {
        setMaxJobs(window.innerWidth >= 768 ? 8 : 4);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      <section className="bg-[#F7FFF9] px-[4%] md:px-6 py-10 my-10 rounded-2xl hidden md:block">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 cal_sans">
            <h2 className="text-3xl font-bold text-[#08230E]">Related Jobs</h2>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 cursor-pointer">
          {jobData.slice(0, maxJobs).map((job) => (
            <div
              onClick={() => {
                router.push(`/dashboard/Jobdetails/${job.id}`);
                scrollToTop();
              }}
              key={job.id}
              className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm"
            >
              <div className="flex gap-5 items-start">
                <img src={job.image} alt="" className="w-8 h-8 mt-5" />
                <div>
                  <h3 className="font-semibold text-xl mt-3 text-[#25324B] cal_sans">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 DM_sans">
                    <p className="text-gray-600 text-sm">{job.company}</p>
                    <RxDotFilled color="gray" />
                    <p className="text-gray-600 text-sm">{job.location}</p>
                  </div>
                  <p className="text-[#56CDAD] text-sm Epilogue font-medium rounded-2xl p-1.5 bg-[#56CDAD1A] mt-2 w-30 text-center cursor-pointer">
                    {job.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default RelatedJobs;
