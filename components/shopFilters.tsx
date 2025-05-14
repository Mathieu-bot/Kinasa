"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { getAllCategories, getAllRegions } from "@/components/ui/ProductData";
import { useFiltersStore } from "@/lib/store/useFiltersStore";
import { products } from "@/components/ui/ProductData";

// Find the maximum price of products
const maxProductPrice = Math.ceil(
  Math.max(...products.map((product) => product.price))
);

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6">
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const ShopFilters = () => {
  // Use our Zustand store
  const {
    selectedCategories,
    selectedRegions,
    selectedRatings,
    priceRange,
    toggleCategory,
    toggleRegion,
    toggleRating,
    setPriceRange,
    resetFilters,
  } = useFiltersStore();

  // Get categories and regions dynamically
  const categories = getAllCategories().filter((cat) => cat !== "Tous");
  const regions = getAllRegions();

  // Define price ranges
  const priceRanges = [
    { id: "under-10", name: "Under $10/kg", min: 0, max: 10 },
    { id: "10-15", name: "From $10 to $15/kg", min: 10, max: 15 },
    { id: "15-20", name: "From $15 to $20/kg", min: 15, max: 20 },
    { id: "over-20", name: `Over $20/kg`, min: 20, max: maxProductPrice },
  ];

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const handleReset = () => {
    resetFilters();
    toast("Filters reset", {
      description: "All filter selections have been cleared",
    });
  };

  const handleApply = () => {
    toast("Filters applied", {
      description: `${selectedCategories.length} categories, ${selectedRegions.length} regions and price range $${priceRange[0]}-$${priceRange[1]}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <h2 className="text-2xl font-bold mb-8 text-amber-600">Filters</h2>

      <FilterSection title="Product Category">
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.div
              key={category}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleCategory(category)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`h-5 w-5 rounded-sm border flex items-center justify-center ${
                  selectedCategories.includes(category)
                    ? "bg-amber-200 border-amber-200"
                    : "border-gray-300"
                }`}
              >
                {selectedCategories.includes(category) && (
                  <CheckIcon className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-gray-700">{category}</span>
            </motion.div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Region">
        <div className="space-y-2">
          {regions.map((region) => (
            <motion.div
              key={region}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleRegion(region)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`h-5 w-5 rounded-sm border flex items-center justify-center ${
                  selectedRegions.includes(region)
                    ? "bg-amber-200 border-amber-200"
                    : "border-gray-300"
                }`}
              >
                {selectedRegions.includes(region) && (
                  <CheckIcon className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-gray-700">{region}</span>
            </motion.div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="space-y-6 px-2">
          <div>
            <div className="flex justify-between mb-2 text-sm text-gray-700 font-medium">
              <span>${priceRange[0]}/kg</span>
              <span>${priceRange[1]}/kg</span>
            </div>
            <Slider
              defaultValue={[0, maxProductPrice]}
              max={maxProductPrice}
              step={1}
              value={priceRange}
              onValueChange={handleSliderChange}
              className="mt-2"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <motion.div
              key={rating}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleRating(rating)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`h-5 w-5 rounded-sm border flex items-center justify-center ${
                  selectedRatings.includes(rating)
                    ? "bg-amber-200 border-amber-200"
                    : "border-gray-300"
                }`}
              >
                {selectedRatings.includes(rating) && (
                  <CheckIcon className="h-3 w-3 text-white" />
                )}
              </div>
              <div className="flex text-yellow-500">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <span key={i} className="text-gray-300">
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </FilterSection>

      <div className="flex gap-3 mt-8">
        <Button
          variant="outline"
          className="flex-1 border-amber-200 text-amber-600 hover:bg-amber-200/10"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          className="flex-1 bg-amber-200 hover:bg-amber-200"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </motion.div>
  );
};

export default ShopFilters;
