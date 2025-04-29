"use client";
import React, { useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";
import ViewPendingModal from "./ViewPendingModal";
import ViewAcceptedModal from "./ViewAcceptedModal";
import ViewRejectedModal from "./ViewRejectedModal";
import { JobApplication, getAllJobApplications } from "@/actions/action";
import Image from "next/image";

interface RecentApplicationProps {
  applications: JobApplication[];
}

const RecentApplication: React.FC<RecentApplicationProps> = ({
  applications,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [application, setApplication] = useState<JobApplication[]>([]);

 // Add this inside your component
 useEffect(() => {
   const enrichApplicationsWithEmail = async () => {
     const token = localStorage.getItem("token");
     if (!token) return;

     try {
       const allAppData = await getAllJobApplications(token, 1, 100);
       const enrichedApps = applications.map((app) => {
         const match = allAppData.applications.find(
           (fullApp) => fullApp.jobSeekerId === app.jobSeekerId
         );
         if (match && match.jobSeeker?.user?.email) {
           return {
             ...app,
             jobSeeker: {
               ...app.jobSeeker,
               user: {
                 email: match.jobSeeker.user.email,
               },
             },
           };
         } else {
           // Default fallback if no email is found
           return {
             ...app,
             jobSeeker: {
               ...app.jobSeeker,
               user: {
                 email: "N/A",
               },
             },
           };
         }
       });

       setApplication(enrichedApps);
     } catch (error) {
       console.error("Failed to enrich applications with emails", error);
     }
   };

   enrichApplicationsWithEmail();
 }, [applications]);


  const updateApplicationStatus = (
    applicationId: string,
    newStatus: "ACCEPTED" | "REJECTED"
  ) => {
    setApplication((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "text-[#1AC23F]";
      case "REJECTED":
        return "text-[#F9150B]";
      default:
        return "text-[#777777]";
    }
  };

  return (
    <div className="px-[4%] md:px-6 py-10 my-5 bg-white border border-[#EDEFF2] rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 text-[#2A2A2A]">
        Recent Applications
      </h2>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-4 bg-gray-100 text-[#4D5461] p-4 font-semibold">
            <div className="text-left">NAME</div>
            <div className="text-left">APPLICATION DATE</div>
            <div className="text-left">STATUS</div>
            <div className="text-left">ACTION</div>
          </div>

          <div className="space-y-3">
            {application.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="grid grid-cols-4 bg-white shadow-sm rounded-lg p-4 items-center"
              >
                <div className="flex items-center gap-4 text-[#1F2937] whitespace-nowrap">
                  <div className="w-10 h-10 rounded-full bg-[#E7EFE8] flex items-center justify-center">
                    <Image
                      src="/assets/images/profile.png"
                      alt={`${app.jobSeeker.fullName}'s profile`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  {app.jobSeeker.fullName}
                </div>

                <div className="text-[#1F2937]">
                  {formatDate(app.appliedAt)}
                </div>

                <div
                  className={`font-medium flex items-center ${getStatusColor(app.status)}`}
                >
                  <LuDot size={30} />
                  {app.status}
                </div>

                <div>
                  <button
                    onClick={() => {
                      setSelectedApplication(app);
                      setIsModalOpen(true);
                    }}
                    className="text-[#526F58] border border-[#9CB8A2] hover:border-green-200 hover:bg-green-200 hover:text-green-600 px-5 py-2 rounded-md text-sm"
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
  );
};

export default RecentApplication;
