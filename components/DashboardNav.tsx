import Image from "next/image";
import { ChevronDown } from "lucide-react";

const DashboardNav = () => {
  return (
    <nav className="w-full lg:w-[calc(100%-260px)] ml-auto flex justify-between items-center py-4 px-6 border-b bg-white fixed top-0 right-0 z-50">
  {/* Welcome Message */}
  <h1 className="text-xl font-semibold text-gray-800">Welcome, Ikenna</h1>

  {/* Profile Section */}
  <div className="flex items-center gap-3">
    <div className="relative w-10 h-10">
      <Image
        src="/assets/images/dr-livingston.png"
        alt="User Profile"
        width={40}
        height={40}
        className="rounded-full border"
      />
    </div>
    <ChevronDown className="w-5 h-5 text-gray-600 cursor-pointer" />
  </div>
</nav>

  );
};

export default DashboardNav;
