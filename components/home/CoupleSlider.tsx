"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const asifImages = [
  "https://photos.app.goo.gl/gqKcWdYpYRwvyexB9"
];

const shanowarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
];

export default function CoupleSlider() {
  const [asifIdx, setAsifIdx] = useState(0);
  const [shanoIdx, setShanoIdx] = useState(0);
  const [resolvedAsifUrl, setResolvedAsifUrl] = useState("");

  useEffect(() => {
    requestAnimationFrame(() => {
      if (asifImages[0] && asifImages[0].includes("photos.app.goo.gl")) {
        setResolvedAsifUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop");
      } else {
        setResolvedAsifUrl(asifImages[0] || "");
      }
    });
  }, []);

  useEffect(() => {
    if (asifImages.length <= 1) return;
    const intervalAsif = setInterval(() => {
      setAsifIdx((prev) => (prev + 1) % asifImages.length);
    }, 4000);
    return () => clearInterval(intervalAsif);
  }, []);

  useEffect(() => {
    if (shanowarImages.length <= 1) return;
    const intervalShano = setInterval(() => {
      setShanoIdx((prev) => (prev + 1) % shanowarImages.length);
    }, 4500);
    return () => clearInterval(intervalShano);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-md grid grid-cols-2 gap-4 z-10 animate-fadeIn"
    >
      {/* Asif Polaroid */}
      <div className="bg-white/40 backdrop-blur-md border border-white/60 p-2.5 rounded-2xl flex flex-col items-center shadow-md">
        <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-inner">
          <AnimatePresence mode="wait">
            <motion.img
              key={asifIdx}
              src={resolvedAsifUrl || asifImages[asifIdx]}
              alt="Asif Profile Dynamic"
              initial={{ opacity: 0, scale: 1.05, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -10 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-[#515154] uppercase mt-2">
          Asif
        </span>
      </div>

      {/* Shanowar Polaroid */}
      <div className="bg-white/40 backdrop-blur-md border border-white/60 p-2.5 rounded-2xl flex flex-col items-center shadow-md">
        <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-inner">
          <AnimatePresence mode="wait">
            <motion.img
              key={shanoIdx}
              src={shanowarImages[shanoIdx]}
              alt="Shanowar Profile Dynamic"
              initial={{ opacity: 0, scale: 1.05, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 10 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-[#e05297] uppercase mt-2">
          Shanowar
        </span>
      </div>
    </motion.div>
  );
}