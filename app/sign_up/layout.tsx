import Image from "next/image";
import React from "react";

function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Container (Static) */}
      <div className="relative hidden md:flex md:w-1/2 bg-[#08230E] p-10">
        {/* Top-Right Image */}
        <Image
          src="/assets/images/small_box.png"
          width={100}
          height={10}
          alt="Top Right Image"
          className="absolute top-0 right-0"
        />

        {/* Centered Content in Left Section */}
        <div className="flex flex-col gap-6 justify-start h-full pt-10 ml-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
  <Image
    src="/assets/images/logo.png"
    width={50}
    height={40}
    alt="Launch Connect Logo"
  />
 <h1 className="text-white text-xl font-bold">
  <span className="block">Launch</span>
  Connect
</h1>
</div>


          {/* Text Content */}
          <div className="text-white max-w-sm">
            <h1 className="text-3xl font-bold leading-tight">
              Take control of your startup journey today.
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Effortlessly connect with top talent or find the perfect startup opportunity.
            </p>
          </div>
        </div>

        {/* Bottom-Left Image */}
        <Image
          src="/assets/images/big_box.png"
          width={200}
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
