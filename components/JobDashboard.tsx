"use client";

import { useEffect, useState } from "react";
import { Briefcase, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getStartupSummary } from "@/actions/action";

export default function JobDashboard() {
 const [totalJobPosts, settotalJobPosts] = useState<number | null>(null);


 const [activeJobs, setactiveJobs] = useState<number | null>(null);


 const [pendingReviews, setpendingReviews] = useState<number | null>(null);



  const [loading, setLoading] = useState(true);


  useEffect(() => {
      const token = localStorage.getItem("token");
  
      const fetchData = async () => {
        if (!token) return;
  
        const res = await getStartupSummary(token);
        if (res.success) {
          settotalJobPosts(res.data.totalJobPosts);

          setactiveJobs(res.data.activeJobs);

          setpendingReviews(res.data.pendingReviews);
        }
  
        setLoading(false);
      };
  
      fetchData();   

    }, []);

    const totalJobPostsisZero = totalJobPosts === 0;

    const activeJobsZero = activeJobs === 0;

    const pendingReviewsisZero = pendingReviews === 0;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Job Posts Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Job Posts</p>
              {loading ? (
        <p className="text-4xl mt-8 font-bold">...</p>
      ) : totalJobPostsisZero ? (
        <>
          <h2 className="text-5xl font-extrabold mt-4 text-gray-900">–</h2>
        </>
      ) : (
        <>

<h2 className="text-3xl font-bold mt-1">{totalJobPosts}</h2>

        </>
      )}


            </div>
            <div className="p-3 rounded-full">
              <Briefcase className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Active Jobs Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
              {loading ? (
        <p className="text-4xl mt-8 font-bold">...</p>
      ) : activeJobsZero ? (
        <>
          <h2 className="text-5xl font-extrabold mt-4 text-gray-900">–</h2>
        </>
      ) : (
        <>

<h2 className="text-3xl font-bold mt-1">{activeJobs}</h2>

        </>
      )}







            </div>
            <div className=" p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Pending Applicant Reviews Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Applicant Reviews</p>

              {loading ? (
        <p className="text-4xl mt-8 font-bold">...</p>
      ) : pendingReviewsisZero ? (
        <>
          <h2 className="text-5xl font-extrabold mt-4 text-gray-900">–</h2>
        </>
      ) : (
        <>

<h2 className="text-3xl font-bold mt-1">{pendingReviews}</h2>

        </>
      )}


            </div>
            <div className="p-3 rounded-full">
              <Clock className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

