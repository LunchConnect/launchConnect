"use client"; // Required for Next.js App Router

import React, { useEffect, useState } from "react";
import { GoDash } from "react-icons/go";
import { SlBriefcase } from "react-icons/sl";
import { PiClockCountdown } from "react-icons/pi";
import Image from "next/image";
import ViewPendingModal from "./ViewPendingModal";
import ViewAcceptedModal from "./ViewAcceptedModal";
import ViewRejectedModal from "./ViewRejectedModal";
import { LuDot } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";

interface Application {
  id: number;
  name: string;
  jobRole: string;
  applicationDate: string;
  status: "Pending" | "Accepted" | "Rejected";
}

//hard coded Applications --------------- waiting for API 
const Applications: Application[] = [
  {
    id: 1,
    name: "Bioku David",
    jobRole: "UI/UX Designer",
    applicationDate: "03/31/2025 14:44",
    status: "Pending",
  },
  {
    id: 2,
    name: "Bioku David",
    jobRole: "Frontend Developer",
    applicationDate: "04/02/2025 11:19",
    status: "Pending",
  },
  {
    id: 3,
    name: "Bioku David",
    jobRole: "Product Designer",
    applicationDate: "04/15/2025 00:41",
    status: "Accepted",
  },
  {
    id: 4,
    name: "Bioku David",
    jobRole: "UX Researcher",
    applicationDate: "04/15/2025 00:41",
    status: "Rejected",
  },
  {
    id: 5,
    name: "Bioku David",
    jobRole: "Graphic Designer",
    applicationDate: "04/26/2025 23:00",
    status: "Accepted",
  },
  {
    id: 6,
    name: "Bioku David",
    jobRole: "Product Designer",
    applicationDate: "04/15/2025 00:41",
    status: "Accepted",
  },
  {
    id: 7,
    name: "Bioku David",
    jobRole: "UX Researcher",
    applicationDate: "04/15/2025 00:41",
    status: "Rejected",
  },
  {
    id: 8,
    name: "Bioku David",
    jobRole: "Graphic Designer",
    applicationDate: "04/26/2025 23:00",
    status: "Accepted",
  },
];

const Application: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>([]); // Change later to real job check
  const router = useRouter();

  // Replace with API fetch later--------------------------------------------------------
  // useEffect(() => {

  //   setApplications();
  // }, []);

  return (
    <div className="">
      {applications.length === 0 ? (
        <>
          <div className="flex flex-col md:flex-row gap-3 my-20">
            <div className="w-full bg-[#ffffff] border border-[#EDEFF2] px-5 py-5 flex justify-between items-center rounded-lg">
              <div className="DM_sans space-y-3">
                <h1 className="text-[#606060]">New Applications</h1>
                <p className="text-2xl text-[#000000] font-bold">
                  <GoDash size={20} />
                </p>
              </div>
              <SlBriefcase size={25} className="text-[#1AC23F]" />
            </div>

            <div className="w-full bg-[#ffffff] border border-[#EDEFF2] px-5 py-5 flex justify-between items-center rounded-lg">
              <div className="DM_sans space-y-3">
                <h1 className="text-[#606060]">Pending Applicant Reviews</h1>
                <p className="text-2xl text-[#000000] font-bold">
                  <GoDash size={20} />
                </p>
              </div>
              <PiClockCountdown size={30} className="text-[#1AC23F]" />
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EDEFF2] rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-[#2A2A2A] cal_sans">
              Recent Applications
            </h2>
            <div className="flex flex-col items-center justify-center text-center bg-[#FAFAFA] border border-[#EDEFF2] rounded-lg py-10">
              <Image
                src="/assets/images/bear.png"
                alt="No Jobs"
                width={124.46}
                height={132.03}
              />
              <h2 className="text-2xl font-semibold text-[#101828] mt-6 cal_sans">
                No Recent Applications for you
              </h2>
              <p className="text-[#667085] mt-2 DM_sans">
                You haven’t made a post yet. <br /> Click the button below to
                get started
              </p>
              <button
                className="mt-6 bg-[#1AC23F] text-white px-8 py-2 rounded-lg  transition cal_sans"
                onClick={() => {
                  router.push("/startup_founder_dashboard/PostJobContent");
                  scrollToTop();
                }}
              >
                Post A Job
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-3 my-20">
            <div className="w-full bg-[#ffffff] border border-[#EDEFF2] px-5 py-5 flex justify-between items-center rounded-lg">
              <div className="DM_sans space-y-3">
                <h1 className="text-[#606060]">New Applications</h1>
                <p className="text-2xl text-[#000000] font-bold">54</p>
              </div>
              <SlBriefcase size={25} className="text-[#1AC23F]" />
            </div>

            <div className="w-full bg-[#ffffff] border border-[#EDEFF2] px-5 py-5 flex justify-between items-center rounded-lg">
              <div className="DM_sans space-y-3">
                <h1 className="text-[#606060]">Pending Applicant Reviews</h1>
                <p className="text-2xl text-[#000000] font-bold">10</p>
              </div>
              <PiClockCountdown size={30} className="text-[#1AC23F]" />
            </div>
          </div>

          <div className="px-[4%] md:px-6 py-10 bg-white border border-[#EDEFF2] rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#2A2A2A] cal_sans">
              Recent Applications
            </h2>

            {/* Table */}
            <div className="w-full overflow-x-auto DM_sans">
              <div className="min-w-[1000px]">
                {/* Table Header */}
                <div className="grid grid-cols-5 bg-gray-100 text-[#4D5461] p-4 font-semibold">
                  <div className="text-left">NAME</div>
                  <div className="text-left">ROLE</div>
                  <div className="text-left">APPLICATION DATE</div>
                  <div className="text-left">STATUS</div>
                  <div className="text-left">ACTION</div>
                </div>

                {/* Table Body */}
                <div className="space-y-3">
                  {Applications.map((app) => (
                    <div
                      key={app.id}
                      className="grid grid-cols-5 bg-white shadow-sm rounded-lg p-4 items-center"
                    >
                      {/* Name Column */}
                      <div className="flex items-center gap-4 text-[#1F2937] whitespace-nowrap">
                        <Image
                          src="/assets/images/profile.png"
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        {app.name}
                      </div>

                      {/* Role Column */}
                      <div className="text-[#1F2937]">{app.jobRole}</div>

                      {/* Application Date Column */}
                      <div className="text-[#1F2937]">
                        {app.applicationDate}
                      </div>

                      {/* Status Column */}
                      <div
                        className={`font-medium flex items-center ${
                          app.status === "Accepted"
                            ? "text-[#1AC23F]"
                            : app.status === "Rejected"
                              ? "text-[#F9150B]"
                              : "text-[#777777]"
                        }`}
                      >
                        <LuDot size={30} />
                        {app.status}
                      </div>

                      {/* Action Column */}
                      <div>
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setIsModalOpen(true);
                          }}
                          className="text-[#526F58] border border-[#9CB8A2] hover:border-green-200 hover:bg-green-200 hover:text-green-600 cal_sans px-5 py-2 rounded-md text-sm cursor-pointer"
                        >
                          View Application
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Render the correct modal based on status */}
              {isModalOpen && selectedApplication?.status === "Pending" && (
                <ViewPendingModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  application={selectedApplication}
                />
              )}
              {isModalOpen && selectedApplication?.status === "Accepted" && (
                <ViewAcceptedModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  application={selectedApplication}
                />
              )}
              {isModalOpen && selectedApplication?.status === "Rejected" && (
                <ViewRejectedModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  application={selectedApplication}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Application;
