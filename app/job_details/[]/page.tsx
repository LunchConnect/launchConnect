'use client'
// import { useParams } from 'next/navigation'
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";

import RelatedJobs from "@/components/Home/RelatedJobs";
import withHeaderAndFooter from "@/Hoc/withHeaderAndFooter";

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Bausch, Schuppe and Schulist Co",
    salary: "$140,000 - $200,000",
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
  { label: "Startup Name", value: "LaunchConnect", icon: "/images/img1.png" },
  { label: "Industry", value: "AI-Powered SaaS", icon: "/images/img2.png" },
  {
    label: "Website",
    value: "www.techforge.ai",
    link: "https://www.techforge.ai",
    icon: "/images/img3.png",
  },
  {
    label: "Company Overview",
    value:
      "TechForge Solutions is an AI-driven platform that helps businesses automate customer interactions and optimize workflows. Our mission is to make AI accessible to all businesses, regardless of size.",
    icon: "/images/img4.png",
  },
  {
    label: "Application Deadline",
    value: "March 31, 2025",
    icon: "/images/img5.png",
  },
  {
    label: "Commitment Level",
    value: "Part-time (10-15 hours per week) for 3 months",
    icon:"/images/img6.png"
  },
];

const JobDetails: React.FC = () => {
    // const params = useParams<{ id: string; }>()
    
  return (
    <>
      <section className="overflow-hidden">
        <div className="bg-[#08230E] px-[10%] py-15 text-center text-4xl font-bold text-white">
          <h2>Job Details</h2>
        </div>

        <div className="px-[10%] py-20">
          {jobs.map((job) => (
            <>
              <div key={job.id}>
                {/* Header */}
                <div className="">
                  <div className="flex justify-between items-center">
                    {" "}
                    <div className="flex items-center gap-2">
                      <img src={job.imageUrl} alt="" className="w-10 h-10" />
                      <h1 className="text-2xl font-semibold text-[#243428]">
                        {job.title}
                      </h1>
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">
                      Apply Now
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <img src="/images/location.png" alt="" className="w- h-" />
                    <p className="text-[#777777]">{job.company}</p>
                  </div>

                  <div className="flex justify-between items-center gap-2 ">
                    <div className="flex items-center gap-2 mt-2">
                      <LuWallet color="#777777" />
                      <p className="text-[#777777] flex items-center gap-1">
                        {job.salary}{" "}
                        <span className="flex items-center gap-1 ml-2">
                          <CiLocationOn size={17} /> {job.location}
                        </span>
                      </p>
                    </div>
                    <img
                      src="assets/images/collection.png"
                      alt=""
                      className="w-7 h-7 cursor-pointer"
                    />
                  </div>
                </div>

              
                {/* Job Description */}
                <div className="flex gap-6 mt-5">
                  <div className="w-3/4 border bg-[#ffffff] rounded-2xl shadow-sm px-5 py-5 border-[#E7EFE8]">
                    <section className="mt-6 pb-7 relative">
                      <span className="absolute bottom-0 -left-5 w-[104.6%] border-b border-[#E7EFE8]"></span>
                      <h2 className="text-xl font-semibold">Job Description</h2>
                      <p className="text-[#606060] mt-2">{job.description}</p>
                      <p className="text-[#606060] mt-2">
                        <strong>Location:</strong> {job.remoteLocation}
                      </p>
                    </section>

                    {/* Key Responsibilities */}
                    <section className="mt-6 pb-7  relative">
                      <span className="absolute bottom-0 -left-5 w-[104.6%] border-b border-[#E7EFE8]"></span>
                      <h2 className="text-xl font-semibold">
                        Key Responsibilities
                      </h2>
                      <ul className="list-disc ml-5 mt-2 text-gray-700">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </section>

                    {/* Required Skills */}
                    <section className="mt-6">
                      <h2 className="text-xl font-semibold">Required Skills</h2>
                      <ul className="list-disc ml-5 mt-2 text-[#606060]">
                        {job.requiredSkills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <div className="w-1/4 bg-[#F5FFF7] p-4 rounded-2xl shadow self-start">
                    <h2 className="text-[17px] font-semibold mb-4 text-[#01011A]">
                      Explore company insights
                    </h2>
                    <ul className="space-y-2">
                      {companyInsights.map((item, index) => (
                        <li key={index} className="text-gray-700 ">
                          <div className="flex items-start gap-4">
                            <img src={item.icon} alt="" className="w-5 h-5 mt-1" />
                            <div>
                              <strong className="block">{item.label}</strong>
                              <div className="text-[15px]">
                                {item.link ? (
                                  <a
                                    href={item.link}
                                    className="text-blue-500"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {item.value}
                                  </a>
                                ) : (
                                  item.value
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ))}

          {/* Share Job */}
          <div className="mt-6 flex items-center">
            <span className="text-[#606060] font-semibold text-[19px]">
              Share Job:
            </span>
            <div className="ml-4 flex space-x-3">
              <button className=" cursor-pointer">
                <FaFacebook size={18} />
              </button>
              <button className="cursor-pointer">
                <RiTwitterXFill size={18} />
              </button>
              <button className="cursor-pointer">
                <FaLinkedin size={18} />
              </button>
            </div>
          </div>
        </div>
        <RelatedJobs />
      </section>
    </>
  );
};

export default withHeaderAndFooter(JobDetails);
