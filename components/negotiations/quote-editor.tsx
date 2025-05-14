"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  PlusCircle, 
  Trash2, 
  Save, 
  Send, 
  Calendar, 
  Coffee, 
  Package
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export interface Product {
  id: string
  name: string
  quantity: number
  unit: string
  pricePerUnit: number
}

export interface QuoteEditorProps {
  initialValues?: {
    title: string
    description: string
    products: Product[]
    expiresAt: Date
  }
  productOptions?: { id: string; name: string }[]
  onSave: (values: any) => void
  onSend: (values: any) => void
  onCancel: () => void
}

export function QuoteEditor({
  initialValues,
  productOptions = [],
  onSave,
  onSend,
  onCancel
}: QuoteEditorProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [title, setTitle] = useState(initialValues?.title || "")
  const [description, setDescription] = useState(initialValues?.description || "")
  const [products, setProducts] = useState<Product[]>(initialValues?.products || [])
  const [expiresAt, setExpiresAt] = useState<Date>(initialValues?.expiresAt || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))
  const [submitType, setSubmitType] = useState<"draft" | "send">("draft")
  
  // Calculate total price
  const totalPrice = products.reduce(
    (sum, product) => sum + (product.pricePerUnit * product.quantity), 
    0
  )
  
  // Add a new empty product
  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: `prod-${Date.now()}`,
        name: "",
        quantity: 1,
        unit: "kg",
        pricePerUnit: 0
      }
    ])
  }
  
  // Remove a product
  const removeProduct = (index: number) => {
    const newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
  }
  
  // Update a product field
  const updateProduct = (index: number, field: keyof Product, value: any) => {
    const newProducts = [...products]
    newProducts[index] = {
      ...newProducts[index],
      [field]: value
    }
    setProducts(newProducts)
  }
  
  // When first adding a product, add an empty one
  useEffect(() => {
    if (products.length === 0) {
      addProduct()
    }
  }, [])
  
  // Handle form submission
  const handleSubmit = (type: "draft" | "send") => {
    setSubmitType(type)
    
    const values = {
      title,
      description,
      products,
      expiresAt,
      status: type === "draft" ? "draft" : "sent"
    }
    
    if (type === "draft") {
      onSave(values)
    } else {
      onSend(values)
    }
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="details">Quote Details</TabsTrigger>
            <TabsTrigger value="products">Products & Pricing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quote Title</Label>
              <Input
                id="title"
                placeholder="e.g. Coffee Beans Q3 2025"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the offer, terms, and any specific requirements"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {expiresAt ? format(expiresAt, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={expiresAt}
                    onSelect={(date) => date && setExpiresAt(date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            {products.map((product, index) => (
              <Card key={product.id} className="border border-muted p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-3">
                    <Coffee className="h-4 w-4 text-emerald-600" />
                    <h4 className="font-medium text-sm">Product {index + 1}</h4>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => removeProduct(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`product-${index}`}>Product</Label>
                    {productOptions.length > 0 ? (
                      <Select
                        value={product.name}
                        onValueChange={(value) => updateProduct(index, "name", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {productOptions.map(option => (
                            <SelectItem key={option.id} value={option.name}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={`product-${index}`}
                        placeholder="e.g. Arabica Coffee Beans"
                        value={product.name}
                        onChange={(e) => updateProduct(index, "name", e.target.value)}
                      />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`unit-${index}`}>Unit</Label>
                    <Select
                      value={product.unit}
                      onValueChange={(value) => updateProduct(index, "unit", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="ton">Metric Ton</SelectItem>
                        <SelectItem value="lb">Pound (lb)</SelectItem>
                        <SelectItem value="bag">Bag</SelectItem>
                        <SelectItem value="container">Container</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                    <Input
                      id={`quantity-${index}`}
                      type="number"
                      placeholder="0"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => updateProduct(index, "quantity", Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`price-${index}`}>Price per {product.unit}</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input
                        id={`price-${index}`}
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="pl-6"
                        value={product.pricePerUnit}
                        onChange={(e) => updateProduct(index, "pricePerUnit", Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-right text-sm">
                  <span className="text-muted-foreground">Subtotal: </span>
                  <span className="font-medium">${(product.quantity * product.pricePerUnit).toFixed(2)}</span>
                </div>
              </Card>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1"
              onClick={addProduct}
            >
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Button>
            
            <Card className="bg-muted">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price</span>
                  <span className="text-lg font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="gap-1"
            onClick={() => handleSubmit("draft")}
          >
            <Save className="h-4 w-4" />
            Save as Draft
          </Button>
          <Button 
            className="gap-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => handleSubmit("send")}
          >
            <Send className="h-4 w-4" />
            Send Quote
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
