"use client"

import { useState } from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificationCard } from "@/components/certifications/certification-card"
import { CertificationApplication } from "@/components/certifications/certification-application"
import { CertificationTable } from "@/components/certifications/certification-table"
import { Award, BadgePlus, FileText, BarChart, AlertCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Sample certification data
const CERTIFICATION_DATA = [
  {
    id: "fair-trade",
    name: "Fair Trade Certified",
    logo: "/images/certificates/fair-trade.svg",
    color: "emerald",
    bgColor: "bg-gradient-to-br from-emerald-500 to-green-500",
    issuedDate: "June 15, 2022",
    expiryDate: "June 15, 2025",
    status: "active" as const,
    level: "Gold Level Certification",
    progress: 80,
    benefits: [
      "Premium pricing for your coffee beans",
      "Direct market access to international buyers",
      "Community development funds",
      "Sustainable farming training"
    ]
  },
  {
    id: "organic",
    name: "Organic Certification",
    logo: "/images/certificates/organic.svg",
    color: "green",
    bgColor: "bg-gradient-to-br from-green-500 to-emerald-500",
    issuedDate: "March 21, 2023",
    expiryDate: "March 21, 2026",
    status: "active" as const,
    level: "100% Organic Producer",
    progress: 75,
    benefits: [
      "Higher market value for your products",
      "Environmental sustainability credentials",
      "Healthier soil and ecosystem",
      "Access to specialty organic markets"
    ]
  },
  {
    id: "rainforest",
    name: "Rainforest Alliance",
    logo: "/images/certificates/rainforest.svg",
    color: "teal",
    bgColor: "bg-gradient-to-br from-teal-500 to-green-500",
    issuedDate: "September 10, 2022",
    expiryDate: "September 10, 2024",
    status: "expiring" as const,
    level: "Certified Farm",
    progress: 40,
    benefits: [
      "Biodiversity conservation recognition",
      "Improved ecosystem management",
      "Better worker conditions and rights",
      "Conservation of water resources"
    ]
  },
  {
    id: "utz",
    name: "UTZ Certified",
    logo: "/images/certificates/utz.svg",
    color: "amber",
    bgColor: "bg-gradient-to-br from-amber-500 to-yellow-500",
    issuedDate: "January 5, 2024",
    expiryDate: "January 5, 2027",
    status: "active" as const,
    level: "Premium Producer",
    progress: 92,
    benefits: [
      "Good agricultural practices training",
      "Improved farm management",
      "Supply chain transparency",
      "Access to global coffee markets"
    ]
  }
];

// Table certificates data
const TABLE_CERTIFICATION_DATA = [
  {
    id: "fair-trade-cert",
    name: "Fair Trade Certificate",
    authority: "Fair Trade International",
    issueDate: "June 15, 2022",
    expiryDate: "June 15, 2025",
    status: "active" as const,
    documentUrl: "/documents/fair-trade-certificate.pdf"
  },
  {
    id: "organic-cert",
    name: "Organic Certification",
    authority: "ECOCERT",
    issueDate: "March 21, 2023",
    expiryDate: "March 21, 2026",
    status: "active" as const,
    documentUrl: "/documents/organic-certificate.pdf"
  },
  {
    id: "rainforest-cert",
    name: "Rainforest Alliance Certificate",
    authority: "Rainforest Alliance",
    issueDate: "September 10, 2022",
    expiryDate: "September 10, 2024",
    status: "expiring" as const,
    documentUrl: "/documents/rainforest-certificate.pdf"
  },
  {
    id: "utz-cert",
    name: "UTZ Certificate",
    authority: "UTZ Certified",
    issueDate: "January 5, 2024",
    expiryDate: "January 5, 2027",
    status: "active" as const,
    documentUrl: "/documents/utz-certificate.pdf"
  },
  {
    id: "bird-friendly-app",
    name: "Bird Friendly Certification",
    authority: "Smithsonian Institution",
    issueDate: "-",
    expiryDate: "-",
    status: "pending" as const,
    documentUrl: "/documents/bird-friendly-application.pdf"
  }
];

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  const handleViewDetails = (id: string) => {
    console.log("View details for certification:", id)
    // Navigate to a detailed view or open a modal
  }
  
  const handleRenew = (id: string) => {
    console.log("Renew certification:", id)
    // Open a renewal form or process
  }
  
  const upcomingRenewals = CERTIFICATION_DATA.filter(cert => cert.status === "expiring").length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
          <p className="text-muted-foreground">Manage your farm's certifications and applications</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
        >
          <BadgePlus className="mr-2 h-4 w-4" />
          Apply for New Certification
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Active Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">
              {CERTIFICATION_DATA.filter(cert => cert.status === "active").length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">
              1
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Upcoming Renewals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {upcomingRenewals}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Price Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              +24%
            </div>
          </CardContent>
        </Card>
      </div>
      
      {upcomingRenewals > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3 items-center">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <div>
            <h3 className="font-medium text-orange-700">Certification Renewal Required</h3>
            <p className="text-sm text-orange-600 mt-1">
              Your Rainforest Alliance certification will expire in 4 months. Start the renewal process now to ensure continuous certification.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="ml-auto flex-shrink-0 bg-white text-orange-700 border-orange-300 hover:bg-orange-100 hover:text-orange-800 hover:border-orange-400"
          >
            Start Renewal
          </Button>
        </div>
      )}
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-emerald-50/80 border border-emerald-100">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="apply" 
            className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
          >
            New Application
          </TabsTrigger>
          <TabsTrigger 
            value="benefits" 
            className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
          >
            Market Benefits
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {CERTIFICATION_DATA.map(cert => (
              <CertificationCard
                key={cert.id}
                id={cert.id}
                name={cert.name}
                logo={cert.logo}
                color={cert.color}
                bgColor={cert.bgColor}
                issuedDate={cert.issuedDate}
                expiryDate={cert.expiryDate}
                status={cert.status}
                level={cert.level}
                progress={cert.progress}
                benefits={cert.benefits}
                onView={() => handleViewDetails(cert.id)}
                onRenew={() => handleRenew(cert.id)}
              />
            ))}
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="h-5 w-5 text-emerald-700" />
              <h3 className="font-medium text-lg">Certification Impact on Pricing</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-6 pb-2">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Standard Market Price</span>
                  <span className="font-medium">€3.60/kg</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 relative overflow-hidden">
                  <div className="h-full w-full bg-slate-400 absolute"></div>
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600">Fair Trade Premium</span>
                  <span className="font-medium">+€0.40/kg</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 relative overflow-hidden">
                  <div className="h-full w-[111%] bg-emerald-400 absolute"></div>
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Organic Premium</span>
                  <span className="font-medium">+€0.60/kg</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 relative overflow-hidden">
                  <div className="h-full w-[117%] bg-green-400 absolute"></div>
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Multiple Certifications</span>
                  <span className="font-medium">+€0.87/kg</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 relative overflow-hidden">
                  <div className="h-full w-[124%] bg-amber-400 absolute"></div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certification Documents</CardTitle>
              <CardDescription>
                View and manage all your official certification documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationTable 
                certificates={TABLE_CERTIFICATION_DATA}
                onViewDetails={handleViewDetails}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apply">
          <CertificationApplication />
        </TabsContent>
        
        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Benefits of Certifications</CardTitle>
              <CardDescription>
                How certifications increase your market access and value
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                <h3 className="font-medium text-lg text-green-800 mb-3">Key Market Benefits</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full text-green-700">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Premium Pricing</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Certified products command 15-30% higher prices in international markets.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-full text-emerald-700">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Market Access</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Opens doors to specialty markets and ethically-conscious buyers in Europe and North America.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                        <BarChart className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Long-term Contracts</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Certified farmers are more likely to secure stable, long-term buying commitments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-3">Buyers Seeking Certified Coffee from Madagascar</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-amber-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Nordic Roasters Group</CardTitle>
                      <CardDescription>Sweden • Fair Trade & Organic</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Looking for 10,000kg of certified coffee per quarter
                    </CardContent>
                  </Card>
                  
                  <Card className="border-emerald-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Sustainable Bean Co.</CardTitle>
                      <CardDescription>Germany • Rainforest Alliance</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Seeking new suppliers of certified Malagasy coffee
                    </CardContent>
                  </Card>
                  
                  <Card className="border-teal-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Ethical Coffee Imports</CardTitle>
                      <CardDescription>United States • Multiple Certifications</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Premium prices for multi-certified specialty grade coffee
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-emerald-600 hover:text-emerald-800">
                    <Link href="/dashboard/farmer/market">
                      View All Certification-Seeking Buyers
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
