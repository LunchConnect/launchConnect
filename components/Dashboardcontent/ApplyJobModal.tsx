// import { Dialog, Transition } from "@headlessui/react";
// import { motion } from "framer-motion";
// import { Check, X } from "lucide-react";
// import { Fragment, useState } from "react";
// import { useRouter } from "next/navigation";
// import { scrollToTop } from "@/lib/utils";
// import { applyForJob, login } from "@/actions/action";

// interface JobModalProps {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   job: { id: string };
// }

// const ApplyJobModal: React.FC<JobModalProps> = ({ isOpen, setIsOpen, job }) => {
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     coverLetter: "",
//   });
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       const token =
//         localStorage.getItem("token") || "";
//       if (!token) {
//         throw new Error("Authentication required");
//       }
//       const result = await applyForJob(token, job.id, {
//         name: formData.name,
//         email: formData.email,
//         coverLetter: formData.coverLetter,
//         // resumeUrl: formData.resumeUrl,
//       });
//       console.log("job object:", job);

//       if (result.success) {
//         setShowSuccessModal(true);
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (err: any) {
//       console.error("Application error:", err);
//       setError(err.message || "Failed to submit application");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (!isOpen) return null;

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-[90]"
//         onClose={() => setIsOpen(false)}
//       >
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-0 z-[50]" />
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-[60]">
//           <div className="flex min-h-full items-center justify-center p-2 md:p-4">
//             <Dialog.Panel className="w-full max-w-lg md:max-w-lg bg-white p-6 rounded-lg shadow-lg">
//               {showSuccessModal ? (
//                 // Success Message (unchanged)
//                 <div className="text-center">
                  // <button
                  //   onClick={() => setIsOpen(false)}
                  //   className="ml-auto rounded-full border border-gray-100 p-1.5 flex items-center justify-center"
                  // >
                  //   <X className="w-5 h-5 text-black" />
                  // </button>

                  // <div className="mt-20 space-y-5">
                  //   {" "}
                  //   <div className="flex justify-center relative">
                  //     {/* Bouncing Check Icon */}
                  //     <motion.div
                  //       initial={{ scale: 0 }}
                  //       animate={{ scale: 1.2 }}
                  //       transition={{
                  //         type: "spring",
                  //         stiffness: 300,
                  //         damping: 10,
                  //         repeat: Infinity,
                  //       }}
                  //       className="text-white rounded-full bg-green-500 p-5 mb-5 relative"
                  //     >
                  //       <Check className="w-10 h-10 text-white" />
                  //     </motion.div>

                  //     {/* Confetti Particles Circular Animation */}
                  //   </div>
                  //   <h2 className="text-[#4A4A4A] text-2xl font-semibold mt-4 cal_sans">
                  //     Your application was a success!
                  //   </h2>
                  //   <p className="text-[#4A4A4A] mt-2">
                  //     You can track your application in the "Application
                  //     Tracking" tab.
                  //   </p>
                  // </div>

                  // <div className="flex flex-col-reverse md:flex-row justify-center gap-3 mt-5 cal_sans">
                  //   <button
                  //     onClick={() => {
                  //       router.push(`/dashboard/findjobs`);
                  //       scrollToTop();
                  //     }}
                  //     className="px-4 py-2 border md:w-1/2 border-gray-200 text-black rounded"
                  //   >
                  //     Back to Find Jobs
                  //   </button>
                  //   <button
                  //     onClick={() =>
                  //       router.push("/dashboard/Application_Tracking")
                  //     }
                  //     className="px-4 py-2 md:w-1/2 bg-green-500 text-white rounded"
                  //   >
                  //     Track Application
                  //   </button>
                  //   </div>
//                 </div>
//               ) : (
//                 // Job Application Form
//                 <>
//                   <div className="flex justify-between items-center cal_sans mb-3">
//                     <h1 className="text-black text-lg font-semibold">
//                       Apply Now
//                     </h1>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="rounded-full border border-gray-100 p-1.5"
//                       disabled={isSubmitting}
//                     >
//                       <X className="w-5 h-5 text-black" />
//                     </button>
//                   </div>

//                   {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//                       {error}
//                     </div>
//                   )}

//                   <form onSubmit={handleSubmit}>
//                     <div className="flex flex-col md:flex-row gap-2 text-black">
//                       <label className="md:w-1/2">
//                         <span>Name</span>
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleInputChange}
//                           className="w-full border p-2 rounded mt-1"
//                           required
//                         />
//                       </label>
//                       <label className="md:w-1/2">
//                         <span>Email</span>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className="w-full border p-2 rounded mt-1"
//                           required
//                         />
//                       </label>
//                     </div>

//                     <div className="text-[#344054] mt-3">
//                       <span>Short Motivation Statement</span>
//                       <textarea
//                         name="coverLetter"
//                         rows={4}
//                         value={formData.coverLetter}
//                         onChange={handleInputChange}
//                         className="w-full border p-2 rounded mt-1"
//                         maxLength={200}
//                         required
//                       />
//                       <p className="flex justify-end text-sm DM_sans">
//                         {formData.coverLetter.length}/200 characters
//                       </p>
//                     </div>

                    // <div className="border border-gray-200 p-3 rounded mt-4">
                    //   <div className="flex justify-between items-center">
                    //     <h1 className="text-[#344054]">My Resume.pdf</h1>
                    //     <div className="relative flex items-center">
                    //       <input
                    //         type="checkbox"
                    //         className="custom-checkbox-modal peer"
                    //         checked
                    //         disabled
                    //       />
                    //       <Check className="absolute inset-0 m-auto w-4 h-4 text-white peer-checked:block hidden pointer-events-none" />
                    //     </div>
                    //   </div>
                    //   <p className="text-size text-[#9EA2AD]">
                    //     Last used on 12/12/2024, 56 KB
                    //   </p>
                    // </div>

                    // <div className="flex flex-col-reverse md:flex-row justify-between mt-4 gap-2">
                    //   <button
                    //     type="button"
                    //     onClick={() => setIsOpen(false)}
                    //     className="px-4 py-2 md:w-1/2 border border-gray-200 text-black rounded"
                    //     disabled={isSubmitting}
                    //   >
                    //     Back
                    //   </button>
                    //   <button
                    //     type="submit"
                    //     className="px-4 py-2 md:w-1/2 bg-green-500 text-white rounded disabled:opacity-70"
                    //     disabled={isSubmitting}
                    //   >
                    //     {isSubmitting ? "Submitting..." : "Submit Application"}
                    //   </button>
                    // </div>
//                   </form>
//                 </>
//               )}
//             </Dialog.Panel>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default ApplyJobModal;









import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";
import { applyForJob, login } from "@/actions/action";

interface JobModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  job: { id: string };
}

interface Profile {
  fullName: string;
  email: string;
  shortBio: string;
}

const ApplyJobModal: React.FC<JobModalProps> = ({ isOpen, setIsOpen, job }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
  });
  const router = useRouter();

 
  // Load user data when modal opens
useEffect(() => {
  if (isOpen) {
    try {
      const userStr = localStorage.getItem("user");
      const profileStr = localStorage.getItem("profile");

      if (userStr && profileStr) {
        const user = JSON.parse(userStr);
        const profile = JSON.parse(profileStr);

        console.log("Fetched user:", user);
        console.log("Fetched profile:", profile);

        setFormData({
          name: profile.fullName || "",
          email: user.email || "",
          coverLetter: profile.shortBio || "",
        });
      } else {
        console.warn("User or profile not found in localStorage.");
      }
    } catch (err) {
      console.error("Failed to parse localStorage data:", err);
    }
  }
}, [isOpen]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required");
      setIsSubmitting(false); // Reset loading state
      return; // Stop execution
    }

      const result = await applyForJob(token, job.id, {
        name: formData.name,
        email: formData.email,
        coverLetter: formData.coverLetter,
      });

      if (result.success) {
        setShowSuccessModal(true);
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      console.error("Application error:", err);
      setError(err.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[90]"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-0 z-[50]" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[60]">
          <div className="flex min-h-full items-center justify-center p-2 md:p-4 w-full">
            <Dialog.Panel className="w-full max-w-lg md:max-w-lg bg-white p-6 rounded-lg shadow-lg">
              {showSuccessModal ? (
                // Success Message (unchanged)
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
                      Your application was a success!
                    </h2>
                    <p className="text-[#4A4A4A] mt-2">
                      You can track your application in the "Application
                      Tracking" tab.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse md:flex-row justify-center gap-3 mt-5 cal_sans">
                    <button
                      onClick={() => {
                        router.push(`/dashboard/findjobs`);
                        scrollToTop();
                      }}
                      className="px-4 py-2 border md:w-1/2 border-gray-200 text-black rounded"
                    >
                      Back to Find Jobs
                    </button>
                    <button
                      onClick={() =>
                        router.push("/dashboard/Application_Tracking")
                      }
                      className="px-4 py-2 md:w-1/2 bg-green-500 text-white rounded"
                    >
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
                      className="rounded-full border border-gray-100 p-1.5"
                      disabled={isSubmitting}
                    >
                      <X className="w-5 h-5 text-black" />
                    </button>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* <div className="flex flex-col md:flex-row gap-2"> */}
                    <label className="">
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded mt-1 bg-gray-100 !text-gray-400"
                        readOnly
                      />
                    </label>
                    <div className="w-full mt-2">
                      <label className="">
                        <span className="">Email</span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border p-2 rounded mt-1 bg-gray-100 !text-gray-400"
                          readOnly
                        />
                      </label>
                    </div>
                    {/* </div> */}

                    {/* <div className="mt-3">
                      <span>Short Motivation Statement</span>
                      <textarea
                        name="coverLetter"
                        rows={4}
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded mt-1"
                        maxLength={200}
                        required
                      />
                      <p className="flex justify-end text-sm DM_sans">
                        {formData.coverLetter.length}/200 characters
                      </p>
                    </div> */}

                    <div className="border border-gray-200 p-3 rounded mt-4">
                      <div className="flex justify-between items-center">
                        <h1 className="text-[#344054]">My Resume.pdf</h1>
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="custom-checkbox-modal peer"
                            checked
                            disabled
                          />
                          <Check className="absolute inset-0 m-auto w-4 h-4 text-white peer-checked:block hidden pointer-events-none" />
                        </div>
                      </div>
                      <p className="text-size text-[#9EA2AD]">
                        Last used on 12/12/2024, 56 KB
                      </p>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row justify-between mt-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 md:w-1/2 border border-gray-200 text-black rounded"
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 md:w-1/2 bg-green-500 text-white rounded disabled:opacity-70"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
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

export default ApplyJobModal;