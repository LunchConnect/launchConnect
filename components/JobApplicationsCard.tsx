"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { getJobSeekerSummary } from "@/actions/action";

const JobApplicationsCard = () => {
  const [totalApplications, setTotalApplications] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      if (!token) return;

      const res = await getJobSeekerSummary(token);
      if (res.success) {
        setTotalApplications(res.data.totalApplications);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const isZero = totalApplications === 0;

  return (
    <div className="bg-white border-2 border-[#EDEFF2] lg:w-[60%] rounded-xl p-6 flex flex-col h-[220px]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Total Job Applications</h2>
        <CheckCircle className="text-green-500 w-8 h-8" />
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-4xl mt-8 font-bold">...</p>
      ) : isZero ? (
        <>
          <p className="text-5xl font-extrabold mt-4 text-gray-900">–</p>
          <p className="text-gray-600 text-sm mt-8">You haven’t applied for any jobs yet.</p>
        </>
      ) : (
        <>
          <p className="text-5xl font-extrabold mt-4 text-gray-900">{totalApplications}</p>
          <p className="text-gray-600 text-sm mt-8">
            Great! You've submitted <span className="font-bold text-green-600">20 more</span> applications than last month!
          </p>
        </>
      )}
    </div>
  );
};

export default JobApplicationsCard;
