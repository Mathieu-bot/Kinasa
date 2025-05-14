"use client"

import { useState } from "react"
import { QuoteCard, QuoteStatus } from "./quote-card"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QuoteDetails } from "./quote-details"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NegotiationsEmpty } from "./empty-state"

// Demo archived quotes data
const DEMO_ARCHIVED_QUOTES = [
  {
    id: "quote-3",
    title: "Bourbon Vanilla Beans Contract",
    description: "Contract for high-quality vanilla beans from Eastern Madagascar.",
    createdAt: new Date(2025, 1, 10),
    updatedAt: new Date(2025, 1, 18),
    expiresAt: new Date(2025, 2, 10),
    status: "accepted" as QuoteStatus,
    products: [
      {
        id: "product-3",
        name: "Bourbon Vanilla Beans Grade A",
        quantity: 50,
        unit: "kg",
        pricePerUnit: 120,
      },
    ],
    totalPrice: 6000,
    counterParty: {
      id: "farmer-3",
      name: "Eastern Vanilla Farmers Co-op",
      avatar: "/farmers/coop3.jpg",
      location: "Toamasina, Madagascar",
      type: "farmer" as "farmer" | "buyer"
    },
    messages: 8
  },
  {
    id: "quote-4",
    title: "Cloves Bulk Purchase",
    description: "Seasonal purchase of cloves for export.",
    createdAt: new Date(2025, 0, 5),
    updatedAt: new Date(2025, 0, 15),
    expiresAt: new Date(2025, 1, 5),
    status: "rejected" as QuoteStatus,
    products: [
      {
        id: "product-4",
        name: "Cloves Grade A",
        quantity: 200,
        unit: "kg",
        pricePerUnit: 25,
      },
    ],
    totalPrice: 5000,
    counterParty: {
      id: "farmer-4",
      name: "Northeast Spice Collective",
      avatar: "/farmers/coop4.jpg",
      location: "Antsiranana, Madagascar",
      type: "farmer" as "farmer" | "buyer"
    },
    messages: 6
  }
];

export function NegotiationsArchived() {
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null)
  
  const handleViewDetails = (quoteId: string) => {
    setSelectedQuoteId(quoteId)
  }
  
  const handleReply = (quoteId: string) => {
    setSelectedQuoteId(quoteId)
  }
  
  const selectedQuote = DEMO_ARCHIVED_QUOTES.find(quote => quote.id === selectedQuoteId)
  
  if (DEMO_ARCHIVED_QUOTES.length === 0) {
    return (
      <NegotiationsEmpty 
        title="No Archived Quotes"
        description="You don't have any archived quotes. Completed, expired, or rejected quotes will appear here."
        buttonText="Return to Active Quotes"
        onAction={() => {}}
      />
    )
  }
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_ARCHIVED_QUOTES.map(quote => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            isBuyer={true}
            onViewDetails={handleViewDetails}
            onReply={handleReply}
          />
        ))}
      </div>
      
      {/* Quote Viewer Dialog */}
      <Dialog open={!!selectedQuoteId} onOpenChange={() => setSelectedQuoteId(null)}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DialogTitle className="sr-only">Archived Quote Details</DialogTitle>
          {selectedQuote && (
            <>
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <DialogTitle>{selectedQuote.title}</DialogTitle>
              </div>
              
              <div className="p-6 h-[calc(80vh-80px)]">
                <ScrollArea className="h-full">
                  <QuoteDetails
                    quoteId={selectedQuote.id}
                    title={selectedQuote.title}
                    description={selectedQuote.description}
                    status={selectedQuote.status}
                    products={selectedQuote.products}
                    totalPrice={selectedQuote.totalPrice}
                    createdAt={selectedQuote.createdAt}
                    updatedAt={selectedQuote.updatedAt}
                    expiresAt={selectedQuote.expiresAt}
                    counterParty={selectedQuote.counterParty}
                    fairPriceInfo={[
                      {
                        id: "product-3",
                        fairPricePerUnit: 115,
                        percentAboveFairPrice: 4.3
                      },
                      {
                        id: "product-4",
                        fairPricePerUnit: 23.5,
                        percentAboveFairPrice: 6.4
                      }
                    ].filter(info => 
                      selectedQuote.products.some(p => p.id === info.id)
                    )}
                    onExportPdf={() => console.log("Exporting PDF")}
                  />
                </ScrollArea>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
