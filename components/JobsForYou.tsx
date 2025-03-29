"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { scrollToTop } from "@/lib/utils"
// Sample job data
const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "/nomad-logo.png", // Replace with actual logo path
    type: "Volunteer",
    typeColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    logo: "/dropbox-logo.png", // Replace with actual logo path
    type: "Internship",
    typeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "/nomad-logo.png",
    type: "Entry Role",
    typeColor: "bg-green-100 text-green-700",
  },
]

export default function JobsForYou() {

  const router = useRouter()
  return (
    <Card className="w-full p-4">
      {/* Header */}
      <CardHeader className="flex flex-row justify-between items-center pb-4">
        <CardTitle className="text-lg font-semibold">Jobs For You</CardTitle>
        <Button onClick={() => {
                              router.push("/dashboard/jobforyou");
                              scrollToTop();
                            }} className="px-4 py-1 text-white  bg-green-500">
          See All
        </Button>
      </CardHeader>

      {/* Job List */}
      <CardContent className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between border rounded-lg p-3 shadow-sm"
          >
            {/* Job Details */}
            <div className="flex items-center gap-4">
              {/* Company Logo */}
              <Image src={job.logo} alt={job.company} width={40} height={40} className="rounded" />
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${job.typeColor}`}>
                  {job.type}
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <Button variant="outline">Apply Now</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
