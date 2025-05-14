"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Users, ChevronDown } from "lucide-react";

const ShopHero = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-grocer-green/10 to-grocer-orange/10">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900 drop-shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-grocer-green">KINASA</span> Marketplace
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Connect directly with Madagascar's finest agricultural producers. Our
          platform ensures fair trade practices, transparency, and quality
          products from farm to international markets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button className="bg-grocer-green hover:bg-grocer-green-dark text-white px-6 py-6 rounded-full flex items-center gap-2 text-lg font-medium shadow-md">
            <Search className="h-5 w-5" />
            Find Products
          </Button>

          <Button
            variant="outline"
            className="border-grocer-green text-grocer-green hover:bg-grocer-green/10 px-6 py-6 rounded-full flex items-center gap-2 text-lg font-medium"
          >
            <Users className="h-5 w-5" />
            Meet Producers
          </Button>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ y: 5 }}
          whileTap={{ y: 10 }}
        >
          <a
            href="#products"
            className="text-grocer-green flex flex-col items-center font-medium"
          >
            <span className="mb-2">Explore Categories</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopHero;
