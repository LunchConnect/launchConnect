"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Define Chart Data
const chartData = [
  { name: "Accepted", value: 52.1, color: "#22c55e" }, // Green
  { name: "Under Review", value: 22.8, color: "#d1d5db" }, // Gray
  { name: "Rejected", value: 13.9, color: "#ef4444" }, // Red
  { name: "Pending", value: 11.2, color: "#fcd34d" }, // Yellow
]

const ApplicationStatusChart = () => {
  return (
    <Card className="flex flex-col bg-white lg:w-[40%] border-2 border-[#EDEFF2] rounded-lg h-[220px]">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-900 text-[16px]">Application Status</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="w-1/2 h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={70}
                label={false} // 🔥 Removes the text labels around the chart
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-1/2">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center mb-2">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-sm text-gray-700">{entry.name}</span>
              <span className="ml-auto font-medium text-gray-900">{entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ApplicationStatusChart
