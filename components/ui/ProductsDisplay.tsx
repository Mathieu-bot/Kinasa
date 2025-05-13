import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/components/ui/ProductData";
import { Button } from "@/components/ui/button";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ProductsDisplay = ({ onAddToCart }: { onAddToCart: Function }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("popular");

  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Sort products based on selected option
  const sortProducts = () => {
    let sortedProducts = [...products];

    switch (sort) {
      case "newest":
        // For demo purposes, just reverse the array as if newer products are at the end
        sortedProducts.reverse();
        break;
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for 'popular'
        break;
    }

    return sortedProducts;
  };

  const currentProducts = sortProducts().slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <span className="font-medium">View:</span>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            className={viewMode === "grid" ? "bg-grocer-green" : ""}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            className={viewMode === "list" ? "bg-grocer-green" : ""}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-grocer-green"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProductCard
              {...product}
              onAddToCart={() => onAddToCart(product)}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 flex justify-center items-center gap-2">
        <Button
          variant="outline"
          className="p-2 rounded-full border-grocer-green text-grocer-green hover:bg-grocer-green/10"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "default" : "outline"}
            className={`px-4 py-2 rounded-full ${
              currentPage === index + 1
                ? "bg-grocer-green hover:bg-grocer-green-dark"
                : "border-grocer-green text-grocer-green hover:bg-grocer-green/10"
            }`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          className="p-2 rounded-full border-grocer-green text-grocer-green hover:bg-grocer-green/10"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ProductsDisplay;
