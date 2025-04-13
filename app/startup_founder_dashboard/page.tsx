import ActiveJobPosting from "@/components/ActiveJobPosting";
import RecentApplication from "@/components/RecentApplication";
import JobDashboard from "@/components/JobDashboard";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 mt-20 p-2 md:p-6 rounded-xl bg-white">
      {/* Top Section: Job Applications & Status */}
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <JobDashboard />
      </div>


       {/* Bottom Section: Jobs For You & Trends */}
       <div className="flex flex-col gap-4 lg:flex-row lg:justify-between min-h-[300px]">
        <div className="w-full lg:w-1/2 h-full">
          <ActiveJobPosting />
        </div>
        <div className="w-full lg:w-1/2 h-full">
          <RecentApplication />
        </div>
      </div>
    </div>
  );
}
