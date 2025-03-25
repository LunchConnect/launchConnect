import JobApplicationsCard from "@/components/JobApplicationsCard";
import ApplicationStatusChart from "@/components/ApplicationStatusChart";

const Dashboard = () => {
  return (
    <div className="bg-white min-h-screen p-6 w-full">
      <div className="flex gap-6 w-full">
        {/* Left Card - Takes More Space */}
        <div className="flex-1 w-[600px] flex-shrink-0">
          <JobApplicationsCard />
        </div>

        {/* Right Card - Now Wider and Properly Positioned */}
        <div className="w-[400px] flex-shrink-0"> {/* Adjust width if needed */}
          <ApplicationStatusChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
