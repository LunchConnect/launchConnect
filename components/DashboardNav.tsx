"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, LogOut, User,Menu,X } from "lucide-react";
import { useRouter } from 'next/navigation'
import { scrollToTop } from "@/lib/utils";
const DashboardNav = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all data from localStorage
    router.push("/"); // Redirect to login page
  };
  return (
    <nav className="w-full lg:w-[calc(100%-256px)] ml-auto flex justify-between items-center py-4 px-6 border-b bg-white fixed top-0 right-0 z-50 md:px-6">

      {/* Mobile Menu Button */}
      <button id="menu-button" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="w-6 h-6 text-gray-700" />
      </button>



      {/* Welcome Message */}
      <h1 className="text-xl font-semibold text-gray-800">Welcome, Ikenna</h1>

    {/* Profile Section */}
<div className="relative" ref={dropdownRef}>
  <div
    className="flex items-center gap-3 cursor-pointer"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    {/* User Icon */}
    <User className="w-8 h-8 p-1 bg-gray-100 rounded-full text-[#4A4A4A]" />

    {/* Hide dropdown arrow on mobile, show on large screens */}
    <ChevronDown className="w-7 h-7 text-gray-600 hidden lg:block" />
  </div>

  {/* Dropdown Menu */}
  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border p-2">
      <button
        onClick={() => {
          router.push("/dashboard/profilemanagement");
          scrollToTop();
        }}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left"
      >
        <User className="w-5 h-5 text-gray-600" />
        Profile Management
      </button>
      <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left"   onClick={handleLogout}>
        <LogOut className="w-5 h-5 text-gray-600" />
        Log-Out
      </button>
    </div>
  )}
</div>
    </nav>
  );
};

export default DashboardNav;
