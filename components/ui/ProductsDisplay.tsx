"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { products, getAllCategories } from "./ProductData";
import { motion } from "framer-motion";
import { useFiltersStore } from "@/lib/store/useFiltersStore";

interface ProductsDisplayProps {
  showFilters?: boolean;
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  showFilters = false,
}) => {
  const [sortOption, setSortOption] = useState("");
  const categories = getAllCategories();

  // Use the filters store
  const {
    selectedCategories,
    selectedRegions,
    selectedRatings,
    priceRange,
    toggleCategory,
  } = useFiltersStore();

  // Filter products by all criteria
  const filteredProducts = products.filter((product) => {
    // Filter by category
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    // Filter by region
    const regionMatch =
      selectedRegions.length === 0 ||
      (product.region && selectedRegions.includes(product.region));

    // Filter by rating
    const ratingMatch =
      selectedRatings.length === 0 ||
      (product.rating && selectedRatings.includes(Math.floor(product.rating)));

    // Filter by price
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return categoryMatch && regionMatch && ratingMatch && priceMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        {showFilters && (
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  selectedCategories.includes(category)
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <select
          className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            No products match your search criteria.
          </p>
          <button
            onClick={() => useFiltersStore.getState().resetFilters()}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
                rating={product.rating}
                producer={product.producer}
                region={product.region}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsDisplay;
