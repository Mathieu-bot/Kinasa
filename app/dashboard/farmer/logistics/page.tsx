"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  CreditCard, 
  Truck, 
  FileText, 
  Package, 
  ChevronRight, 
  Download,
  BarChart,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react"

interface Shipment {
  id: string
  product: string
  quantity: number
  buyer: string
  destination: string
  status: 'preparing' | 'shipped' | 'delivered' | 'pending-approval'
  shippedDate?: string
  deliveryDate?: string
  trackingNumber?: string
}

interface Income {
  id: string
  amount: number
  date: string
  source: string
  status: 'pending' | 'confirmed' | 'paid'
  buyerName: string
  reference: string
  product: string
  quantity: number
}

// Données de démonstration
const DEMO_SHIPMENTS: Shipment[] = [
  {
    id: "SHP-001",
    product: "Premium Arabica Coffee",
    quantity: 500,
    buyer: "EcoCoffee France",
    destination: "Paris, France",
    status: "shipped",
    shippedDate: "May 10, 2025",
    deliveryDate: "May 25, 2025",
    trackingNumber: "KIN-928374-FR"
  },
  {
    id: "SHP-002",
    product: "Robusta Coffee",
    quantity: 300,
    buyer: "Berlin Beans",
    destination: "Berlin, Germany",
    status: "preparing",
  },
  {
    id: "SHP-003",
    product: "Bourbon Vanilla",
    quantity: 50,
    buyer: "Amsterdam Spices",
    destination: "Amsterdam, Netherlands",
    status: "delivered",
    shippedDate: "April 15, 2025",
    deliveryDate: "May 2, 2025",
    trackingNumber: "KIN-736254-NL"
  },
  {
    id: "SHP-004",
    product: "Arabica Coffee",
    quantity: 200,
    buyer: "Milano Coffee",
    destination: "Milan, Italy",
    status: "pending-approval"
  }
];

const DEMO_INCOME: Income[] = [
  {
    id: "PMT-001",
    amount: 5125.00,
    date: "May 12, 2025",
    source: "Direct Payment",
    status: "paid",
    buyerName: "EcoCoffee France",
    reference: "ORD-8372",
    product: "Premium Arabica Coffee",
    quantity: 500
  },
  {
    id: "PMT-002",
    amount: 2850.00,
    date: "May 20, 2025",
    source: "Bank Transfer",
    status: "pending",
    buyerName: "Berlin Beans",
    reference: "ORD-9284",
    product: "Robusta Coffee",
    quantity: 300
  },
  {
    id: "PMT-003",
    amount: 1125.00,
    date: "May 2, 2025",
    source: "Platform Escrow",
    status: "confirmed",
    buyerName: "Amsterdam Spices",
    reference: "ORD-7126",
    product: "Bourbon Vanilla",
    quantity: 50
  }
];

export default function FarmerLogisticsPage() {
  const [activeTab, setActiveTab] = useState("shipments")
  
  // Pour obtenir les statistiques des envois
  const getShipmentStats = () => {
    const total = DEMO_SHIPMENTS.length;
    const preparing = DEMO_SHIPMENTS.filter(s => s.status === 'preparing').length;
    const shipped = DEMO_SHIPMENTS.filter(s => s.status === 'shipped').length;
    const delivered = DEMO_SHIPMENTS.filter(s => s.status === 'delivered').length;
    const pendingApproval = DEMO_SHIPMENTS.filter(s => s.status === 'pending-approval').length;
    
    return { total, preparing, shipped, delivered, pendingApproval };
  }
  
  // Pour obtenir les statistiques des revenus
  const getIncomeStats = () => {
    const total = DEMO_INCOME.reduce((sum, income) => sum + income.amount, 0);
    const pending = DEMO_INCOME.filter(i => i.status === 'pending').reduce((sum, income) => sum + income.amount, 0);
    const confirmed = DEMO_INCOME.filter(i => i.status === 'confirmed').reduce((sum, income) => sum + income.amount, 0);
    const paid = DEMO_INCOME.filter(i => i.status === 'paid').reduce((sum, income) => sum + income.amount, 0);
    
    return { total, pending, confirmed, paid };
  }
  
  const shipmentStats = getShipmentStats();
  const incomeStats = getIncomeStats();
  
  return (
    <div className="space-y-6">
      <div>
        <motion.h1 
          className="text-2xl font-bold text-emerald-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Shipments & Income
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Track your shipments and monitor your income from sales
        </motion.p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Active Shipments</p>
              <Truck className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{shipmentStats.shipped + shipmentStats.preparing}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {shipmentStats.shipped} en route, {shipmentStats.preparing} en préparation
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Pending Approval</p>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{shipmentStats.pendingApproval}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Shipments awaiting buyer approval
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Pending Payments</p>
              <CreditCard className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">€{incomeStats.pending.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Across {DEMO_INCOME.filter(i => i.status === 'pending').length} transactions
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Total Paid (Month)</p>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">€{incomeStats.paid.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12.5% vs last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="shipments" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="shipments" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">Shipments</span>
          </TabsTrigger>
          <TabsTrigger value="income" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Income</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Export Documents</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Onglet Expéditions */}
        <TabsContent value="shipments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-emerald-700">Your Shipments</h2>
            <Button variant="outline" className="gap-2">
              <Truck className="h-4 w-4" />
              New Shipment
            </Button>
          </div>
          
          <div className="grid gap-4">
            {DEMO_SHIPMENTS.map((shipment) => (
              <Card key={shipment.id} className={`border-l-4 ${
                shipment.status === 'delivered' ? 'border-l-green-500' :
                shipment.status === 'shipped' ? 'border-l-blue-500' :
                shipment.status === 'pending-approval' ? 'border-l-amber-500' : 'border-l-emerald-300'
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{shipment.product}</CardTitle>
                      <CardDescription>{shipment.quantity}kg for {shipment.buyer}</CardDescription>
                    </div>
                    <Badge variant={
                      shipment.status === 'delivered' ? 'default' :
                      shipment.status === 'shipped' ? 'secondary' :
                      shipment.status === 'pending-approval' ? 'outline' : 'default'
                    } className={
                      shipment.status === 'pending-approval' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''
                    }>
                      {shipment.status === 'shipped' ? 'Shipped' :
                       shipment.status === 'delivered' ? 'Delivered' :
                       shipment.status === 'pending-approval' ? 'Pending Approval' : 'Preparing'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Destination:</span> {shipment.destination}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Shipment ID:</span> {shipment.id}
                      </div>
                      {shipment.shippedDate && (
                        <div>
                          <span className="text-muted-foreground">Shipped Date:</span> {shipment.shippedDate}
                        </div>
                      )}
                      {shipment.deliveryDate && (
                        <div>
                          <span className="text-muted-foreground">Delivery Date:</span> {shipment.deliveryDate}
                        </div>
                      )}
                      {shipment.trackingNumber && (
                        <div>
                          <span className="text-muted-foreground">Tracking #:</span> {shipment.trackingNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="ml-auto">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Onglet Revenus */}
        <TabsContent value="income" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-emerald-700">Income Summary</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-100">
                <BarChart className="h-4 w-4" />
                Income Report
              </Button>
              <Button variant="outline" className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-100">
                <Calendar className="h-4 w-4" />
                This Month
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4">
            {DEMO_INCOME.map((income) => (
              <Card key={income.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>Payment #{income.id}</CardTitle>
                      <CardDescription>Ref: {income.reference}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">€{income.amount.toFixed(2)}</div>
                      <Badge variant={
                        income.status === 'paid' ? 'default' :
                        income.status === 'confirmed' ? 'secondary' : 'outline'
                      } className={
                        income.status === 'pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''
                      }>
                        {income.status === 'paid' ? 'Paid' :
                         income.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Buyer:</span> {income.buyerName}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span> {income.date}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Product:</span> {income.product} ({income.quantity}kg)
                      </div>
                      <div>
                        <span className="text-muted-foreground">Source:</span> {income.source}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </Button>
                  {income.status === 'confirmed' && (
                    <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="h-4 w-4" />
                      Confirm Received
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
            <h2 className="text-lg font-semibold text-emerald-700">Export Documentation</h2>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              New Document
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Export Documentation Guide</CardTitle>
              <CardDescription>Essential documents needed for exporting your agricultural products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4 bg-emerald-50">
                  <h3 className="text-sm font-medium text-emerald-700 mb-2">Certificate of Origin</h3>
                  <p className="text-sm text-emerald-800 mb-2">Document certifying the place of growth, production or manufacture of goods</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Required for all exports</Badge>
                    <Button variant="outline" size="sm" className="h-8 gap-1 border-emerald-600 text-emerald-600 hover:bg-emerald-100">
                      <Download className="h-3 w-3" />
                      Template
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-emerald-50">
                  <h3 className="text-sm font-medium text-emerald-700 mb-2">Phytosanitary Certificate</h3>
                  <p className="text-sm text-emerald-800 mb-2">Certificate confirming that plants or plant products are free from pests and diseases</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Required for coffee & vanilla</Badge>
                    <Button variant="outline" size="sm" className="h-8 gap-1 border-emerald-600 text-emerald-600 hover:bg-emerald-100">
                      <Download className="h-3 w-3" />
                      Template
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-emerald-50">
                  <h3 className="text-sm font-medium text-emerald-700 mb-2">Fair Trade Certification</h3>
                  <p className="text-sm text-emerald-800 mb-2">Verification that your products meet fair trade standards and practices</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Optional - Premium pricing</Badge>
                    <Button variant="outline" size="sm" className="h-8 gap-1 border-emerald-600 text-emerald-600 hover:bg-emerald-100">
                      <Download className="h-3 w-3" />
                      Application
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-emerald-50">
                  <h3 className="text-sm font-medium text-emerald-700 mb-2">Commercial Invoice</h3>
                  <p className="text-sm text-emerald-800 mb-2">Document containing details of the transaction including goods, quantity, and price</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Required for all shipments</Badge>
                    <Button variant="outline" size="sm" className="h-8 gap-1 border-emerald-600 text-emerald-600 hover:bg-emerald-100">
                      <Download className="h-3 w-3" />
                      Template
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Package className="h-4 w-4" />
                Prepare Documents for Shipping
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
