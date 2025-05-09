import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

interface JobModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobModal: React.FC<JobModalProps> = ({ isOpen, setIsOpen }) => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const router = useRouter();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[90]"
        onClose={() => setIsOpen(false)}
      >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-0 z-[50]" />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[60]">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
              {showSuccessModal ? (
                // Success Message
                <div className="text-center ">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto rounded-full shadow-md p-1.5 flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-black" />
                  </button>

                  <div className="mt-20 space-y-5">
                    {" "}
                    <div className="flex justify-center relative">
                      {/* Bouncing Check Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                          repeat: Infinity,
                        }}
                        className="text-white rounded-full bg-green-500 p-5 mb-5 relative"
                      >
                        <Check className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Confetti Particles Circular Animation */}
                     
                    </div>
                    <h2 className="text-[#4A4A4A] text-2xl font-semibold mt-4 cal_sans">
                      Your application was a success!
                    </h2>
                    <p className="text-[#4A4A4A] mt-2">
                      You can track your application in the "Application
                      Tracking" tab.
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 mt-5 cal_sans">
                    <button
                      onClick={() => router.push("/dashboard/ViewJobdetails")}
                      className="px-4 py-2 border w-1/2 border-gray-200 text-black rounded"
                    >
                      Back to Find Jobs
                    </button>
                    <button 
                    onClick={() => router.push("/dashboard/Application_Tracking")}
                    className="px-4 py-2 w-1/2 bg-green-500 text-white rounded">
                      Track Application
                    </button>
                  </div>
                </div>
              ) : (
                // Job Application Form
                <>
                  <div className="flex justify-between items-center cal_sans mb-3">
                    <h1 className="text-black text-lg font-semibold">
                      Apply Now
                    </h1>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-full shadow-md p-1.5"
                    >
                      <X className="w-5 h-5 text-black" />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setShowSuccessModal(true); // Show success modal inside same modal
                    }}
                  >
                    <div className="flex flex-row gap-2 text-black">
                      <label className="w-1/2">
                        <span>Name</span>
                        <input
                          type="text"
                          className="w-full border p-2 rounded mt-1"
                        />
                      </label>
                      <label className="w-1/2">
                        <span>Email</span>
                        <input
                          type="email"
                          className="w-full border p-2 rounded mt-1"
                        />
                      </label>
                    </div>

                    <div className="text-[#344054] mt-3">
                      <span>Short Motivation Statement</span>
                      <textarea
                        rows={4}
                        className="w-full border p-2 rounded mt-1"
                      />
                      <p className="flex justify-end text-sm cal_sans">
                        200 words max
                      </p>
                    </div>

                    <div className="border border-gray-200 p-3 rounded mt-4">
                      <div className="flex justify-between items-center">
                        <h1 className="text-[#344054]">My Resume.pdf</h1>
                        <div className="relative flex items-center">
                          {/* Styled checkbox with Tailwind for consistent UI */}
                          <input
                            type="checkbox"
                            className="custom-checkbox-modal peer"
                            checked
                            disabled
                          />
                          {/* Check icon overlay (only visible if checked) */}
                          <Check className="absolute inset-0 m-auto w-4 h-4 text-white peer-checked:block hidden pointer-events-none" />
                        </div>
                      </div>

                      <p className="text-size text-[#9EA2AD]">
                        Last used on 12/12/2024, 56 KB
                      </p>
                    </div>

                    <div className="flex justify-between mt-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 w-1/2 border border-gray-200 text-black rounded"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 w-1/2 bg-green-500 text-white rounded"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JobModal;
