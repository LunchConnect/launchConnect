"use client";
import React, { useState } from "react";
import { LuWallet } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbCopy } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import JobModal from "./JobModal";

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

const companyInsights = [
  {
    label: "Startup Name",
    value: "LaunchConnect",
    icon: "/assets/images/img1.png",
  },
  {
    label: "Industry",
    value: "AI-Powered SaaS",
    icon: "/assets/images/img2.png",
  },
  {
    label: "Website",
    value: "www.techforge.ai",
    link: "https://www.techforge.ai",
    icon: "/assets/images/img3.png",
  },
  {
    label: "Application Deadline",
    value: "March 31, 2025",
    icon: "/assets/images/img5.png",
  },
  {
    label: "Commitment Level",
    value: "Part-time (10-15 hours per week) for 3 months",
    icon: "/assets/images/img6.png",
  },
  {
    label: "Company Overview",
    value:
      "TechForge Solutions is an AI-driven platform that helps businesses automate customer interactions and optimize workflows. Our mission is to make AI accessible to all businesses, regardless of size.",
    icon: "/assets/images/img4.png",
  },
];

interface JobDetailsProps {
  jobId: string;
}

const Jobdetails: React.FC<JobDetailsProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null); // State for selected job
  const router = useRouter();
  return (
    <>
      <section className="">
        <div className="px-[4%] md:px-6 py-5 my-10 bg-white border border-[#EDEFF2] rounded-xl">
          <button
            onClick={() => router.push("/dashboard/findjobs")}
            className="flex items-center gap-2 text-black text-xl cal_sans pb-5"
          >
            <IoIosArrowBack size={20} />
            <span className="mt-1">Back</span>
          </button>
          {jobs.map((job) => (
            <div key={job.id}>
              {/* Job Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4">
                <div className="flex items-center gap-2">
                  <img src={job.imageUrl} alt="" className="w-10 h-10" />
                  <h1 className="text-2xl text-[#243428] cal_sans">
                    {job.title}
                  </h1>
                </div>
                <button
                  onClick={() => {
                    setSelectedJob(job); // Set the selected job
                    setIsModalOpen(true);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer cal_sans self-start md:self-center"
                >
                  Apply Now
                </button>
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
                      {job.description}
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
                  <TbCopy size={25} className=" text-black " />
                </div>

                {/* Company Insights */}
                <div className="bg-[#F5FFF7] p-4 rounded-2xl shadow">
                  <h2 className="text-[17px] mb-4 text-[#01011A] cal_sans">
                    Explore company insights
                  </h2>
                  <ul className="grid grid-rows-1 md:grid-cols-3 gap-x-10 gap-y-4 text-xl">
                    {/* Map all items except "Company Overview" */}
                    {companyInsights
                      .filter((item) => item.label !== "Company Overview")
                      .map((item, index) => (
                        <li key={index} className="text-gray-700">
                          <div className="flex items-start gap-4">
                            <img src={item.icon} alt="" className="w-5 h-5" />
                            <div>
                              <strong className="block cal_sans text-[#3B4D3F]">
                                {item.label}
                              </strong>
                              <div className="text-[15px] DM_sans">
                                {item.link ? (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {item.value}
                                  </a>
                                ) : (
                                  <span>{item.value}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}

                    {/* Render "Company Overview" separately at the bottom */}
                    {companyInsights
                      .filter((item) => item.label === "Company Overview")
                      .map((item, index) => (
                        <li key={index} className="text-gray-700 md:col-span-3">
                          <div className="flex items-start gap-4">
                            <img src={item.icon} alt="" className="w-5 h-5" />
                            <div>
                              <strong className="block cal_sans text-[#3B4D3F]">
                                {item.label}
                              </strong>
                              <p className="text-[15px] DM_sans">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Render modal and pass modal state */}
          {isModalOpen && selectedJob && (
            <JobModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              job={selectedJob}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Jobdetails;
