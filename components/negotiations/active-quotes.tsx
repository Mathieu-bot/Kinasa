"use client"

import { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QuoteCard, QuoteStatus } from "./quote-card"
import { QuoteEditor } from "./quote-editor"
import { QuoteDetails } from "./quote-details"
import { ConversationBox } from "./conversation-box"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NegotiationsEmpty } from "./empty-state"

// Demo quote data
const DEMO_QUOTES = [
  {
    id: "quote-1",
    title: "Premium Arabica Coffee Beans Q3 2025",
    description: "Negotiation for 3rd quarter coffee beans supply from Highland region.",
    createdAt: new Date(2025, 4, 10),
    updatedAt: new Date(2025, 4, 12),
    expiresAt: new Date(2025, 5, 10),
    status: "under_negotiation" as QuoteStatus,
    products: [
      {
        id: "product-1",
        name: "Premium Arabica Coffee Beans",
        quantity: 500,
        unit: "kg",
        pricePerUnit: 12.5,
      },
    ],
    totalPrice: 6250,
    counterParty: {
      id: "farmer-1",
      name: "Antananarivo Coffee Cooperative",
      avatar: "/farmers/coop1.jpg",
      location: "Antananarivo, Madagascar",
      type: "farmer" as "farmer" | "buyer"
    },
    messages: 4
  },
  {
    id: "quote-2",
    title: "Organic Robusta Coffee Beans",
    description: "Supply contract negotiation for organic certified robusta coffee.",
    createdAt: new Date(2025, 4, 5),
    updatedAt: new Date(2025, 4, 8),
    expiresAt: new Date(2025, 5, 5),
    status: "sent" as QuoteStatus,
    products: [
      {
        id: "product-2",
        name: "Organic Robusta Coffee Beans",
        quantity: 300,
        unit: "kg",
        pricePerUnit: 8.75,
      },
    ],
    totalPrice: 2625,
    counterParty: {
      id: "farmer-2",
      name: "Fianarantsoa Farmers Group",
      avatar: "/farmers/coop2.jpg",
      location: "Fianarantsoa, Madagascar",
      type: "farmer" as "farmer" | "buyer"
    },
    messages: 0
  }
];

// Demo messages data
const DEMO_MESSAGES = [
  {
    id: "msg-1",
    senderId: "buyer-1",
    senderName: "Your Company",
    senderAvatar: "/placeholder.svg",
    content: "Hello, we're interested in purchasing coffee beans for Q3 2025. Please see our attached quote.",
    timestamp: new Date(2025, 4, 10, 9, 30),
    counterOffer: {
      id: "offer-1",
      products: [
        {
          id: "product-1",
          name: "Premium Arabica Coffee Beans",
          quantity: 500,
          unit: "kg",
          pricePerUnit: 12.5,
        }
      ],
      totalPrice: 6250
    }
  },
  {
    id: "msg-2",
    senderId: "farmer-1",
    senderName: "Antananarivo Coffee Cooperative",
    senderAvatar: "/farmers/coop1.jpg",
    content: "Thank you for your interest. We appreciate your offer, however we would like to propose a slightly higher price due to our organic certification.",
    timestamp: new Date(2025, 4, 10, 14, 15),
    counterOffer: {
      id: "offer-2",
      products: [
        {
          id: "product-1",
          name: "Premium Arabica Coffee Beans",
          quantity: 500,
          unit: "kg",
          pricePerUnit: 13.2,
          previousPricePerUnit: 12.5
        }
      ],
      totalPrice: 6600,
      previousTotalPrice: 6250
    }
  },
  {
    id: "msg-3",
    senderId: "buyer-1",
    senderName: "Your Company",
    senderAvatar: "/placeholder.svg",
    content: "We understand the value of organic certification. How about we meet in the middle?",
    timestamp: new Date(2025, 4, 11, 10, 45),
    counterOffer: {
      id: "offer-3",
      products: [
        {
          id: "product-1",
          name: "Premium Arabica Coffee Beans",
          quantity: 500,
          unit: "kg",
          pricePerUnit: 12.85,
          previousPricePerUnit: 13.2
        }
      ],
      totalPrice: 6425,
      previousTotalPrice: 6600
    }
  },
  {
    id: "msg-4",
    senderId: "farmer-1",
    senderName: "Antananarivo Coffee Cooperative",
    senderAvatar: "/farmers/coop1.jpg",
    content: "That works for us. We also wanted to confirm that we can deliver in batches over the quarter if that helps with your inventory management.",
    timestamp: new Date(2025, 4, 12, 9, 20)
  }
];

interface NegotiationsActiveQuotesProps {
  onCreateQuote: () => void
  showQuoteEditor: boolean
  onCloseQuoteEditor: () => void
}

export function NegotiationsActiveQuotes({ 
  onCreateQuote,
  showQuoteEditor,
  onCloseQuoteEditor
}: NegotiationsActiveQuotesProps) {
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null)
  const [activeViewTab, setActiveViewTab] = useState<"conversation" | "details">("conversation")
  
  const handleViewDetails = (quoteId: string) => {
    setSelectedQuoteId(quoteId)
    setActiveViewTab("details")
  }
  
  const handleReply = (quoteId: string) => {
    setSelectedQuoteId(quoteId)
    setActiveViewTab("conversation")
  }
  
  const handleCloseQuoteView = () => {
    setSelectedQuoteId(null)
  }
  
  const handleSendMessage = (message: string) => {
    // In a real app, this would send to an API
    console.log("Sending message:", message)
  }
  
  const handleCreateCounterOffer = () => {
    // In a real app, this would open the counter offer form
    console.log("Creating counter offer")
  }
  
  const selectedQuote = DEMO_QUOTES.find(quote => quote.id === selectedQuoteId)
  
  if (DEMO_QUOTES.length === 0) {
    return (
      <NegotiationsEmpty 
        title="No Active Quotes"
        description="You don't have any active quotes or negotiations. Create a new quote to get started."
        buttonText="Create New Quote"
        onAction={onCreateQuote}
      />
    )
  }
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_QUOTES.map(quote => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            isBuyer={true}
            onViewDetails={handleViewDetails}
            onReply={handleReply}
          />
        ))}
      </div>
      
      {/* Quote Editor Dialog */}
      <Dialog open={showQuoteEditor} onOpenChange={onCloseQuoteEditor}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Quote</DialogTitle>
            <DialogDescription>
              Create a new quote to send to a farmer or cooperative.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              <QuoteEditor
                onSave={() => onCloseQuoteEditor()}
                onSend={() => onCloseQuoteEditor()}
                onCancel={onCloseQuoteEditor}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Quote Viewer Dialog */}
      <Dialog open={!!selectedQuoteId} onOpenChange={() => setSelectedQuoteId(null)}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DialogTitle className="sr-only">Quote Details</DialogTitle>
          {selectedQuote && (
            <Tabs value={activeViewTab} onValueChange={(value) => setActiveViewTab(value as "conversation" | "details")}>
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <DialogTitle>{selectedQuote.title}</DialogTitle>
                <TabsList>
                  <TabsTrigger value="conversation">Conversation</TabsTrigger>
                  <TabsTrigger value="details">Quote Details</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="conversation" className="p-0 m-0 h-[calc(80vh-80px)]">
                <ConversationBox
                  messages={DEMO_MESSAGES}
                  currentUserId="buyer-1"
                  onSendMessage={handleSendMessage}
                  onCreateCounterOffer={handleCreateCounterOffer}
                  onAcceptOffer={(offerId) => console.log("Accepting offer:", offerId)}
                  onRejectOffer={(offerId) => console.log("Rejecting offer:", offerId)}
                />
              </TabsContent>
              
              <TabsContent value="details" className="p-6 m-0 h-[calc(80vh-80px)]">
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
                        fairPricePerUnit: 12.0,
                        percentAboveFairPrice: 4.2
                      }
                    ]}
                    onExportPdf={() => console.log("Exporting PDF")}
                  />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
