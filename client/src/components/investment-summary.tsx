import { Coins, Building, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InvestmentSummary() {
  return (
    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-[#020C3B]">
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="font-bold text-sm text-white">Total DP Invested</CardTitle>
          <Coins className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl text-white">2,500 DP</div>
          {/* <p className="text-muted-foreground text-xs">
            <span className="text-green-500">+500 DP</span> from last month
          </p> */}
        </CardContent>
      </Card>
      <Card className="bg-[#020C3B]">
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="font-bold text-sm text-white">Projects Invested</CardTitle>
          <Building className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl text-white">3</div>
          {/* <p className="text-muted-foreground text-xs">
            <span className="text-green-500">+1</span> from last month
          </p> */}
        </CardContent>
      </Card>
      <Card className="bg-[#020C3B]">
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="font-bold text-sm text-white">Total Earnings</CardTitle>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl text-white">1,030 DP</div>
          {/* <p className="text-muted-foreground text-xs">
            <span className="text-green-500">+210 DP</span> from last month
          </p> */}
        </CardContent>
      </Card>
    </div>
  )
}
