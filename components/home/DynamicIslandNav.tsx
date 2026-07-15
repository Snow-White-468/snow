"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DynamicIslandNav({ activeTab, setActiveTab }: NavProps) {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "memories", label: "Memories" },
    { id: "wishlist", label: "Wishlist" }
  ];

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
        animate={{
          width: isHovered ? "340px" : "110px",
          height: isHovered ? "46px" : "30px",
          borderRadius: isHovered ? "24px" : "15px",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="pointer-events-auto bg-black text-white flex items-center justify-center shadow-lg border border-white/10 overflow-hidden cursor-pointer px-2"
      >
        {!isHovered ? (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-bold tracking-widest uppercase text-pink-400"
          >
            Menu
          </motion.span>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between w-full px-2 gap-1"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(item.id);
                  setIsHovered(false);
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === item.id 
                    ? "bg-white text-black font-bold scale-105 shadow-sm" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}