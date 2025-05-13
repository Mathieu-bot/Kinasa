"use client"

import { Bell, ChevronDown, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  // To ensure compatibility between old and new implementations
  const titleValue = title || (userType === "buyer" ? "Buyer Dashboard" : "Farmer Dashboard")
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
        <h1 className="text-lg font-semibold text-emerald-800">{titleValue}</h1>
      </div>
      <div className="flex items-center gap-2">
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
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
