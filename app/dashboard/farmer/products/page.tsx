"use client"

import { useState, useEffect } from "react"
import { ProductCard, ProductData, ProductForm } from "@/components/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, FilterX } from "lucide-react"
import { toast } from "sonner"

// Données d'exemple de produits
const DEMO_PRODUCTS: ProductData[] = [
  {
    id: "prod-1",
    name: "Premium Arabica Coffee",
    description: "Single-origin arabica coffee from the highlands of Madagascar. Medium roast with notes of chocolate and citrus.",
    price: 14.5,
    image: "/images/products/coffee1.jpg",
    category: "Coffee",
    certifications: ["Organic", "Fair Trade"],
    stockQuantity: 350,
    unit: "kg",
    status: "active",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-04-02")
  },
  {
    id: "prod-2",
    name: "Organic Robusta Coffee",
    description: "Strong and bold robusta coffee beans. Dark roast with an intense flavor and high caffeine content.",
    price: 11.25,
    image: "/images/products/coffee2.jpg",
    category: "Coffee",
    certifications: ["Organic"],
    stockQuantity: 500,
    unit: "kg",
    status: "active",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-15")
  },
  {
    id: "prod-3",
    name: "Bourbon Vanilla Beans Grade A",
    description: "Premium quality vanilla beans from the eastern coast of Madagascar. Known for their rich aroma and flavor.",
    price: 89.99,
    image: "/images/products/vanilla.jpg",
    category: "Vanilla",
    certifications: ["Organic", "Rainforest Alliance"],
    stockQuantity: 75,
    unit: "kg",
    status: "active",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-04-05")
  },
  {
    id: "prod-4",
    name: "Cloves Grade A",
    description: "Aromatic whole dried flower buds with intense flavor. Perfect for cooking, baking, and medicinal purposes.",
    price: 19.75,
    image: "/images/products/cloves.jpg",
    category: "Spices",
    certifications: ["Fair Trade"],
    stockQuantity: 200,
    unit: "kg",
    status: "active",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-25")
  },
  {
    id: "prod-5",
    name: "Organic Cinnamon Sticks",
    description: "Ceylon cinnamon sticks harvested from the inner bark of cinnamon trees. Sweet and delicate flavor.",
    price: 12.50,
    image: "/images/products/cinnamon.jpg",
    category: "Spices",
    certifications: ["Organic", "Fair Trade"],
    stockQuantity: 120,
    unit: "kg",
    status: "draft",
    createdAt: new Date("2024-04-10"),
    updatedAt: new Date("2024-04-10")
  },
  {
    id: "prod-6",
    name: "Black Pepper Whole",
    description: "Premium black peppercorns with a robust, woody flavor and strong aroma.",
    price: 9.99,
    image: "/images/products/pepper.jpg",
    category: "Spices",
    certifications: ["Organic"],
    stockQuantity: 0,
    unit: "kg",
    status: "archived",
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2024-02-01")
  }
];

// Catégories uniques extraites des produits
const UNIQUE_CATEGORIES = [...new Set(DEMO_PRODUCTS.map(product => product.category))];

export default function FarmerProductsPage() {
  // État pour les produits
  const [products, setProducts] = useState<ProductData[]>(DEMO_PRODUCTS)
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>(DEMO_PRODUCTS)
  
  // États pour les filtres
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  // États pour le formulaire d'ajout/modification
  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null)
  
  // Filtrer les produits en fonction des filtres
  useEffect(() => {
    let filtered = [...products]
    
    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filtre par catégorie
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter)
    }
    
    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(product => product.status === statusFilter)
    }
    
    setFilteredProducts(filtered)
  }, [products, searchQuery, categoryFilter, statusFilter])
  
  // Handlers
  const handleAddProduct = (productData: Partial<ProductData>) => {
    const newProduct: ProductData = {
      ...productData as ProductData,
      id: `prod-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setProducts([newProduct, ...products])
    toast.success("Product added successfully")
  }
  
  const handleEditProduct = (productData: Partial<ProductData>) => {
    if (!editingProduct) return
    
    const updatedProducts = products.map(product => 
      product.id === editingProduct.id 
        ? { ...product, ...productData, updatedAt: new Date() }
        : product
    )
    
    setProducts(updatedProducts)
    setEditingProduct(null)
    toast.success("Product updated successfully")
  }
  
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId))
    toast.success("Product deleted successfully")
  }
  
  const handleUpdateStatus = (productId: string, status: "active" | "draft" | "archived") => {
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { ...product, status, updatedAt: new Date() }
        : product
    )
    
    setProducts(updatedProducts)
    toast.success(`Product status updated to ${status}`)
  }
  
  const handleEditClick = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      setEditingProduct(product)
      setFormOpen(true)
    }
  }
  
  const handleFormSubmit = (data: Partial<ProductData>) => {
    if (editingProduct) {
      handleEditProduct(data)
    } else {
      handleAddProduct(data)
    }
  }
  
  const handleFormClose = () => {
    setFormOpen(false)
    setEditingProduct(null)
  }
  
  const handleResetFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setStatusFilter("all")
  }
  
  // Rendu des états de produits
  const renderProductGrid = (products: ProductData[]) => {
    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-emerald-50 rounded-full p-6 mb-6">
            <img src="/images/products/coffee1.jpg" alt="No products" className="h-40 w-40 rounded-full object-cover opacity-70" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || categoryFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters or search term"
              : "Start by adding your first product"
            }
          </p>
          {(searchQuery || categoryFilter !== "all" || statusFilter !== "all") ? (
            <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50" onClick={handleResetFilters}>
              <FilterX className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          ) : (
            <Button onClick={() => setFormOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          )}
        </div>
      )
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditClick}
            onDelete={handleDeleteProduct}
            onView={() => console.log("View product:", product.id)}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    )
  }
  
  return (
    <div className="space-y-6 bg-slate-50 p-6 rounded-lg shadow-sm min-h-[calc(100vh-120px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory here
          </p>
        </div>
        <Button 
          onClick={() => setFormOpen(true)} 
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 bg-emerald-50 p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {UNIQUE_CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="all" className="w-full bg-white rounded-lg shadow-sm p-1">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger 
            value="all" 
            onClick={() => setStatusFilter("all")}
            className="flex-1 sm:flex-auto"
          >
            All Products
          </TabsTrigger>
          <TabsTrigger 
            value="active" 
            onClick={() => setStatusFilter("active")}
            className="flex-1 sm:flex-auto"
          >
            Active
          </TabsTrigger>
          <TabsTrigger 
            value="draft" 
            onClick={() => setStatusFilter("draft")}
            className="flex-1 sm:flex-auto"
          >
            Drafts
          </TabsTrigger>
          <TabsTrigger 
            value="archived" 
            onClick={() => setStatusFilter("archived")}
            className="flex-1 sm:flex-auto"
          >
            Archived
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="py-4">
        {renderProductGrid(filteredProducts)}
      </div>
      
      <ProductForm 
        open={formOpen} 
        onOpenChange={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingProduct || undefined}
        isEditing={!!editingProduct}
      />
    </div>
  )
}
