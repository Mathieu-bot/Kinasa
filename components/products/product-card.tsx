"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  DollarSign,
  Tag,
  CheckCircle
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/utils"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

export interface ProductData {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  certifications: string[]
  stockQuantity: number
  unit: string
  status: "active" | "draft" | "archived"
  createdAt: Date
  updatedAt: Date
}

interface ProductCardProps {
  product: ProductData
  onEdit: (productId: string) => void
  onDelete: (productId: string) => void
  onView: (productId: string) => void
  onUpdateStatus: (productId: string, status: "active" | "draft" | "archived") => void
}

export function ProductCard({ product, onEdit, onDelete, onView, onUpdateStatus }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>(product.image || "/images/products/placeholder.jpg")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  // Si l'image change, réinitialiser l'état d'erreur
  useEffect(() => {
    setImageSrc(product.image || "/images/products/placeholder.jpg")
    setImageError(false)
  }, [product.image])
  
  // Gérer l'erreur de chargement d'image
  const handleImageError = () => {
    setImageError(true)
    // Utiliser une image de remplacement par défaut
    setImageSrc("/images/products/placeholder.jpg")
  }
  
  // Obtenir la couleur appropriée pour le badge de statut
  const getStatusColor = (status: string) => {
    switch(status) {
      case "active": return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "draft": return "bg-amber-100 text-amber-800 border-amber-200" 
      case "archived": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }
  
  // Confirmer la suppression
  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }
  
  const confirmDelete = () => {
    onDelete(product.id)
    setShowDeleteConfirm(false)
  }
  
  return (
    <>
      <ConfirmationDialog 
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete Product"
        description={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        variant="destructive"
        icon={<Trash2 className="h-5 w-5 text-red-500" />}
      />
    
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-emerald-200 group">
      <div className="aspect-video relative overflow-hidden bg-slate-100 group-hover:bg-emerald-50 transition-colors">
        <img 
          src={imageSrc} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
        <Badge 
          variant="outline" 
          className={`absolute top-2 right-2 ${getStatusColor(product.status)}`}
        >
          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
        </Badge>
      </div>
      
      <CardHeader className="p-4 pb-2 bg-white group-hover:bg-emerald-50/30 transition-colors">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {product.name}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView(product.id)} className="text-blue-600 focus:text-blue-700 focus:bg-blue-50">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(product.id)} className="text-amber-600 focus:text-amber-700 focus:bg-amber-50">
                <Edit className="h-4 w-4 mr-2" />
                Edit Product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {product.status !== "active" && (
                <DropdownMenuItem onClick={() => onUpdateStatus(product.id, "active")} className="text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Set as Active
                </DropdownMenuItem>
              )}
              {product.status !== "draft" && (
                <DropdownMenuItem onClick={() => onUpdateStatus(product.id, "draft")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Set as Draft
                </DropdownMenuItem>
              )}
              {product.status !== "archived" && (
                <DropdownMenuItem onClick={() => onUpdateStatus(product.id, "archived")}>
                  <Tag className="h-4 w-4 mr-2" />
                  Archive Product
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 hover:text-red-700 focus:bg-red-50" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 pb-2 bg-white group-hover:bg-emerald-50/30 transition-colors">
        <div className="text-lg font-medium text-emerald-700">
          {formatCurrency(product.price)}
          <span className="text-sm text-muted-foreground ml-1">/ {product.unit}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {product.certifications.map(cert => (
            <Badge key={cert} variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
              {cert}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between text-sm bg-white border-t border-gray-50 group-hover:bg-emerald-50/30 group-hover:border-emerald-100 transition-colors">
        <div className="flex items-center">
          <Tag className="h-3.5 w-3.5 text-muted-foreground mr-1" />
          <span className="text-muted-foreground">{product.category}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-3.5 w-3.5 text-emerald-600 mr-1 group-hover:text-emerald-700 transition-colors" />
          <span className="text-emerald-700 font-medium group-hover:text-emerald-800 transition-colors">{product.stockQuantity} in stock</span>
        </div>
      </CardFooter>
    </Card>
    </>
  )
}
