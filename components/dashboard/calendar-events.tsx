"use client"

import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface CalendarEvent {
  id: string
  title: string
  date: string
}

interface CalendarEventsProps {
  events: CalendarEvent[]
}

export function CalendarEvents({ events }: CalendarEventsProps) {
  return (
    <Card className="lg:col-span-3 border-green-100">
      <CardHeader>
        <CardTitle>Calendrier</CardTitle>
        <CardDescription>Vos prochains événements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-green-100 text-green-700">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full hover:bg-green-50 hover:text-green-800 border-green-200">
          <Calendar className="mr-2 h-4 w-4" />
          Voir le calendrier complet
        </Button>
      </CardFooter>
    </Card>
  )
}
