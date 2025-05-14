"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

interface DashboardLayoutProps {
  children: React.ReactNode
  params?: {
    type?: string
  }
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const userType = pathname.includes('/buyer') ? 'buyer' : 'farmer';
  const avatarFallback = userType === 'buyer' ? 'BA' : 'CA';
  const userName = userType === 'buyer' ? 'Bean Adventures' : 'Coffee Altura';
  const title = userType === 'buyer' ? 'Buyer Dashboard' : 'Farmer Dashboard';
  
  return (
    <div className="min-h-screen w-full">
      {/* Sidebar with mobile props */}
      <DashboardSidebar 
        type={userType} 
        isMobileOpen={sidebarOpen} 
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-col md:ml-[240px]">
        <DashboardHeader 
          title={title} 
          avatarFallback={avatarFallback} 
          userName={userName} 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-br from-amber-50/50 to-emerald-50/50">
          {children}
        </main>
      </div>
    </div>
  )
}
