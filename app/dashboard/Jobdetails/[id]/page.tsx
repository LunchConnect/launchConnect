"use client";
import { useParams } from "next/navigation";
import React from "react";
import Jobdetails from "@/components/Dashboardcontent/Jobdetails";

export default function JobDetailsPage() {
  const params = useParams(); // Get the dynamic job ID from the URL
  const jobId = params.id as string;

  return <Jobdetails jobId={jobId} />;
}
