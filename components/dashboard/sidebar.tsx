"use client"

import Link from "next/link"
import { Globe, Home, MessageSquare, Package, Settings, ShoppingCart, BarChart3, Users, Award, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  type?: "farmer" | "buyer"
  userType?: string
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function DashboardSidebar({ type, userType, isMobileOpen = false, onMobileClose = () => {} }: SidebarProps) {
  const userTypeValue = type || (userType === "buyer" ? "buyer" : "farmer")
  const basePath = `/dashboard/${userTypeValue}`
  const isFramer = userTypeValue === "farmer"

  const handleLinkClick = () => {
    if (window.innerWidth < 768) { // md breakpoint
      onMobileClose();
    }
  };

  const renderNavContent = () => (
    <>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Globe className="h-6 w-6 text-amber-300" />
          <span className="text-white text-xl">Kinasa</span>
        </Link>
        {isMobileOpen && (
          <Button variant="ghost" size="icon" className="ml-auto text-white" onClick={onMobileClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href={basePath}
            className="flex items-center gap-3 rounded-lg bg-emerald-600 px-3 py-2 text-white font-medium transition-all"
            onClick={handleLinkClick}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href={`${basePath}/messages`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-amber-50 transition-all hover:bg-emerald-600/50"
            onClick={handleLinkClick}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">3</Badge>
          </Link>
          <Link
            href={`${basePath}/products`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-amber-50 transition-all hover:bg-emerald-600/50"
            onClick={handleLinkClick}
          >
            <Package className="h-4 w-4" />
            {isFramer ? "Products" : "Market"}
          </Link>
          <Link
            href={`${basePath}/orders`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-amber-50 transition-all hover:bg-emerald-600/50"
            onClick={handleLinkClick}
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
          </Link>
          <Link
            href={`${basePath}/analytics`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-amber-50 transition-all hover:bg-emerald-600/50"
            onClick={handleLinkClick}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Link>
          {isFramer ? (
            <>
              <Link
                href={`${basePath}/network`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-amber-50 transition-all hover:bg-emerald-600/50"
                onClick={handleLinkClick}
              >
                <Users className="h-4 w-4" />
                My Network
              </Link>
              <Link
                href={`${basePath}/certifications`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-amber-50 transition-all hover:bg-emerald-600/50"
                onClick={handleLinkClick}
              >
                <Award className="h-4 w-4" />
                Certifications
              </Link>
            </>
          ) : null}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link href={`${basePath}/settings`} onClick={handleLinkClick}>
          <Button variant="outline" className="w-full justify-start bg-emerald-600/20 border-emerald-600/10 text-white hover:bg-emerald-500/30 hover:text-white">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-[240px] hidden border-r bg-gradient-to-b from-emerald-700 to-emerald-800 md:block z-30">
        <div className="flex h-full flex-col gap-2 overflow-hidden">
          {renderNavContent()}
        </div>
      </div>
      {isMobileOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
            onClick={onMobileClose}
            aria-hidden="true"
          />
          
          {/* Sidebar mobile */}
          <div className="fixed inset-y-0 left-0 w-[240px] bg-gradient-to-b from-emerald-700 to-emerald-800 border-r z-50 md:hidden overflow-auto">
            <div className="flex h-full flex-col gap-2 overflow-hidden">
              {renderNavContent()}
            </div>
          </div>
        </>
      )}
    </>
  );
}
