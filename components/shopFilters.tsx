"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "spices", name: "Spices" },
  { id: "coffee", name: "Coffee" },
  { id: "cocoa", name: "Cocoa" },
  { id: "vanilla", name: "Vanilla" },
  { id: "natural-products", name: "Natural Products" },
  { id: "essential-oils", name: "Essential Oils" },
  { id: "fruits", name: "Fruits" },
];

const regions = [
  { id: "sava", name: "SAVA Region" },
  { id: "highlands", name: "Central Highlands" },
  { id: "east-coast", name: "East Coast" },
  { id: "south", name: "Southern Region" },
  { id: "west", name: "Western Region" },
];

const priceRanges = [
  { id: "under-10", name: "Under $10/kg" },
  { id: "10-15", name: "From $10 to $15/kg" },
  { id: "15-20", name: "From $15 to $20/kg" },
  { id: "over-20", name: "Over $20/kg" },
];

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 30]);
  const { toast } = useToast();

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id: string) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const toggleRegion = (regionId: string) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions(
        selectedRegions.filter((id: string) => id !== regionId)
      );
    } else {
      setSelectedRegions([...selectedRegions, regionId]);
    }
  };

  const togglePriceRange = (rangeId: string) => {
    if (selectedPriceRanges.includes(rangeId)) {
      setSelectedPriceRanges(
        selectedPriceRanges.filter((id: string) => id !== rangeId)
      );
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, rangeId]);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
    setSelectedPriceRanges([]);
    setPriceRange([0, 30]);
    toast({
      title: "Filters reset",
      description: "All filter selections have been cleared",
    });
  };

  const handleApply = () => {
    toast({
      title: "Filters applied",
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
      <h2 className="text-2xl font-bold mb-8 text-grocer-green">Filters</h2>

      <FilterSection title="Product Category">
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`h-5 w-5 rounded-sm border flex items-center justify-center ${
                  selectedCategories.includes(category.id)
                    ? "bg-grocer-green border-grocer-green"
                    : "border-gray-300"
                }`}
              >
                {selectedCategories.includes(category.id) && (
                  <CheckIcon className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-gray-700">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Region">
        <div className="space-y-2">
          {regions.map((region) => (
            <motion.div
              key={region.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleRegion(region.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`h-5 w-5 rounded-sm border flex items-center justify-center ${
                  selectedRegions.includes(region.id)
                    ? "bg-grocer-green border-grocer-green"
                    : "border-gray-300"
                }`}
              >
                {selectedRegions.includes(region.id) && (
                  <CheckIcon className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-gray-700">{region.name}</span>
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
              defaultValue={[0, 30]}
              max={30}
              step={1}
              value={priceRange}
              onValueChange={handleSliderChange}
              className="mt-2"
            />
          </div>

          <div className="space-y-2 mt-4">
            {priceRanges.map((range) => (
              <motion.div
                key={range.id}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => togglePriceRange(range.id)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`h-5 w-5 rounded-sm border flex items-center justify-center ${
                    selectedPriceRanges.includes(range.id)
                      ? "bg-grocer-green border-grocer-green"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPriceRanges.includes(range.id) && (
                    <CheckIcon className="h-3 w-3 text-white" />
                  )}
                </div>
                <span className="text-gray-700">{range.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <motion.div
              key={rating}
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-5 w-5 rounded-sm border border-gray-300"></div>
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
          className="flex-1 border-grocer-green text-grocer-green hover:bg-grocer-green/10"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          className="flex-1 bg-grocer-green hover:bg-grocer-green-dark"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </motion.div>
  );
};

export default ShopFilters;
