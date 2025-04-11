"use client";
import { useState, useEffect } from "react";
import { getJobsForYou } from "@/actions/action"; // Make sure the correct path is 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";

export default function JobRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // No TypeScript type here
  const router = useRouter();
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  useEffect(() => {
    const fetchJobs = async () => {
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
        <CardTitle className="text-[16px] font-semibold">Job Recommendations</CardTitle>
        <button
          onClick={() => {
            router.push("/dashboard/job-recommendations");
            scrollToTop();
          }}
          className="px-4 py-2 text-white text-[14px] bg-primary rounded-lg"
        >
          See All
        </button>
      </CardHeader>

      {/* Recommendations Content */}
      <CardContent className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="space-y-3">
            {jobs.length === 0 ? (
              <p>No job recommendations available at the moment.</p>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="flex justify-between items-center">
                  <h3 className="text-[16px] font-semibold">{job.title}</h3>
                  <Button variant="outline">Apply</Button>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
