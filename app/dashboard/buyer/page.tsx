"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Leaf,
  Mail,
  MessageSquare,
  Package,
  ShoppingCart,
  User,
  Calendar,
  Search,
  Star,
  FileText,
  List,
  Globe,
  Home,
  BarChart3,
  Users,
  Settings,
  Badge,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { CalendarEvents } from "@/components/dashboard/calendar-events"

export default function BuyerDashboardPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
        <DashboardSidebar userType="buyer" />
        
        <div className="flex flex-col">
          <DashboardHeader 
            userType="buyer"
            userName="Nordic Roasters" 
            userRole="Importateur de café"
            onMenuClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          />
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="grid gap-4 md:gap-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                  title="Active Orders" 
                  value={5} 
                  description="+2 since last month" 
                  icon={ShoppingCart} 
                />
                <StatCard 
                  title="Pending Quotes" 
                  value={3} 
                  description="+1 since last month" 
                  icon={FileText} 
                />
                <StatCard 
                  title="Favorite Farmers" 
                  value={8} 
                  description="+2 since last month" 
                  icon={Star} 
                />
                <StatCard 
                  title="Tracked Products" 
                  value={14} 
                  description="+5 since last month" 
                  icon={Package} 
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <ActivityTimeline
                  activities={[
                    {
                      id: "1",
                      icon: ShoppingCart,
                      title: "Order Confirmed",
                      description: "Your order of Premium Arabica Coffee (800kg) has been confirmed",
                      time: "2 hours ago"
                    },
                    {
                      id: "2",
                      icon: FileText,
                      title: "Quote Received",
                      description: "You received a new quote for Special Arabica Coffee (500kg)",
                      time: "Yesterday"
                    },
                    {
                      id: "3",
                      icon: MessageSquare,
                      title: "Message Received",
                      description: "You received a message regarding your order #12345",
                      time: "3 days ago"
                    }
                  ]}
                />
                <CalendarEvents 
                  events={[
                    {
                      id: "1",
                      title: "Meeting with Coffee Origins",
                      date: "Tomorrow, 2:00PM - 3:00PM"
                    },
                    {
                      id: "2",
                      title: "Premium Arabica Coffee Delivery",
                      date: "May 15, 2024"
                    },
                    {
                      id: "3",
                      title: "Farm Visit",
                      date: "May 22, 2024"
                    }
                  ]}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 border-green-100">
                  <CardHeader>
                    <CardTitle>Recommended Products</CardTitle>
                    <CardDescription>Based on your interests and previous purchases</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.jpg"
                          alt="Coffee Beans"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Special Arabica Coffee</h3>
                        <p className="text-sm text-muted-foreground">Origin Madagascar, fruity notes</p>
                        <div className="mt-1 flex items-center text-sm">
                          <Leaf className="mr-1 h-4 w-4 text-green-600" />
                          <span className="text-green-700">Organic Farming</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-700">5,20 € / kg</span>
                        <p className="text-xs text-muted-foreground">Available: 3,500 kg</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.jpg"
                          alt="Coffee Beans"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Premium Robusta Coffee</h3>
                        <p className="text-sm text-muted-foreground">Origin Madagascar, bold notes</p>
                        <div className="mt-1 flex items-center text-sm">
                          <Leaf className="mr-1 h-4 w-4 text-green-600" />
                          <span className="text-green-700">Fair Trade</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-700">4,10 € / kg</span>
                        <p className="text-xs text-muted-foreground">Available: 5,200 kg</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.jpg"
                          alt="Coffee Beans"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Arabica-Robusta Blend</h3>
                        <p className="text-sm text-muted-foreground">Balanced flavor blend</p>
                        <div className="mt-1 flex items-center text-sm">
                          <Leaf className="mr-1 h-4 w-4 text-green-600" />
                          <span className="text-green-700">Rainforest Alliance</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-700">4,80 € / kg</span>
                        <p className="text-xs text-muted-foreground">Available: 2,800 kg</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full hover:bg-green-50 hover:text-green-800 border-green-200">
                      <Search className="mr-2 h-4 w-4" />
                      Explore More Products
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="lg:col-span-3 border-green-100">
                  <CardHeader>
                    <CardTitle>Market Trends</CardTitle>
                    <CardDescription>Average price evolution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      [Price trends chart]
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full hover:bg-green-50 hover:text-green-800 border-green-200">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Full Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
