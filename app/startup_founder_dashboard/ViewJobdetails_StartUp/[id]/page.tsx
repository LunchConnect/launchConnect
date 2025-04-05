"use client";
import ViewJobdetails from "@/components/DashboardContent_StartUp/ViewJobdetails";
import { useParams } from "next/navigation";
import React from "react";

export default function JobDetailsPage() {
  const params = useParams(); // Get the dynamic job ID from the URL
  const jobId = params.id as string;

  return <ViewJobdetails jobId={jobId} />;
}
