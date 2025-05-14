"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Filter, MapPin, Tag, Calendar, User, Package, Coffee } from "lucide-react"
import { 
  Dialog, 
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { AnimatePresence, motion } from "framer-motion"

type FilterType = "product" | "region" | "certification" | "farmer"

interface Filter {
  type: FilterType
  value: string
  label: string
}

interface SearchResult {
  id: string
  type: "product" | "farmer" | "region"
  title: string
  subtitle: string
  image?: string
  tags: string[]
}

// Données de démonstration
const DEMO_RESULTS: SearchResult[] = [
  {
    id: "prod-1",
    type: "product",
    title: "Premium Arabica Coffee",
    subtitle: "Multiple farmers · Madagascar",
    image: "/products/coffee.jpg",
    tags: ["Organic", "Fair Trade"]
  },
  {
    id: "prod-2",
    type: "product",
    title: "Robusta Coffee",
    subtitle: "Various regions · Madagascar",
    image: "/products/robusta.jpg",
    tags: ["Sustainable"]
  },
  {
    id: "farm-1",
    type: "farmer",
    title: "Antananarivo Coffee Cooperative",
    subtitle: "25 farmers · Antananarivo, Madagascar",
    image: "/farmers/coop1.jpg",
    tags: ["Organic", "Fair Trade", "Women-led"]
  },
  {
    id: "reg-1",
    type: "region",
    title: "Highlands Region",
    subtitle: "Madagascar · 12 farmers available",
    image: "/regions/highlands.jpg",
    tags: ["Coffee", "Vanilla"]
  },
]

const REGIONS = [
  "Antananarivo", "Fianarantsoa", "Toamasina", 
  "Mahajanga", "Toliara", "Antsiranana",
  "Central Highlands", "Eastern Rainforests"
]

const CERTIFICATIONS = [
  "Organic", "Fair Trade", "Rainforest Alliance", 
  "UTZ Certified", "Sustainable", "Bird Friendly",
  "Direct Trade", "Women-led"
]

const PRODUCTS = [
  "Arabica Coffee", "Robusta Coffee", "Bourbon Vanilla",
  "Black Pepper", "Cloves", "Cinnamon",
  "Cocoa Beans", "Ylang-Ylang Oil"
]

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [results, setResults] = useState<SearchResult[]>([])
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Filtrer les résultats en fonction de la requête et des filtres actifs
  useEffect(() => {
    if (!query && activeFilters.length === 0) {
      setResults([])
      return
    }

    // Simuler un délai de recherche
    const timer = setTimeout(() => {
      const filtered = DEMO_RESULTS.filter(result => {
        const matchesQuery = !query || 
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        
        const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => {
          switch(filter.type) {
            case "product":
              return result.type === "product" && result.title.includes(filter.value)
            case "region":
              return result.subtitle.includes(filter.value)
            case "certification":
              return result.tags.some(tag => tag === filter.value)
            case "farmer":
              return result.type === "farmer"
            default:
              return true
          }
        })
        
        return matchesQuery && matchesFilters
      })
      
      setResults(filtered)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [query, activeFilters])
  
  const addFilter = (type: FilterType, value: string, label: string) => {
    if (!activeFilters.some(f => f.type === type && f.value === value)) {
      setActiveFilters([...activeFilters, { type, value, label }])
      setQuery("")
    }
    setShowFilterPanel(false)
  }
  
  const removeFilter = (index: number) => {
    const newFilters = [...activeFilters]
    newFilters.splice(index, 1)
    setActiveFilters(newFilters)
  }
  
  // Réinitialiser la recherche
  const resetSearch = () => {
    setQuery("")
    setActiveFilters([])
    setResults([])
    setShowFilterPanel(false)
  }
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])
  
  const getFilterIcon = (type: FilterType) => {
    switch(type) {
      case "product":
        return <Package className="h-3 w-3" />
      case "region":
        return <MapPin className="h-3 w-3" />
      case "certification":
        return <Tag className="h-3 w-3" />
      case "farmer":
        return <User className="h-3 w-3" />
    }
  }
  
  const getResultIcon = (type: SearchResult["type"]) => {
    switch(type) {
      case "product":
        return <Package className="h-4 w-4 text-emerald-600" />
      case "farmer":
        return <User className="h-4 w-4 text-emerald-600" />
      case "region":
        return <MapPin className="h-4 w-4 text-emerald-600" />
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="relative h-9 w-9 p-0 xl:h-9 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
          onClick={() => {
            setOpen(true)
            setTimeout(() => inputRef.current?.focus(), 50)
          }}
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Search...</span>
          <span className="sr-only">Search</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="flex flex-col">
          <div className="flex items-center border-b p-4">
            <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search for products, farmers, regions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {(query || activeFilters.length > 0) && (
              <Button
                variant="ghost"
                className="h-8 px-2 lg:px-3"
                onClick={resetSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
            <div className="mx-2 h-4 w-px bg-muted-foreground/20"></div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 py-2 border-b">
              {activeFilters.map((filter, index) => (
                <Badge 
                  key={`${filter.type}-${filter.value}`}
                  variant="secondary"
                  className="px-2 py-1 gap-1 rounded-md"
                >
                  {getFilterIcon(filter.type)}
                  <span>{filter.label}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeFilter(index)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          <AnimatePresence>
            {showFilterPanel && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 py-3 border-b overflow-hidden"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <Package className="h-3.5 w-3.5" />
                      Products
                    </h3>
                    <div className="space-y-1 text-sm">
                      {PRODUCTS.slice(0, 4).map(product => (
                        <div
                          key={product}
                          className="flex items-center hover:text-emerald-600 hover:underline cursor-pointer"
                          onClick={() => addFilter("product", product, product)}
                        >
                          <Coffee className="h-3 w-3 mr-1" />
                          {product}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      Regions
                    </h3>
                    <div className="space-y-1 text-sm">
                      {REGIONS.slice(0, 4).map(region => (
                        <div
                          key={region}
                          className="flex items-center hover:text-emerald-600 hover:underline cursor-pointer"
                          onClick={() => addFilter("region", region, region)}
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          {region}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      Certifications
                    </h3>
                    <div className="space-y-1 text-sm">
                      {CERTIFICATIONS.slice(0, 4).map(cert => (
                        <div
                          key={cert}
                          className="flex items-center hover:text-emerald-600 hover:underline cursor-pointer"
                          onClick={() => addFilter("certification", cert, cert)}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      Type
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div
                        className="flex items-center hover:text-emerald-600 hover:underline cursor-pointer"
                        onClick={() => addFilter("farmer", "any", "Farmers Only")}
                      >
                        <User className="h-3 w-3 mr-1" />
                        Farmers Only
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="py-6 px-2 overflow-auto max-h-[300px]">
            {!query && activeFilters.length === 0 ? (
              <div className="px-4 text-center text-sm text-muted-foreground py-4">
                Start typing to search, or use filters to narrow down results
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 text-center text-sm text-muted-foreground py-4">
                No results found. Try a different search term or filter.
              </div>
            ) : (
              <div className="space-y-1 px-2">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    {getResultIcon(result.type)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium leading-none">
                          {result.title}
                        </h4>
                        <div className="flex gap-1">
                          {result.tags.slice(0, 3).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-[10px] px-1 py-0 h-4"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {result.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
