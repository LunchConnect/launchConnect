import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { useRouter } from 'next/navigation'


export const Footer: React.FC = () => {
  const router = useRouter()
  return (
    <footer className="bg-[#010C04] text-[#D0EADE] px-[10%] py-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between">
        {/* Left Section - Logo & Description */}
        <div className="lg:w-[40%]">
          <div
            onClick={() => {
              router.push("/");
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src="/images/logo.png" alt="Logo" className="h-8" />
            <div className="flex flex-col leading-tight text-[17px] font-semibold">
              <h2 className="text-[#D0EADE]">Launch</h2>
              <span className="text-[#D0EADE] -mt-1">Connect</span>
            </div>
          </div>
          <h2 className="pt-4 text-sm lg:max-w-[300px]">
            Great platform for the job seeker that is passionate about startups.
            Find your dream job easier.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Middle Section - Links */}
          <div className="space-y-4">
            <h2 className="font-semibold text-white">About</h2>
            <div className="cursor-pointer hover:underline">How it Works</div>
            <div className="cursor-pointer hover:underline">Find Jobs</div>
            <div className="cursor-pointer hover:underline">Terms</div>
            <div className="cursor-pointer hover:underline">Privacy Policy</div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="space-y-5">
            <h2 className="text-white font-semibold">Get job notifications</h2>
            <p className="text-sm max-w-[300px]">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-3 pt-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full md:w-auto h-10 rounded-md bg-white px-5 text-black outline-none"
              />
              <button className="h-10 px-5 rounded-md bg-green-500 text-white hover:bg-green-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright & Social Icons */}
      <div className="mt-26 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between text-sm">
        <span className="text-[#D0EADE]">
          {new Date().getFullYear()} @ LaunchConnect. All rights reserved.
        </span>

        <div className="flex gap-4 mt-2 md:mt-0 cursor-pointer">
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaFacebookF
              size={30}
              className=" p-2 rounded-full bg-[#191f1a] hover:text-blue-600"
            />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaInstagram
              size={30}
              className=" p-2 rounded-full bg-[#191f1a] hover:text-pink-500"
            />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn
              size={30}
              className="p-2 rounded-full bg-[#191f1a] hover:text-blue-500"
            />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <RiTwitterXFill
              size={30}
              className="p-2 rounded-full bg-[#191f1a] hover:text-blue-400"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
