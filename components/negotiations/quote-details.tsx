"use client"

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Download, 
  FileText, 
  Calendar, 
  DollarSign, 
  BarChart,
  Package,
  MapPin,
  CheckCircle,
} from "lucide-react"
import { formatDate, formatCurrency } from "@/lib/utils"
import { QuoteStatus } from "./quote-card"

export interface QuoteDetailsProps {
  quoteId: string
  title: string
  description: string
  status: QuoteStatus
  products: {
    id: string
    name: string
    quantity: number
    unit: string
    pricePerUnit: number
  }[]
  totalPrice: number
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
  counterParty: {
    id: string
    name: string
    avatar?: string
    location: string
    type: "farmer" | "buyer"
  }
  fairPriceInfo?: {
    id: string
    fairPricePerUnit: number
    percentAboveFairPrice: number
  }[]
  onExportPdf: () => void
}

export function QuoteDetails({
  quoteId,
  title,
  description,
  status,
  products,
  totalPrice,
  createdAt,
  updatedAt,
  expiresAt,
  counterParty,
  fairPriceInfo,
  onExportPdf
}: QuoteDetailsProps) {
  
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="mt-1">
                Quote #{quoteId.substring(0, 8)}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(status)}>
              {getStatusLabel(status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Created: {formatDate(createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Last Updated: {formatDate(updatedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Expires: {formatDate(expiresAt)}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Counterparty</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={counterParty.avatar} alt={counterParty.name} />
                  <AvatarFallback>{counterParty.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{counterParty.name}</p>
                  <p className="text-xs text-muted-foreground">{counterParty.location}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3 mb-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </h3>
            
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="grid grid-cols-12 gap-2 items-center py-2 border-b text-sm last:border-b-0"
              >
                <div className="col-span-5">
                  <p className="font-medium">{product.name}</p>
                </div>
                <div className="col-span-3 text-center">
                  {product.quantity} {product.unit}
                </div>
                <div className="col-span-2 text-right">
                  ${product.pricePerUnit.toFixed(2)}/{product.unit}
                </div>
                <div className="col-span-2 text-right font-medium">
                  ${(product.quantity * product.pricePerUnit).toFixed(2)}
                </div>
                
                {fairPriceInfo && fairPriceInfo[index] && (
                  <div className="col-span-12 flex justify-end items-center gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                    <span className="text-muted-foreground">Fair price: ${fairPriceInfo[index].fairPricePerUnit.toFixed(2)}/{product.unit}</span>
                    <Badge variant="outline" className={
                      fairPriceInfo[index].percentAboveFairPrice > 10 
                        ? "text-red-600 bg-red-50" 
                        : "text-emerald-600 bg-emerald-50"
                    }>
                      {fairPriceInfo[index].percentAboveFairPrice > 0 
                        ? `+${fairPriceInfo[index].percentAboveFairPrice.toFixed(1)}%` 
                        : `${fairPriceInfo[index].percentAboveFairPrice.toFixed(1)}%`}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-muted rounded-lg p-4 flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="text-lg font-semibold">${totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="outline"
            className="gap-2"
            onClick={onExportPdf}
          >
            <Download className="h-4 w-4" />
            Export as PDF
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-md flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm">Price compared to market average</span>
            <Badge className={
              totalPrice > (products.reduce((sum, p) => sum + (p.quantity * (fairPriceInfo?.find(fp => fp.id === p.id)?.fairPricePerUnit || p.pricePerUnit)), 0) * 1.1)
                ? "bg-red-100 text-red-800"
                : "bg-emerald-100 text-emerald-800"
            }>
              {totalPrice > (products.reduce((sum, p) => sum + (p.quantity * (fairPriceInfo?.find(fp => fp.id === p.id)?.fairPricePerUnit || p.pricePerUnit)), 0) * 1.1)
                ? "Above Market"
                : "Fair Price"
              }
            </Badge>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm">Recent price trend (30 days)</span>
            <Badge className="bg-blue-100 text-blue-800">
              +2.5% Increase
            </Badge>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm">Seasonal price predictability</span>
            <Badge className="bg-emerald-100 text-emerald-800">
              High
            </Badge>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Long-term contract benefit</span>
            <Badge className="bg-emerald-100 text-emerald-800">
              Recommended
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
