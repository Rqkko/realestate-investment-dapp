import { Wallet, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvestmentChart } from "@/components/investment-chart"
import { ProjectCard } from "@/components/project-card"
import { InvestmentSummary } from "@/components/investment-summary"
import { UserNav } from "@/components/user-nav"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="top-0 z-30 sticky flex items-center gap-4 bg-background px-4 sm:px-6 border-b h-16">
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-xl tracking-tight">DeProp</h1>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2 font-medium text-sm">
            <Wallet className="w-5 h-5 text-primary" />
            <span>1,000 DP</span>
          </div>
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-3xl tracking-tight">Investor Dashboard</h1>
              <p className="text-muted-foreground">Manage your real estate investments and track your returns.</p>
            </div>
            <InvestmentSummary />
            <Tabs defaultValue="investments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>
              <TabsContent value="investments" className="space-y-4">
                <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
                  <ProjectCard
                    title="Condo A"
                    location="Miami, FL"
                    invested={1000}
                    earnings={500}
                    progress={75}
                    image="/placeholder.svg?height=200&width=400"
                  />
                  <ProjectCard
                    title="Apartment Complex B"
                    location="Austin, TX"
                    invested={800}
                    earnings={320}
                    progress={60}
                    image="/placeholder.svg?height=200&width=400"
                  />
                  <ProjectCard
                    title="Commercial Space C"
                    location="New York, NY"
                    invested={700}
                    earnings={210}
                    progress={40}
                    image="/placeholder.svg?height=200&width=400"
                  />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InvestmentChart />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
