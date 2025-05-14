"use client"

import { useState, useEffect } from "react"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ProductData } from "./product-card"
import { ImageUpload } from "./image-upload"

// Catégories de produits disponibles
const PRODUCT_CATEGORIES = [
  "Coffee",
  "Vanilla",
  "Spices",
  "Cocoa",
  "Fruits",
  "Vegetables",
  "Grains",
  "Other"
]

// Certifications disponibles
const AVAILABLE_CERTIFICATIONS = [
  "Organic",
  "Fair Trade", 
  "Rainforest Alliance",
  "Direct Trade",
  "Bird Friendly",
  "UTZ Certified",
  "Non-GMO",
  "Shade Grown"
]

// Unités de mesure
const UNITS = [
  "kg",
  "g",
  "lb",
  "oz",
  "bag",
  "pack",
  "unit"
]

// Schéma de validation du formulaire
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters."
  }).max(50, {
    message: "Product name must not exceed 50 characters."
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters."
  }).max(500, {
    message: "Description must not exceed 500 characters."
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number."
  }),
  category: z.string({
    required_error: "Please select a category."
  }),
  unit: z.string({
    required_error: "Please select a unit of measure."
  }),
  stockQuantity: z.coerce.number().int().nonnegative({
    message: "Stock quantity must be a non-negative integer."
  }),
  certifications: z.array(z.string()).optional(),
  status: z.enum(["active", "draft", "archived"]),
  image: z.string().optional()
})

interface ProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ProductFormValues) => void
  initialData?: Partial<ProductData>
  isEditing?: boolean
}

// Type des valeurs du formulaire
type ProductFormValues = z.infer<typeof productFormSchema>

export function ProductForm({ open, onOpenChange, onSubmit, initialData, isEditing = false }: ProductFormProps) {
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>(initialData?.certifications || [])
  const [imageData, setImageData] = useState<string>(initialData?.image || '')
  
  // Initialiser le formulaire avec react-hook-form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || "",
      unit: initialData?.unit || "kg",
      stockQuantity: initialData?.stockQuantity || 0,
      certifications: initialData?.certifications || [],
      status: initialData?.status || "draft",
      image: initialData?.image || ""
    }
  })
  
  // Gérer la soumission du formulaire
  const handleSubmit = (values: ProductFormValues) => {
    onSubmit({
      ...values,
      certifications: selectedCertifications,
      image: imageData
    })
    form.reset()
    setSelectedCertifications([])
    onOpenChange(false)
  }
  
  // Mettre à jour le formulaire lorsque les données initiales changent
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || 0,
        category: initialData.category || "",
        unit: initialData.unit || "kg",
        stockQuantity: initialData.stockQuantity || 0,
        status: initialData.status || "draft",
        image: initialData.image || "",
        certifications: initialData.certifications || []
      })
      setSelectedCertifications(initialData.certifications || [])
    }
  }, [initialData, form])
  
  // Gérer les certifications
  const toggleCertification = (certification: string) => {
    setSelectedCertifications(prev => 
      prev.includes(certification)
        ? prev.filter(c => c !== certification)
        : [...prev, certification]
    )
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update your product information below."
              : "Fill in the details to add a new product to your inventory."
            }
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Premium Arabica Coffee" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="25.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {UNITS.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your product..." 
                      className="resize-none min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <ImageUpload 
                  onImageSelected={setImageData} 
                  initialImage={initialData?.image}
                />
              </FormControl>
              <FormDescription>
                Upload an image of your product. Drag and drop or select a file from your computer.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Certifications</FormLabel>
              <div className="border rounded-md p-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedCertifications.map(cert => (
                    <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                      {cert}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 rounded-full"
                        onClick={() => toggleCertification(cert)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {cert}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      size="sm"
                      className="w-full justify-between"
                      type="button"
                    >
                      Select certifications
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search certifications..." />
                      <CommandEmpty>No certification found.</CommandEmpty>
                      <CommandGroup>
                        {AVAILABLE_CERTIFICATIONS.map((cert) => (
                          <CommandItem
                            key={cert}
                            value={cert}
                            onSelect={() => toggleCertification(cert)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCertifications.includes(cert) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {cert}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                {isEditing ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
