import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrClose, GrMenu } from "react-icons/gr";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center custom-padding">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/assets/images/logo.png" alt="Logo" className="" />
          <div className="flex flex-col text-[17px] customGreen cal_sans">
            <h2 className="">Launch</h2>
            <span className="custom-mt-2">Connect</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 customGreen_2 DM_sans">
          <button className="transition">How it works</button>
          <button className="transition">Find Jobs</button>
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4 DM_sans">
          <button
            onClick={() => router.push("/sign_in")}
            className="customGreen_2 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/sign_up")}
            className="primary text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Sign Up
          </button>
        </div>





        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden menu-color"
        >
          {isOpen ? <GrClose size={25} /> : <GrMenu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-12 left-0 w-full bg-white border border-gray-200 shadow-lg py-5 md:hidden DM_sans"
          >
            <div className="flex flex-col items-start gap-3 px-5 pb-5">
              <button className="py-2 text-[#192F1E]">How it works</button>
              <button className="py-2 text-[#192F1E]">Find Jobs</button>
            </div>
            <div className="flex flex-col-reverse items-center gap-3 p-3">
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
    </header>
  );
};