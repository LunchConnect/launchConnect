"use client";
import { useParams } from "next/navigation";
import React from "react";
import ViewJobdetails from "@/components/Dashboardcontent/ViewJobDetails";

export default function JobDetailsPage() {
  const params = useParams(); // Get the dynamic job ID from the URL
  const jobId = params.id as string;

  return <ViewJobdetails jobId={jobId} />;
}
