import ApplicationStatusChart from "@/components/ApplicationStatusChart";
import ApplicationTrends from "@/components/ApplicationTrends";
import JobApplicationsCard from "@/components/JobApplicationsCard";
import JobsForYou from "@/components/JobsForYou";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 mt-20">
      {/* Top Section: Job Applications & Status */}
      <div className="grid gap-6 md:grid-cols-2">
        <JobApplicationsCard />
        <ApplicationStatusChart />
      </div>

      {/* Bottom Section: Jobs For You & Trends */}
      <div className="grid gap-6 md:grid-cols-2">
        <JobsForYou />
        <ApplicationTrends />
      </div>
    </div>
  );
}
