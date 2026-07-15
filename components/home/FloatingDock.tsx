"use client";

import { motion } from "framer-motion";

interface DockProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FloatingDock({ activeTab, setActiveTab }: DockProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "memories", label: "Memories", icon: "📸" },
    { id: "wishlist", label: "Wishlist", icon: "✨" }
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        className="pointer-events-auto flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/60 px-4 py-2.5 rounded-2xl shadow-[0_15px_35px_rgba(236,183,213,0.25)]"
      >
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl flex flex-col items-center justify-center group cursor-pointer"
            >
              {/* Active State Background Pill */}
              {isActive && (
                <motion.div 
                  layoutId="activeDockIndicator"
                  className="absolute inset-0 bg-white/70 rounded-xl shadow-xs z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Label/Icon Presentation Layer */}
              <span className={`relative z-10 text-xs font-bold transition-colors duration-300 ${
                isActive ? "text-[#e05297]" : "text-[#515154] group-hover:text-[#1d1d1f]"
              }`}>
                {item.label}
              </span>

              {/* Minimal Dot Indicator Below for Selection Accent */}
              {isActive && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-1 w-1 h-1 bg-[#e05297] rounded-full" 
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}