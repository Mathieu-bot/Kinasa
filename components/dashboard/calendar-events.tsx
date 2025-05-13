"use client"

import { Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CalendarEvent {
  id: string
  title: string
  date: string
}

interface CalendarEventsProps {
  events: CalendarEvent[]
}

export function CalendarEvents({ events }: CalendarEventsProps) {
  // Assurer que le titre est en anglais selon la préférence utilisateur
  const title = "Calendar";
  const subtitle = "Upcoming events";
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="lg:col-span-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card className="border-amber-200 hover:shadow-lg transition-all hover:border-amber-300 bg-amber-50 h-full">
      <CardHeader className="border-b border-amber-200 pb-3">
        <CardTitle className="text-emerald-800 text-xl">{title}</CardTitle>
        <CardDescription className="text-amber-800/70">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="space-y-4 mt-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {events.map((event) => (
            <motion.div 
              key={event.id} 
              className="flex items-center"
              variants={item}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-amber-100 shadow-md">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium text-emerald-800">{event.title}</p>
                <p className="text-xs text-amber-700">{event.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
      <CardFooter>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full"
        >
          <Button variant="outline" className="w-full bg-emerald-600 hover:bg-emerald-700 text-amber-100 hover:text-amber-50 border-none transition-colors shadow-sm">
          <Calendar className="mr-2 h-4 w-4" />
          View Full Calendar
        </Button>
        </motion.div>
      </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
