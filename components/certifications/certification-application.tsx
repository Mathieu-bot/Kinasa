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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FileCheck, 
  Upload, 
  Calendar, 
  Plus, 
  Search,
  Leaf,
  Award 
} from "lucide-react"

export function CertificationApplication() {
  const [certificationType, setCertificationType] = useState("")
  const [farmSize, setFarmSize] = useState("")
  
  return (
    <Card className="overflow-hidden shadow-lg border border-amber-300 hover:border-amber-500 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-emerald-500/5 to-amber-500/5 opacity-70 mix-blend-soft-light"></div>
      
      <CardHeader className="border-b border-amber-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-amber-700">
              Apply for New Certification
            </CardTitle>
            <CardDescription>
              Get recognized for your sustainable farming practices
            </CardDescription>
          </div>
          <Award className="h-10 w-10 text-amber-500" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="certification-type" className="text-sm font-medium">
            Certification Type
          </label>
          <Select value={certificationType} onValueChange={setCertificationType}>
            <SelectTrigger id="certification-type" className="w-full">
              <SelectValue placeholder="Select certification type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="organic">Organic Certification</SelectItem>
              <SelectItem value="fair-trade">Fair Trade Certification</SelectItem>
              <SelectItem value="rainforest">Rainforest Alliance</SelectItem>
              <SelectItem value="utz">UTZ Certified</SelectItem>
              <SelectItem value="shade-grown">Shade Grown Coffee</SelectItem>
              <SelectItem value="bird-friendly">Bird Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="farm-size" className="text-sm font-medium">
            Farm Size
          </label>
          <Select value={farmSize} onValueChange={setFarmSize}>
            <SelectTrigger id="farm-size" className="w-full">
              <SelectValue placeholder="Select farm size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (&lt; 3 hectares)</SelectItem>
              <SelectItem value="medium">Medium (3-10 hectares)</SelectItem>
              <SelectItem value="large">Large (&gt; 10 hectares)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="cultivation-methods" className="text-sm font-medium">
            Primary Cultivation Methods
          </label>
          <Textarea 
            id="cultivation-methods" 
            placeholder="Describe your primary cultivation methods and practices..."
            className="min-h-[80px] resize-none"
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Upload Farm Documentation
          </label>
          <div className="border-2 border-dashed border-emerald-200 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors cursor-pointer bg-emerald-50/40">
            <Upload className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
            <p className="text-sm font-medium text-emerald-700">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              Supported formats: PDF, JPG, PNG (max 5MB)
            </p>
          </div>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Timeline Expectations</h4>
              <p className="text-sm text-amber-700 mt-1">
                The certification process typically takes 2-3 months from application to approval, depending on your location and certification type.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-amber-100 pt-4 flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto sm:flex-1 bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300 hover:border-emerald-500"
        >
          <Search className="mr-2 h-4 w-4" />
          Check Eligibility
        </Button>
        <Button 
          className="w-full sm:w-auto sm:flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Submit Application
        </Button>
      </CardFooter>
    </Card>
  )
}
