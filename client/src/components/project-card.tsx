import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProjectCardProps {
  title: string
  location: string
  invested: number
  earnings: number
  progress: number
  image: string
}

export function ProjectCard({ title, location, invested, earnings, progress, image }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="bottom-4 left-4 absolute">
            <p className="font-medium text-sm text-white">{location}</p>
            <h3 className="font-bold text-white text-xl">{title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="gap-4 grid grid-cols-2">
          <div>
            <p className="text-muted-foreground text-sm">Invested</p>
            <p className="font-bold text-lg">{invested} DP</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Earnings</p>
            <p className="font-bold text-green-600 text-lg">+{earnings} DP</p>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Project completion</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href="#">
            Details
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
