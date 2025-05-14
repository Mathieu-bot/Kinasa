"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, CheckCircle, XCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"

export interface MessageAttachment {
  id: string
  type: string
  name: string
  url: string
}

export interface CounterOffer {
  id: string
  products: {
    id: string
    name: string
    quantity: number
    unit: string
    pricePerUnit: number
    previousPricePerUnit?: number
  }[]
  totalPrice: number
  previousTotalPrice?: number
  notes?: string
}

export interface MessageProps {
  id: string
  content: string
  timestamp: Date
  isCurrentUser: boolean
  senderName: string
  senderAvatar?: string
  attachments?: MessageAttachment[]
  counterOffer?: CounterOffer
  onAcceptOffer?: (offerId: string) => void
  onRejectOffer?: (offerId: string) => void
}

export function MessageItem({
  id,
  content,
  timestamp,
  isCurrentUser,
  senderName,
  senderAvatar,
  attachments,
  counterOffer,
  onAcceptOffer,
  onRejectOffer
}: MessageProps) {
  const [showActions, setShowActions] = useState(false)
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }
  
  // Calculate price change percentage
  const getPriceChangePercentage = (current: number, previous?: number) => {
    if (!previous) return 0
    return ((current - previous) / previous) * 100
  }
  
  // Format the price change with + or - sign
  const formatPriceChange = (current: number, previous?: number) => {
    if (!previous) return "0%"
    const change = getPriceChangePercentage(current, previous)
    const formattedChange = Math.abs(change).toFixed(1)
    return change > 0 
      ? `+${formattedChange}%` 
      : change < 0 
        ? `-${formattedChange}%` 
        : "0%"
  }
  
  // Get color based on price change direction
  const getPriceChangeColor = (current: number, previous?: number) => {
    if (!previous) return "text-gray-500"
    const change = getPriceChangePercentage(current, previous)
    return change > 0 
      ? "text-red-500" 
      : change < 0 
        ? "text-green-500" 
        : "text-gray-500"
  }
  
  return (
    <div 
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div 
        className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} max-w-3/4`}
      >
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">{senderName}</span>
            <span className="text-xs text-muted-foreground">{formatTime(timestamp)}</span>
          </div>
          
          <div 
            className={`rounded-lg py-2 px-3 ${
              isCurrentUser 
                ? 'bg-emerald-600 text-white' 
                : 'bg-muted'
            } ${counterOffer ? 'max-w-md' : ''}`}
          >
            {content}
          </div>
          
          {/* Attached files */}
          {attachments && attachments.length > 0 && (
            <div className="mt-2 flex flex-col gap-2">
              {attachments.map(attachment => (
                <div 
                  key={attachment.id}
                  className="flex items-center gap-2 bg-muted rounded-md p-2"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{attachment.name}</span>
                  <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {/* Counter offer */}
          {counterOffer && (
            <Card className="mt-2 w-full">
              <CardContent className="p-3">
                <div className="mb-2 flex justify-between items-center">
                  <h4 className="text-sm font-medium">Counter Offer</h4>
                  <Badge variant="outline">Quote #{counterOffer.id.substring(0, 8)}</Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  {counterOffer.products.map(product => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <div>
                        {product.name} ({product.quantity} {product.unit})
                      </div>
                      <div className="flex gap-2">
                        {product.previousPricePerUnit && (
                          <span className="line-through text-muted-foreground">
                            ${product.previousPricePerUnit.toFixed(2)}
                          </span>
                        )}
                        <span className="font-medium">${product.pricePerUnit.toFixed(2)}</span>
                        {product.previousPricePerUnit && (
                          <span className={getPriceChangeColor(
                            product.pricePerUnit, 
                            product.previousPricePerUnit
                          )}>
                            {formatPriceChange(product.pricePerUnit, product.previousPricePerUnit)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between border-t pt-2 text-sm font-medium">
                  <span>Total</span>
                  <div className="flex gap-2">
                    {counterOffer.previousTotalPrice && (
                      <span className="line-through text-muted-foreground">
                        ${counterOffer.previousTotalPrice.toFixed(2)}
                      </span>
                    )}
                    <span>${counterOffer.totalPrice.toFixed(2)}</span>
                    {counterOffer.previousTotalPrice && (
                      <span className={getPriceChangeColor(
                        counterOffer.totalPrice, 
                        counterOffer.previousTotalPrice
                      )}>
                        {formatPriceChange(counterOffer.totalPrice, counterOffer.previousTotalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                
                {!isCurrentUser && (
                  <div className="mt-3 flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="gap-1"
                      onClick={() => onRejectOffer?.(counterOffer.id)}
                    >
                      <XCircle className="h-3 w-3" />
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      className="gap-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => onAcceptOffer?.(counterOffer.id)}
                    >
                      <CheckCircle className="h-3 w-3" />
                      Accept
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
