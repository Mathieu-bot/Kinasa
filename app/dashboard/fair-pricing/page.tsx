"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Download, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react"
import { ExportPriceReport } from "@/components/fair-pricing/export-price-report"

import { PriceBreakdown, PriceComponent } from "@/components/fair-pricing/price-breakdown"
import { MarketComparison, PricePoint } from "@/components/fair-pricing/market-comparison"
import { PriceTrends, TrendData } from "@/components/fair-pricing/price-trends"
import { ProductSelector, Product } from "@/components/fair-pricing/product-selector"


export default function FairPricingPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>("coffee-arabica")
  

  const PRODUCTS: Product[] = [
    {
      id: "coffee-arabica",
      name: "Premium Arabica Coffee",
      origin: "Antananarivo Highlands",
      basePrice: 4.5,
      certification: "Organic & Fair Trade",
      category: "Coffee"
    },
    {
      id: "coffee-robusta",
      name: "Robusta Coffee",
      origin: "Tamatave Coastal Farms",
      basePrice: 3.8, // EUR per kg
      certification: "Fair Trade",
      category: "Coffee"
    },
    {
      id: "vanilla-bourbon",
      name: "Bourbon Vanilla",
      origin: "Antsiranana Region",
      basePrice: 220,
      certification: "Organic",
      category: "Spices"
    },
    {
      id: "vanilla-tahitensis",
      name: "Tahitensis Vanilla",
      origin: "Sambava",
      basePrice: 185,
      certification: "Direct Trade",
      category: "Spices"
    },
    {
      id: "cloves",
      name: "Dried Cloves",
      origin: "Analanjirofo Region",
      basePrice: 12.5, // EUR per kg
      certification: "Organic",
      category: "Spices"
    },
    {
      id: "black-pepper",
      name: "Black Pepper",
      origin: "East Coast",
      basePrice: 15.8,
      certification: "Organic",
      category: "Spices"
    },
    {
      id: "voatsiperifery-pepper",
      name: "Voatsiperifery Pepper",
      origin: "Rainforests of Madagascar",
      basePrice: 180,
      certification: "Wild & Sustainable Harvest",
      category: "Organic"
    },
    {
      id: "cinnamon",
      name: "Madagascar Cinnamon",
      origin: "East Coast",
      basePrice: 9.8,
      certification: "Organic",
      category: "Spices"
    },
    {
      id: "cocoa-criollo",
      name: "Criollo Cocoa Beans",
      origin: "Ambanja",
      basePrice: 8.5,
      certification: "Organic",
      category: "Cocoa"
    },
    {
      id: "cocoa-trinitario",
      name: "Trinitario Cocoa Beans",
      origin: "Sambirano Valley",
      basePrice: 7.2,
      certification: "Fair Trade",
      category: "Cocoa"
    },
    {
      id: "litchi-fresch",
      name: "Fresh Litchi",
      origin: "East Coast - Toamasina",
      basePrice: 3.2, // EUR per kg
      certification: "Direct Trade",
      category: "Fruits"
    },
    {
      id: "litchi-dried",
      name: "Dried Litchi",
      origin: "East Coast",
      basePrice: 12.5, // EUR per kg
      certification: "Organic",
      category: "Organic"
    },
    {
      id: "pink-rice",
      name: "Pink Rice",
      origin: "Lake Alaotra",
      basePrice: 3.6,
      certification: "Organic",
      category: "Grains"
    },
    {
      id: "red-rice",
      name: "Red Rice",
      origin: "Central Highlands",
      basePrice: 3.8, // EUR per kg
      certification: "Organic",
      category: "Grains"
    },
    {
      id: "ylang-ylang-oil",
      name: "Ylang-Ylang Essential Oil",
      origin: "Nosy Be",
      basePrice: 150,
      certification: "Organic",
      category: "Essential Oils"
    },
    {
      id: "ravintsara-oil",
      name: "Ravintsara Essential Oil",
      origin: "Eastern Forests",
      basePrice: 85,
      certification: "Organic",
      category: "Essential Oils"
    },
    {
      id: "cinnamon-oil",
      name: "Cinnamon Essential Oil",
      origin: "East Coast",
      basePrice: 120,
      certification: "Organic",
      category: "Essential Oils"
    },
    {
      id: "vetiver-oil",
      name: "Vetiver Essential Oil",
      origin: "Central Highlands",
      basePrice: 175,
      certification: "Organic & Sustainable",
      category: "Fair Trade"
    },

    {
      id: "vary-malady",
      name: "Vary Malady Rice",
      origin: "Betsiboka Region",
      basePrice: 3.4,
      certification: "Local Variety",
      category: "Grains"
    },
    {
      id: "vary-lava",
      name: "Vary Lava Rice",
      origin: "Sofia Region",
      basePrice: 3.2, // EUR per kg
      certification: "Heritage Variety",
      category: "Direct Trade"
    },
    {
      id: "vary-maintso",
      name: "Vary Maintso Rice",
      origin: "Alaotra-Mangoro",
      basePrice: 3.5,
      certification: "Sustainable Farming",
      category: "Grains"
    },

    {
      id: "honey-forest",
      name: "Forest Honey",
      origin: "Ranomafana Forest",
      basePrice: 18.5,
      certification: "Organic",
      category: "Wild Harvested"
    },
    {
      id: "baobab-powder",
      name: "Baobab Powder",
      origin: "Western Madagascar",
      basePrice: 25.0,
      certification: "Organic",
      category: "Superfoods"
    },
    {
      id: "pineapple-dried",
      name: "Dried Pineapple",
      origin: "East Coast",
      basePrice: 14.5,
      certification: "Sun Dried",
      category: "Healthy Snacks"
    },
    {
      id: "moringa-powder",
      name: "Moringa Leaf Powder",
      origin: "Tulear Region",
      basePrice: 22.0,
      certification: "Organic & Fair Trade",
      category: "Superfoods"
    },
    {
      id: "artisanal-chocolate",
      name: "Dark Chocolate 75%",
      origin: "Sambirano Valley",
      basePrice: 28.0,
      certification: "Bean to Bar",
      category: "Craft Products"
    },
    {
      id: "arabica-bourbon",
      name: "Bourbon Point Coffee",
      origin: "Antananarivo Region",
      basePrice: 12.0,
      certification: "Specialty Grade",
      category: "Premium Coffee"
    },
    {
      id: "mango-dried",
      name: "Dried Mango Slices",
      origin: "North Coast",
      basePrice: 16.0,
      certification: "No Additives",
      category: "Healthy Snacks"
    },
    {
      id: "macadamia-nuts",
      name: "Macadamia Nuts",
      origin: "Central Highlands",
      basePrice: 32.0,
      certification: "Sustainably Grown",
      category: "Nuts & Seeds"
    },
    {
      id: "cashew-raw",
      name: "Raw Cashews",
      origin: "Northern Region",
      basePrice: 14.0,
      certification: "Farm Direct",
      category: "Nuts & Seeds"
    }
    
  ]
  

  const generatePriceComponents = (productId: string): { components: PriceComponent[], total: number } => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return { components: [], total: 0 };
    
    const basePrice = product.basePrice;
    
    const distributions: Record<string, number[]> = {
      "default": [50, 20, 10, 12, 5, 3],  
      "Coffee": [50, 18, 8, 14, 5, 5],
      "Spices": [45, 25, 7, 15, 4, 4],
      "Cocoa": [48, 20, 8, 15, 5, 4],
      "Fruits": [60, 15, 5, 13, 4, 3],
      "Grains": [55, 15, 8, 12, 5, 5],
      "Essential Oils": [35, 35, 5, 15, 5, 5]
    };
    
    const distribution = distributions[product.category || "default"] || distributions["default"];
    
    const components: PriceComponent[] = [
      { 
        name: "Farm Production", 
        value: parseFloat((basePrice * distribution[0] / 100).toFixed(2)), 
        color: "#10b981", 
        description: "Basic production cost including labor and materials" 
      },
      { 
        name: "Processing", 
        value: parseFloat((basePrice * distribution[1] / 100).toFixed(2)), 
        color: "#60a5fa", 
        description: "Post-harvest treatment and quality control" 
      },
      { 
        name: "Certification", 
        value: parseFloat((basePrice * distribution[2] / 100).toFixed(2)), 
        color: "#f59e0b", 
        description: `${product.certification} certification costs` 
      },
      { 
        name: "Logistics", 
        value: parseFloat((basePrice * distribution[3] / 100).toFixed(2)), 
        color: "#8b5cf6", 
        description: "Transportation and export costs" 
      },
      { 
        name: "Platform Fee", 
        value: parseFloat((basePrice * distribution[4] / 100).toFixed(2)), 
        color: "#ec4899", 
        description: "Kinasa platform fee for connection and services" 
      },
      { 
        name: "Farmer Bonus", 
        value: parseFloat((basePrice * distribution[5] / 100).toFixed(2)), 
        color: "#14b8a6", 
        description: "Additional income over standard market prices" 
      }
    ];
    
    const calculatedTotal = components.reduce((sum, comp) => sum + comp.value, 0);
    const difference = basePrice - calculatedTotal;
    
    if (Math.abs(difference) > 0.01) {
      components[0].value = parseFloat((components[0].value + difference).toFixed(2));
    }
    
    return {
      components,
      total: basePrice
    };
  };
  
  const PRICE_COMPONENTS: Record<string, { components: PriceComponent[], total: number }> = {};
  
  PRODUCTS.forEach(product => {
    PRICE_COMPONENTS[product.id] = generatePriceComponents(product.id);
  });
  

  const generateMarketComparison = (productId: string): PricePoint[] => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return [];
    
    const basePrice = product.basePrice;
    const months = ["Jan", "Feb", "Mar", "Apr", "May"];
    const hasFairTrade = product.certification.toLowerCase().includes('fair') || 
                          product.certification.toLowerCase().includes('trade');
    

    return months.map((month, index) => {

      const multiplier = 1 + (Math.random() * 0.04 - 0.02);
      const kinasaPrice = parseFloat((basePrice * (1 + index * 0.01) * multiplier).toFixed(2));
      

      const marketMultiplier = 0.75 + Math.random() * 0.1;
      const marketPrice = parseFloat((kinasaPrice * marketMultiplier).toFixed(2));
            const dataPoint: PricePoint = {
        date: `${month} 2025`,
        kinasa: kinasaPrice,
        market: marketPrice
      };
      

      if (hasFairTrade) {

        const fairTradeMultiplier = 0.85 + Math.random() * 0.05;
        dataPoint.fairTrade = parseFloat((kinasaPrice * fairTradeMultiplier).toFixed(2));
      }
      
      return dataPoint;
    });
  };
  

  const MARKET_COMPARISON: Record<string, PricePoint[]> = {};
  

  PRODUCTS.forEach(product => {
    MARKET_COMPARISON[product.id] = generateMarketComparison(product.id);
  });
  

  const generatePriceTrends = (productId: string): TrendData[] => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return [];
    
    const basePrice = product.basePrice;
    

    const regionsByCategory: Record<string, string[]> = {
      "Coffee": ["Antananarivo", "Fianarantsoa", "Toamasina"],
      "Spices": ["Antsiranana", "Sambava", "Analanjirofo"],
      "Cocoa": ["Ambanja", "Sambirano", "Nosy Be"],
      "Fruits": ["Toamasina", "East Coast", "Antsiranana"],
      "Grains": ["Lake Alaotra", "Central Highlands", "Antsirabe"],
      "Essential Oils": ["Nosy Be", "Eastern Forests", "Central Highlands"]
    };
    

    const regions = regionsByCategory[product.category || "default"] || 
                    ["Northern Region", "Central Region", "Southern Region"];
    

    const hasFairTrade = product.certification.toLowerCase().includes('fair') || 
                          product.certification.toLowerCase().includes('trade');
    

    return regions.map((region, index) => {

      const regionalMultiplier = 0.95 + (index * 0.05);
      const kinasaPrice = parseFloat((basePrice * regionalMultiplier).toFixed(2));
      

      const conventionalMultiplier = 0.65 + Math.random() * 0.1;
      const conventionalPrice = parseFloat((kinasaPrice * conventionalMultiplier).toFixed(2));
      
      const dataPoint: TrendData = {
        region: region,
        conventional: conventionalPrice,
        kinasa: kinasaPrice,
        fairTrade: 0
      };
      
      if (hasFairTrade) {
        const fairTradeMultiplier = 0.8 + Math.random() * 0.1;
        dataPoint.fairTrade = parseFloat((kinasaPrice * fairTradeMultiplier).toFixed(2));
      } else {

        const fairTradeMultiplier = 0.85 + Math.random() * 0.05;
        dataPoint.fairTrade = parseFloat((kinasaPrice * fairTradeMultiplier).toFixed(2));
      }
      
      return dataPoint;
    });
  };
  

  const PRICE_TRENDS: Record<string, TrendData[]> = {};
  

  PRODUCTS.forEach(product => {
    PRICE_TRENDS[product.id] = generatePriceTrends(product.id);
  });
  
  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0]
  const selectedPriceData = PRICE_COMPONENTS[selectedProductId]
  const selectedMarketData = MARKET_COMPARISON[selectedProductId]
  const selectedTrendData = PRICE_TRENDS[selectedProductId]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.h1 
            className="text-2xl font-bold text-emerald-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Fair Pricing Mechanisms
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Transparency and fair compensation for farmers
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ExportPriceReport
            priceData={{
              currentPrice: selectedPriceData.total,
              marketPrice: selectedMarketData[0]?.market || 0,
              fairTradeMinimum: selectedPriceData.components.find(c => c.name === "Fair Trade Minimum")?.value || 0,
              organicPremium: selectedPriceData.components.find(c => c.name === "Organic Premium")?.value || 0,
              qualityPremium: selectedPriceData.components.find(c => c.name === "Quality Premium")?.value || 0,
              certifications: selectedPriceData.components
                .filter(c => c.name.toLowerCase().includes("certification") || c.name.toLowerCase().includes("premium"))
                .map(c => ({
                  name: c.name,
                  premium: c.value
                }))
            }}
          />
        </motion.div>
      </div>
      
      <div className="mb-6">
        <ProductSelector
          products={PRODUCTS}
          selectedProductId={selectedProductId}
          onSelectProduct={setSelectedProductId}
          pageSize={9}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="breakdown" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="breakdown" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Price Breakdown</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Market Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Regional Trends</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="breakdown">
            <PriceBreakdown
              productName={selectedProduct.name}
              priceComponents={selectedPriceData.components}
              totalPrice={selectedPriceData.total}
            />
          </TabsContent>
          
          <TabsContent value="market">
            <MarketComparison
              productName={selectedProduct.name}
              priceData={selectedMarketData}
            />
          </TabsContent>
          
          <TabsContent value="trends">
            <PriceTrends
              productName={selectedProduct.name}
              trendData={selectedTrendData}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
