"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InvestmentData {
  month: string;
  investedValue: number;
  totalValue: number;
}

// Sample data for the chart
const generateData = (months: number) => {
  const data = []
  const investedValue = 2000
  let totalValue = 2000

  for (let i = 0; i < months; i++) {
    // Simulate some random growth
    const growth = Math.random() * 0.05 + 0.01 // 1% to 6% monthly growth
    totalValue = totalValue * (1 + growth)

    data.push({
      month: new Date(2023, i, 1).toLocaleString("default", { month: "short" }),
      investedValue: investedValue,
      totalValue: Math.round(totalValue),
    })
  }

  return data
}

export function InvestmentChart() {
  const [data, setData] = useState<InvestmentData[]>([])
  const [timeframe, setTimeframe] = useState("1y")

  useEffect(() => {
    // Generate data based on selected timeframe
    const months = timeframe === "1m" ? 1 : timeframe === "3m" ? 3 : timeframe === "6m" ? 6 : 12
    setData(generateData(months))
  }, [timeframe])

  return (
    <Card className="shadow-none border-0">
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <Tabs defaultValue="1y" className="w-full" onValueChange={setTimeframe}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="1m">1M</TabsTrigger>
                <TabsTrigger value="3m">3M</TabsTrigger>
                <TabsTrigger value="6m">6M</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-primary rounded-full w-3 h-3" />
                  <span>Total Value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-300 rounded-full w-3 h-3" />
                  <span>Invested Value</span>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
        <div className="pt-4 w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value} DP`, undefined]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="totalValue"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="investedValue"
                stroke="#d1d5db"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
