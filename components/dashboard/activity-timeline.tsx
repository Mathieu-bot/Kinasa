"use client"

import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: string
  icon: LucideIcon
  title: string
  description: string
  time: string
}

interface ActivityTimelineProps {
  activities: Activity[]
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <Card className="lg:col-span-4 border-green-100">
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="relative">
          <div className="absolute bottom-0 left-7 top-0 w-px bg-green-100" />
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
