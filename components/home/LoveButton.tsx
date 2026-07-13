"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quote from "./Quote";

export default function LoveButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Premium Animated Heart Trigger Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-600/30 cursor-pointer transition-colors hover:bg-pink-700"
      >
        Open My Heart ❤️
      </motion.button>

      {/* Cinematic Modal Popup Layer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Blur Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Romeo Letter Glassmorphism Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-neutral-900/90 border border-pink-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl space-y-6 z-10"
            >
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white text-xl p-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto border border-pink-500/20 shadow-inner">
                <span className="text-2xl animate-pulse">💝</span>
              </div>

              {/* Dynamic Daily Romance Engine Integration */}
              <Quote />

              <div className="pt-2 border-t border-white/5 text-xs text-gray-500">
                Created securely with code & infinity love by Asif Jamil
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}