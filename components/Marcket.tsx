"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/ui/Footer";
import ProductsDisplay from "@/components/ui/ProductsDisplay";
import ShopHero from "@/components/shopHero";
import ShopFilters from "@/components/shopFilters";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter, X, Plus, Minus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Navbar } from "./navbar";
import { Product } from "./ui/ProductData";

// Type for cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    toast.success(`${product.name} added to your cart!`);
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter((item) => item.id !== productId);
      }
    });
  };

  // Delete item completely from cart
  const deleteFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
    toast.info("Item removed from cart");
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Calculate total items in cart
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <ShopHero />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            className="text-3xl font-bold text-grocer-green"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Products
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-grocer-green hover:bg-grocer-green-dark text-white"
              variant="default"
            >
              <Filter className="h-4 w-4" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                className="lg:w-1/4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <ShopFilters />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className={isFilterOpen ? "lg:w-3/4" : "w-full"}
            layout
            transition={{ duration: 0.3 }}
          >
            <ProductsDisplay onAddToCart={addToCart} />
          </motion.div>
        </div>
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="rounded-full h-16 w-16 bg-grocer-orange hover:bg-grocer-orange-dark shadow-lg">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-grocer-green text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </motion.div>
        </DrawerTrigger>

        <DrawerContent className="max-h-[85vh] overflow-auto">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-center text-xl font-bold">
                Your Cart
              </DrawerTitle>
              <DrawerDescription className="text-center">
                {cartItems.length === 0
                  ? "Your cart is empty"
                  : `You have ${cartItemCount} item${
                      cartItemCount > 1 ? "s" : ""
                    } in your cart`}
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4">
              {cartItems.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500">
                    Add some products to your cart!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      layout
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-grocer-green font-bold">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="w-6 text-center">{item.quantity}</span>

                        <button
                          onClick={() => addToCart(item as any)}
                          className="p-1 rounded-full bg-grocer-green text-white hover:bg-grocer-green-dark"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => deleteFromCart(item.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <div className="py-4 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Subtotal:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>Shipping:</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>
                </div>
              )}

              <DrawerFooter>
                <Button
                  disabled={cartItems.length === 0}
                  className="w-full bg-grocer-green hover:bg-grocer-green-dark"
                >
                  Checkout (${calculateTotal().toFixed(2)})
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Continue Shopping</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
