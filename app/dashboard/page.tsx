import ApplicationStatusChart from "@/components/ApplicationStatusChart";
import ApplicationTrends from "@/components/ApplicationTrends";
import JobApplicationsCard from "@/components/JobApplicationsCard";
import JobsForYou from "@/components/JobsForYou";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 mt-20 p-6 rounded-xl bg-white">
      {/* Top Section: Job Applications & Status */}
      <div className="flex gap-4 justify-between">
        <JobApplicationsCard />
        <ApplicationStatusChart />
      </div>

      {/* Bottom Section: Jobs For You & Trends */}
      <div className="flex gap-4 justify-between">
        <JobsForYou />
        <ApplicationTrends />
      </div>
    </div>
  );
}
