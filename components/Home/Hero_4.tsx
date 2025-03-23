// import React from "react";
// import { Search } from "lucide-react";
// import { IoFilterOutline } from "react-icons/io5";
// import { FaArrowRight } from "react-icons/fa";
// import { CiLocationOn } from "react-icons/ci";
// import { LuWallet } from "react-icons/lu";
// import { useRouter } from 'next/navigation'



// // Dummy Job Data
// const jobData = [
//   {
//     title: "Software Engineer",
//     company: "Bauch, Schuppe & Schulist Co",
//     salary: "$40,000-$42,000",
//     location: "New York, USA",
//     role: "Volunteer Role",
//     imageUrl: "https://your-backend.com/images/software-engineer.png",
//   },
//   {
//     title: "Market Intern",
//     company: "Bauch, Schuppe & Schulist Co",
//     salary: "Not Paid",
//     location: "New York, USA",
//     role: "Volunteer Role",
//     imageUrl: "https://your-backend.com/images/market-intern.png",
//   },
//   {
//     title: "Product Designer",
//     company: "Bauch, Schuppe & Schulist Co",
//     salary: "$40,000-$42,000",
//     location: "New York, USA",
//     role: "Volunteer Role",
//     imageUrl: "https://your-backend.com/images/product-designer.png",
//   },
//   {
//     title: "Frontend Developer",
//     company: "Bauch, Schuppe & Schulist Co",
//     salary: "Not Paid",
//     location: "New York, USA",
//     role: "Volunteer Role",
//     imageUrl: "https://your-backend.com/images/frontend-developer.png",
//   },
// ];




// const Hero_4: React.FC = () => {
//   const router = useRouter()

//      const handlefindJob = () => {
//       router.push("/findjobs");
//        window.scrollTo(0, 0); // Scroll to the top
//      };
//   return (
//     <section className="bg-white px-[10%] py-20">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-4xl font-bold text-[#08230E]">Featured jobs</h2>
//         <button
//           onClick={handlefindJob}
//           className="text-green-600 flex gap-3 items-center font-semibold cursor-pointer"
//         >
//           Show all jobs <FaArrowRight size={20} />
//         </button>
//       </div>

//       {/* Search & Filter */}
//       <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
//         <div className="relative w-full">
//           <Search
//             className="absolute left-3 top-3.5 text-[#bbbbbb]"
//             size={20}
//           />
//           <input
//             type="text"
//             placeholder="Search Job Titles"
//             className="w-full pl-10 pr-4 py-3 border border-green-500 rounded-lg outline-none bg:[#BED3C2]"
//           />
//         </div>
//         <button className="flex items-center gap-2 px-4 py-3 border border-green-500 rounded-lg">
//           <IoFilterOutline size={18} className="text-[#bbbbbb]" />
//           <span className="text-[#BBBBBB] whitespace-nowrap">
//             Filter by: <span className="text-[#606060]">Volunteer roles</span>
//           </span>
//         </button>
//       </div>

//       {/* Job Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
//         {jobData.map((job, index) => (
//           <>
//             <div
//               onClick={() => { router.push(`/jod_details${id}`); window.scrollTo(0, 0); }}
//               key={index}
//               className="bg-[#F5FFF7] p-6 rounded-xl shadow-sm border border-[#E7EFE8] cursor-pointer"
//             >
//               <div className="flex justify-between items-center">
//                 <img src={job.imageUrl} alt="" className="w-8 h-8" />
//                 <span className="text-[#56CDAD] text-sm font-medium rounded-2xl p-1.5 bg-[#A1E2AF1A]">
//                   {job.role}
//                 </span>
//               </div>
//               <h3 className="font-semibold text-lg mt-3">{job.title}</h3>
//               <p className="text-gray-600 text-sm mt-2">{job.company}</p>
//               <p className="text-gray-700 font-medium flex items-center gap-2 mt-2">
//                 <LuWallet />
//                 {job.salary === "Not Paid" ? (
//                   <span className="text-red-500 text-sm font-medium">
//                     Not Paid
//                   </span>
//                 ) : (
//                   <span className="text-green-600 text-sm font-medium">
//                     {job.salary}
//                   </span>
//                 )}
//               </p>
//               <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
//                 <CiLocationOn size={17} />
//                 {job.location}
//               </p>
//             </div>
//           </>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Hero_4;












import React from "react";
import { Search } from "lucide-react";
import { IoFilterOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { LuWallet } from "react-icons/lu";
import { useRouter } from "next/navigation";

// Dummy Job Data
const jobData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "$40,000-$42,000",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/software-engineer.png",
  },
  {
    id:2,
    title: "Market Intern",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Not Paid",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/market-intern.png",
  },
  {
    id:3,
    title: "Product Designer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "$40,000-$42,000",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/product-designer.png",
  },
  {
    id:4,
    title: "Frontend Developer",
    company: "Bauch, Schuppe & Schulist Co",
    salary: "Not Paid",
    location: "New York, USA",
    role: "Volunteer Role",
    imageUrl: "https://your-backend.com/images/frontend-developer.png",
  },
];

const Hero_4: React.FC = () => {
  const router = useRouter();

  const handlefindJob = () => {
    router.push("/findjobs");
    window.scrollTo(0, 0); // Scroll to the top
  };
  return (
    <section className="bg-white section md:py-20 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-[#08230E] cal_sans">
          Featured jobs
        </h2>
        <button
          onClick={handlefindJob}
          className="text-green-600 gap-3 items-center font-semibold cursor-pointer hidden md:flex"
        >
          Show all jobs <FaArrowRight size={20} />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-3.5 text-[#bbbbbb]"
            size={20}
          />
          <input
            type="text"
            placeholder="Search Job Titles"
            className="custom-input"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border md:border-green-500 border-[#BED3C2] rounded-lg w-2/3 md:w-1/4">
          <IoFilterOutline size={18} className="text-[#bbbbbb]" />
          <span className="text-[#BBBBBB] whitespace-nowrap">
            Filter by:{" "}
            <span className="text-[#606060] DM_sans">Volunteer roles</span>
          </span>
        </button>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {jobData.map((job, index) => (
          <>
            <div
              onClick={() => {
                router.push(`/job_details/${job.id}`);
                window.scrollTo(0, 0);
              }}
              key={index}
              className="bg-[#F5FFF7] p-6 rounded-xl shadow-sm border border-[#E7EFE8] cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <img src={job.imageUrl} alt="" className="w-8 h-8" />
                <span className="text-[#56CDAD] text-sm DM_sans font-medium rounded-2xl p-1.5 bg-[#A1E2AF1A]">
                  {job.role}
                </span>
              </div>
              <h3 className="text-lg mt-3 cal_sans text-[#3B4D3F]">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 DM_sans">
                {job.company}
              </p>
              <p className="text-gray-700 font-medium flex items-center gap-2 mt-2">
                <LuWallet />
                {job.salary === "Not Paid" ? (
                  <span className="text-red-500 text-sm font-medium DM_sans">
                    Not Paid
                  </span>
                ) : (
                  <span className="text-green-600 text-sm font-medium DM_sans">
                    {job.salary}
                  </span>
                )}
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-2 DM_sans">
                <CiLocationOn size={17} />
                {job.location}
              </p>
            </div>
          </>
        ))}
      </div>
      <button
        onClick={handlefindJob}
        className="text-green-600 gap-3 flex items-center pt-5 Epilogue font-semibold cursor-pointer  md:hidden"
      >
        Show all jobs <FaArrowRight size={20} />
      </button>
    </section>
  );
};

export default Hero_4;