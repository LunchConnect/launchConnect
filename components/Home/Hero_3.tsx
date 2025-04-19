import React, { useState } from "react";

const Hero3: React.FC = () => {
  const [activeTab, setActiveTab] = useState("jobSeekers");

  return (
    <section id="hero" className="bg-[#08230E] px-[10%] py-20">
      <div className="relative pt-30 text-center mb-5">
        {/* Background pattern */}
        {/* <Image
          src="/assets/images/plussign_2.png"
          alt="Plus Sign"
          width={40} // Adjust as needed
          height={40} // Adjust as needed
          className="absolute left-[-13%] pointer-events-none hidden md:block"
        /> */}
        <img
          src="/assets/images/plussign_2.png"
          alt=""
          className="absolute left-[-13%] pointer-events-none hidden md:block"
        />
        {/* Title */}
        <h2 className="font-semibold text-[#ffffff] md:text-6xl text-3xl md:mt-0 mt-5 cal_sans">
          How LaunchConnect Works
        </h2>
        <p className="text-[#ffffff] mt-4 md:text-xl DM_sans">
          Helping startups and job seekers connect effortlessly.
        </p>

        {/* Toggle Buttons */}
        <div className="mt-6 flex justify-center space-x-2 bg-[#ffffff] p-1 rounded-full md:w-fit mx-auto">
          <button
            onClick={() => setActiveTab("jobSeekers")}
            className={`px-6 py-3 text-sm font-semibold rounded-full cal_sans whitespace-nowrap transition-all cursor-pointer duration-300 ${
              activeTab === "jobSeekers"
                ? "bg-green-500 text-white"
                : "text-[#08230E]"
            }`}
          >
            For Job Seekers
          </button>

          <button
            onClick={() => setActiveTab("startups")}
            className={`px-6 py-3 text-sm w-40 font-semibold rounded-full cal_sans cursor-pointer transition-all duration-300 ${
              activeTab === "startups"
                ? "bg-green-500 text-white"
                : "text-[#08230E]"
            }`}
          >
            For Startups
          </button>
        </div>

        {/* Content Boxes */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer md:px-0">
          {activeTab === "jobSeekers" ? (
            <>
              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center md:w-83 h-80">
                <img
                  src="assets/images/flash.png"
                  alt="flash"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E] cal_sans">
                  Startup Roles
                </h3>
                <p className="text-gray-600 text-[18px] DM_sans">
                  Explore volunteering, internships, and entry-level jobs that
                  fit your skills and ambitions.
                </p>
              </div>

              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center md:w-83 md:mt-9 h-80">
                <img
                  src="assets/images/search.png"
                  alt="search"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E] cal_sans">
                  Opportunities
                </h3>
                <p className="text-gray-600 text-[18px] DM_sans">
                  No complicated applications or gatekeeping—just seamless
                  access to opportunities.
                </p>
              </div>

              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center md:w-83 h-80">
                <img
                  src="assets/images/wave.png"
                  alt="wave"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E] cal_sans">
                  Hands-On Experience
                </h3>
                <p className="text-gray-600 text-[18px] DM_sans">
                  Work on real-world projects, build your portfolio, and grow
                  your career.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center md:w-83 h-80">
                <img
                  src="assets/images/flash.png"
                  alt="wave"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E] cal_sans">
                  Find Top Talent
                </h3>
                <p className="text-gray-600 text-[18px] DM_sans">
                  Connect with skilled professionals eager to contribute to your
                  startup&#39;s growth. Hire interns, freelancers team members.
                </p>
              </div>

              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center md:w-83 h-80 md:mt-9">
                <img
                  src="assets/images/search.png"
                  alt="wave"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E] cal_sans">
                  Access a Talent Network
                </h3>
                <p className="text-gray-600 text-[18px] DM_sans">
                  No complicated hiring processes—gain direct access to a pool
                  of motivated job seekers ready to join your mission.
                </p>
              </div>

              <div className="bg-white rounded-xl space-y-3 px-6 shadow-md flex flex-col items-center justify-center md:w-83 h-80">
                <img
                  src="assets/images/wave.png"
                  alt="wave"
                  className="rounded-full bg-[#E1FFE8] p-4"
                />
                <h3 className="font-semibold text-xl pt-3 text-[#08230E] cal_sans">
                  Build Your Dream Team
                </h3>
                <p className="text-gray-600 text-[18px] DM_sans">
                  Scale your startup with the right people. Collaborate with
                  passionate individuals who align with your vision.
                </p>
              </div>
            </>
          )}

          <img
            src="assets/images/smallscreenplus2.png"
            alt=""
            className="absolute -bottom-[9%] right-[5%] md:hidden scale-[1.2]"
          />
        </div>
        <img
          src="assets/images/smallscreenplus2.png"
          alt=""
          className="absolute -bottom-[9%] right-[5%] md:hidden scale-[1.2]"
        />
      </div>
    </section>
  );
};

export default Hero3;
