import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrClose, GrMenu } from "react-icons/gr";
import Image from "next/image";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
    <div className="container mx-auto flex justify-between items-center custom-padding">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 cursor-pointer z-50 py-2"
      >
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={30}
          height={30}
          className=""
        />
        <div className="flex flex-col text-[17px] customGreen cal_sans">
          <h2 className="">Launch</h2>
          <span className="custom-mt-2">Connect</span>
        </div>
      </div>

      <div className="items-center gap-header text-[#192F1E] DM_sans md:flex hidden">
        <button
          onClick={() => router.push("/#hero")}
          className="cursor-pointer"
        >
          How it works
        </button>
        <button
          onClick={() => router.push("/findjobs")}
          className="cursor-pointer"
        >
          Find Jobs
        </button>
      </div>

      <div className="gap-4  DM_sans md:flex hidden">
        <button
          onClick={() => router.push("/sign_in")}
          className="text-[#192F1E] cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/sign_up")}
          className="bg-green-500 px-8 h-12 rounded-md text-white cursor-pointer hover:bg-green-600"
        >
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden menu-color z-50"
      >
        {isOpen ? <GrClose size={25} /> : <GrMenu size={25} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full bg-white border border-gray-200 shadow-lg py-5 md:hidden DM_sans z-40 pt-up"
          >
            <div className="flex flex-col items-start gap-3 px-5 pb-5 DM_sans">
              <button
                onClick={() => router.push("/#hero")}
                className="py-2 text-[#192F1E]">How it works</button>
              <button
                onClick={() => router.push("/findjobs")}
                className="py-2 text-[#192F1E]">Find Jobs</button>
            </div>
            <div className="flex flex-col-reverse items-center gap-3 p-3 DM_sans">
              <button
                onClick={() => router.push("/sign_in")}
                className="py-3 w-full text-[#192F1E] border border-[#192F1E] rounded-md"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/sign_up")}
                className="py-3 w-full bg-green-500 text-white rounded-md mt-2"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </header>
  );
};