import { useRouter } from 'next/navigation'
import React from "react";
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
    company: "Bauch, Schuppe & Schulist Co",
    location: "New York, USA",
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
    company: "Bauch, Schuppe & Schulist Co",
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
    company: "Bauch, Schuppe & Schulist Co",
    location: "New York, USA",
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
    company: "Bauch, Schuppe & Schulist Co",
    location: "New York, USA",
    role: "Volunteer Role",
    image: "",
  },
];

const Hero6: React.FC = () => {
  const router = useRouter()

  const handlefindJob = () => {
    router.push("/findjobs");
    window.scrollTo(0, 0); // Scroll to the top
  };

  return (
    <>
      <section className="bg-[#BFEFD8] px-[10%] py-20 relative">
        {/* Background Rectangle 1 */}
        <img
          src="assets/images/Rectangle.png"
          alt=""
          className="absolute top-[0%] right-[16%]"
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-bold text-[#08230E]">Latest</h2>
            <span className="text-[#1AC23F] text-4xl font-bold">jobs open</span>
          </div>
          <button
            onClick={handlefindJob}
            className="text-green-600 flex gap-3 items-center font-semibold cursor-pointer"
          >
            Show all jobs <FaArrowRight size={20} />
          </button>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-2 gap-6 relative z-10 cursor-pointer">
          {jobData.map((job, index) => (
            <div
              onClick={() =>{router.push(`/jod_details`); window.scrollTo(0, 0);}}
              key={index}
              className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm">
              <div className="flex gap-5 items-center">
                <img src={job.image} alt="" className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-xl mt-3">{job.title}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-gray-600 text-sm">{job.company}</p>
                    <RxDotFilled />
                    <p className="text-gray-600 text-sm">{job.location}</p>
                  </div>
                  <p className="text-[#56CDAD] text-sm font-medium rounded-2xl p-1.5 bg-[#56CDAD1A] mt-2 w-30 text-center">
                    {job.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Background Rectangle 2 */}
        <img
          src="assets/images/Rectangle_2.png"
          alt=""
          className="absolute top-[39%] right-[0%]"
        />
      </section>
    </>
  );
};

export default Hero6;
