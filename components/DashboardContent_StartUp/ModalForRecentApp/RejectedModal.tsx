import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";

interface Application {
  id: string;
  name: string;
  jobRole: string;
  applicationDate: string;
  status: "Pending" | "Accepted" | "Rejected";
}

interface PendingModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  application: Application;
}

const RejectedModal: React.FC<PendingModalProps> = ({
  isOpen,
  setIsOpen,
  application,
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
   const portfolioLink = "link.example";
    const [showCopiedBanner, setShowCopiedBanner] = useState(false);
  
      const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setShowCopiedBanner(true);
        setTimeout(() => setShowCopiedBanner(false), 2000); // hide after 2 seconds
      };

  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[90]"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-0 z-[50]" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[60]">
          <div className="flex min-h-full items-center justify-center p-2 md:p-4">
            <Dialog.Panel className="w-full max-w-md md:max-w-xl bg-white p-6 rounded-xl shadow-lg">
              {/*  Job Application Form */}
              <>
                <div className="flex justify-between items-center cal_sans mb-3 DM_sans">
                  <h1 className="text-black text-lg font-semibold cal_sans">
                    Candidate Overview
                  </h1>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-gray-100 p-1.5"
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
                  <div className="text-[#3F4654] border border-[#DEE6ED] rounded-md overflow-y-scroll p-3 space-y-3 max-h-[500px]">
                    <div className="flex justify-between items-center DM_sans border-b border-b-[#E7EFE8] pb-3">
                      <h1>Application status</h1>
                      <div className="flex items-center text-[#F9150B]">
                        <BsDot size={40} />
                        <h2>Rejected</h2>
                      </div>
                    </div>

                    <div className="border-b border-[#DEE6ED] pb-2">
                      <h1>Full Name</h1> <p>Mr. Example</p>
                    </div>

                    <div className="border-b border-[#DEE6ED] pb-2">
                      <h1>Email Address</h1> <p>exanple@gmail.com</p>
                    </div>

                    <div className="border-b border-[#DEE6ED] pb-2">
                      <h1>Portfolio</h1>
                      <div className="flex items-center justify-between gap-2">
                        <a href="#" className="text-[#1FC16B]">
                          {portfolioLink}
                        </a>
                        <IoCopyOutline
                          size={20}
                          className="cursor-pointer"
                          onClick={() => handleCopy(portfolioLink)}
                        />
                      </div>
                    </div>

                    {/* Copied Banner */}
                    {showCopiedBanner && (
                      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded shadow-md transition-all duration-300 z-50">
                        Link copied to clipboard!
                      </div>
                    )}

                    <div className="border-b border-[#DEE6ED] pb-2">
                      <h1 className="pb-4">Short Motivation Text</h1>{" "}
                      <p>
                        As a UX designer, I thrive on crafting intuitive and
                        engaging user experiences that solve real problems. With
                        a keen eye for design and a user-first approach, I enjoy
                        translating complex ideas into seamless interactions.
                        I'm excited about this opportunity because it aligns
                        with my passion for creating impactful digital
                        experiences. I look forward to bringing my creativity,
                        research-driven insights, and collaborative mindset to
                        your team.
                      </p>
                    </div>

                    <div className="rounded-md">
                      <h1 className="pb-4">Resume</h1>
                      <div className="flex justify-between items-center bg-[#eef9f0] p-3 rounded-lg">
                        <div>
                          <p className="">My Resume.pdf</p>
                          <p className="text-gray-400">56Kb</p>
                        </div>
                        <button className="border border-[#9CB8A2] text-[#526F58] cal_sans px-4 h-8 rounded-md">
                          {" "}
                          View
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 gap-2 DM_sans">
                    <div className="mt-4 gap-2 DM_sans">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 border border-[#D0D5DD] text-[#192F1E] rounded-lg w-full"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RejectedModal;
