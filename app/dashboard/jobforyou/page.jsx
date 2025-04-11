"use client";
import { useState,useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // Using Lucide React Icons
import { getJobsForYou } from "@/actions/action"; // Make sure the correct path is 


// const jobListings = [
//   { id: 1, title: "Social Media Assistant", company: "Nomad", location: "Paris, France", type: "Volunteer", logo: "/icons/nomad.png" },
//   { id: 2, title: "Brand Designer", company: "Dropbox", location: "San Francisco, USA", type: "Internship", logo: "/icons/dropbox.png" },
//   { id: 3, title: "Interactive Developer", company: "Terraform", location: "Hamburg, Germany", type: "Entry-Level Role", logo: "/icons/terraform.png" },
//   { id: 4, title: "Software Engineer", company: "Google", location: "Remote", type: "Full-Time", logo: "/icons/google.png" },
// ];

export default function FindJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  const jobsPerPage = 3;

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const displayedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20">
      <h2 className="text-xl font-semibold mb-4">Jobs For You ({filteredJobs.length})</h2>

     {/* Search Bar with Right-Aligned Icon */}
     <div className="relative mb-4">
        <Input
          placeholder="Search Applications"
          className="pr-10 w-full" // Add padding-right to prevent text overlap with the icon
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>


      {/* Job Listings */}
      <div className="space-y-4">
        {displayedJobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 flex items-center justify-between shadow-sm bg-white">
            <div className="flex items-center lg:gap-4">
              <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-md" />
              <div>
                <h3 className="font-semibold text-sm">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                <Badge className="mt-2 bg-green-100 text-green-700">{job.type}</Badge>
              </div>
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700">
              Apply Now
            </Button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="border border-gray-300 text-gray-700"
        >
          &lt; Back
        </Button>

        {/* Page Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        {/* Next Button */}
        <Button
          variant="ghost"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="border border-gray-300 text-gray-700"
        >
          Next &gt;
        </Button>
      </div>
    </div>
  );
}
