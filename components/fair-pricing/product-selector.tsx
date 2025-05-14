"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react"

export interface Product {
  id: string
  name: string
  origin: string
  basePrice: number
  certification: string
  image?: string
  category?: string
}

interface ProductSelectorProps {
  products: Product[]
  selectedProductId: string
  onSelectProduct: (productId: string) => void
  currency?: string
  pageSize?: number
}

export function ProductSelector({
  products,
  selectedProductId,
  onSelectProduct,
  currency = "€",
  pageSize = 6
}: ProductSelectorProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Extract unique categories from products
  const categories = [...new Set(products.map(p => p.category || "Other"))];
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.origin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !activeFilter || product.category === activeFilter ||
                          (!product.category && activeFilter === "Other");
    
    return matchesSearch && matchesCategory;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);
  
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  return (
    <div className="space-y-4">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products or regions..."
            className="pl-9"
          />
        </div>
        
        <div className="relative flex-shrink-0 w-full sm:w-96 md:w-[450px] lg:w-[550px] border border-emerald-100 rounded-md bg-emerald-50/30 max-w-full">
          <div className="px-3 pt-2 pb-1 text-xs text-emerald-600 font-medium border-b border-emerald-100">Filter by Category</div>
          
          <div className="absolute right-0 top-8 h-8 w-6 bg-gradient-to-l from-emerald-50/90 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute left-0 top-8 h-8 w-6 bg-gradient-to-r from-emerald-50/90 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden max-w-full">
            <div 
              className="flex gap-2 whitespace-nowrap py-1.5 px-2 overflow-x-auto max-w-full" 
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(16, 185, 129, 0.2) transparent',
                msOverflowStyle: 'none'
              }}
            >
              <Button
                variant={activeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(null)}
                className={activeFilter === null ? "bg-emerald-600" : "border-emerald-200"}
              >
                All
              </Button>
              
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className={activeFilter === category ? "bg-emerald-600" : "border-emerald-200"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + pageSize, filteredProducts.length)} of {filteredProducts.length} products
        </span>
        {filteredProducts.length === 0 && searchTerm && (
          <span className="text-amber-600">No products found. Try a different search term.</span>
        )}
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedProducts.map((product) => {
          const isSelected = product.id === selectedProductId;
          
          return (
            <motion.div 
              key={product.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`border hover:shadow-md cursor-pointer transition-all ${
                  isSelected 
                    ? "border-emerald-500 bg-emerald-50/50 shadow-md" 
                    : "border-gray-200 hover:border-emerald-300"
                }`}
                onClick={() => onSelectProduct(product.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isSelected ? "bg-emerald-100" : "bg-amber-50"
                    }`}>
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-lg font-bold text-emerald-700">
                          {product.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-medium ${isSelected ? "text-emerald-800" : "text-gray-800"}`}>
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">{product.origin}</p>
                        <Badge variant={isSelected ? "default" : "outline"} className={isSelected ? "bg-emerald-500" : ""}>
                          {currency}{product.basePrice.toFixed(2)}/kg
                        </Badge>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          {product.certification}
                        </Badge>
                        {product.category && (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            {product.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        
        {paginatedProducts.length === 0 && (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-12 flex flex-col items-center justify-center text-center">
            <Filter className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No products found</h3>
            <p className="text-gray-500 mt-1 mb-4">Try changing your search criteria or clearing filters</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setActiveFilter(null);
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
      

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              // For many pages, show limited pagination numbers
              if (totalPages > 5 && i > 0 && i < totalPages - 1 && (i < currentPage - 1 || i > currentPage + 1)) {
                // Show ellipsis for skipped page numbers
                if (i === 1 || i === totalPages - 2) {
                  return <span key={i} className="mx-1">…</span>;
                }
                return null;
              }
              
              return (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "bg-emerald-600" : ""}
                >
                  {i + 1}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
