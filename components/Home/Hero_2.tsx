import React from "react";

const Hero2: React.FC = () => {
  return (
    <>
      <section className="relative bg-white  px-[10%]">
        <div className="mx-auto text-center py-20">
          <h1 className="text-4xl font-bold text-start">
            What is <span className="text-[#1AC23F]">LaunchConnect</span>
            <p className="mt-2">All About?</p>
          </h1>
          <p className="text-gray-600 text-xl mt-4 text-start max-w-md mb-30">
            LaunchConnect is a platform that bridges the gap between startups
            and job seekers, making it easier to connect, collaborate, and grow.
            Startups can find passionate talent, while job seekers gain valuable
            experience in dynamic roles.
          </p>
        </div>

        {/* Wave SVG at Bottom */}
        <div className="absolute -bottom-1 left-0 w-full">
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

        {/* Floating Buttons */}
        <div className="absolute top-[15%] right-[12%] ">
          <div className="border-2 border-green-600 p-2 rounded-xl w-[105%]">
            <div className="bg-[#D7F6DE] px-4 py-8 w-full rounded-xl">
              <h2 className="text-[#192F1E] font-semibold text-xl relative pb-2">
                <span className="relative z-10">
                  Are you a Start-Up Founder?
                </span>
                <span className="absolute bottom-0 -right-6 w-[110%] border-b border-green-300"></span>
              </h2>
              <p className="text-[#75897A] pt-4 text-[18px]">
                Post volunteer, internship, and entry-level jobs to build a
              </p>
              <p className="text-[#75897A] pt-1 text-[18px]">
                strong team and scale your startup.
              </p>
              <button className="text-[#192F1E] px-4 py-2 mt-3 w-42 border border-green-500 bg-[#FFFFFF] rounded-md cursor-pointer">
                Post Opportunities
              </button>
            </div>
          </div>

          <div className="mt-5 border-2 border-green-600 p-2 rounded-xl w-[105%]">
            <div className="bg-[#D7F6DE] px-4 py-8 rounded-xl">
              <h2 className="text-[#192F1E] font-semibold text-xl relative pb-2">
                <span className="relative z-10">Are you a Job Seeker?</span>
                <span className="absolute bottom-0 -right-6 w-[110%] border-b border-green-300"></span>
              </h2>
              <p className="text-[#75897A] pt-4 text-[18px]">
                Apply for roles at startups, collaborate with founders, and
              </p>
              <p className="text-[#75897A] pt-1 text-[18px]">
                kickstart your career.
              </p>
              <button className="text-[#192F1E] px-4 py-2 mt-3 w-42 border border-green-500 bg-[#FFFFFF] rounded-md cursor-pointer">
                Start Applying
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero2;
