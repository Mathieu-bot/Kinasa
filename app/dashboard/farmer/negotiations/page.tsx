"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"

// Importons les composants directement par leurs chemins relatifs
import { NegotiationsActiveQuotes } from "../../../../components/negotiations/active-quotes"
import { NegotiationsArchived } from "../../../../components/negotiations/archived-quotes"
import { NegotiationsEmpty } from "../../../../components/negotiations/empty-state"

export default function FarmerNegotiationsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [showQuoteEditor, setShowQuoteEditor] = useState(false)
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Price Negotiations</h1>
          <p className="text-muted-foreground">
            Review and respond to buyer quotes and manage your pricing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-6">
          <NegotiationsActiveQuotes 
            onCreateQuote={() => setShowQuoteEditor(true)}
            showQuoteEditor={showQuoteEditor}
            onCloseQuoteEditor={() => setShowQuoteEditor(false)}
          />
        </TabsContent>
        
        <TabsContent value="archived" className="space-y-4 mt-6">
          <NegotiationsArchived />
        </TabsContent>
      </Tabs>
    </div>
  )
}
