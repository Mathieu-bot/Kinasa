 "use client"

import { usePathname } from "next/navigation"
import { Bell, ChevronDown, User, Settings, MessageSquare, Package, ShoppingCart, BarChart3, Users, Award, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GlobalSearch } from "@/components/search/global-search"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  title?: string
  avatarFallback?: string
  userName?: string
  userRole?: string
  userType?: string
  onMenuToggle?: () => void
  onMenuClick?: () => void
}

export function DashboardHeader({ 
  title, 
  avatarFallback, 
  userName, 
  userRole,
  userType,
  onMenuToggle,
  onMenuClick
}: HeaderProps) {
  const pathname = usePathname()
  
  // Detect user type from the current path
  const detectedUserType = pathname?.includes('/farmer') ? 'farmer' : 'buyer'
  const finalUserType = userType || detectedUserType
  
  const getPageTitle = () => {
    if (title) return title
    
    if (pathname === `/dashboard/${finalUserType}`) {
      return finalUserType === 'buyer' ? 'Buyer Dashboard' : 'Farmer Dashboard'
    }
    
    if (pathname?.includes('/messages')) return 'Messages'
    if (pathname?.includes('/products')) return finalUserType === 'buyer' ? 'Market' : 'Products'
    if (pathname?.includes('/orders')) return 'Orders'
    if (pathname?.includes('/analytics')) return 'Analytics'
    if (pathname?.includes('/network')) return 'My Network'
    if (pathname?.includes('/certifications')) return 'Certifications'
    if (pathname?.includes('/settings')) return 'Settings'
    
    // Default fallback
    return finalUserType === 'buyer' ? 'Buyer Dashboard' : 'Farmer Dashboard'
  }
  
  // Get the icon for the current page
  const getPageIcon = () => {
    if (pathname === `/dashboard/${finalUserType}`) return Home
    if (pathname?.includes('/messages')) return MessageSquare
    if (pathname?.includes('/products')) return Package
    if (pathname?.includes('/orders')) return ShoppingCart
    if (pathname?.includes('/analytics')) return BarChart3
    if (pathname?.includes('/network')) return Users
    if (pathname?.includes('/certifications')) return Award
    if (pathname?.includes('/logistics')) return Package
    if (pathname?.includes('/settings')) return Settings
    return Home
  }
  
  const PageIcon = getPageIcon()
  const titleValue = getPageTitle()
  const userNameValue = userName || "User"
  const userInitials = avatarFallback || userNameValue.substring(0, 2).toUpperCase()
  const handleMenuToggle = onMenuToggle || onMenuClick || (() => {})
  const MenuIcon = () => (
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
      className="h-5 w-5"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[240px] flex h-14 items-center gap-4 border-b bg-gradient-to-r from-amber-50 to-amber-100 shadow-md px-4 lg:px-6 z-10">
      <Button variant="outline" size="icon" className="md:hidden bg-amber-100 border-amber-200 hover:bg-amber-200" onClick={handleMenuToggle}>
        <MenuIcon />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="w-full flex-1">
        <div className="flex items-center gap-2">
          <PageIcon className="h-5 w-5 text-emerald-600" />
          <h1 className="text-lg font-semibold text-emerald-800">{titleValue}</h1>
        </div>
        {pathname?.includes('/messages') && (
          <p className="text-xs text-muted-foreground ml-7">Connect with your {finalUserType === 'buyer' ? 'suppliers' : 'customers'}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <GlobalSearch />
        <Button variant="outline" size="icon" className="bg-amber-100 border-amber-200 hover:bg-amber-200">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 bg-amber-100 border-amber-200 hover:bg-amber-200">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-flex">{userNameValue}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userNameValue}</p>
                <p className="text-xs leading-none text-muted-foreground">{userRole || (userType === "buyer" ? "Buyer" : "Farmer")}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={finalUserType === 'farmer' ? '/farmer-profil' : '/dashboard/profile'}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={`/dashboard/${finalUserType}/settings`}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/api/auth/signout">
                Logout
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
