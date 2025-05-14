"use client"

import { useEffect, useState } from "react"
import { MessageInterface, Contact } from "@/components/dashboard/message-interface"

export default function MessagesPage() {
  const [userType, setUserType] = useState<'buyer' | 'farmer'>('buyer')
  
  useEffect(() => {
    const pathname = window.location.pathname
    if (pathname.includes('/buyer')) {
      setUserType('buyer')
    } else {
      setUserType('farmer') 
    }
  }, [])

  const buyerContacts: Contact[] = [
    {
      id: "farmer1",
      name: "Coffee Altura",
      avatar: "/images/avatars/farmer1.jpg",
      lastSeen: "2h ago",
      role: "farmer",
      company: "Antananarivo Highlands Co-op",
      online: true,
      unreadCount: 2,
      lastMessage: "That sounds perfect! What quantity..."
    },
    {
      id: "farmer2",
      name: "Madagreen Farms",
      avatar: "/images/avatars/farmer2.jpg",
      lastSeen: "Yesterday",
      role: "farmer",
      company: "Tamatave Coastal Farms",
      online: false,
      lastMessage: "Thank you for your last order"
    },
    {
      id: "farmer3",
      name: "Highland Harvests",
      avatar: "/images/avatars/farmer3.jpg",
      lastSeen: "3d ago",
      role: "farmer",
      company: "Fianarantsoa Mountain Co-op",
      online: false
    }
  ]
  
  const farmerContacts: Contact[] = [
    {
      id: "buyer1",
      name: "Bean Adventures",
      avatar: "/images/avatars/buyer1.jpg",
      lastSeen: "Just now",
      role: "buyer",
      company: "Nordic Coffee Imports",
      online: true,
      unreadCount: 3,
      lastMessage: "Excellent. Could you send me a sample..."
    },
    {
      id: "buyer2",
      name: "Café Artisan",
      avatar: "/images/avatars/buyer2.jpg",
      lastSeen: "30m ago",
      role: "buyer",
      company: "French Specialty Roasters",
      online: true,
      lastMessage: "We're interested in your latest batch"
    },
    {
      id: "buyer3",
      name: "Boutique Brews",
      avatar: "/images/avatars/buyer3.jpg",
      lastSeen: "2d ago",
      role: "buyer",
      company: "UK Coffee Chain",
      online: false
    }
  ]

  const contacts = userType === 'buyer' ? buyerContacts : farmerContacts

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-emerald-800">Messages</h1>
      <p className="text-muted-foreground">Connect with your {userType === 'buyer' ? 'farmers' : 'buyers'} through secure messaging</p>
      
      <MessageInterface contacts={contacts} userType={userType} />
    </div>
  )
}
