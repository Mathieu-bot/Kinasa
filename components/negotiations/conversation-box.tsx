"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, PaperclipIcon, Plus } from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageItem } from "./message-item"
import type { CounterOffer, MessageAttachment } from "./message-item"

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  attachments?: MessageAttachment[]
  counterOffer?: CounterOffer
}

interface ConversationBoxProps {
  messages: Message[]
  currentUserId: string
  onSendMessage: (content: string) => void
  onCreateCounterOffer: () => void
  onAcceptOffer?: (offerId: string) => void
  onRejectOffer?: (offerId: string) => void
}

export function ConversationBox({
  messages,
  currentUserId,
  onSendMessage,
  onCreateCounterOffer,
  onAcceptOffer,
  onRejectOffer
}: ConversationBoxProps) {
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages])
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage("")
      
      // Focus back on textarea after sending
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-6">
            <div className="max-w-sm">
              <h3 className="text-lg font-medium mb-2">Start your conversation</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Send a message to begin the negotiation process.
              </p>
              <Button 
                variant="outline" 
                className="gap-2" 
                onClick={onCreateCounterOffer}
              >
                <Plus className="h-4 w-4" />
                Create a Quote
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                id={message.id}
                content={message.content}
                timestamp={message.timestamp}
                isCurrentUser={message.senderId === currentUserId}
                senderName={message.senderName}
                senderAvatar={message.senderAvatar}
                attachments={message.attachments}
                counterOffer={message.counterOffer}
                onAcceptOffer={onAcceptOffer}
                onRejectOffer={onRejectOffer}
              />
            ))}
          </div>
        )}
      </ScrollArea>
      
      <div className="border-t px-4 py-3">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            className="min-h-[80px] flex-1 resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-col gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onCreateCounterOffer}>
                  Create Counter Offer
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PaperclipIcon className="mr-2 h-4 w-4" />
                  <span>Attach File</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              className="h-14 w-8 bg-emerald-600 hover:bg-emerald-700" 
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
