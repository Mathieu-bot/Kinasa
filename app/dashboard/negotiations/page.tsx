"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Filter } from "lucide-react"

// Importer les composants avec des chemins relatifs explicites
import { NegotiationsActiveQuotes } from "../../../components/negotiations/active-quotes"
import { NegotiationsArchived } from "../../../components/negotiations/archived-quotes"
import { NegotiationsEmpty } from "../../../components/negotiations/empty-state"

export default function NegotiationsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [showQuoteEditor, setShowQuoteEditor] = useState(false)
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Negotiations</h1>
          <p className="text-muted-foreground">
            Manage your quotes and negotiations with farmers
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
          <Button 
            variant="default" 
            size="sm" 
            className="gap-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setShowQuoteEditor(true)}
          >
            <Plus className="h-4 w-4" />
            New Quote
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-6">
          <NegotiationsActiveQuotes 
            onCreateQuote={() => setShowQuoteEditor(true)}
            showQuoteEditor={showQuoteEditor}
            onCloseQuoteEditor={() => setShowQuoteEditor(false)}
          />
        </TabsContent>
        
        <TabsContent value="drafts" className="space-y-4 mt-6">
          <NegotiationsEmpty 
            title="No Draft Quotes"
            description="You haven't created any draft quotes yet. Draft quotes are saved locally until you're ready to send them."
            buttonText="Create New Quote"
            onAction={() => setShowQuoteEditor(true)}
          />
        </TabsContent>
        
        <TabsContent value="archived" className="space-y-4 mt-6">
          <NegotiationsArchived />
        </TabsContent>
      </Tabs>
    </div>
  )
}
