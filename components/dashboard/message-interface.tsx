"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  FileText,
  Image as ImageIcon,
  AtSign,
  PaperclipIcon,
  Smile,
} from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Message {
  id: string;
  sender: "user" | "contact";
  content: string;
  timestamp: string;
  read: boolean;
  isNew?: boolean; // To mark new messages that haven't been seen yet
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  role: "buyer" | "farmer";
  company?: string;
  online: boolean;
  unreadCount?: number;
  lastMessage?: string;
}

interface MessageInterfaceProps {
  contacts: Contact[];
  currentUserId?: string;
  userType: "buyer" | "farmer";
}

export const MessageInterface = ({
  contacts,
  userType,
}: MessageInterfaceProps) => {
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sort contacts with unread messages first, then filter by search
  const filteredContacts = contacts
    .sort((a, b) => {
      // Sort by unread count (descending)
      const aUnread = a.unreadCount || 0;
      const bUnread = b.unreadCount || 0;
      if (aUnread !== bUnread) return bUnread - aUnread;

      // If unread counts are the same, sort by online status
      if (a.online !== b.online) return a.online ? -1 : 1;

      // If online status is the same, sort alphabetically
      return a.name.localeCompare(b.name);
    })
    .filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.company &&
          contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  // Set the first contact as active by default
  useEffect(() => {
    if (contacts.length > 0 && !activeContact) {
      setActiveContact(contacts[0]);
      // Load messages for first contact
      loadMessages(contacts[0].id);
    }
  }, [contacts]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate loading messages for a contact
  const loadMessages = (contactId: string) => {
    // In a real app, this would fetch from an API
    const simulatedMessages: Message[] = [
      {
        id: "1",
        sender: "contact",
        content: "Hello, I'm interested in your recent coffee batch.",
        timestamp: "10:30 AM",
        read: true,
      },
      {
        id: "2",
        sender: "user",
        content:
          "Thanks for reaching out! Which variety are you interested in?",
        timestamp: "10:32 AM",
        read: true,
      },
      {
        id: "3",
        sender: "contact",
        content:
          "I'm looking for premium Arabica beans. Do you have any available from the highlands?",
        timestamp: "10:35 AM",
        read: true,
      },
      {
        id: "4",
        sender: "user",
        content:
          "Yes, we have Antananarivo Premium Coffee from the highlands. It has exceptional quality with citrus notes.",
        timestamp: "10:38 AM",
        read: true,
      },
      {
        id: "5",
        sender: "contact",
        content:
          "That sounds perfect! What quantity can you provide and what's your price per kg?",
        timestamp: "10:40 AM",
        read: true,
      },
      {
        id: "6",
        sender: "user",
        content:
          "We currently have 2,500 kg available at €4.50 per kg. This batch is Fair Trade and Organic certified.",
        timestamp: "10:45 AM",
        read: true,
      },
      {
        id: "7",
        sender: "contact",
        content:
          "Excellent. Could you send me a sample and the certification documents?",
        timestamp: "10:48 AM",
        read: true,
      },
    ];

    // Add some unread messages for certain contacts
    if (contactId === "farmer1" || contactId === "buyer1") {
      simulatedMessages.push(
        {
          id: "8",
          sender: "contact",
          content:
            "Also, I would like to know more about your sustainable farming practices. Do you have documentation on that?",
          timestamp: "11:05 AM",
          read: false,
          isNew: true,
        },
        {
          id: "9",
          sender: "contact",
          content:
            "And what about shipping options? Can we arrange for express delivery?",
          timestamp: "11:07 AM",
          read: false,
          isNew: true,
        }
      );
    }

    setMessages(simulatedMessages);
  };

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageInput.trim() || !activeContact) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");

    // Simulate an automatic reply after 2 seconds
    setTimeout(() => {
      const autoReply: Message = {
        id: `msg-auto-${Date.now()}`,
        sender: "contact",
        content: "Thanks for your message! I'll get back to you shortly.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
        isNew: true,
      };

      setMessages((prev) => [...prev, autoReply]);
    }, 2000);
  };

  // Handle changing the active contact
  const handleContactSelect = (contact: Contact) => {
    setActiveContact(contact);
    loadMessages(contact.id);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] overflow-hidden rounded-lg bg-white shadow-md">
      {/* Contacts list */}
      <div className="w-1/4 border-r bg-gradient-to-b from-emerald-50 to-amber-50/30">
        <div className="p-4 border-b">
          <InputWithIcon
            placeholder="Search contacts..."
            className="border-emerald-200 focus:border-emerald-500 focus:ring-0 focus:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<Search className="h-4 w-4 text-emerald-500" />}
          />
        </div>

        <ScrollArea className="h-[calc(100vh-164px)]">
          <div className="space-y-1 p-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-all hover:bg-emerald-100 ${
                  activeContact?.id === contact.id ? "bg-emerald-100" : ""
                }`}
                onClick={() => handleContactSelect(contact)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback
                      className={
                        contact.role === "buyer"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }
                    >
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-medium truncate ${
                        contact.unreadCount ? "font-semibold" : ""
                      }`}
                    >
                      {contact.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {contact.lastSeen}
                    </span>
                  </div>
                  {contact.lastMessage && (
                    <p
                      className={`text-sm truncate ${
                        contact.unreadCount
                          ? "ont-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {contact.lastMessage}
                    </p>
                  )}
                  {contact.company && (
                    <p className="text-xs text-emerald-600 truncate">
                      {contact.company}
                    </p>
                  )}
                </div>
                {contact.unreadCount && contact.unreadCount > 0 ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-medium text-white animate-pulse-subtle">
                    {contact.unreadCount}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Message area */}
      <div className="flex flex-1 flex-col">
        {activeContact ? (
          <>
            {/* Active contact header */}
            <div className="flex items-center justify-between border-b p-4 bg-gradient-to-r from-emerald-50 to-amber-50/50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={activeContact.avatar}
                    alt={activeContact.name}
                  />
                  <AvatarFallback
                    className={
                      activeContact.role === "buyer"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }
                  >
                    {activeContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {activeContact.name}
                    {activeContact.online && (
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </h3>
                  {activeContact.company && (
                    <p className="text-xs text-emerald-600">
                      {activeContact.company}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {activeContact.online ? "Online" : activeContact.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                >
                  <Phone className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                >
                  <Video className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gradient-to-br from-amber-50/20 to-emerald-50/30">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`relative max-w-[75%] rounded-lg p-3 ${
                        message.isNew ? "animate-pulse" : ""
                      } ${
                        message.sender === "user"
                          ? "bg-emerald-600 text-white"
                          : message.read
                          ? "bg-white border border-amber-200 text-gray-800"
                          : "bg-amber-50 border-2 border-amber-300 text-gray-800 shadow-md"
                      }`}
                    >
                      {!message.read && message.sender === "contact" && (
                        <span className="absolute -left-1 -top-1 flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                      )}
                      <p
                        className={`${
                          !message.read && message.sender === "contact"
                            ? "font-medium"
                            : ""
                        }`}
                      >
                        {message.content}
                      </p>
                      <div
                        className={`mt-1 text-right text-xs flex justify-end items-center gap-1 ${
                          message.sender === "user"
                            ? "text-emerald-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                        {!message.read && message.sender === "contact" && (
                          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="border-t p-4 bg-gradient-to-r from-emerald-50 to-amber-50/50">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <div className="relative flex-1">
                  <InputWithIcon
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-0 focus:ring-offset-0 outline-none"
                    suffix={
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                        >
                          <PaperclipIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <AtSign className="mx-auto h-12 w-12 text-emerald-300" />
              <h3 className="mt-4 text-lg font-semibold">
                No Contact Selected
              </h3>
              <p className="text-muted-foreground">
                Select a contact to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
