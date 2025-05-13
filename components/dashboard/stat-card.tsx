"use client"

import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
}

export function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <Card className="border-amber-200 hover:shadow-lg transition-all hover:border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">{title}</CardTitle>
          <motion.div 
            className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center shadow-md"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className="h-5 w-5 text-amber-100" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-700">{value}</div>
          <p className="text-xs text-amber-700">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
