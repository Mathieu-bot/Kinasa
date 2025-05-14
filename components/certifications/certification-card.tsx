"use client"

import { Award, Clock, Check, Info, Calendar, Star, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger, 
} from "@/components/ui/tooltip"
import Image from "next/image"

interface CertificationCardProps {
  id: string
  name: string
  logo: string
  color: string
  bgColor: string
  issuedDate: string
  expiryDate: string
  status: "active" | "pending" | "expiring" | "expired"
  level: string
  progress: number
  benefits: string[]
  onRenew?: () => void
  onView?: () => void
}

export function CertificationCard({
  id,
  name,
  logo,
  color,
  bgColor,
  issuedDate,
  expiryDate,
  status,
  level,
  progress,
  benefits,
  onRenew,
  onView,
}: CertificationCardProps) {
  
  const getStatusInfo = () => {
    switch(status) {
      case "active":
        return { 
          icon: <Check className="h-4 w-4" />, 
          label: "Active", 
          color: "bg-green-500 text-white"
        }
      case "pending":
        return { 
          icon: <Clock className="h-4 w-4" />, 
          label: "Pending", 
          color: "bg-amber-500 text-white" 
        }
      case "expiring":
        return { 
          icon: <Calendar className="h-4 w-4" />, 
          label: "Expiring Soon", 
          color: "bg-orange-500 text-white" 
        }
      case "expired":
        return { 
          icon: <Info className="h-4 w-4" />, 
          label: "Expired", 
          color: "bg-red-500 text-white" 
        }
      default:
        return { 
          icon: <Info className="h-4 w-4" />, 
          label: "Unknown", 
          color: "bg-gray-500 text-white" 
        }
    }
  }

  const statusInfo = getStatusInfo()
  const borderColor = `border-${color}-300`
  const hoverBorderColor = `hover:border-${color}-600`
  
  return (
    <Card className={`overflow-hidden shadow-md transition-all duration-300 border ${borderColor} ${hoverBorderColor} hover:shadow-xl relative`}>
      <div className={`absolute inset-0 ${bgColor} opacity-10 mix-blend-soft-light`}></div>
      
      <div className="absolute top-0 right-0 m-3">
        <Badge className={`${statusInfo.color} font-medium flex gap-1 items-center`}>
          {statusInfo.icon}
          {statusInfo.label}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
            <Image
              src={logo}
              alt={name}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="text-sm mt-1 flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500" />
              {level}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground font-medium mb-1">Issued Date</p>
            <p className="font-semibold">{issuedDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-medium mb-1">Expiry Date</p>
            <p className="font-semibold">{expiryDate}</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Renewal Status</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-100">
            <div 
              className={`h-2.5 rounded-full bg-${color}-500`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Key Benefits</h4>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <Shield className={`h-4 w-4 mt-0.5 text-${color}-600`} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="gap-3 pt-2">
        <Button 
          variant="outline" 
          onClick={onView} 
          className="flex-1 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white border-none shadow-sm hover:shadow-md"
        >
          View Details
        </Button>
        {status === "expiring" || status === "expired" ? (
          <Button 
            onClick={onRenew} 
            className={`flex-1 bg-gradient-to-r from-${color}-500 to-${color}-600 hover:from-${color}-600 hover:to-${color}-700 text-white border-none shadow-sm hover:shadow-md`}
          >
            Renew Now
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
