import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, Users, Activity } from "lucide-react"

export function NextGenSection() {
  return (
    <section className="container max-w-screen-xl py-20">
      <h2 className="text-3xl font-bold mb-4">The next-gen SaaS</h2>
      <p className="text-muted-foreground max-w-2xl mb-12">
        Access to the greatest Next.js builder, scalable and gives you confidence to build your next feature. Everything
        from A to Z is well documented and thoughtfully implemented.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4" /> Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$1,452</div>
            <div className="flex -space-x-2 mb-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Avatar key={i} className="border-2 border-background w-8 h-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback>U{i + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-4 w-4" /> Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PipelineItem label="Item 1" value={80} />
            <PipelineItem label="Item 2" value={65} />
            <PipelineItem label="Item 3" value={40} />
            <PipelineItem label="Item 4" value={25} />
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LineChart className="h-4 w-4" /> Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end gap-1 pb-4">
              {Array.from({ length: 20 }).map((_, i) => {
                const height = 20 + Math.random() * 80
                return (
                  <div key={i} className="bg-muted-foreground/30 w-full rounded-t" style={{ height: `${height}%` }} />
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="text-lg">Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center text-muted-foreground">
              Campaign data visualization
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="text-lg">Magic Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 opacity-20" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-sm font-medium">Goal → Fund</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function PipelineItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="h-2 bg-muted/30" />
    </div>
  )
}
