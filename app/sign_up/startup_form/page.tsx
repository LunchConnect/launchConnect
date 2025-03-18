"use client";
import React from "react";
import { FiLink } from "react-icons/fi";

const Startup = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <h1 className="text-xl font-bold text-black">
          Set Up Your Startup Founder Profile
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Help potential team members and investors learn about your startup, showcase your vision, mission, and opportunities.
        </p>

        {/* Form */}
        <form className="mt-4 space-y-3">
          {/* Full Name */}
          <div>
            <label className="text-md font-medium block mb-1">Full Name</label>
            <input
              type="text"
              placeholder="eg. Ikenna Okafor"
              className="w-full p-2 border bg-white rounded-md"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="text-md font-medium block mb-1">Company Name</label>
            <input
              type="text"
              placeholder="eg. LaunchConnect Limited"
              className="w-full p-2 border bg-white rounded-md"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="text-md font-medium block mb-1">Industry</label>
            <input
              type="text"
              placeholder="eg. AI-Powered SaaS"
              className="w-full p-2 border bg-white rounded-md"
            />
          </div>

          {/* Website */}
          <div className="relative">
            <label className="text-md font-medium block mb-1">Website</label>
            <div className="relative">
              <input
                type="text"
                placeholder="eg. enter your website URL"
                className="w-full p-2 border rounded-md bg-white pr-8"
              />
              {/* Website Icon */}
              <FiLink className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>

          {/* Role in Startup */}
          <div>
            <label className="text-md font-medium block mb-1">Role in Startup</label>
            <input
              type="text"
              placeholder="eg. Co-Founder"
              className="w-full p-2 border bg-white rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md mt-3"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Startup;
