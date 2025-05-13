"use client"

import Image from "next/image"
import {
  Leaf,
  Mail,
  MessageSquare,
  Package,
  ShoppingCart,
  User,
  Award,
  BarChart3,
  Search
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { CalendarEvents } from "@/components/dashboard/calendar-events"

// Constants pour les tableaux de données
const STATS_DATA = [
  {
    title: "Active Products",
    value: 2,
    description: "+0 since last month",
    icon: Package
  },
  {
    title: "Quote Requests",
    value: 8,
    description: "+3 since last month",
    icon: Mail
  },
  {
    title: "Active Orders",
    value: 3,
    description: "+1 since last month",
    icon: ShoppingCart
  },
  {
    title: "Profile Views",
    value: 142,
    description: "+28% since last month",
    icon: User
  }
];

const ACTIVITY_DATA = [
  {
    id: "1",
    icon: Package,
    title: "New Order",
    description: "Order #1234 has been placed",
    time: "2h ago",
    avatar: '/images/avatars/buyer1.jpg'
  },
  {
    id: "2",
    icon: MessageSquare,
    title: "New Message",
    description: "Café Artisan sent a message about your order",
    time: "Yesterday",
    avatar: '/images/avatars/farmer1.jpg'
  },
  {
    id: "3",
    icon: ShoppingCart,
    title: "New Order",
    description: "Bean Lovers confirmed an order of 800kg of Premium Arabica Coffee",
    time: "3 days ago",
    avatar: '/images/avatars/farmer2.jpg'
  }
];

const EVENTS_DATA = [
  {
    id: "1",
    title: "Meeting with Nordic Roasters",
    date: "Tomorrow, 3:00PM - 4:00PM"
  },
  {
    id: "2",
    title: "Shipment to Café Artisan",
    date: "May 12, 2024"
  },
  {
    id: "3",
    title: "Fair Trade Certification Renewal",
    date: "May 20, 2024"
  }
];

const CERTIFICATION_DATA = [
  {
    id: "fair-trade",
    name: "Fair Trade Certified",
    validUntil: "12/2025",
    progress: 80,
    progressColor: "bg-green-500"
  },
  {
    id: "organic",
    name: "Organic Certification",
    validUntil: "06/2025",
    progress: 75,
    progressColor: "bg-green-500"
  },
  {
    id: "rainforest",
    name: "Rainforest Alliance",
    validUntil: "09/2024",
    progress: 40,
    progressColor: "bg-yellow-500"
  }
];

const BEST_SELLING_PRODUCTS = [
  {
    id: "antananarivo",
    name: "Antananarivo Premium Coffee",
    image: "/images/products/antananarivo-coffee.jpg",
    quantity: "2,500 kg",
    price: "€4.50",
    change: "+12%"
  },
  {
    id: "tamatave",
    name: "Tamatave Special Coffee",
    image: "/images/products/tamatave-coffee.jpg",
    quantity: "800 kg",
    price: "€7.80",
    change: "+8%"
  }
];

export default function FarmerDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS_DATA.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title} 
            value={stat.value} 
            description={stat.description} 
            icon={stat.icon} 
          />
        ))}
      </div>

      {/* Timeline and Calendar Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ActivityTimeline activities={ACTIVITY_DATA} />
        <CalendarEvents events={EVENTS_DATA} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3 border-0 overflow-hidden shadow-md hover:shadow-lg relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-amber-300/20 before:via-teal-400/10 before:to-amber-200/20 before:z-0 transition-all duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.05)_0%,rgba(16,185,129,0.08)_50%)] opacity-70 mix-blend-soft-light"></div>
          <CardHeader>
            <CardTitle>My Certifications</CardTitle>
            <CardDescription>Current status of your certifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {CERTIFICATION_DATA.map((cert) => (
              <div key={cert.id} className="flex items-start space-x-3">
                <Award className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">Valid until {cert.validUntil}</p>
                  <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                    <div className={`h-2 rounded-full ${cert.progressColor}`} style={{ width: `${cert.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-none shadow-sm hover:shadow-md cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <Award className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 duration-300" />
              Manage Certifications
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-4 border-0 overflow-hidden shadow-md hover:shadow-lg relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-amber-600/20 before:via-teal-400/10 before:to-amber-500/20 before:z-0 transition-all duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08)_0%,rgba(16,185,129,0.05)_50%)] opacity-70 mix-blend-soft-light"></div>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
            <CardDescription>Most popular products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {BEST_SELLING_PRODUCTS.map(product => (
                <div key={product.id} className="flex items-center">
                  <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="mt-1 flex justify-between">
                      <span className="text-sm">Monthly Sales: {product.quantity}</span>
                      <span className="text-sm text-green-600">{product.change}</span>
                    </div>
                  </div>
                  <div className="text-right font-bold text-green-700">
                    {product.price}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-none shadow-sm hover:shadow-md cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <Search className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
              View All Products
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
