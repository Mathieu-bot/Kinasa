"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Printer, Download, Send, Clock, Check, MessageSquare, MoreHorizontal, Calendar, Coffee } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency, formatDate } from "@/lib/utils"

export type QuoteStatus = 
  | "draft" 
  | "sent" 
  | "under_negotiation"
  | "accepted"
  | "rejected"
  | "expired"

export interface QuoteData {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
  status: QuoteStatus
  products: {
    id: string
    name: string
    quantity: number
    unit: string
    pricePerUnit: number
  }[]
  totalPrice: number
  counterParty: {
    id: string
    name: string
    avatar?: string
    location: string
  }
  messages: number
}

interface QuoteCardProps {
  quote: QuoteData
  isBuyer: boolean
  onViewDetails: (quoteId: string) => void
  onReply: (quoteId: string) => void
}

export function QuoteCard({ quote, isBuyer, onViewDetails, onReply }: QuoteCardProps) {
  const getStatusColor = (status: QuoteStatus): string => {
    switch (status) {
      case "draft": return "bg-gray-200 text-gray-800"
      case "sent": return "bg-blue-100 text-blue-800"
      case "under_negotiation": return "bg-amber-100 text-amber-800"
      case "accepted": return "bg-emerald-100 text-emerald-800"
      case "rejected": return "bg-red-100 text-red-800"
      case "expired": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: QuoteStatus): string => {
    switch (status) {
      case "draft": return "Draft"
      case "sent": return "Sent"
      case "under_negotiation": return "Under Negotiation"
      case "accepted": return "Accepted"
      case "rejected": return "Rejected"
      case "expired": return "Expired"
      default: return status
    }
  }

  const getStatusIcon = (status: QuoteStatus) => {
    switch (status) {
      case "draft": return <Clock className="h-3 w-3" />
      case "sent": return <Send className="h-3 w-3" />
      case "under_negotiation": return <MessageSquare className="h-3 w-3" />
      case "accepted": return <Check className="h-3 w-3" />
      case "rejected": return <Clock className="h-3 w-3" />
      case "expired": return <Clock className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex gap-2 items-center text-lg">
              <Coffee className="h-5 w-5 text-emerald-600" />
              {quote.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {quote.products.length} products · Total {formatCurrency(quote.totalPrice)}
            </CardDescription>
          </div>
          <Badge 
            className={`flex gap-1 items-center ${getStatusColor(quote.status)}`}
          >
            {getStatusIcon(quote.status)}
            {getStatusLabel(quote.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={quote.counterParty.avatar} alt={quote.counterParty.name} />
              <AvatarFallback>{quote.counterParty.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{quote.counterParty.name}</p>
              <p className="text-xs text-muted-foreground">{quote.counterParty.location}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Expires: {formatDate(quote.expiresAt)}</span>
            </div>
            {quote.messages > 0 && (
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{quote.messages} message{quote.messages > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center border-t">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onViewDetails(quote.id)}
        >
          View Details
        </Button>
        <div className="flex items-center gap-2">
          {quote.status !== "draft" && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onReply(quote.id)}
              className="gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              {isBuyer ? "Negotiate" : "Reply"}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                <span>Print</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Export PDF</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  )
}
