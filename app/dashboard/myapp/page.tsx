"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter } from "lucide-react";

const applications = [
  { id: 1, company: "Google", role: "UI/UX Designer", date: "2024-05-20", status: "Pending", logo: "/icons/google.png" },
  { id: 2, company: "Microsoft", role: "Frontend Developer", date: "2024-05-18", status: "Reviewed", logo: "/icons/microsoft.png" },
  { id: 3, company: "Amazon", role: "Product Designer", date: "2024-05-18", status: "Accepted", logo: "/icons/amazon.png" },
  { id: 4, company: "Meta", role: "UX Researcher", date: "2024-05-15", status: "Rejected", logo: "/icons/meta.png" },
  { id: 5, company: "Meta", role: "Graphic Designer", date: "2024-05-12", status: "Accepted", logo: "/icons/meta.png" },
];

export default function MyApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const filteredApplications = applications.filter((app) =>
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) || app.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplications.length / jobsPerPage);
  const displayedApplications = filteredApplications.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20">
      <h2 className="text-xl font-semibold mb-4">My Applications ({filteredApplications.length})</h2>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search Applications"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} /> Filter by
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="flex items-center gap-2">
                  <img src={app.logo} alt={app.company} className="w-8 h-8 rounded-md" />
                  {app.company}
                </TableCell>
                <TableCell>{app.role}</TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-md ${
                      app.status === "Pending" ? "text-gray-500" :
                      app.status === "Reviewed" ? "text-orange-500" :
                      app.status === "Accepted" ? "text-green-600" :
                      "text-red-500"
                    }`}
                  >
                    ● {app.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline">View Job</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <Button variant="ghost" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          &lt; Back
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            className={`px-3 py-2 ${currentPage === index + 1 ? "bg-green-600 text-white" : "bg-white border border-gray-300 text-gray-700"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button variant="ghost" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next &gt;
        </Button>
      </div>
    </div>
  );
}
