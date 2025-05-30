import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface ProjectCardProps {
  address: string
  title: string
  location: string
  status: string
  invested: number
  stakes: number
  earnings: number
  progress: number
  image: string
}

export function ProjectCard({ address, title, location, status, invested, stakes, earnings, progress, image }: ProjectCardProps) {

  function sellStakes() {
    console.log(`Selling stakes for project at address: ${address}`);
  }

  return (
    <Card className="gap-2 bg-white/5">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
          <Image src={image || "/placeholder_realEstate.jpg"} alt={title} width={500} height={192} className="w-full h-full object-cover" />
          <div className="bottom-4 left-4 absolute">
            <p className="font-medium text-sm text-white">{location}</p>
            <h3 className="font-bold text-white text-xl">{title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="gap-4 grid grid-cols-2">
          <div>
            <p className="text-sm text-white">Status</p>
            <p className="font-bold text-lg text-white">{status}</p>
          </div>
          <div>
            <p className="text-sm text-white">Invested</p>
            <p className="font-bold text-lg text-white">{invested} DP</p>
          </div>
        </div>
        <div className="gap-4 grid grid-cols-2">
          <div>
            <p className="text-sm text-white">Stakes</p>
            <p className="font-bold text-lg text-white">{stakes}%</p>
          </div>
          <div>
            <p className="text-sm text-white">Earnings</p>
            <p className="font-bold text-lg text-white">{earnings} DP</p>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-xs">
            <span className="text-white">Percent Raised</span>
            <span className="font-medium text-white">{progress}%</span>
          </div>
        </div>
          <Progress value={progress} className="bg-gray-500 h-2" />
      </CardContent>
      <CardFooter className="flex flex-col gap-4 p-4 pt-0">
        <Button variant="outline" className="bg-white/5 w-full" asChild>
          <Link href={`/projectDetails/${address}`}>
            Details
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          className="bg-white/5 w-full"
          onClick={sellStakes}
        >
          Sell
          <ArrowUpRight className="ml-2 w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
