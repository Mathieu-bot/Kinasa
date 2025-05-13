"use client"

import Link from "next/link"
import { Globe, Home, MessageSquare, Package, Settings, ShoppingCart, BarChart3, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  type?: "framer" | "buyer"
  userType?: string
}

export function DashboardSidebar({ type, userType }: SidebarProps) {
  // Pour assurer la compatibilité avec le code existant et nouveau
  const userTypeValue = type || (userType === "buyer" ? "buyer" : "framer")
  const basePath = `/dashboard/${userTypeValue}`
  const isFramer = userTypeValue === "framer"

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Globe className="h-6 w-6 text-green-700" />
            <span className="text-green-800">Kinasa</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href={basePath}
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-green-800 transition-all"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href={`${basePath}/messages`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
            >
              <MessageSquare className="h-4 w-4" />
              Messages
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {isFramer ? 3 : 2}
              </Badge>
            </Link>
            <Link
              href={`${basePath}/products`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
            >
              <Package className="h-4 w-4" />
              {isFramer ? "My Products" : "Catalogs"}
            </Link>
            <Link
              href={`${basePath}/orders`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
            </Link>
            <Link
              href={`${basePath}/analytics`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href={`${basePath}/network`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
            >
              <Users className="h-4 w-4" />
              {isFramer ? "My Network" : "Partner Producers"}
            </Link>
            {isFramer && (
              <Link
                href={`${basePath}/certifications`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-green-800"
              >
                <Award className="h-4 w-4" />
                Certifications
              </Link>
            )}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link href={`${basePath}/settings`}>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
