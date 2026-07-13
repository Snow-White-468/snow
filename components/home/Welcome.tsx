"use client";

import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <div className="space-y-3 text-center">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans"
      >
        Welcome, <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-rose-400">Shanowar</span> ❤️
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-400 font-light max-w-sm mx-auto"
      >
        Our small interactive digital universe built completely with love.
      </motion.p>
    </div>
  );
}