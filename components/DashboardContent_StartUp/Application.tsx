"use client";

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
import { getAllJobApplications } from "@/actions/action";


interface ApplicationCard {
  id: string;
  jobSeeker: {
    fullName: string;
    email: string; 
    shortBio: string;
    portfolioLink?: string;
    resumeUrl: string;
    skills: string[];
    interests: string[];
  };
  jobRole: string;
  applicationDate: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

const Application: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationCard | null>(null);
  const [applications, setApplications] = useState<ApplicationCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

    const updateApplicationStatus = (
      applicationId: string,
      newStatus: "ACCEPTED" | "REJECTED"
    ) => {
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        // Keeping your test token as requested
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token");
        const response = await getAllJobApplications(token, 1, 10);

    const transformedApplications = response.applications.map((app) => ({
      id: app.id,
      jobSeeker: {
        fullName: app.jobSeeker.fullName,
        email: app.jobSeeker.email, // optional
        shortBio: app.jobSeeker.shortBio,
        portfolioLink: app.jobSeeker.portfolioLink, // optional
        resumeUrl: app.jobSeeker.resumeUrl,
        skills: app.jobSeeker.skills,
        interests: app.jobSeeker.interests,
      },
      jobRole: app.job.title,
      applicationDate: new Date(app.appliedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: app.status,
    }));



        setApplications(transformedApplications);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleViewApplication = (app: ApplicationCard) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4 my-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-gray-100 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#1AC23F] text-white px-6 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

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
                priority
              />
              <h2 className="text-2xl font-semibold text-[#101828] mt-6 cal_sans">
                No Recent Applications for you
              </h2>
              <p className="text-[#667085] mt-2 DM_sans">
                You haven't made a post yet. <br /> Click the button below to
                get started
              </p>
              <button
                className="mt-6 bg-[#1AC23F] text-white px-8 py-2 rounded-lg transition cal_sans"
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
                <p className="text-2xl text-[#000000] font-bold">
                  {applications.length}
                </p>
              </div>
              <SlBriefcase size={25} className="text-[#1AC23F]" />
            </div>

            <div className="w-full bg-[#ffffff] border border-[#EDEFF2] px-5 py-5 flex justify-between items-center rounded-lg">
              <div className="DM_sans space-y-3">
                <h1 className="text-[#606060]">Pending Applicant Reviews</h1>
                <p className="text-2xl text-[#000000] font-bold">
                  {
                    applications.filter((app) => app.status === "PENDING")
                      .length
                  }
                </p>
              </div>
              <PiClockCountdown size={30} className="text-[#1AC23F]" />
            </div>
          </div>

          <div className="px-[4%] md:px-6 py-10 bg-white border border-[#EDEFF2] rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#2A2A2A] cal_sans">
              Recent Applications
            </h2>

            <div className="w-full overflow-x-auto DM_sans">
              <div className="min-w-[1000px]">
                <div className="grid grid-cols-5 bg-gray-100 text-[#4D5461] p-4 font-semibold">
                  <div className="text-left">NAME</div>
                  <div className="text-left">ROLE</div>
                  <div className="text-left">APPLICATION DATE</div>
                  <div className="text-left">STATUS</div>
                  <div className="text-left">ACTION</div>
                </div>

                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="grid grid-cols-5 bg-white shadow-sm rounded-lg p-4 items-center"
                    >
                      <div className="flex items-center gap-4 text-[#1F2937] whitespace-nowrap">
                        <Image
                          src="/assets/images/profile.png"
                          alt={`${app.jobSeeker.fullName}'s profile`}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        {app.jobSeeker.fullName}
                      </div>

                      <div className="text-[#1F2937]">{app.jobRole}</div>

                      <div className="text-[#1F2937]">
                        {app.applicationDate}
                      </div>

                      <div
                        className={`font-medium flex items-center ${
                          app.status === "ACCEPTED"
                            ? "text-[#1AC23F]"
                            : app.status === "REJECTED"
                              ? "text-[#F9150B]"
                              : "text-[#777777]"
                        }`}
                      >
                        <LuDot size={30} />
                        {app.status}
                      </div>

                      <div>
                        <button
                          onClick={() => handleViewApplication(app)}
                          className="text-[#526F58] border border-[#9CB8A2] hover:border-green-200 hover:bg-green-200 hover:text-green-600 cal_sans px-5 py-2 rounded-md text-sm cursor-pointer"
                        >
                          View Application
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {isModalOpen && selectedApplication?.status === "PENDING" && (
                <ViewPendingModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  application={selectedApplication}
                  onStatusUpdate={(id, newStatus) => {
                    updateApplicationStatus(id, newStatus);
                  }}
                />
              )}
              {isModalOpen && selectedApplication?.status === "ACCEPTED" && (
                <ViewAcceptedModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  application={selectedApplication}
                />
              )}
              {isModalOpen && selectedApplication?.status === "REJECTED" && (
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