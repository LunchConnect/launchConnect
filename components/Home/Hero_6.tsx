import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";

// Dummy Job Data
const jobData = [
  {
    title: "Software Engineer",
    company: "Netlify, Inc.",
    location: "Paris, France",
    role: "Volunteer Role",
    image: "",
  },
  {
    title: "Brand Manager",
    company: "Bauch, Schuppe",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    title: "Product Designer",
    company: "Bauch, Schuppe",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    title: "HR Manager",
    company: "Bauch, Schuppe",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    title: "Software Engineer",
    company: "Netlify, Inc.",
    location: "Paris, France",
    role: "Volunteer Role",
    image: "",
  },
  {
    title: "Brand Manager",
    company: "Dropbox",
    location: "San Francisco, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    title: "Product Designer",
    company: "Bauch, Schuppe & Schulist Co",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
  {
    title: "HR Manager",
    company: "Terraform",
    location: "Hamburg, Germany",
    role: "Volunteer Role",
    image: "",
  },
];

const Hero_6: React.FC = () => {
  const router = useRouter();

  const handlefindJob = () => {
    router.push("/findjobs");
    window.scrollTo(0, 0); // Scroll to the top
  };

  // State to track screen width
  const [maxJobs, setMaxJobs] = useState<number>(
    window.innerWidth >= 768 ? 8 : 4
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxJobs(window.innerWidth >= 768 ? 8 : 4);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="bg-[#BFEFD8] section py-10 md:py-20 relative">
        {/* Background Rectangle 1 */}
        <img
          src="assets/images/Rectangle.png"
          alt=""
          className="absolute top-[0%] right-[16%] hidden md:block"
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 cal_sans">
            <h2 className="text-4xl font-bold text-[#08230E]">Latest</h2>
            <span className="text-[#1AC23F] text-4xl font-bold">jobs open</span>
          </div>
          <button
            onClick={handlefindJob}
            className="text-green-600 gap-3 items-center font-semibold cursor-pointer hidden md:flex"
          >
            Show all jobs <FaArrowRight size={20} />
          </button>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 cursor-pointer">
          {jobData.slice(0, maxJobs).map((job, index) => (
            <div
              onClick={() => {
                router.push(`/joddetails`);
                window.scrollTo(0, 0);
              }}
              key={index}
              className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm"
            >
              <div className="flex gap-5 items-start">
                <img src={job.image} alt="" className="w-8 h-8 mt-4" />
                <div>
                  <h3 className="text-xl mt-3 cal_sans text-[#192F1E]">{job.title}</h3>
                  <div className="flex items-center gap-1 mt-1 DM_sans text-sm text-[#515B6F]">
                    <p className="">{job.company}</p>
                    <RxDotFilled />
                    <p className="">{job.location}</p>
                  </div>
                  <p className="text-[#56CDAD] text-sm Epilogue font-medium rounded-2xl p-1.5 bg-[#56CDAD1A] mt-2 w-30 text-center">
                    {job.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlefindJob}
          className="text-green-600 gap-3 items-center font-semibold cursor-pointer flex md:hidden pt-7 Epilogue"
        >
          Show all jobs <FaArrowRight size={20} />
        </button>

        {/* Background Rectangle 2 */}
        <img
          src="assets/images/Rectangle_2.png"
          alt=""
          className="absolute top-[39%] right-[0%] hidden md:block"
        />
      </section>
    </>
  );
};

export default Hero_6;
