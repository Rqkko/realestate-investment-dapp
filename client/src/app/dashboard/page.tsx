import { Wallet, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InvestmentChart } from "@/components/investment-chart"
import { ProjectCard } from "@/components/project-card"
import { InvestmentSummary } from "@/components/investment-summary"
import { UserNav } from "@/components/user-nav"
import Navbar from "../components/navbar"

export default function DashboardPage() {
  return (
    <div className="bg-gradient-to-b from-[#0f1c2e] to-black min-h-screen font-sans text-white">
      <Navbar />

      <div className="flex flex-1 pt-35">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-3xl text-white tracking-tight">Investor Dashboard</h1>
              <p className="text-white">Manage your real estate investments and track your returns.</p>
            </div>

            <InvestmentSummary />

            <h2 className="font-bold text-2xl text-white tracking-tight">Investments</h2>

            <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Condo A"
                location="Miami, FL"
                invested={1000}
                earnings={500}
                progress={75}
                image="/placeholder_realEstate.jpg"
              />
              <ProjectCard
                title="Apartment Complex B"
                location="Austin, TX"
                invested={800}
                earnings={320}
                progress={60}
                image="/placeholder_realEstate.jpg"
              />
              <ProjectCard
                title="Commercial Space C"
                location="New York, NY"
                invested={700}
                earnings={210}
                progress={40}
                image="/placeholder_realEstate.jpg"
              />
            </div>
            
            {/* <Card>
              <CardHeader>
                <CardTitle>Investment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <InvestmentChart />
              </CardContent>
            </Card> */}
          </div>
        </main>
      </div>
    </div>
  )
}
