// "use client";
// import { scrollToTop } from "@/lib/utils";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import React, { useState } from "react";
// import { BsDot } from "react-icons/bs";
// import { Card } from "./ui/card";

// // Job Data
// const jobs = [
//   {
//     id: 1,
//     title: "Social Media Assistant",
//     company: "Company A",
//     location: "Paris, France",
//     status: "Open",
//     statusColor: "bg-green-200 text-green-700",
//     logo: "/assets/company-a.png", // Replace with actual image paths
//   },
//   {
//     id: 2,
//     title: "Brand Designer",
//     company: "Company B",
//     location: "San Francisco, USA",
//     status: "Closing Soon",
//     statusColor: "bg-red-200 text-red-700",
//     logo: "/assets/company-b.png",
//   },
//   {
//     id: 3,
//     title: "Interactive Developer",
//     company: "Company C",
//     location: "New York, USA",
//     status: "Open",
//     statusColor: "bg-green-200 text-green-700",
//     logo: "/assets/company-c.png",
//   },
// ];

// const PostJob: React.FC = () => {
// const [hasJobs, setHasJobs] = useState(jobs.length > 0);
//   const router = useRouter();

//     return (
//       <div>
//         {!hasJobs ? (
//           <>
//             <div className="bg-[#FFFFFF] border border-[#EDEFF2] rounded-lg p-4 my-10 w-full">
//               <h2 className="text-xl font-semibold mb-4 text-[#2A2A2A] cal_sans">
//                 My Applications
//               </h2>

//               <div className="flex flex-col items-center justify-center text-center bg-[#FAFAFA] border border-[#EDEFF2] rounded-lg py-10">
//                 <Image
//                   src="/assets/images/bear2.png"
//                   alt="No Jobs"
//                   width={124.46}
//                   height={132.03}
//                 />
//                 <h2 className="text-2xl font-semibold text-[#101828] mt-6 cal_sans">
//                   No Jobs For You
//                 </h2>
//                 <p className="text-[#667085] mt-2 DM_sans">
//                   You haven’t made a post yet. <br /> Click the button below to get
//                   started
//                 </p>
//                 <button
//                   className="mt-6 bg-[#1AC23F] text-white px-8 py-2 rounded-lg  transition cal_sans"
//                   onClick={() => {
//                     router.push("/dashboard/PostJobContent");
//                     scrollToTop();
//                   }}
//                 >
//                   Post A Job
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <Card className="px-[4%] md:px-5 py-5 bg-white rounded-lg border border-[#EDEFF2] w-full">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4 cal_sans">
//               <h2 className="md:text-lg font-semibold">Active Job Postings</h2>
//             </div>

//             {/* Job Listings */}
//             <div className="space-y-4">
//               {jobs.map((job) => (
//                 <div
//                   key={job.id}
//                   className={`px-4 py-5 border rounded-md flex flex-col md:flex-row md:justify-between md:items-center ${
//                     job.status === "Open"
//                       ? "bg-[#F5FFF7] border-[#EDEFF2]"
//                       : "bg-[#FFF4F4] border-[#EDEFF2]"
//                   }`}
//                 >
//                   {/* Left Side: Job Info */}
//                   <div className="flex  gap-3">
//                     <Image
//                       src={job.logo}
//                       alt=""
//                       width={40}
//                       height={40}
//                       className="pt-1"
//                     />
//                     <div className="">
//                       <h3 className="cal_sans text-[#333333]">{job.title}</h3>
                    //   <p className="text-[12px] md:text-[15px] DM_sans text-[#515B6F] flex items-center gap-1">
                    //     {job.company} <BsDot /> {job.location}
                    //   </p>
//                       <div className="flex justify-between items-center pt-2">
//                         {" "}
//                         <div
//                           className={`text-xs px-2 py-1 rounded-full ${
//                             job.status === "Open"
//                               ? "bg-green-200 text-[#56CDAD]"
//                               : "bg-red-200 text-[#FB3748]"
//                           }`}
//                         >
//                           {job.status}
//                         </div>
//                         <button
//                           onClick={() =>
//                             router.push(
//                               `/startup_founder_dashboard/ViewJobdetails_StartUp/${job.id}`
//                             )
//                           }
//                           className="flex justify-end text-[12px] md:text-lg border border-[#9CB8A2] px-4 py-2 rounded-md hover:bg-green-100 hover:text-green-500 hover:border-green-100"
//                         >
//                           Manage Job
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         )}
//       </div>
//     );
// };

// export default PostJob;








"use client";
import { scrollToTop } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { Card } from "./ui/card";

// Job Data
const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Company A",
    location: "Paris, France",
    status: "Open",
    statusColor: "bg-green-200 text-green-700",
    logo: "/assets/company-a.png",
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Company B",
    location: "San Francisco, USA",
    status: "Closing Soon",
    statusColor: "bg-red-200 text-red-700",
    logo: "/assets/company-b.png",
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Company C",
    location: "New York, USA",
    status: "Open",
    statusColor: "bg-green-200 text-green-700",
    logo: "/assets/company-c.png",
  },
];

const PostJob: React.FC = () => {
  const [hasJobs, setHasJobs] = useState(jobs.length > 0);
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
        <Card className="px-[4%] md:px-5 py-5 bg-white rounded-lg border border-[#EDEFF2] ">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 cal_sans">
            <h2 className="md:text-xl font-semibold">Job Posts Management</h2>
            <button
              onClick={() => {
                router.push("/startup_founder_dashboard/PostJobContent");
                scrollToTop();
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Post A Job
            </button>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`p-4 border rounded-md flex justify-between flex-col md:flex-row md:items-center ${
                  job.status === "Open"
                    ? "bg-[#F5FFF7] border-[#EDEFF2]"
                    : "bg-[#FFF4F4] border-[#EDEFF2]"
                }`}
              >
                {/* Left Side: Job Info */}
                <div className="flex items-start gap-3 flex-1">
                  <Image
                    src={job.logo}
                    alt={""}
                    width={40}
                    height={40}
                    className="pt-1"
                  />
                  <div>
                    <h3 className="cal_sans text-[#333333]">{job.title}</h3>
                    <p className="text-[12px] md:text-[15px] DM_sans text-[#515B6F] flex items-center gap-1">
                      {job.company} <BsDot /> {job.location}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        job.status === "Open"
                          ? "bg-green-200 text-[#56CDAD]"
                          : "bg-red-200 text-[#FB3748]"
                      }`}
                    >
                      {job.status}
                    </span>
                    <div className="mt-5 cal_sans text-[#526F58] md:hidden">
                      <button
                        onClick={() =>
                          router.push(
                            `/startup_founder_dashboard/ViewJobdetails_StartUp/${job.id}`
                          )
                        }
                        className={`border border-[#9CB8A2] px-4 py-2 rounded-md  ${
                          job.status === "Open"
                            ? "hover:bg-green-100 hover:text-green-500 hover:border-green-100"
                            : "hover:bg-red-100 hover:text-red-500 hover:border-red-100"
                        }`}
                      >
                        Manage Job
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Button */}
                <div className="mt-11 cal_sans text-[#526F58] hidden md:block">
                  <button
                    onClick={() =>
                      router.push(
                        `/startup_founder_dashboard/ViewJobdetails_StartUp/${job.id}`
                      )
                    }
                    className={`border border-[#9CB8A2] px-4 py-2 rounded-md  ${
                      job.status === "Open"
                        ? "hover:bg-green-100 hover:text-green-500 hover:border-green-100"
                        : "hover:bg-red-100 hover:text-red-500 hover:border-red-100"
                    }`}
                  >
                    Manage Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PostJob;
