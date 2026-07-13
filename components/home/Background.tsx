"use client";

import { useEffect, useState } from "react";
import FloatingHearts from "./FloatingHearts";
import SnowEffect from "./SnowEffect";
import { getTodayThemeType } from "@/data/romance";

export default function Background() {
  const [gradientClass, setGradientClass] = useState("rgba(244,63,94,0.08)");

  useEffect(() => {
    const theme = getTodayThemeType();
    
    // Fixed: Wrapping inside animation frame to resolve strict set-state lint rule
    requestAnimationFrame(() => {
      if (theme === 'birthday') {
        setGradientClass("rgba(236,72,153,0.15)"); // Vibrant Pink Glow
      } else if (theme === 'anniversary') {
        setGradientClass("rgba(234,179,8,0.12)"); // Premium Golden Glow
      }
    });
  }, []);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden pointer-events-none z-0">
      {/* Dynamic Theme Radial Overlay */}
      <div 
        className="absolute inset-0 transition-all duration-1000" 
        style={{
          backgroundImage: `radial-gradient(circle at center, ${gradientClass} 0%, transparent 70%)`
        }}
      />
      
      <SnowEffect />
      <FloatingHearts />
    </div>
  );
}