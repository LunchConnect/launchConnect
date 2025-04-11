"use client"

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJobSeekerSummary } from "@/actions/action"; // adjust path if needed

interface ChartDataItem {
  value: number;
color: string; // Add color property
name: string;
}

const ApplicationStatusChart = () => {
  const [loading, setLoading] = useState(true);


  const [chartData, setChartData] = useState<ChartDataItem[]>([]); // Type the state as an array of ChartDataItem

  const isAllZero = chartData.every((item) => item.value === 0);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await getJobSeekerSummary(token);
      if (res.success) {
        const { accepted, rejected, pending, underReview } = res.data;

        const formatted = [
          { name: "Accepted", value: accepted || 0, color: "#22c55e" },
          { name: "Under Review", value: underReview || 0, color: "#d1d5db" },
          { name: "Rejected", value: rejected || 0, color: "#ef4444" },
          { name: "Pending", value: pending || 0, color: "#fcd34d" },
        ];

        setChartData(formatted);
      }
      setLoading(false);
    };

    fetchSummary();
  }, []);

  return (
    <Card className="flex flex-col bg-white lg:w-[40%] border-2 border-[#EDEFF2] rounded-lg h-[220px]">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-900 text-[16px]">
          Application Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="w-1/2 h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={isAllZero ? [{ value: 100, fill: "#f3f4f6" }] : chartData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={70}
                    label={false}
                  >
                    {!isAllZero &&
                      chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2">
              {chartData.map((entry, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span className="text-sm text-gray-700">{entry.name}</span>
                  <span className="ml-auto font-medium text-gray-900">
                    {entry.value === 0 ? "-%" : `${entry.value}%`}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};


export default ApplicationStatusChart;
