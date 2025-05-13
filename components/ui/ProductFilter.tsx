import React from "react";
import { motion } from "framer-motion";

interface ProductFiltersProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap gap-4 mb-8 justify-center"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full ${
            activeFilter === category
              ? "bg-grocer-green text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ProductFilters;
