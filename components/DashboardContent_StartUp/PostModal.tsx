import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";

interface JobModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  job: {
    title: string;
    description: string;
    responsibilities: string;
    skillsRequired: string;
    jobType: string;
    industry: string;
    paidRole: string;
    deadline: string;
    location: string;
    commitmenLevel: string;
  };
}


const PostModal: React.FC<JobModalProps> = ({ isOpen, setIsOpen, job }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const router = useRouter();
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
            <Dialog.Panel className="w-full max-w-lg md:max-w-lg bg-white p-6 rounded-lg shadow-lg">
              {showSuccessModal && (
                // Success Message
                <div className="text-center">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto rounded-full border border-gray-100 p-1.5 flex items-center justify-center"
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
                      Job Posted Successfully!
                    </h2>
                    <p className="text-[#4A4A4A] mt-2">
                      You can track your applications in the “Applications” tab
                    </p>
                  </div>

                  <div className="flex flex-col-reverse md:flex-row justify-center gap-3 mt-5 cal_sans">
                    <button
                      onClick={() => {
                        router.push(`/startup_founder_dashboard`);
                      }}
                      className="px-4 py-2 border md:w-1/2 border-gray-200 text-black rounded DM_sans"
                    >
                      Back to Dashboard
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 md:w-1/2 bg-green-500 text-white rounded DM_sans"
                    >
                      Post a Job
                    </button>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PostModal;
