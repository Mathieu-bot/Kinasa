"use client"

import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: string
  icon: React.ElementType
  title: string
  description: string
  time: string
  avatar?: string
}

interface ActivityTimelineProps {
  activities: Activity[]
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  // Titre en français trouvé dans l'image qui devrait être en anglais selon la préférence utilisateur
  const title = "Recent Activity";
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="lg:col-span-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card className="border-amber-200 hover:shadow-lg transition-all hover:border-amber-300 bg-amber-50 h-full">
          <CardHeader className="border-b border-amber-200 pb-3">
            <CardTitle className="text-emerald-800 text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="pl-4">
            <div className="relative mt-8">
              <div className="absolute bottom-0 left-7 top-0 w-px bg-emerald-500/50" />
              <motion.div 
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {activities.map((activity) => (
                  <motion.div 
                    key={activity.id} 
                    className="flex items-center"
                    variants={item}
                  >
                    <div className="relative h-10 w-10">
                    {activity.avatar ? (
                      <img 
                        src={activity.avatar} 
                        alt={activity.title}
                        className="h-10 w-10 rounded-full object-cover border-2 border-emerald-100 shadow-md"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-amber-100 shadow-md">
                        <activity.icon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none text-emerald-800">{activity.title}</p>
                      <p className="text-sm text-amber-800/80">{activity.description}</p>
                    </div>
                    <div className="ml-auto text-xs text-amber-600 font-medium">{activity.time}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
