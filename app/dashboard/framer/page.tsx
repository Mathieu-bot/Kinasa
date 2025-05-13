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
  Award,
  Calendar,
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

export default function FramerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <DashboardSidebar type="framer" />

      {/* Main Content */}
      <div className="flex flex-col">
        <DashboardHeader 
          title="Espace Producteur" 
          avatarFallback="CA" 
          userName="Coopérative Café Altura" 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Active Products" 
                value={2} 
                description="+0 since last month" 
                icon={Package} 
              />
              <StatCard 
                title="Quote Requests" 
                value={8} 
                description="+3 since last month" 
                icon={Mail} 
              />
              <StatCard 
                title="Active Orders" 
                value={3} 
                description="+1 since last month" 
                icon={ShoppingCart} 
              />
              <StatCard 
                title="Profile Views" 
                value={142} 
                description="+28% since last month" 
                icon={User} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <ActivityTimeline
                activities={[
                  {
                    id: "1",
                    icon: Mail,
                    title: "New Quote Request",
                    description: "Nordic Roasters requested a quote for Premium Arabica Coffee",
                    time: "2 hours ago"
                  },
                  {
                    id: "2",
                    icon: MessageSquare,
                    title: "New Message",
                    description: "Café Artisan sent a message about your order",
                    time: "Yesterday"
                  },
                  {
                    id: "3",
                    icon: ShoppingCart,
                    title: "New Order",
                    description: "Bean Lovers confirmed an order of 800kg of Premium Arabica Coffee",
                    time: "3 days ago"
                  }
                ]}
              />
              <CalendarEvents 
                events={[
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
                ]}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-3 border-green-100">
                <CardHeader>
                  <CardTitle>Mes certifications</CardTitle>
                  <CardDescription>État actuel de vos certifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Award className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Fair Trade Certified</h3>
                      <p className="text-sm text-muted-foreground">Valide jusqu'au 12/2025</p>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Certification Biologique</h3>
                      <p className="text-sm text-muted-foreground">Valide jusqu'au 06/2025</p>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Rainforest Alliance</h3>
                      <p className="text-sm text-muted-foreground">Valide jusqu'au 09/2024</p>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full hover:bg-green-50 hover:text-green-800 border-green-200">
                    <Award className="mr-2 h-4 w-4" />
                    Gérer mes certifications
                  </Button>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-4 border-green-100">
                <CardHeader>
                  <CardTitle>Mes meilleures ventes</CardTitle>
                  <CardDescription>Produits les plus populaires</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Café Arabica Premium"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Café Arabica Premium</h3>
                        <p className="text-sm text-muted-foreground">2,500 kg vendus ce trimestre</p>
                        <div className="mt-1 flex items-center text-sm">
                          <Leaf className="mr-1 h-4 w-4 text-green-600" />
                          <span className="text-green-700">Agriculture Biologique</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-700">4,50 € / kg</span>
                        <p className="text-xs text-muted-foreground">+12% vs. dernier trim.</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Café Arabica Spécial"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Café Arabica Spécial</h3>
                        <p className="text-sm text-muted-foreground">800 kg vendus ce trimestre</p>
                        <div className="mt-1 flex items-center text-sm">
                          <Leaf className="mr-1 h-4 w-4 text-green-600" />
                          <span className="text-green-700">Agriculture Biologique</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-700">7,80 € / kg</span>
                        <p className="text-xs text-muted-foreground">+8% vs. dernier trim.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full hover:bg-green-50 hover:text-green-800 border-green-200">
                    <Package className="mr-2 h-4 w-4" />
                    Voir tous les produits
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setSidebarOpen(false)}>
                  <Globe className="h-6 w-6 text-green-700" />
                  <span className="text-green-800">Kinasa</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setSidebarOpen(false)}>
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-2 text-sm font-medium">
                  <Link
                    href="/dashboard/framer"
                    className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-green-800 transition-all"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Tableau de bord
                  </Link>
                  <Link
                    href="/dashboard/framer/messages"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Messages
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">3</Badge>
                  </Link>
                  <Link
                    href="/dashboard/framer/products"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Package className="h-4 w-4" />
                    Mes produits
                  </Link>
                  <Link
                    href="/dashboard/framer/orders"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Commandes
                  </Link>
                  <Link
                    href="/dashboard/framer/analytics"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Statistiques
                  </Link>
                  <Link
                    href="/dashboard/framer/network"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Users className="h-4 w-4" />
                    Mon réseau
                  </Link>
                  <Link
                    href="/dashboard/framer/certifications"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Award className="h-4 w-4" />
                    Certifications
                  </Link>
                </nav>
              </div>
              <div className="mt-auto p-4">
                <Link href="/dashboard/framer/settings" onClick={() => setSidebarOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Icons
function MenuIcon({ className, ...props }: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function XIcon({ className, ...props }: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
