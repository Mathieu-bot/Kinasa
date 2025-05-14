"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  CreditCard, 
  Truck, 
  FileText, 
  Package, 
  ChevronRight, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  MapPin,
  Calendar,
  ExternalLink,
  Download
} from "lucide-react"

// Types des données
interface Shipment {
  id: string
  origin: string
  destination: string
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed'
  eta: string
  lastUpdate: string
  trackingNumber: string
  carrier: string
  progress: number
}

interface Invoice {
  id: string
  amount: number
  date: string
  dueDate: string
  status: 'paid' | 'pending' | 'overdue'
  reference: string
  items: {
    description: string
    quantity: number
    unitPrice: number
  }[]
}

// Données de démonstration
const DEMO_SHIPMENTS: Shipment[] = [
  {
    id: "SHP-001",
    origin: "Antananarivo, Madagascar",
    destination: "Paris, France",
    status: "in-transit",
    eta: "May 20, 2025",
    lastUpdate: "May 14, 2025",
    trackingNumber: "KIN-928374-FR",
    carrier: "Oceanic Freight",
    progress: 65
  },
  {
    id: "SHP-002",
    origin: "Toamasina, Madagascar",
    destination: "Berlin, Germany",
    status: "pending",
    eta: "June 05, 2025",
    lastUpdate: "May 13, 2025",
    trackingNumber: "KIN-837465-DE",
    carrier: "Global Express",
    progress: 15
  },
  {
    id: "SHP-003",
    origin: "Fianarantsoa, Madagascar",
    destination: "Amsterdam, Netherlands",
    status: "delivered",
    eta: "May 10, 2025",
    lastUpdate: "May 10, 2025",
    trackingNumber: "KIN-736254-NL",
    carrier: "Fast Transit",
    progress: 100
  }
];

const DEMO_INVOICES: Invoice[] = [
  {
    id: "INV-001",
    amount: 5290.75,
    date: "May 1, 2025",
    dueDate: "May 30, 2025",
    status: "pending",
    reference: "PO-8372",
    items: [
      { description: "Premium Arabica Coffee - 500kg", quantity: 500, unitPrice: 10.25 },
      { description: "Freight charges", quantity: 1, unitPrice: 250 },
      { description: "Export documentation", quantity: 1, unitPrice: 65.75 }
    ]
  },
  {
    id: "INV-002",
    amount: 3150.25,
    date: "April 15, 2025",
    dueDate: "May 15, 2025",
    status: "paid",
    reference: "PO-7236",
    items: [
      { description: "Robusta Coffee - 300kg", quantity: 300, unitPrice: 9.50 },
      { description: "Shipping insurance", quantity: 1, unitPrice: 120 },
      { description: "Fair trade certification", quantity: 1, unitPrice: 80.25 }
    ]
  }
];

export default function LogisticsPage() {
  const [activeTab, setActiveTab] = useState("shipping")
  
  // État pour simuler le chargement des données
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <div className="space-y-6">
      <div>
        <motion.h1 
          className="text-2xl font-bold text-emerald-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Payments & Logistics
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Manage your shipments, payments, and documentation
        </motion.p>
      </div>
      
      <Tabs defaultValue="shipping" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">Shipping</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Partners</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Onglet Expédition */}
        <TabsContent value="shipping" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-emerald-700">Shipment Tracking</h2>
            <Button variant="outline" className="gap-2">
              <Truck className="h-4 w-4" />
              New Shipment
            </Button>
          </div>
          
          <div className="grid gap-4">
            {DEMO_SHIPMENTS.map((shipment) => (
              <Card key={shipment.id} className={`border-l-4 ${
                shipment.status === 'delivered' ? 'border-l-green-500' :
                shipment.status === 'in-transit' ? 'border-l-blue-500' :
                shipment.status === 'delayed' ? 'border-l-red-500' : 'border-l-yellow-500'
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{shipment.origin} to {shipment.destination}</CardTitle>
                      <CardDescription>Tracking #: {shipment.trackingNumber}</CardDescription>
                    </div>
                    <Badge variant={
                      shipment.status === 'delivered' ? 'default' :
                      shipment.status === 'in-transit' ? 'secondary' :
                      shipment.status === 'delayed' ? 'destructive' : 'outline'
                    }>
                      {shipment.status === 'in-transit' ? 'In Transit' :
                       shipment.status === 'delivered' ? 'Delivered' :
                       shipment.status === 'delayed' ? 'Delayed' : 'Pending'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Shipment Progress</div>
                      <Progress value={shipment.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Carrier:</span> {shipment.carrier}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Update:</span> {shipment.lastUpdate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">ETA:</span> {shipment.eta}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Shipment ID:</span> {shipment.id}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="ml-auto">
                    Track Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Onglet Paiements */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-emerald-700">Invoice Management</h2>
            <Button variant="outline" className="gap-2">
              <CreditCard className="h-4 w-4" />
              New Payment
            </Button>
          </div>
          
          <div className="grid gap-4">
            {DEMO_INVOICES.map((invoice) => (
              <Card key={invoice.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>Invoice #{invoice.id}</CardTitle>
                      <CardDescription>Ref: {invoice.reference}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">€{invoice.amount.toFixed(2)}</div>
                      <Badge variant={
                        invoice.status === 'paid' ? 'default' :
                        invoice.status === 'pending' ? 'outline' : 'destructive'
                      }>
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Issue Date:</span> {invoice.date}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due Date:</span> {invoice.dueDate}
                      </div>
                    </div>
                    
                    <div className="border rounded-md mt-4">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-xs text-left text-gray-500">Description</th>
                            <th className="px-4 py-2 text-xs text-right text-gray-500">Qty</th>
                            <th className="px-4 py-2 text-xs text-right text-gray-500">Unit Price</th>
                            <th className="px-4 py-2 text-xs text-right text-gray-500">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {invoice.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm">{item.description}</td>
                              <td className="px-4 py-2 text-sm text-right">{item.quantity}</td>
                              <td className="px-4 py-2 text-sm text-right">€{item.unitPrice.toFixed(2)}</td>
                              <td className="px-4 py-2 text-sm text-right font-medium">
                                €{(item.quantity * item.unitPrice).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  {invoice.status === 'pending' && (
                    <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                      <CreditCard className="h-4 w-4" />
                      Pay Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Onglet Documents */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-emerald-700">Export/Import Documentation</h2>
            <Button variant="outline" className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-100">
              <FileText className="h-4 w-4" />
              Download Invoice PDF
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Required Documentation</CardTitle>
              <CardDescription>Ensure all required documents are prepared for smooth customs clearance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Checkbox id="certificate-origin" checked={true} />
                    <Label htmlFor="certificate-origin" className="text-base">Certificate of Origin</Label>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    Template
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Checkbox id="phytosanitary" checked={true} />
                    <Label htmlFor="phytosanitary" className="text-base">Phytosanitary Certificate</Label>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    Template
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Checkbox id="commercial-invoice" checked={true} />
                    <Label htmlFor="commercial-invoice" className="text-base">Commercial Invoice</Label>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    Template
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Checkbox id="packing-list" />
                    <Label htmlFor="packing-list" className="text-base">Packing List</Label>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    Template
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Checkbox id="bill-lading" />
                    <Label htmlFor="bill-lading" className="text-base">Bill of Lading</Label>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    Template
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Generate Documentation Package</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Onglet Partenaires */}
        <TabsContent value="partners" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-emerald-700">Logistics Partners</h2>
            <Button variant="outline" className="gap-2">
              <Package className="h-4 w-4" />
              Find Partners
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                  Oceanic Freight
                </CardTitle>
                <CardDescription>International shipping partner</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Coverage: Africa, Europe, Asia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Transit Time: 14-21 days</span>
                  </div>
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Small Batch Specialist</Badge>
                    <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Temperature Controlled</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="gap-1 w-full">
                  <ExternalLink className="h-4 w-4" />
                  Request Quote
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                  Global Express
                </CardTitle>
                <CardDescription>Express courier services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Coverage: Worldwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Transit Time: 3-7 days</span>
                  </div>
                  <div className="mt-2">
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Sample Shipping</Badge>
                    <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">Door-to-Door</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="gap-1 w-full">
                  <ExternalLink className="h-4 w-4" />
                  Request Quote
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Need Help with Logistics?</CardTitle>
              <CardDescription>Our team can help you find the right logistics partner for your specific needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="shipment-type">Shipment Type</Label>
                  <Select defaultValue="bulk">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bulk">Bulk (500kg+)</SelectItem>
                      <SelectItem value="small">Small Batch (50-500kg)</SelectItem>
                      <SelectItem value="samples">Samples (under 50kg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" placeholder="Country/City of origin" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" placeholder="Country/City of destination" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Find Logistics Solutions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
