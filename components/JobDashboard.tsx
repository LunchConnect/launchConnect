import { Briefcase, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function JobDashboard() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Job Posts Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Job Posts</p>
              <h2 className="text-3xl font-bold mt-1">54</h2>
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
              <h2 className="text-3xl font-bold mt-1">15</h2>
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
              <h2 className="text-3xl font-bold mt-1">10</h2>
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

