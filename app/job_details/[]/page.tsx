"use client";
import { useParams } from "next/navigation";
import React from "react";

import JobDetails from "@/components/Home/JobDetails";

export default function JobDetailsPage() {
  const params = useParams(); // Get the dynamic job ID from the URL
  const jobId = params.id as string;

  return <JobDetails jobId={jobId} />;
}