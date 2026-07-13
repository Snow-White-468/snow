"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTodayThemeType } from "@/data/romance";

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  isPetal: boolean;
}

export default function SnowEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const theme = getTodayThemeType();
    
    const generated = Array.from({ length: 40 }).map((_, index) => {
      const isSpecial = theme !== 'normal';
      return {
        id: index,
        left: `${Math.random() * 100}%`,
        size: isSpecial ? Math.random() * 12 + 8 : Math.random() * 4 + 2, // Petals are bigger (8-20px)
        duration: Math.random() * 6 + 6, 
        delay: Math.random() * 5, 
        // Normal = white snow, Birthday/Anniversary = Shades of Red/Pink Rose Petals
        color: theme === 'normal' 
          ? "rgba(255, 255, 255, 0.7)" 
          : index % 2 === 0 ? "#f43f5e" : "#e11d48",
        isPetal: isSpecial
      };
    });
    
    requestAnimationFrame(() => {
      setParticles(generated);
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, index) => (
        <motion.div
          key={p.id}
          className="absolute -top-4 rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.isPetal ? p.size * 1.3 : p.size, // Petals are slightly oval
            backgroundColor: p.color,
            borderRadius: p.isPetal ? "50% 0 50% 50%" : "50%", // Petal shape structure
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: ["0px", index % 2 === 0 ? "30px" : "-30px", "0px"],
            rotate: p.isPetal ? [0, 360] : [0, 0], // Smooth rotation for falling petals
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            x: { duration: p.duration / 2, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            rotate: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }
          }}
        />
      ))}
    </div>
  );
}