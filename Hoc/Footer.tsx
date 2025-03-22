import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

export const Footer: React.FC = () => {
 const router = useRouter()
  return (
    <footer className="custom-background section py-10">
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
            <img src="/assets/images/logo.png" alt="Logo" className="h-8" />
            <div className="flex flex-col leading-tight text-[17px] cal_sans customGreen_3">
              <h2 className="">Launch</h2>
              <span className="custom-mt-1">Connect</span>
            </div>
          </div>
          <h2 className="pt-4 md:text-sm md:max-w-300 Epilogue customGreen_3">
            Great platform for the job seeker that is passionate about startups.
            Find your dream job easier.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row pt-up md:mt-0 gap-8 md:gap-16 customGreen_3">
          {/* Middle Section - Links */}
          <div className="space-y-4">
            <h2 className="font-semibold text-white cal_sans">About</h2>
            <div className="cursor-pointer hover:underline DM_sans">
              How it Works
            </div>
            <div className="cursor-pointer hover:underline DM_sans">
              Find Jobs
            </div>
            <div className="cursor-pointer hover:underline DM_sans">Terms</div>
            <div className="cursor-pointer hover:underline DM_sans">
              Privacy Policy
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="space-y-6 pt-up">
            <h2 className="text-white font-semibold cal_sans">
              Get job notifications
            </h2>
            <p className="md:text-sm max-w-[300px] DM_sans">
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
      <div className="md:pt-up-footer border-t border-gray-600 mt-10 flex flex-col md:flex-row justify-between text-sm space-y-5 md:space-y-0">
        <span className="customGreen_3 DM_sans pt-5">
          {new Date().getFullYear()} @ LaunchConnect. All rights reserved.
        </span>

        <div className="flex gap-4 cursor-pointer pt-5">
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaFacebookF
              size={30}
              className=" p-2 rounded-full custom-link-background hover:text-blue-600"
            />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaInstagram
              size={30}
              className=" p-2 rounded-full custom-link-background hover:text-pink-500"
            />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn
              size={30}
              className="p-2 rounded-full custom-link-background hover:text-blue-500"
            />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <RiTwitterXFill
              size={30}
              className="p-2 rounded-full custom-link-background hover:text-blue-400"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
