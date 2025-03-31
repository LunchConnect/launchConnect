import Image from "next/image";
import React from "react";
import { Bell ,Handshake} from "lucide-react"; // You can replace with your icon library
 
function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Container (Static) */}
      <div className="relative hidden md:flex md:w-1/2 bg-[#08230E] p-5">
        {/* Top-Right Image */}
        <Image
          src="/assets/images/small_box.png"
          width={100}
          height={10}
          alt="Top Right Image"
          className="absolute top-0 right-0"
        />

        {/* Centered Content in Left Section */}
        <div className="flex flex-col gap-3 justify-start h-full ml-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
  <Image
    src="/assets/images/logo.png"
    width={100}
    height={100}
    alt="Launch Connect Logo"
  />
 <h1 className="text-[#C7E9CF] text-[34.95px] font-bold">
  <span className="block">Launch</span>
  Connect
</h1>
</div>


          {/* Text Content */}
          <div className="text-white">
            <h1 className="text-[44px] font-bold leading-tight">
              Take control of your startup journey today.
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Effortlessly connect with top talent or find the perfect startup opportunity.
            </p>
          </div>



         <div className="flex items-center bg-white rounded-lg shadow-md p-4 w-[80%]">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full">
        <Handshake size={20} className="text-white" />
      </div>

      {/* Notification Content */}
      <div className="ml-3">
        <p className="font-semibold text-black">New Job Application!</p>
        <p className="text-gray-500 text-sm">John Doe just applied for Product Designer</p>
      </div>
    </div>

    <div className="flex items-center bg-white rounded-lg shadow-md p-4 w-[80%]">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full">
        <Bell size={20} className="text-white" />
      </div>

      {/* Notification Content */}
      <div className="ml-3">
        <p className="font-semibold text-black">Your Application Was Viewed</p>
        <p className="text-gray-500 text-sm">Your UI/UX application was reviewed.</p>
      </div>
    </div>

        </div>
        

        {/* Bottom-Left Image */}
        <Image
          src="/assets/images/big_box.png"
          width={100}
          height={100}
          alt="Bottom Left Image"
          className="absolute bottom-0 left-0"
        />
      </div>

      {/* Right Container (Dynamic) */}
      <div className="flex w-full md:w-1/2 items-start justify-center overflow-y-auto bg-white py-10 px-6 md:px-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

export default SignupLayout;
