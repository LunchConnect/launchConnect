"use client";
import React, { useState } from "react";
import { LuWallet } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbCopy } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import PostModal from "./PostModal";
import { FiTrash2 } from "react-icons/fi";
import RecentApplication from "./RecentApplication";

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Bausch, Schuppe and Schulist Co",
    salary: "Paid",
    location: "New York, USA",
    imageUrl: "",
    description: [
      "We are hiring a Junior UX Designer for our Design Team. Junior UX Designers at Canonical have a vital role in the success of Ubuntu, the Canonical developer experience, and our Infrastructure and Enterprise products.",
      "There is an expectation of growth in order to deliver outstanding UX experiences and take ownership of the design of your product.",
      "Our design team is on a mission to turn complex, open-source software into efficient, intuitive products that can change how complex systems are built and what open source is capable of for enterprise IT. We are looking for a talented and passionate user experience designer who shares our ambitions.",
      "This role sits in the design team, reporting to one of the UX design managers.",
    ],

    remoteLocation: "This role will be based remotely in the EMEA region.",
    responsibilities: [
      "Develop and execute strategies to drive startup growth and scalability.",
      "Lead cross-functional teams to ensure project milestones are met.",
      "Foster a collaborative and innovative company culture.",
      "Identify and secure partnerships, investors, or funding opportunities.",
      "Oversee product development and ensure alignment with market needs.",
      "Implement and optimize operational processes for efficiency.",
      "Manage budget allocation and financial planning for the startup.",
      "Build and maintain strong relationships with clients, stakeholders, and advisors.",
    ],
    requiredSkills: [
      "Strong leadership and team management abilities.",
      "Excellent communication and negotiation skills.",
      "Strategic thinking with problem-solving capabilities.",
      "Proficiency in financial management and business modeling.",
      "Knowledge of product development and market analysis.",
      "Experience with digital marketing and growth hacking strategies.",
      "Adaptability and ability to thrive in a fast-paced startup environment.",
      "Familiarity with technology stacks relevant to the business domain.",
    ],
  },
];

interface JobDetailsProps {
  jobId: string;
}

const ViewJobdetails: React.FC<JobDetailsProps> = () => {
  const [isDeleteJob, setIsdeleteJob] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCopiedBanner, setShowCopiedBanner] = useState(false);
  const [postedJob, setPostedJob] = useState(null);
  const router = useRouter();

  const handleCopyJobDetails = (job: any) => {
    const jobText = `
    Job Title: ${job.title}
    Image URL: ${job.imageUrl || "N/A"}
    Company: ${job.company}
    Salary: ${job.salary}
    Location: ${job.location}
    Remote Location: ${job.remoteLocation}

    Job Description:
    ${job.description.join("\n")}

    Key Responsibilities:
    ${job.responsibilities.join("\n")}

    Required Skills:
    ${job.requiredSkills.join("\n")}
    `;

    navigator.clipboard.writeText(jobText);
    setShowCopiedBanner(true);
    setTimeout(() => setShowCopiedBanner(false), 2000);
  };

  return (
    <>
      <section className="">
        <div className="my-20">
          {" "}
          <button
            onClick={() => router.push("/startup_founder_dashboard/PostJob")}
            className="flex items-center gap-2 text-black text-xl cal_sans"
          >
            <IoIosArrowBack size={20} className="" />
            <span className="mt-1">Back</span>
          </button>
        </div>
        <div className="px-[4%] md:px-6 py-3 bg-white border bordeer-[#EDEFF2] rounded-2xl">
          {jobs.map((job) => (
            <div key={job.id}>
              {/* Job Header */}
              <div className="flex flex-row justify-between items-center space-y-4">
                <div className="flex items-center gap-2">
                  <img src={job.imageUrl} alt="" className="w-10 h-10" />
                  <h1 className="text-2xl text-[#243428] cal_sans">
                    {job.title}
                  </h1>
                </div>
                <div className="relative flex items-center">
                  {/* Three-dot Button */}
                  <button
                    onClick={() => setIsdeleteJob(!isDeleteJob)}
                    className="text-[#4A4A4A] border border-[#D0D5DD] px-4 py-1 rounded-md cursor-pointer cal_sans"
                  >
                    <HiDotsHorizontal />
                  </button>

                  {/* Delete Button (Shows on Click) */}
                  {isDeleteJob && (
                    <div className="absolute right-full mr-2 -bottom-7 flex items-center gap-2 px-8 py-2 bg-white border border-[#EDEFF2] rounded shadow-md transition-opacity">
                      <FiTrash2 size={20} className="text-[#FC0202]" />
                      <button className="text-[#FC0202] whitespace-nowrap">
                        Delete Job
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 space-y-2 md:space-y-0 DM_sans">
                <Image
                  src="/assets/images/location.png"
                  alt=""
                  width={16}
                  height={19.76}
                />
                <p className="text-[#777777]">{job.company}</p>
              </div>

              <div className="flex items-center gap-2 DM_sans">
                <div className="flex items-center gap-2 mt-2">
                  <LuWallet color="#777777" />
                  <p className="text-green-600 bg-[#1FC16B1A] px-2 py-1 flex items-center gap-1 text-[14px]">
                    {job.salary}
                  </p>
                </div>
                <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                  <CiLocationOn size={17} />
                  {job.location}
                </p>
              </div>

              {/* Job Details */}
              <div className="flex flex-col gap-6 md:mt-5 mt-8">
                <div className="border bg-[#ffffff] rounded-2xl shadow-sm px-5 py-5 border-[#E7EFE8]">
                  {/* Job Description */}
                  <section className="pb-7 relative border-b border-[#E7EFE8] md:border-b-0">
                    <span className="absolute bottom-0 -left-5 w-[100.5%] border-b border-[#E7EFE8] hidden md:block"></span>
                    <h2 className="text-xl cal_sans text-[#3D4C41]">
                      Job Description
                    </h2>
                    <p className="text-[#606060] mt-2 DM_sans">
                      {job.description.map((desc, idx) => (
                        <span key={idx}>{desc}</span>
                      ))}
                    </p>

                    <p className="text-[#606060] mt-2 DM_sans">
                      <strong>Location:</strong> {job.remoteLocation}
                    </p>
                  </section>

                  {/* Key Responsibilities */}
                  <section className="mt-6 pb-7 relative border-b border-[#E7EFE8] md:border-b-0">
                    <span className="absolute bottom-0 -left-5 w-[100%] border-b border-[#E7EFE8] hidden md:block"></span>
                    <h2 className="text-xl cal_sans text-[#3D4C41]">
                      Key Responsibilities
                    </h2>
                    <ul className="list-disc ml-5 mt-2 text-gray-700 DM_sans">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </section>

                  {/* Required Skills */}
                  <section className="mt-6">
                    <h2 className="text-xl cal_sans text-[#3D4C41]">
                      Required Skills
                    </h2>
                    <ul className="list-disc ml-5 mt-2 text-[#606060] DM_sans">
                      {job.requiredSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Share Job */}
                <div className="mt-6 flex items-start gap-2">
                  <span className="text-[#606060] font-semibold text-[20px] md:text-[19px] cal_sans">
                    Share Job:
                  </span>
                  <TbCopy
                    size={25}
                    className=" text-black cursor-pointer"
                    onClick={() => handleCopyJobDetails(job)}
                  />
                </div>

                {/* Copied Banner */}
                {showCopiedBanner && (
                  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded shadow-md transition-all duration-300 z-50">
                    Link copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Render modal and pass modal state */}
          {isModalOpen && postedJob && (
            <PostModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              job={postedJob}
            />
          )}
        </div>
        <RecentApplication />
      </section>
    </>
  );
};

export default ViewJobdetails;
