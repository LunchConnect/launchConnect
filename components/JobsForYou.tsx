"use client"
import { useState, useEffect } from "react";
import { getJobsForYou } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";

interface Company {
  companyName: string;
  industry: string;
  website: string;
  companyLogo: string | null;
}

interface Job {
  id: string; 
  logo: string;
  company: Company;
  title: string;
  location: string;
  jobType: string;
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
  }, []);

  return (
    <div className="lg:w-[100%] border border-[#EDEFF2] rounded-lg p-4">
      {/* Header */}
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-[16px] font-semibold">
          Jobs For You
        </CardTitle>

        {error ? (
          <button
            className="px-4 py-2 text-white text-[14px] bg-primary rounded-lg cal_sans"
            onClick={() => {
              router.push("/dashboard/findjobs");
              scrollToTop();
            }}
          >
            Apply For Job
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/dashboard/jobforyou");
              scrollToTop();
            }}
            className="px-4 py-2 text-white text-[14px] bg-primary rounded-lg"
          >
            See All
          </button>
        )}
      </CardHeader>

      {/* Job List */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center bg-[#FAFAFA] border border-[#EDEFF2] rounded-lg py-10">
            <Image
              src="/assets/images/bear.png"
              alt="No Jobs"
              width={124.46}
              height={132.03}
            />
            <h2 className="text-2xl font-semibold text-[#101828] mt-6 cal_sans">
              No application to Show yet
            </h2>
            <p className="text-[#667085] mt-2 DM_sans">
              You haven’t applied for any job yet. <br /> Click the button below
              to get started
            </p>
            <button
              className="mt-6 bg-[#1AC23F] text-white px-8 py-2 rounded-lg transition cal_sans"
              onClick={() => {
                router.push("/dashboard/findjobs");
                scrollToTop();
              }}
            >
              Apply For Job
            </button>
          </div>
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
                  src={job.company.companyLogo || "fallback.png"}
                  alt={job.company.companyName}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div>
                  <h3 className="text-[15.89] font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-500">
                    {job.company.companyName} • {job.location}
                  </p>
                  <span className="px-2 py-1 text-xs rounded-full bg-[#56CDAD1A] text-[#56CDAD]">
                    {job.jobType
                      .toLowerCase()
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </span>
                </div>
              </div>

              {/* Apply Button */}
              <Button variant="outline">Apply Now</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}