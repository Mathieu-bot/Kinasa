"use client"

import Image from "next/image"
import {
  Leaf,
  MessageSquare,
  Package,
  ShoppingCart,
  FileText,
  Star,
  BarChart3,
  Search
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { CalendarEvents } from "@/components/dashboard/calendar-events"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const STATS_DATA = [
  {
    title: "Active Orders",
    value: 5,
    description: "+2 since last month",
    icon: ShoppingCart
  },
  {
    title: "Pending Quotes",
    value: 3,
    description: "+1 since last month",
    icon: FileText
  },
  {
    title: "Favorite Farmers",
    value: 8,
    description: "+2 since last month",
    icon: Star
  },
  {
    title: "Tracked Products",
    value: 14,
    description: "+5 since last month",
    icon: Package
  }
];

const ACTIVITY_DATA = [
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
];

const EVENTS_DATA = [
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
];

const RECOMMENDED_PRODUCTS = [
  {
    id: "antananarivo-arabica",
    name: "Antananarivo Arabica",
    origin: "Hauts plateaux d'Antananarivo, notes d'agrumes",
    certification: "Organic Farming",
    price: "€5.40",
    available: "2,800 kg"
  },
  {
    id: "tamatave-robusta",
    name: "Tamatave Robusta Premium",
    origin: "Côte Est de Tamatave, notes chocolatées",
    certification: "Fair Trade",
    price: "€4.20",
    available: "4,500 kg"
  },
  {
    id: "fianarantsoa-bourbon",
    name: "Fianarantsoa Bourbon Rouge",
    origin: "Hautes terres de Fianarantsoa, notes florales",
    certification: "Rainforest Alliance",
    price: "€6.10",
    available: "1,800 kg"
  }
];

// Données pour le graphique des tendances de prix
const PRICE_TREND_DATA = [
  { month: "Jan", arabica: 4.8, robusta: 3.2, bourbon: 5.6 },
  { month: "Feb", arabica: 4.9, robusta: 3.4, bourbon: 5.7 },
  { month: "Mar", arabica: 5.1, robusta: 3.5, bourbon: 5.8 },
  { month: "Apr", arabica: 5.2, robusta: 3.7, bourbon: 5.9 },
  { month: "May", arabica: 5.4, robusta: 4.2, bourbon: 6.1 },
  { month: "Jun", arabica: 5.3, robusta: 4.0, bourbon: 6.0 }
];

export default function BuyerDashboardPage() {
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ActivityTimeline activities={ACTIVITY_DATA} />
        <CalendarEvents events={EVENTS_DATA} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-hidden shadow-md  relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-amber-300/20 before:via-teal-400/10 before:to-amber-200/20 before:z-0 transition-all duration-300 border border-emerald-300 hover:border-emerald-600 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Recommended Products</CardTitle>
            <CardDescription>Based on your interests and previous purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {RECOMMENDED_PRODUCTS.map(product => (
              <div key={product.id} className="flex items-center">
                <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={`/images/products/${product.id.split('-')[0]}-coffee.jpg`}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.origin}</p>
                  <div className="mt-1 flex items-center text-sm">
                    <Leaf className="mr-1 h-4 w-4 text-green-600" />
                    <span className="text-green-700">{product.certification}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-green-700">{product.price} / kg</span>
                  <p className="text-xs text-muted-foreground">Available: {product.available}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-none shadow-sm hover:shadow-md cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <Search className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
              Explore More Products
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-3 overflow-hidden shadow-md  relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-amber-300/20 before:via-teal-400/10 before:to-amber-200/20 before:z-0 transition-all duration-300 border border-emerald-300 hover:border-emerald-600 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Average price evolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] py-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={PRICE_TREND_DATA}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" tickFormatter={(value) => `€${value}`} />
                  <Tooltip
                    formatter={(value) => [`€${value}`, 'Price per kg']}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="arabica" stroke="#10b981" activeDot={{ r: 8 }} name="Antananarivo Arabica" strokeWidth={2} />
                  <Line type="monotone" dataKey="robusta" stroke="#6366f1" name="Tamatave Robusta" strokeWidth={2} />
                  <Line type="monotone" dataKey="bourbon" stroke="#f59e0b" name="Fianarantsoa Bourbon" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-none shadow-sm hover:shadow-md cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <BarChart3 className="mr-2 h-4 w-4 transition-transform group-hover:rotate-6 duration-300" />
              View Full Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
