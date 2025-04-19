// "use client"; // Required for Next.js App Router

// import React, { useState } from "react";
// import Image from "next/image";
// import ViewPendingModal from "./ViewPendingModal";
// import ViewAcceptedModal from "./ViewAcceptedModal";
// import ViewRejectedModal from "./ViewRejectedModal";
// import { LuDot } from "react-icons/lu";

// interface Application {
//   id: number;
//   name: string;
//   jobRole: string;
//   applicationDate: string;
//   status: "Pending" | "Accepted" | "Rejected";
// }

// const Applications: Application[] = [
//   {
//     id: 1,
//     name: "Bioku David",
//     jobRole: "UI/UX Designer",
//     applicationDate: "03/31/2025 14:44",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     name: "Bioku David",
//     jobRole: "Frontend Developer",
//     applicationDate: "04/02/2025 11:19",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     name: "Bioku David",
//     jobRole: "Product Designer",
//     applicationDate: "04/15/2025 00:41",
//     status: "Accepted",
//   },
//   {
//     id: 4,
//     name: "Bioku David",
//     jobRole: "UX Researcher",
//     applicationDate: "04/15/2025 00:41",
//     status: "Rejected",
//   },
//   {
//     id: 5,
//     name: "Bioku David",
//     jobRole: "Graphic Designer",
//     applicationDate: "04/26/2025 23:00",
//     status: "Accepted",
//   },
//   {
//     id: 6,
//     name: "Bioku David",
//     jobRole: "Graphic Designer",
//     applicationDate: "04/26/2025 23:00",
//     status: "Accepted",
//   },
// ].slice(0, 5) as Application[];

// const RecentApplication: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedApplication, setSelectedApplication] =
//     useState<Application | null>(null);

//   return (
//     <div className="px-[4%] md:px-6 py-10 my-5 bg-white border border-[#EDEFF2] rounded-2xl">
//       <h2 className="text-xl font-semibold mb-4 text-[#2A2A2A] cal_sans">
//         Recent Applications
//       </h2>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <div className="min-w-[1000px]">
//           {/* Table Header */}
//           <div className="grid grid-cols-4 bg-gray-100 text-[#4D5461] p-4 font-semibold">
//             <div className="text-left">NAME</div>
//             <div className="text-left">APPLICATION DATE</div>
//             <div className="text-left">STATUS</div>
//             <div className="text-left">ACTION</div>
//           </div>

//           {/* Table Body */}
//           <div className="space-y-3">
//             {Applications.map((app) => (
//               <div
//                 key={app.id}
//                 className="grid grid-cols-4 bg-white shadow-sm rounded-lg p-4 items-center"
//               >
//                 {/* Name Column */}
//                 <div className="flex items-center gap-4 text-[#1F2937] whitespace-nowrap">
//                   <Image
//                     src="/assets/images/profile.png"
//                     alt=""
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   {app.name}
//                 </div>

//                 {/* Application Date Column */}
//                 <div className="text-[#1F2937]">{app.applicationDate}</div>

//                 {/* Status Column */}
//                 <div
//                   className={`font-medium flex items-center ${
//                     app.status === "Accepted"
//                       ? "text-[#1AC23F]"
//                       : app.status === "Rejected"
//                         ? "text-[#F9150B]"
//                         : "text-[#777777]"
//                   }`}
//                 >
//                   <LuDot size={30} />
//                   {app.status}
//                 </div>

//                 {/* Action Column */}
//                 <div>
//                   <button
//                     onClick={() => {
//                       setSelectedApplication(app);
//                       setIsModalOpen(true);
//                     }}
//                     className="text-[#526F58] border border-[#9CB8A2] hover:border-green-200 hover:bg-green-200 hover:text-green-600 cal_sans px-5 py-2 rounded-md text-sm cursor-pointer"
//                   >
//                     View Application
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Render the correct modal based on status */}
//         {isModalOpen && selectedApplication?.status === "Pending" && (
//           <ViewPendingModal
//             isOpen={isModalOpen}
//             setIsOpen={setIsModalOpen}
//             application={selectedApplication}
//           />
//         )}
//         {isModalOpen && selectedApplication?.status === "Accepted" && (
//           <ViewAcceptedModal
//             isOpen={isModalOpen}
//             setIsOpen={setIsModalOpen}
//             application={selectedApplication}
//           />
//         )}
//         {isModalOpen && selectedApplication?.status === "Rejected" && (
//           <ViewRejectedModal
//             isOpen={isModalOpen}
//             setIsOpen={setIsModalOpen}
//             application={selectedApplication}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecentApplication;




"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import ViewPendingModal from "./ViewPendingModal";
import ViewAcceptedModal from "./ViewAcceptedModal";
import ViewRejectedModal from "./ViewRejectedModal";
import { JobApplication } from "@/actions/action";

interface RecentApplicationProps {
  applications: JobApplication[];
}

const RecentApplication: React.FC<RecentApplicationProps> = ({
  applications,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

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
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gray-100 text-[#4D5461] p-4 font-semibold">
            <div className="text-left">NAME</div>
            <div className="text-left">APPLICATION DATE</div>
            <div className="text-left">STATUS</div>
            <div className="text-left">ACTION</div>
          </div>

          {/* Table Body */}
          <div className="space-y-3">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="grid grid-cols-4 bg-white shadow-sm rounded-lg p-4 items-center"
              >
                {/* Name Column */}
                <div className="flex items-center gap-4 text-[#1F2937] whitespace-nowrap">
                  <div className="w-10 h-10 rounded-full bg-[#E7EFE8] flex items-center justify-center">
                    <span className="font-medium">
                      {app.jobSeeker.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  {app.jobSeeker.fullName}
                </div>

                {/* Application Date Column */}
                <div className="text-[#1F2937]">
                  {formatDate(app.appliedAt)}
                </div>

                {/* Status Column */}
                <div
                  className={`font-medium flex items-center ${getStatusColor(app.status)}`}
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
                    className="text-[#526F58] border border-[#9CB8A2] hover:border-green-200 hover:bg-green-200 hover:text-green-600 px-5 py-2 rounded-md text-sm"
                  >
                    View Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Render the correct modal based on status */}
        {/* {isModalOpen && selectedApplication?.status === "PENDING" && (
          <ViewPendingModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            application={selectedApplication}
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
        )} */}
      </div>
    </div>
  );
};

export default RecentApplication;