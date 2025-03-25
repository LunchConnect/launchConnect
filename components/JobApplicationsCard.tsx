import { CheckCircle } from "lucide-react";

const JobApplicationsCard = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col h-[240px]"> 
      {/* Header: Title and Icon in a single row */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Total Job Applications</h2>
        <CheckCircle className="text-green-500 w-8 h-8" />
      </div>

      {/* Large number count */}
      <p className="text-5xl font-extrabold mt-4 text-gray-900">87</p>

      {/* Descriptive text */}
      <p className="text-gray-600 text-sm mt-4">
        Great! You've submitted <span className="font-bold text-green-600">20 more</span> applications than last month!
      </p>
    </div>
  );
};

export default JobApplicationsCard;
