"use client"

import { useState } from "react"
import { TrendingUp, ChevronDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const chartData = [
  { month: "Jul", desktop: 200 },
  { month: "Aug", desktop: 350 },
  { month: "Sep", desktop: 500 },
  { month: "Oct", desktop: 800 },
  { month: "Nov", desktop: 300 },
  { month: "Dec", desktop: 600 },
  { month: "Jan", desktop: 650 },
]

export default function ApplicationTrends() {
  const [selectedRange, setSelectedRange] = useState("Monthly")

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Application Trends</CardTitle>
          {/* <CardDescription>Showing total visitors for the last 6 months</CardDescription> */}
        </div>

        {/* Dropdown for selecting time range */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {selectedRange} <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedRange("Monthly")}>Monthly</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedRange("Weekly")}>Weekly</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedRange("Daily")}>Daily</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 20, right: 12, top: 10, bottom: 10 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              
              {/* ✅ Add Y-axis for left-side values */}
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip />
              <Area
                dataKey="desktop"
                type="monotone"
                fill="#22c55e30" // Light green fill with opacity
                stroke="#22c55e" // Green stroke
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
