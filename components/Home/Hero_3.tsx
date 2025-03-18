import React, { useState } from "react";

const Hero_3: React.FC = () => {
  const [activeTab, setActiveTab] = useState("jobSeekers");

  return (
    <section className="bg-[#08230E] px-[10%] py-20">
      <div className="relative pt-30 text-center mb-10">
        {/* Background pattern */}
        <img
          src="assets/images/plussign_2.png"
          alt=""
          className="absolute left-[-13%] pointer-events-none"
        />

        {/* Title */}
        <h2 className="font-semibold text-[#ffffff] text-6xl">
          How LaunchConnect Works
        </h2>
        <p className="text-[#ffffff] mt-4 text-xl">
          Helping startups and job seekers connect effortlessly.
        </p>

        {/* Toggle Buttons */}
        <div className="mt-6 flex justify-center space-x-2 bg-[#ffffff] p-1 rounded-full w-fit mx-auto">
          <button
            onClick={() => setActiveTab("jobSeekers")}
            className={`px-6 py-3 text-sm font-semibold rounded-full transition-all cursor-pointer duration-300 ${
              activeTab === "jobSeekers"
                ? "bg-green-500 text-white"
                : "text-[#08230E]"
            }`}
          >
            For Job Seekers
          </button>

          <button
            onClick={() => setActiveTab("startups")}
            className={`px-6 py-3 text-sm w-40 font-semibold rounded-full cursor-pointer transition-all duration-300 ${
              activeTab === "startups"
                ? "bg-green-500 text-white"
                : "text-[#08230E]"
            }`}
          >
            For Startups
          </button>
        </div>

        {/* Content Boxes */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
          {activeTab === "jobSeekers" ? (
            <>
              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center w-83 h-80">
                <img
                  src="assets/images/flash.png"
                  alt="flash"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E]">
                  Discover Startup Roles
                </h3>
                <p className="text-gray-600 text-[18px]">
                  Explore volunteering, internships, and entry-level jobs that
                  fit your skills and ambitions.
                </p>
              </div>

              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center w-83 mt-9 h-80">
                <img
                  src="assets/images/search.png"
                  alt="search"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E]">
                  Discover Opportunities
                </h3>
                <p className="text-gray-600 text-[18px]">
                  No complicated applications or gatekeeping—just seamless
                  access to opportunities.
                </p>
              </div>

              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center w-83 h-80">
                <img
                  src="assets/images/wave.png"
                  alt="wave"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E]">
                  Gain Hands-On Experience
                </h3>
                <p className="text-gray-600 text-[18px]">
                  Work on real-world projects, build your portfolio, and grow
                  your career.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center w-83 h-80">
                <img
                  src="assets/images/flash.png"
                  alt="wave"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E]">
                  Find Top Talent
                </h3>
                <p className="text-gray-600 text-[18px]">
                  Connect with skilled professionals eager to contribute to your
                  startup's growth. Hire interns, freelancers team members.
                </p>
              </div>

              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center w-83 h-80 mt-9">
                <img
                  src="assets/images/search.png"
                  alt="wave"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E]">
                  Access a Talent Network
                </h3>
                <p className="text-gray-600 text-[18px]">
                  No complicated hiring processes—gain direct access to a pool
                  of motivated job seekers ready to join your mission.
                </p>
              </div>

              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center w-83 h-80">
                <img
                  src="assets/images/wave.png"
                  alt="wave"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E]">
                  Build Your Dream Team
                </h3>
                <p className="text-gray-600 text-[18px]">
                  Scale your startup with the right people. Collaborate with
                  passionate individuals who align with your vision.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero_3;
