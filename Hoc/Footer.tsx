
import { useRouter } from 'next/navigation'
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { scrollToTop } from "@/lib/utils";
import Image from "next/image";
export const Footer: React.FC = () => {
 const router = useRouter()
  return (
    <footer className="custom-background section py-10">
    <div className="flex flex-col md:flex-row md-gap-footer  customGreen_3">
      {/* Left Section - Logo & Description */}
      <div className="">
        <div
          onClick={() => {
            router.push("/");
            scrollToTop();
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className=""
          />
          <div className="flex flex-col leading-tight text-[17px] cal_sans customGreen_3">
            <h2 className="">Launch</h2>
            <span className="custom-mt-1">Connect</span>
          </div>
        </div>
        <h2 className="pt-4 md:text-sm Epilogue customGreen_3">
          A great platform for job seekers passionate
        </h2>
        <p>about startups. Find your dream job easily.</p>
      </div>

      <div className="flex flex-col pt-up md:mt-0 gap-8 customGreen_3 md:max-w-4xl">
        {/* Middle Section - Links */}
        <div className="space-y-4">
          <div className="cursor-pointer hover:underline DM_sans">Terms</div>
          <div className="cursor-pointer hover:underline DM_sans">
            Privacy Policy
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Section - Copyright & Social Icons */}
    <div className="mt-26 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between text-sm">
      <span className="customGreen_3 DM_sans pt-5">
        &copy; {new Date().getFullYear()} @ LaunchConnect. All rights
        reserved.
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
