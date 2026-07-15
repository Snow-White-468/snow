"use client";

import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <div className="space-y-2 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f]"
      >
        Welcome, <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e05297] to-[#f370a2]">Shanowar</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm md:text-base text-[#515154] max-w-sm mx-auto font-medium"
      >
        Our small interactive digital universe built completely with love.
      </motion.p>
    </div>
  );
}