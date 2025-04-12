"use client"
import { useState, useEffect } from "react";
import { getJobsForYou } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";


interface Job {
  id: string; // or number, depending on your API
  logo: string;
  company: string;
  title: string;
  location: string;
  typeColor: string; // If this is a color value, adjust type accordingly
  jobType: string; // For the job type, adjust based on your data
}

export default function JobsForYou() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

      if (token) {
        const response = await getJobsForYou(token);

        if (response.success) {
          setJobs(response.data);
        } else {
          setError(response.message);
        }
      } else {
        setError("No token found. Please log in.");
      }
      setLoading(false);
    };

    fetchJobs();
  }, [token]);

  return (
    <Card className="lg:w-[48%]">
      {/* Header */}
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-[16px] font-semibold">Jobs For You</CardTitle>
        <button
          onClick={() => {
            router.push("/dashboard/jobforyou");
            scrollToTop();
          }}
          className="px-4 py-2 text-white text-[14px] bg-primary rounded-lg"
        >
          See All
        </button>
      </CardHeader>

      {/* Job List */}
      <CardContent className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between border rounded-lg p-3 shadow-sm"
            >
              {/* Job Details */}
              <div className="flex items-center gap-4">
                {/* Company Logo */}
                <Image
                  src={job.logo} // Replace with the actual logo path in your data
                  alt={job.company}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div>
                  <h3 className="text-[15.89] font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${job.typeColor}`}
                  >
                    {job.jobType} {/* Assuming you have a field for job type */}
                  </span>
                </div>
              </div>

              {/* Apply Button */}
              <Button variant="outline">Apply Now</Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
