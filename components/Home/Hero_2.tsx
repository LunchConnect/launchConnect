// import React from "react";

// const Hero_2: React.FC = () => {
//   return (
//     <>
//       <section className="relative bg-white  px-[10%]">
//         <div className="mx-auto text-center py-20">
//           <h1 className="text-4xl font-bold text-start">
//             What is <span className="text-[#1AC23F]">LaunchConnect</span>
//             <p className="mt-2">All About?</p>
//           </h1>
//           <p className="text-gray-600 text-xl mt-4 text-start max-w-md mb-30">
//             LaunchConnect is a platform that bridges the gap between startups
//             and job seekers, making it easier to connect, collaborate, and grow.
//             Startups can find passionate talent, while job seekers gain valuable
//             experience in dynamic roles.
//           </p>
//         </div>

        // {/* Wave SVG at Bottom */}
        // <div className="absolute -bottom-1 left-0 w-full">
        //   <svg
        //     viewBox="0 0 1440 320"
        //     className="w-full h-auto"
        //     preserveAspectRatio="none"
        //   >
        //     {/* Dark Green Background */}
        //     <path
        //       fill="#08230E" // Dark Green Fill
        //       d="M1440,288 C1340,250 1140,180 940,200 C740,220 540,300 340,280 C140,260 0,200 0,200 V320 H1440 Z"
        //     ></path>

        //     {/* Light Green Stroke */}
        //     <path
        //       fill="none"
        //       stroke="#06C145"
        //       strokeWidth="10"
        //       d="M1440,288 C1340,250 1140,180 940,200 C740,220 540,300 340,280 C140,260 0,200 0,200 v3"
        //     ></path>
        //   </svg>
        // </div>

//         {/* Floating Buttons */}
//         <div className="absolute top-[15%] right-[12%] ">
//           <div className="border-2 border-green-600 p-2 rounded-xl w-[105%]">
//             <div className="bg-[#D7F6DE] px-4 py-8 w-full rounded-xl">
//               <h2 className="text-[#192F1E] font-semibold text-xl relative pb-2">
//                 <span className="relative z-10">
//                   Are you a Start-Up Founder?
//                 </span>
//                 <span className="absolute bottom-0 -right-6 w-[110%] border-b border-green-300"></span>
//               </h2>
//               <p className="text-[#75897A] pt-4 text-[18px]">
//                 Post volunteer, internship, and entry-level jobs to build a
//               </p>
//               <p className="text-[#75897A] pt-1 text-[18px]">
//                 strong team and scale your startup.
//               </p>
//               <button className="text-[#192F1E] px-4 py-2 mt-3 w-42 border border-green-500 bg-[#FFFFFF] rounded-md cursor-pointer">
//                 Post Opportunities
//               </button>
//             </div>
//           </div>

//           <div className="mt-5 border-2 border-green-600 p-2 rounded-xl w-[105%]">
//             <div className="bg-[#D7F6DE] px-4 py-8 rounded-xl">
//               <h2 className="text-[#192F1E] font-semibold text-xl relative pb-2">
//                 <span className="relative z-10">Are you a Job Seeker?</span>
//                 <span className="absolute bottom-0 -right-6 w-[110%] border-b border-green-300"></span>
//               </h2>
//               <p className="text-[#75897A] pt-4 text-[18px]">
//                 Apply for roles at startups, collaborate with founders, and
//               </p>
//               <p className="text-[#75897A] pt-1 text-[18px]">
//                 kickstart your career.
//               </p>
//               <button className="text-[#192F1E] px-4 py-2 mt-3 w-42 border border-green-500 bg-[#FFFFFF] rounded-md cursor-pointer">
//                 Start Applying
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero_2;








import React from "react";
import { useRouter } from "next/navigation";
const Hero2: React.FC = () => {
  const router = useRouter();
  return (
    <section className="relative bg-white px-[4%] md:px-[10%] md:pb-32">
      <div className="mx-auto text-center md:py-20 md:pb-52 py-10">
        <h1 className="text-5xl md:text-4xl font-bold md:text-start cal_sans text-[#192F1E]">
          What is <span className="text-[#1AC23F]">LaunchConnect</span>
          <p className="mt-2">All About?</p>
        </h1>
        <p className="text-gray-600 text-xl mt-4 md:text-start md:max-w-md md:mb-30 DM_sans">
          LaunchConnect is a platform that bridges the gap between startups and
          job seekers, making it easier to connect, collaborate, and grow.
          Startups can find “passionate talent”, while job seekers gain valuable
          experience in dynamic roles.
        </p>
      </div>
      {/* Wave SVG at Bottom */}
      <div className="absolute -bottom-1 left-0 w-full hidden md:block">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Dark Green Background */}
          <path
            fill="#08230E" // Dark Green Fill
            d="M1440,288 C1340,250 1140,180 940,200 C740,220 540,300 340,280 C140,260 0,200 0,200 V320 H1440 Z"
          ></path>

          {/* Light Green Stroke */}
          <path
            fill="none"
            stroke="#06C145"
            strokeWidth="10"
            d="M1440,288 C1340,250 1140,180 940,200 C740,220 540,300 340,280 C140,260 0,200 0,200 v3"
          ></path>
        </svg>
      </div>

      {/* Wave SVG at Bottom for smaller screens ------------------------------------- */}
      <div className="absolute -bottom-1 left-0 w-full md:hidden">
        <img src="/images/Frame.png" alt="" />
      </div>

      {/* Floating Buttons for larger screens ------------------------------------- */}
      <div className="absolute top-[15%] right-[12%] hidden md:block">
        <div className="border-2 border-green-600 p-2 rounded-xl w-[105%]">
          <div className="bg-[#D7F6DE] px-4 py-8 w-full rounded-xl">
            <h2 className="text-[#192F1E] font-semibold text-xl relative pb-2">
              <span className="relative z-10 cal_sans">
                Are you a Start-Up Founder?
              </span>
              <span className="absolute bottom-0 -right-6 w-[110%] border-b border-green-300"></span>
            </h2>
            <p className="text-[#75897A] pt-4 text-[18px] DM_sans">
              Post volunteer, internship, and entry-level jobs to build a
            </p>
            <p className="text-[#75897A] pt-1 text-[18px] DM_sans">
              strong team and scale your startup.
            </p>
            <button
              onClick={() => router.push("/sign_up")}
              className="text-[#192F1E] px-4 py-2 mt-3 w-42 border DM_sans font-semibold whitespace-nowrap  border-green-500 bg-[#FFFFFF] rounded-md cursor-pointer pl-3"
            >
              Post Opportunities
            </button>
          </div>
        </div>

        <div className="mt-5 border-2 border-green-600 p-2 rounded-xl w-[105%]">
          <div className="bg-[#D7F6DE] px-4 py-8 rounded-xl">
            <h2 className="text-[#192F1E] font-semibold text-xl relative pb-2">
              <span className="relative z-10 cal_sans">
                Are you a Job Seeker?
              </span>
              <span className="absolute bottom-0 -right-6 w-[110%] border-b border-green-300"></span>
            </h2>
            <p className="text-[#75897A] pt-4 text-[18px] DM_sans">
              Apply for roles at startups, collaborate with founders, and
            </p>
            <p className="text-[#75897A] pt-1 text-[18px] DM_sans">
              kickstart your career.
            </p>
            <button
              onClick={() => router.push("/sign_up")}
              className="text-[#192F1E] px-4 py-2 mt-3 w-42 border DM_sans font-semibold border-green-500 bg-[#FFFFFF] rounded-md cursor-pointer"
            >
              Start Applying
            </button>
          </div>
        </div>
      </div>

      {/* Floating Buttons-small screen---------------------------------------------- */}
      <div className="md:hidden relative z-10">
        <div className="border-2 border-green-600 p-2 rounded-xl">
          <div className="bg-[#D7F6DE] px-4 py-8 w-full rounded-xl">
            <h2 className="text-[#192F1E] font-semibold text-[18px] relative pb-2">
              <span className="relative z-10 cal_sans">
                Are you a Start-Up Founder?
              </span>
              <span className="absolute bottom-0 -right-6 w-[116%] border-b border-green-300"></span>
            </h2>
            <p className="text-[#75897A] pt-4 text-[15px] DM_sans">
              Post volunteer, internship, and entry-level jobs to build a strong
              team and scale your startup.
            </p>
            <button
              onClick={() => router.push("/sign_up")}
              className="text-[#192F1E] px-4 py-2 mt-3 w-42 border DM_sans font-semibold whitespace-nowrap border-green-500 bg-[#FFFFFF] rounded-md cursor-pointer pl-3"
            >
              Post Opportunities
            </button>
          </div>
        </div>

        <div className="mt-5 border-2 border-green-600 p-2 rounded-xl">
          <div className="bg-[#D7F6DE] px-4 py-8 rounded-xl">
            <h2 className="text-[#192F1E] font-semibold text-xl relative pb-2">
              <span className="relative z-10 cal_sans">
                Are you a Job Seeker?
              </span>
              <span className="absolute bottom-0 -right-6 w-[116%] border-b border-green-300"></span>
            </h2>
            <div className="text-[#75897A] pt-4 text-[15px] DM_sans">
              <p>
                Apply for roles at startups, collaborate with founders, and
                kickstart your career.
              </p>
            </div>
            <button
              onClick={() => router.push("/sign_up")}
              className="text-[#192F1E] px-4 py-2 mt-3 w-42 border DM_sans font-semibold border-green-500 bg-[#FFFFFF] rounded-md cursor-pointer"
            >
              Start Applying
            </button>
          </div>
        </div>
      </div>
      {/* image for small screen */}
      <img
        src="assets/images/frame.png"
        alt=""
        className="absolute -bottom-20 right-[5%] md:hidden scale-[1.2]"
      />
    </section>
  );
};

export default Hero2;
