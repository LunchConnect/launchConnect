"use client"; // Required for Next.js App Router

import React, { useState } from "react";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import ViewPendingModal from "./DashboardContent_StartUp/ViewPendingModal";
import ViewAcceptedModal from "./DashboardContent_StartUp/ViewAcceptedModal";
import ViewRejectedModal from "./DashboardContent_StartUp/ViewRejectedModal";
import { Card } from "./ui/card";
import { scrollToTop } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getAllJobApplications } from "@/actions/action";

interface Application {
  id: number;
  name: string;
  jobRole: string;
  applicationDate: string;
  status: "Pending" | "Accepted" | "Rejected";
}

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
    jobRole: "Graphic Designer",
    applicationDate: "04/26/2025 23:00",
    status: "Accepted",
  },
].slice(0, 5) as Application[];

const RecentApplication: React.FC = () => {
  const [hasJobs, setHasJobs] = useState(Applications.length > 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const router = useRouter();

  return (
    <div className="">
      {!hasJobs ? (
        <div className="bg-white border border-gray-200 rounded-lg p-4 cal_sans">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Active Job Postings
          </h2>

          <div className="flex flex-col items-center justify-center text-center bg-gray-100 border border-gray-200 rounded-lg py-10">
            <Image
              src="/assets/images/bear2.png"
              alt="No Jobs"
              width={124}
              height={132}
            />
            <h2 className="text-2xl font-semibold text-gray-900 mt-6">
              No Jobs For You
            </h2>
            <p className="text-gray-600 mt-2 DM_sans">
              You haven’t made a post yet. <br /> Click the button below to get
              started.
            </p>
            <button
              className="mt-6 bg-[#1AC23F] text-white px-6 py-2 rounded-lg  transition"
              onClick={() => {
                router.push("/dashboard/PostJobContent");
                scrollToTop();
              }}
            >
              Post A Job
            </button>
          </div>
        </div>
      ) : (
        <Card className="px-[4%] md:px-6 py-5 bg-white rounded-lg border border-[#EDEFF2] space-y-10">
          <h2 className="text-lg font-semibold mb-4 text-[#2A2A2A] cal_sans">
            Recent Applications
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px] md:min-w-0">
              <table className="">
                <thead>
                  <tr className="bg-gray-100 text-[#4D5461]">
                    <th className="p-4 text-left">NAME</th>
                    <th className="p-4 text-left">ROLE</th>
                    <th className="p-4 text-left hidden">APPLICATION DATE</th>
                    <th className="p-4 text-left">STATUS</th>
                    <th className="p-4 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {Applications.map((app) => (
                    <tr key={app.id} className="border-b bg-white">
                      <td className="p-4 text-[#1F2937] flex items-center gap-4">
                        <Image
                          src="/assets/images/profile.png"
                          alt=""
                          width={40}
                          height={40}
                        />
                        {app.name}
                      </td>
                      <td className="p-4 text-[#1F2937]">{app.jobRole}</td>
                      <td className="p-4 text-[#1F2937] hidden">
                        {app.applicationDate}
                      </td>
                      <td
                        className={`p-4 font-medium flex items-center ${
                          app.status === "Accepted"
                            ? "text-[#1AC23F]"
                            : app.status === "Rejected"
                              ? "text-[#F9150B]"
                              : "text-[#777777]"
                        }`}
                      >
                        <LuDot size={30} />
                        {app.status}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setIsModalOpen(true);
                          }}
                          className="text-[#526F58] border border-[#9CB8A2] hover:border-green-200 hover:bg-green-200 hover:text-green-600 cal_sans px-6 py-2 rounded-md text-sm cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Render the correct modal based on status
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
          )} */}
        </Card>
      )}
    </div>
  );
};

export default RecentApplication;
