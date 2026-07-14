"use client";

import { useEffect, useState } from "react";
import { SPECIAL_DATES, DAILY_QUOTES, SpecialEvent } from "@/data/romance";
import { motion } from "framer-motion";

export default function Quote() {
  const [currentContent, setCurrentContent] = useState<{ title: string; body: string }>({
    title: "Today&apos;s Love Note 📝", // Fixed: Escaped raw apostrophe for ESLint validation
    body: "Loading your note...",
  });

  useEffect(() => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const dateKey = `${month}-${day}`;

    requestAnimationFrame(() => {
      if (SPECIAL_DATES[dateKey]) {
        const event: SpecialEvent = SPECIAL_DATES[dateKey];
        setCurrentContent({
          title: event.title,
          body: event.message,
        });
      } else {
        // Upgrade: Introducing pure dynamic random selection array from your pre-existing DAILY_QUOTES data pool
        const randomQuoteIndex = Math.floor(Math.random() * DAILY_QUOTES.length);
        
        setCurrentContent({
          title: "Today&apos;s Love Note 📝", // Fixed: Escaped raw apostrophe for ESLint validation
          body: DAILY_QUOTES[randomQuoteIndex],
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
        {/* Rendered directly inside HTML wrapper via standard string injection to secure layout */}
        {currentContent.title === "Today's Love Note 📝" || currentContent.title.includes("Today") 
          ? "Today's Love Note 📝" 
          : currentContent.title}
      </h4>
      <p className="text-xl md:text-2xl font-serif italic text-gray-200 leading-relaxed">
        {`"${currentContent.body}"`}
      </p>
    </motion.div>
  );
}