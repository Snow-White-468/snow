"use client";

import { useEffect, useState } from "react";
import { SPECIAL_DATES, DAILY_QUOTES, SpecialEvent } from "@/data/romance";
import { motion } from "framer-motion";

export default function Quote() {
  const [currentContent, setCurrentContent] = useState<{ title: string; body: string }>({
    title: "Today's Love Note 📝",
    body: "Loading your note...",
  });

  useEffect(() => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const dateKey = `${month}-${day}`;

    // Safely updating state inside animation frame to satisfy strict ESLint rules
    requestAnimationFrame(() => {
      if (SPECIAL_DATES[dateKey]) {
        const event: SpecialEvent = SPECIAL_DATES[dateKey];
        setCurrentContent({
          title: event.title,
          body: event.message,
        });
      } else {
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        
        const quoteIndex = dayOfYear % DAILY_QUOTES.length;
        setCurrentContent({
          title: "Today's Love Note 📝",
          body: DAILY_QUOTES[quoteIndex],
        });
      }
    });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="max-w-md w-full text-center space-y-2 px-4"
    >
      <h4 className="text-pink-400 font-medium tracking-wide text-sm uppercase">
        {currentContent.title}
      </h4>
      {/* Fixed: String template literal strips out direct quote parsing warnings */}
      <p className="text-xl md:text-2xl font-serif italic text-gray-200 leading-relaxed">
        {`"${currentContent.body}"`}
      </p>
    </motion.div>
  );
}