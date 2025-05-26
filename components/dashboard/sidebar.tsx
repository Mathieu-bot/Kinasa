"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, Package, Settings, ShoppingCart, BarChart3, Users, Award, X, DollarSign } from "lucide-react"
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
  const pathname = usePathname()
  
  // Check if a navigation link is active
  const isActive = (path: string) => {
    if (path === basePath && pathname === basePath) {
      return true
    }
    if (path !== basePath && pathname?.startsWith(path)) {
      return true
    }
    return false
  }

  // Close sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onMobileClose();
    }
  };

  const renderNavContent = () => (
    <>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.svg" alt="Kinasa Logo" width={28} height={28} className="text-amber-300" />
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
            className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-all ${isActive(basePath) ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
            onClick={handleLinkClick}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/messages"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/messages') ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
            onClick={handleLinkClick}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">3</Badge>
          </Link>
          <Link
            href={isFramer ? `${basePath}/products` : `/dashboard/market`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${(isFramer ? isActive(`${basePath}/products`) : isActive('/dashboard/market')) ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
            onClick={handleLinkClick}
          >
            <Package className="h-4 w-4" />
            {isFramer ? "Products" : "Market"}
          </Link>
          <Link
            href={`${basePath}/orders`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive(`${basePath}/orders`) ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
            onClick={handleLinkClick}
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
          </Link>
          <Link
            href={`${basePath}/analytics`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive(`${basePath}/analytics`) ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
            onClick={handleLinkClick}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Link>
          <Link
            href="/dashboard/fair-pricing"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/fair-pricing') ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
            onClick={handleLinkClick}
          >
            <DollarSign className="h-4 w-4" />
            Fair Pricing
          </Link>
          <Link
            href={isFramer ? `/dashboard/farmer/logistics` : `/dashboard/logistics`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/logistics') || isActive('/dashboard/farmer/logistics') ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
            onClick={handleLinkClick}
          >
            <Package className="h-4 w-4" />
            {isFramer ? "Shipments & Income" : "Payments & Logistics"}
          </Link>
          <Link
            href={isFramer ? `/dashboard/farmer/negotiations` : `/dashboard/negotiations`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard/negotiations') || isActive('/dashboard/farmer/negotiations') ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
            onClick={handleLinkClick}
          >
            <MessageSquare className="h-4 w-4" />
            {isFramer ? "Price Negotiations" : "Quotes & Negotiations"}
          </Link>
          {isFramer ? (
            <>
              <Link
                href={`${basePath}/network`}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive(`${basePath}/network`) ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
                onClick={handleLinkClick}
              >
                <Users className="h-4 w-4" />
                My Network
              </Link>
              <Link
                href={`${basePath}/certifications`}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive(`${basePath}/certifications`) ? 'bg-emerald-600 text-white' : 'text-amber-50 hover:bg-emerald-600/50'}`}
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
          <Button 
            variant="outline" 
            className={`w-full justify-start ${isActive(`${basePath}/settings`) ? 'bg-emerald-600/40 border-emerald-600/30' : 'bg-emerald-600/20 border-emerald-600/10'} text-white hover:bg-emerald-500/30 hover:text-white`}
          >
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
          
          {/* Mobile sidebar */}
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
