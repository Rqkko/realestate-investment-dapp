import { Wallet, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
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
              <TabsContent value="opportunities" className="space-y-4">
                <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="p-0">
                      <div className="relative w-full h-48">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Property"
                          className="w-full h-full object-cover"
                        />
                        <div className="bottom-4 left-4 absolute">
                          <p className="font-medium text-sm text-white">New York, NY</p>
                          <h3 className="font-bold text-white text-xl">Office Building D</h3>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-muted-foreground text-sm">Target raise</p>
                          <p className="font-bold text-lg">5,000 DP</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Est. APY</p>
                          <p className="font-bold text-green-600 text-lg">12.5%</p>
                        </div>
                      </div>
                      <Progress value={45} className="mt-4 h-2" />
                      <div className="flex justify-between mt-1 text-muted-foreground text-xs">
                        <span>2,250 DP raised</span>
                        <span>45%</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Invest Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="p-0">
                      <div className="relative w-full h-48">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Property"
                          className="w-full h-full object-cover"
                        />
                        <div className="bottom-4 left-4 absolute">
                          <p className="font-medium text-sm text-white">Chicago, IL</p>
                          <h3 className="font-bold text-white text-xl">Retail Space E</h3>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-muted-foreground text-sm">Target raise</p>
                          <p className="font-bold text-lg">3,500 DP</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Est. APY</p>
                          <p className="font-bold text-green-600 text-lg">10.8%</p>
                        </div>
                      </div>
                      <Progress value={28} className="mt-4 h-2" />
                      <div className="flex justify-between mt-1 text-muted-foreground text-xs">
                        <span>980 DP raised</span>
                        <span>28%</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Invest Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="portfolio" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary rounded-full w-4 h-4" />
                            <span className="font-medium text-sm">Residential</span>
                          </div>
                          <span className="font-medium text-sm">1,800 DP (72%)</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-500 rounded-full w-4 h-4" />
                            <span className="font-medium text-sm">Commercial</span>
                          </div>
                          <span className="font-medium text-sm">500 DP (20%)</span>
                        </div>
                        <Progress value={20} className="bg-blue-100 h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-green-500 rounded-full w-4 h-4" />
                            <span className="font-medium text-sm">Industrial</span>
                          </div>
                          <span className="font-medium text-sm">200 DP (8%)</span>
                        </div>
                        <Progress value={8} className="bg-green-100 h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="font-bold text-4xl text-green-600">+1,030 DP</div>
                      <p className="text-muted-foreground text-sm">41.2% return on investment</p>
                    </div>
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
