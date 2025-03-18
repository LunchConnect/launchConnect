"use client";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image using Tailwind */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('assets/images/image1.png')" }} // Ensure correct path
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0F260D] opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-6 space-y-6">
        <h1 className="md:text-7xl font-bold max-w-6xl">
          Opportunities Without Barriers
        </h1>
        <p className="md:text-7xl font-bold max-w-6xl">
          For Startups & Job Seekers.
        </p>
        <p className="text-lg mt-2 text-[#BABABA]">
          Join a network where founders find talent, and job seekers land their
          dream roles.
        </p>
        <div className="space-x-4 pt-5">
          <button className="bg-white text-[#192F1E] px-4 py-3 rounded-md cursor-pointer">
            Post an Opportunity
          </button>
          <button className="bg-green-500 text-white px-4 py-3 rounded-md cursor-pointer">
            Find A Job
          </button>
        </div>
      </div>

      {/* Plus Sign Image */}
      <Image
  src="/assets/images/plussign.png"
  alt="Plus Sign"
  width={50}
  height={50}
  className="absolute right-0 top-0"
/>

    </section>
  );
};

export default Hero;
