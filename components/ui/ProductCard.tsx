import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  isNew = false,
  rating,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(quantity + 1);
    toast.success(`${name} added to cart!`);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      toast.info(`${name} removed from cart.`);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(
      isFavorite
        ? `${name} removed from favorites.`
        : `${name} added to favorites!`,
      {
        icon: isFavorite ? "💔" : "❤️",
      }
    );
  };

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { type: "spring", stiffness: 500 } },
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
          variants={imageVariants}
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          className={`absolute top-2 right-2 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
          onClick={toggleFavorite}
        >
          <Heart
            className="h-5 w-5"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </motion.button>

        {isNew && (
          <motion.div
            className="absolute top-2 left-2 bg-grocer-orange text-white text-xs px-2 py-1 rounded-full"
            variants={badgeVariants}
            initial="initial"
            animate="animate"
          >
            New
          </motion.div>
        )}

        {oldPrice && (
          <motion.div
            className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            variants={badgeVariants}
            initial="initial"
            animate="animate"
          >
            Sale
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <span className="text-sm text-gray-500">{category}</span>
        <h3 className="font-medium text-lg mb-2">{name}</h3>

        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                className="font-bold text-grocer-green"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                ${price.toFixed(2)}
              </motion.span>
              {oldPrice && (
                <motion.span
                  className="text-gray-500 line-through text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.2 }}
                >
                  ${oldPrice.toFixed(2)}
                </motion.span>
              )}
            </div>
            <motion.div
              className="flex items-center text-yellow-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
              <span className="text-gray-500 text-xs ml-1">({rating}.0)</span>
            </motion.div>
          </div>

          <div className="flex items-center">
            {quantity > 0 && (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-grocer-green text-white h-7 w-7 flex items-center justify-center mr-2"
                  onClick={handleRemoveFromCart}
                >
                  <Minus className="h-3 w-3" />
                </motion.button>

                <motion.span
                  className="font-semibold mx-1"
                  key={quantity}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {quantity}
                </motion.span>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-grocer-green hover:bg-grocer-green-dark text-white h-9 w-9 flex items-center justify-center"
              onClick={handleAddToCart}
            >
              {quantity === 0 ? (
                <ShoppingCart className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {isHovered && (
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-grocer-green text-white text-center py-2 cursor-pointer"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={handleAddToCart}
        >
          Quick Shop
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductCard;
