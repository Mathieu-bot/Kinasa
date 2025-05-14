"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/ui/Footer";
import ProductsDisplay from "@/components/ui/ProductsDisplay";
import ShopFilters from "@/components/shopFilters";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter, Plus, Minus, Trash2 } from "lucide-react";
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
import { Product } from "./ui/ProductData";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { useCartStore } from "@/lib/store/useCartStore";

// Custom hook to detect screen size
function useBreakpoint() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function to check screen size
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Initial check
    checkIsDesktop();

    // Add event listener for size changes
    window.addEventListener("resize", checkIsDesktop);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return isDesktop;
}

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isDesktop = useBreakpoint();

  // Use the Zustand store for the shopping cart
  const { items, addItem, decrementItem, removeItem, totalItems, totalPrice } =
    useCartStore();
  const cartItems = items;
  const cartItemCount = totalItems();
  const calculateTotal = totalPrice;

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            className="text-3xl font-bold text-emerald-700"
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
              className="flex items-center gap-2 bg-green-300 hover:bg-green-800 text-white"
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
            <ProductsDisplay />
          </motion.div>
        </div>
      </div>

      {/* Use Dialog for desktop and Drawer for mobile/tablet */}
      {isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              className="fixed bottom-4 right-4  "
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="fixed bottom-4 right-4 z-50 rounded-full h-16 w-16 bg-amber-100 hover:bg-amber-300 text-amber-700 shadow-lg">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 z-10 text-white text-xs font-bold bg-red-300 rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-[425px] bg-amber-50 py-6 px-3 rounded-md shadow-xl overflow-x-hidden z-50">
            <div className="mx-auto w-full ">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">
                  Your Cart
                </DialogTitle>
                <DialogDescription className="text-center">
                  {cartItems.length === 0
                    ? "Your cart is empty"
                    : `You have ${cartItemCount} item${
                        cartItemCount > 1 ? "s" : ""
                      } in your cart`}
                </DialogDescription>
              </DialogHeader>

              <div className="px-4">
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-gray-500">
                      Add some products to your cart!
                    </p>
                  </div>
                ) : (
                  <div className="h-full max-h-[50vh] overflow-y-auto">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center justify-between border-b"
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
                            <p className="bg-green-400 font-bold">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="p-1 px-3 text-center border rounded-full border-1 bg-slate-200">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => addItem(item)}
                            className="p-1 rounded-full bg-green-200 hover:text-green-200 text-green-800 hover:bg-green-800"
                          >
                            <Plus className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-2 p-1 text-gray-400 hover:text-red-500 hover:scale-125"
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

                <DialogFooter>
                  <Button
                    disabled={cartItems.length === 0}
                    className="w-full bg-green-300 hover:bg-green-800"
                  >
                    Checkout (${calculateTotal().toFixed(2)})
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">Continue Shopping</Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
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
              <Button className="rounded-full h-16 w-16 bg-amber-300 hover:bg-amber-300 shadow-lg">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-sm:top-2 min-sm:right-2 text-white text-xs font-bold bg-red-300 rounded-full h-6 w-6 flex items-center justify-center ">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </motion.div>
          </DrawerTrigger>

          <DrawerContent className="max-h-2/3">
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
                  <div className="h-full max-h-[50vh] overflow-y-auto">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center justify-between border-b"
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
                            <p className="bg-green-400 font-bold">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="p-1 px-3 text-center border rounded-full border-1 bg-slate-200">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => addItem(item)}
                            className="p-1 rounded-full bg-green-200 hover:text-green-200 text-green-800 hover:bg-green-800"
                          >
                            <Plus className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-2 p-1 text-gray-400 hover:text-red-500 hover:scale-125"
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
                    className="w-full bg-green-300 hover:bg-green-800"
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
      )}
    </div>
  );
};

export default Shop;
